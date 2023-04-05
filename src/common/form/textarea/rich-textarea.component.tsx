/* eslint-disable max-lines */
import React, { useState, useCallback, useRef, useEffect, useLayoutEffect } from 'react'
import clsx from 'clsx'
import { Input } from 'common/form/input/input.component'
import Button from 'common/parts/button/button.component'
import useOnClickOutside from 'app/hooks/use-on-click-outside.hook'
import { getCopyText } from 'app/services/clipboard'
import { isIE } from 'app/services/navigator'
import { RichTextareaProps } from './rich-textarea.type'

export function RichTextarea({
  name,
  placeholder,
  disabled = false,
  defaultValue,
  defaultStatus = undefined, // undefined or valid or inValid or warn
  defaultMessage,
  maxLength = 1000,
  /**
   * Require is not support any more. If you want to validate, use formik.
   * For backward compatible this prop still exist here, but it will be remove later.
   */
  require = false,
  className = '',
  value = '',
  // 値が変更された際に実行されるイベント
  onChange,
  onBlur,
  formik,
  // 幅
  width = '100%',
  // 読み取り専用
  readOnly,
  // リンク機能を持つかどうか
  hasAddLink,
  hasResetSize = true,
  status,
  isViewMode = false,
  breakLine = false,
  autoTrim = false,
}: RichTextareaProps) {
  const textAreaRef = useRef<HTMLInputElement>(null)
  const [_inputText, changeInputText] = useState(defaultValue || '');
  const [_visibleText, changeVisibleText] = useState('');
  const [remainCharacter, changeRemainCharacter] = useState(0);
  const [_status, changeStatus] = useState(defaultStatus);
  const [message] = useState(defaultMessage); // ????? for what
  // IE11の場合のみリサイズを独自に実装する
  const defaultHeight = 78
  const [height, changeHeight] = useState(defaultHeight)

  // リンク追加の開閉
  const linkRef = useRef(null)
  const [isAddLinkOpen, changeIsAddLinkOpen] = useState(false)
  const [editable, setEditable] = useState(!disabled)
  const allowedKeyCodes = [8, 37, 38, 39, 40]
  const allowedKeyCodesWithCtrlKey = [65, 90, 86, 67, 88]
  const checkMaxlengthTimer = useRef(null)
  const cacheInnerHtml = useRef(null);

  useOnClickOutside(linkRef, () => {
    if (isAddLinkOpen) {
      addLink(linkDisplayText, null)
      initializeLinkState()
      changeIsAddLinkOpen(false)
    }
  }) // ボックス外クリックで閉じる

  // リンク追加時のテキストボックス
  const [linkDisplayText, changeLinkDisplayText] = useState('')
  const [linkUrl, changeLinkUrl] = useState('https://')

  // リンク追加URLのバリデーション
  const [isErrorLinkUrl, changeIsErrorLinkUrl] = useState(true)

  useEffect(() => {
    if (value === _inputText) return;

    const spanTag = document.createElement('span');
    const filteredValue = value || '';

    spanTag.innerHTML = filteredValue;

    changeInputText(filteredValue);
    changeVisibleText(spanTag.textContent);
    textAreaRef.current.innerHTML = filteredValue;
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [value]);

  useEffect(() => {
    changeStatus(status)
  }, [status])

  function setEndOfContenteditable(contentEditableElement) {
    var range, selection;

    if (document.createRange) {
      range = document.createRange();
      range.selectNodeContents(contentEditableElement);
      range.collapse(false);
      selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }

  const checkMaxLength = useCallback((event) => {
    const isAllowedKey = allowedKeyCodes.includes(event.keyCode)
    const isShortcut = event.ctrlKey && allowedKeyCodesWithCtrlKey.includes(event.keyCode)
    const isAllowedAction = isAllowedKey || isShortcut

    if (isAllowedAction) return;

    if (maxLength && countRemainingCharacter() >= maxLength) {
      setEditable(false)

      clearTimeout(checkMaxlengthTimer.current)
      checkMaxlengthTimer.current = setTimeout(() => {
        setEditable(!disabled)
      })

      return event.preventDefault();
    }
  }, [maxLength]);

  // 変更を検知してhiddenに値を格納する
  const inputTimeout = useRef(null);

  const countRemainingCharacter = useCallback((visibleText?): number => {
    const textarea = textAreaRef.current;
    const textContent = visibleText ?? textarea.textContent

    if (!textarea) return 0;

    const text = textarea.innerHTML;
    const innerText = textarea.innerText;

    if (isIE) {
      const p_tag_ie = text.match(/<p>(.*?)<\/p>/g) && text.match(/<p>(.*?)<\/p>/g).map(function (val) {
        return val.replace(/<\/?p>/g, '');
      });
      const length = textContent.replace(/(<([^>]+)>)/gi, '').length + (p_tag_ie ? (p_tag_ie.length - 1) : 0)

      changeRemainCharacter(length);

      return length;
    } else {
      const visibleTextChrome = innerText.substring(0, 3) === '\n\n\n' ?
        innerText.replace('\n\n\n', ' ').replaceAll('\n\n', ' ').replaceAll('\n', ' ') :
        innerText.replaceAll('\n\n', ' ').replaceAll('\n', ' ')

      const length = innerText === '\n' ? visibleTextChrome.length - 1 : visibleTextChrome.length;

      changeRemainCharacter(length);

      return length;
    }
  }, [_visibleText, value, inputTimeout])

  useEffect(() => {
    countRemainingCharacter(_visibleText)
  }, [value, _visibleText])

  //textAreaのinnerHTMLが変更されたときに呼び出されます。
  useLayoutEffect(() => {
    textAreaRef.current.addEventListener('DOMSubtreeModified', handleChange)
  }, [])

  const handleChange = useCallback(() => {
    clearTimeout(inputTimeout.current)
    inputTimeout.current = setTimeout(() => {
      syncHandleChange()
    }, 100)
  }, []);

  const syncHandleChange = () => {
    const textarea = textAreaRef.current;
    const visibleText = textarea.textContent;
    const text = textarea.innerHTML;

    const isExceededMaxlength = countRemainingCharacter() > maxLength

    if (!isExceededMaxlength) {
      cacheInnerHtml.current = text;
    } else {
      textAreaRef.current.innerHTML = cacheInnerHtml.current
      handleChange()
      setEndOfContenteditable(textAreaRef.current)

      return;
    }

    changeVisibleText((text === '<br>' && !visibleText) ? ' ' : visibleText);
    changeInputText(text);

    const underlineEls = textarea.querySelectorAll('u'); // query all underline elements in textarea

    if (underlineEls) {
      underlineEls.forEach((item) => {
        var children = item.getElementsByTagName('*'); // get all children of items in the collection

        for (var i = 0; i < children.length; i++) {
          var childEl = children[i] as HTMLElement;

          childEl.style.textDecoration = 'underline';
        }
      })
    }

    onChange && onChange(text);
    formik && formik.setFieldValue(name, text);
  }

  const handleBlur = useCallback(() => {
    const textArea = textAreaRef.current;
    const text = textArea.innerHTML;

    const newValue = text.trim();

    if (autoTrim && newValue !== text) {
      textAreaRef.current.innerHTML = newValue;
      handleChange();
    }

    onBlur && onBlur(text);
  }, [onBlur, name])

  const handlePaste = useCallback(
    (e) => {
      // リッチテキストのペーストを想定してプレーンテキストに変換してペースト処理を行う
      const target = e.target

      e.preventDefault();

      let text: string = getCopyText(e);

      if (breakLine) {
        text = text.replaceAll('\r', '')
      }

      const selection = window.getSelection();

      const selectionStr = selection.toString();

      if (selection === null) return

      const range: Range = selection.getRangeAt(0);
      const totalLength =
        text.length +
        (selectionStr.length ? _visibleText.length - selectionStr.length : _visibleText.length) -
        (
          (selectionStr.length && _visibleText.length === selectionStr.length) ? 0 : range.endOffset - range.startOffset
        );

      if (maxLength && totalLength > maxLength) {
        text = text.substring(0, text.length - (totalLength - maxLength));
      }

      const node = document.createTextNode(text);

      range.deleteContents();
      range.insertNode(node);
      range.setStartAfter(node);
      range.setEndAfter(node);
      target.normalize(); // 挿入されたtextNodeを結合
      selection.removeAllRanges();
      selection.addRange(range);
      handleChange()
    },
    [handleChange, _visibleText, maxLength],
  )

  const changeBold = useCallback(() => {
    textAreaRef.current.focus()
    document.execCommand('bold')
    handleChange()
  }, [handleChange])

  const changeUnderLine = useCallback(() => {
    textAreaRef.current.focus()
    document.execCommand('underline')
    handleChange()
  }, [handleChange])

  const changeColor = useCallback(
    (color) => () => {
      textAreaRef.current.focus()
      document.execCommand('foreColor', false, color)
      handleChange()
    },
    [handleChange],
  )

  const changeSize = useCallback(
    (size) => () => {
      const selection = window.getSelection()
      // INFO: IEはTextNodeのcontainsに対応していないのでparentNodeで判定する

      if (textAreaRef.current === selection.anchorNode.parentNode ||
        textAreaRef.current.contains(selection.anchorNode.parentNode) ||
        (isIE && textAreaRef.current === selection.anchorNode)) {
        //TODO: document.execCommand does not apply to all selected elements in IE
        document.execCommand('fontSize', false, '1')
        const fontElements: NodeListOf<HTMLElement> = textAreaRef.current.querySelectorAll('font[size]')

        if (fontElements.length) {
          fontElements.forEach((fontElement) => {
            fontElement.removeAttribute('size')
            fontElement.style.fontSize = size + 'px'
          })
          handleChange()
        } else {
          // info:選択範囲がない状態でexecCommand('fontSize')は直後のDOMにはfont要素が配置されずに初回の変更時にfont要素が代入される
          // そのためfont要素が検知できない場合はDOMを初期化しておく
          textAreaRef.current.innerHTML = textAreaRef.current.innerHTML + ''
        }
      }
    }, [handleChange])

  const startAddLink = useCallback(() => {
    const selection = window.getSelection()
    let linkUrl = undefined
    let linkText = undefined

    if (selection.anchorNode) {
      changeIsErrorLinkUrl(true)
      let node = undefined
      let anchor = undefined

      anchor = window.getSelection().focusNode.parentNode;
      // anchor = node.querySelector('a')

      // for other
      if (anchor) linkUrl = anchor.href

      // for IE
      node = selection.getRangeAt(0).cloneContents()
      anchor = node.querySelector('a')

      if (anchor) linkUrl = anchor.href

      // 選択文字列を初期値に設定
      linkText = selection.toString()
    }

    // 選択範囲のフォーマットをクリア
    document.execCommand('removeFormat', false)
    // <a href="#reserveLink">xxx</a>　という仮リンクを挿入

    document.execCommand('createLink', false, '#reserveLink')
    changeIsAddLinkOpen((isOpen) => !isOpen)
    //　仮リンクがある場合は選択がテキストエリア内ので初期値を設定
    const anchor = textAreaRef.current.querySelector('a[href="#reserveLink"]') as HTMLElement;

    if (anchor) {
      if (linkText) changeLinkDisplayText(linkText);

      if (linkUrl && linkText) changeLinkUrl(linkUrl);

      changeIsErrorLinkUrl(false)
    }

    // 選択内容が空の場合はhref属性の内容が挿入されるので初期化しておく
    if (anchor && anchor.innerText === '#reserveLink') anchor.innerText = ''

    // 直接編集できないようにフォーカスを外す
    selection.removeAllRanges()
  }, [])

  const addLink = (linkDisplayText, linkUrl) => {
    const anchor = textAreaRef.current.querySelector('a[href="#reserveLink"]') as HTMLElement

    if (anchor) {
      // 仮リンクがある場合は変換
      if (!!linkUrl) {
        anchor.setAttribute('href', linkUrl)
        anchor.setAttribute('target', '_blank')
        anchor.innerText = linkDisplayText
      } else {
        textAreaRef.current.innerHTML =
          textAreaRef.current.innerHTML.replace(anchor.outerHTML.toString(), anchor.innerHTML)
      }
    } else {
      // 仮リンクがない場合は末尾に挿入
      textAreaRef.current.innerHTML = textAreaRef.current.innerHTML +
        `<a href='${linkUrl}' target="_blank">${linkDisplayText}</a>`
    }

    handleChange()
  }

  const removeReverseLink = () => {
    const anchor = textAreaRef.current.querySelector('a[href="#reserveLink"]') as HTMLElement

    if (anchor) {
      if (!!linkUrl)
        anchor.setAttribute('href', linkUrl)
    }

    handleChange()
  }

  const initializeLinkState = () => {
    // 挿入していた仮リンクを削除
    const anchor = textAreaRef.current.querySelector('a[href="#reserveLink"]')

    if (anchor) anchor.outerHTML = anchor.innerHTML

    // 入力内容を初期化
    changeLinkDisplayText('')
    changeLinkUrl('https://')
  }

  // IE11の場合のみリサイズを独自に実装する
  const heightChanger = useCallback(
    (e) => {
      const startPageY = e.pageY

      const handleDrag = (e) => {
        const _height = height + e.pageY - startPageY

        changeHeight(defaultHeight < _height ? _height : defaultHeight)
      }
      const handleDragEnd = () => {
        document.removeEventListener('mousemove', handleDrag)
        document.removeEventListener('mouseup', handleDragEnd)
      }

      document.addEventListener('mousemove', handleDrag)
      document.addEventListener('mouseup', handleDragEnd)
    },
    [height],
  )

  // prevent default behavior of browser when dragging  a text/element into textarea
  const handleDropElm = (e) => {
    e.preventDefault();
  }

  // TODO: ???? why display ERROR message => need investigate more
  if (readOnly) {
    return (
      <div className={clsx(`p-textarea -read-only ${className}`)} style={{ width }}>
        <div className='p-textarea__field -richText' tabIndex={0} role='textbox'
          dangerouslySetInnerHTML={{ __html: sanitize(message) }} />
      </div>
    )
  }

  return (
    <div className={clsx(`p-textarea ${className}`)} style={{ width }}>
      {!isViewMode &&
        <ul className='p-textarea__editMenu'>
          <li className='p-textarea__editItem'>
            <button onMouseDown={changeBold} type='button'>
              <img src='/public/assets/images/icons/richtext-bold-black-60.svg' alt='bold' />
            </button>
          </li>

          <li className='p-textarea__editItem -separator'>
            <button onMouseDown={changeUnderLine} type='button'>
              <img src='/public/assets/images/icons/richtext-underline-black-60.svg' alt='underline' />
            </button>
          </li>

          <li className='p-textarea__editItem -separator'>
            <button onMouseDown={changeColor('#020c1a')} type='button'>
              <img src='/public/assets/images/icons/richtext-palette-black-60.svg' alt='色' />
            </button>
          </li>

          <li className='p-textarea__editItem'>
            <button onMouseDown={changeColor('#D60B0B')} className='p-textarea__editMenu-circle-btn -red' type='button'>
              red
            </button>
          </li>

          <li className='p-textarea__editItem'>
            <button
              onMouseDown={changeColor('#01874B')}
              className='p-textarea__editMenu-circle-btn -green'
              type='button'>
              green
            </button>
          </li>

          <li className='p-textarea__editItem'>
            <button onMouseDown={changeColor('#DB7609')}
              className='p-textarea__editMenu-circle-btn -orange' type='button'>orange
            </button>
          </li>

          <li className='p-textarea__editItem'>
            <button onMouseDown={changeColor('#020c1a')} className='p-textarea__editMenu-circle-btn' type='button'>
              default
            </button>
          </li>

          <li className='p-textarea__editItem -separator'>
            <img src='/public/assets/images/icons/richtext-font-black-60.svg' alt='フォント' />
          </li>

          <li className='p-textarea__editItem'>
            <button onClick={changeSize(16)} className='p-textarea__editMenu-text-btn' type='button'>文字大</button>
          </li>

          <li className='p-textarea__editItem'>
            <button onClick={changeSize(12)} className='p-textarea__editMenu-text-btn' type='button'>文字小</button>
          </li>

          {hasResetSize && (
            <li className='p-textarea__editItem'>
              <button onClick={changeSize(14)} className='p-textarea__editMenu-text-btn' type='button'>通常</button>
            </li>
          )}

          {hasAddLink && (
            <li className='p-textarea__editItem  -separator'>
              <div className='p-textarea-add-link__dropdown' aria-expanded={isAddLinkOpen} ref={linkRef}>
                <button className='p-textarea__editMenu-text-btn -link-black' type='button' onClick={startAddLink}>
                  リンク
                </button>

                {isAddLinkOpen && (
                  <div id='add_link' className='p-textarea-add-link__detail-box'>
                    <div className='p-textarea-add-link__detail-body'>
                      <div className='p-textarea-add-link__item'>
                        <label className='p-textarea-add-link__label' htmlFor='display_text'>表示テキスト</label>

                        <Input id='display_text' size='m' width={280} value={linkDisplayText}
                          onChange={(e) => { changeLinkDisplayText(e.target.value) }}
                          placeholder='リンクとして表示したいテキストを入力'
                        />
                      </div>

                      <div className='p-textarea-add-link__item'>
                        <label className='p-textarea-add-link__label' htmlFor='link_url'>URL</label>

                        <Input id='link_url' size='m' width={280}
                          value={linkUrl} placeholder='遷移先のURLを入力'
                          shouldValidate
                          onChange={(e) => {
                            changeLinkUrl(e.target.value)
                            changeIsErrorLinkUrl(false)
                          }}
                          onError={() => { changeIsErrorLinkUrl(true) }}
                          linkInput
                        />
                      </div>
                    </div>

                    <div className='p-textarea-add-link__detail-footer'>
                      <Button className='p-textarea-add-link__footer-cancel' label='キャンセル'
                        size='m' theme='tertiary' type='button'
                        onClick={() => {
                          removeReverseLink()
                          changeIsAddLinkOpen(false)
                        }}
                      />

                      <Button className='p-textarea-add-link__footer-submit' type='button'
                        label='挿入' size='m' theme='primary'
                        onClick={() => {
                          addLink(linkDisplayText, linkUrl)
                          initializeLinkState()
                          changeIsAddLinkOpen(false)
                        }}
                        disabled={isErrorLinkUrl}
                      />
                    </div>
                  </div>
                )}
              </div>
            </li>
          )}
        </ul>
      }

      <div className='p-textarea_wrap'>
        <div
          ref={textAreaRef}
          className={clsx('p-textarea__field -richText', {
            '-valid': _status === 'valid',
            '-inValid': _status === 'inValid',
            '-warn': _status === 'warn',
            'p-textarea-background': isViewMode,
            'h-text-white-space -pre-wrap': breakLine,
          })}
          contentEditable={editable}
          tabIndex={0}
          role='textbox'
          onPaste={handlePaste}
          placeholder={placeholder}
          onKeyDown={checkMaxLength}
          onBlur={handleBlur}
          onDrop={handleDropElm}
          style={{ height: isIE ? height + 'px' : 'auto' }}
        />

        {isIE && (
          <button
            onMouseDown={heightChanger}
            type='button'
            tabIndex={-1}
            className='p-textarea_resize'
          />
        )}
      </div>

      <div className='h-d_flex -justify-between'>
        <div>
          {((formik && formik.getFieldMeta(name).error) || message) && (
            <p className={clsx('p-textarea__message', {
              '-inValid': _status === 'inValid',
              '-warn': _status === 'warn',
            })}>
              {formik ? formik.getFieldMeta(name).error : message}
            </p>
          )}
        </div>

        <div className='p-textarea__counter-wrapper'>
          {maxLength && !isViewMode && (
            <p className='p-textarea__counter'>
              残り {(maxLength < remainCharacter ? 0 : maxLength - remainCharacter).toLocaleString()} 文字
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
