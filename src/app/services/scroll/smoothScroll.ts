/* eslint-disable complexity */
import smoothscroll from 'smoothscroll-polyfill'

smoothscroll.polyfill()

/*
 * スムーズスクロール用の設定
 *
 * a要素にdata-smooth-scroll属性を指定するとスムーズスクロールで遷移する
 * <a href="#target" data-smooth-scroll>ラベル</a>
 *
 * overflowによるCSSスクロールの場合はdata-scroll-area属性でスクロール対象の要素を指定する
 * <a href="#target" data-smooth-scroll　data-scroll-area="#rs_check .b-modal__body">ラベル</a>
 */
document.addEventListener('click', (e) => {
  const target = e.target as any;

  // clickした要素がdata-smooth-scroll属性を含まない場合は処理を中断
  if (!target.dataset || !target.dataset.smoothScroll) return

  e.preventDefault()
  // スクロール対象の取得
  const targetId = target.hash
  const targetElement = document.querySelector(targetId)

  if (!targetElement) return

  /**
   * Handle smooth scroll only modal (popup)
   * <a href="#target" data-smooth-scroll data-scroll-in-modal>ラベル</a>
   */
  if (target.dataset.scrollInModal) {
    targetElement.scrollIntoView({
      behavior: 'smooth',
    });

    return;
  }

  // data-scroll-areaが指定されている場合はoverflowによるCSSスクロール
  if (target.dataset.scrollArea) {
    const areaElement = document.querySelector(target.dataset.scrollArea)

    if (!areaElement) return

    let scrollPosition = 0
    let countNode = targetElement
    const stopNode = areaElement

    // 再帰的にスクロール位置を算出する
    while (countNode !== stopNode) {
      scrollPosition +=
        countNode.offsetTop -
        countNode.parentNode.offsetTop -
        parseInt(
          window.getComputedStyle(countNode).getPropertyValue('margin-top'),
          10,
        )
      countNode = countNode.parentNode
    }

    areaElement.scrollTo({
      top: scrollPosition,
      behavior: 'smooth',
    })

    return
  }

  // 画面上部から要素までの距離
  const rectTop = targetElement.getBoundingClientRect().top
  // 現在のスクロール距離
  const offsetTop = window.pageYOffset
  const treeLayout = document.getElementsByClassName('t-with-tree__contents').length;
  const modalEl: HTMLElement = document.querySelector('.b-modal:not([hidden]');
  const filterLayout = document.querySelector('.u-table-filter__detail-box');

  if (modalEl || filterLayout) {
    const listModalBody = document.querySelectorAll('.b-modal__body')
    const modalInner = listModalBody[listModalBody.length - 1]

    const layoutScroll = modalInner || filterLayout

    if (!layoutScroll) return;

    if (targetId === '#root') {
      const isModal = !modalEl?.hidden;

      if (isModal) {
        layoutScroll.scrollTo({ top: 0, behavior: 'smooth' })

        return;
      }

      targetElement.scrollIntoView({ behavior: 'smooth' })

      return;
    }

    targetElement.scrollIntoView({ behavior: 'smooth' })

    return;
  }

  if (treeLayout) {
    if (targetId === '#root') {
      const areaTree = document.querySelector('.t-with-tree__main-area');

      if (!areaTree) return

      areaTree.scrollTo({ top: 0, behavior: 'smooth' })

      return;
    }

    targetElement.scrollIntoView({ behavior: 'smooth' })

    return;
  }

  const scrollInner = document.querySelector('.app__main-scroll-inner');

  if (scrollInner) {
    if (targetId === '#root') {
      scrollInner.scrollTo({ top: 0, behavior: 'smooth' })

      return;
    }

    targetElement.scrollIntoView({ behavior: 'smooth' })

    return;
  }

  // 要素取得
  const topElement = document.querySelector('[data-header]') ||
    document.querySelector('[data-header-view-mode=true]') ||
    document.querySelector('body');
  const navElement = document.querySelector('[data-nav]')
  const tabElement = document.querySelector('[data-tab]')
  // 要素の高さ取得
  const topElementHeight = topElement
    ? topElement.clientHeight
    : navElement.clientHeight

  // スクロール位置に持たせるバッファ
  let buffer

  // [data-tab]があった場合
  if (tabElement) {
    const tabElementHeight = tabElement.clientHeight

    buffer = topElementHeight + tabElementHeight + 33
  } else {
    buffer = topElementHeight + 12
  }

  const top = rectTop + offsetTop - buffer

  window.scrollTo({
    top,
    behavior: 'smooth',
  })
})
