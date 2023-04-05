import React from 'react'
import { Link } from 'react-router-dom'
import Help from 'common/parts/help/help.component'
import Tag from 'common/parts/tag/tag.component'

export default function DefaultDashboardPage() {
  return (
    <div className='t-dashboard'>
      <section className='t-dashboard__section'>
        <h2 className='t-dashboard__title -primary'>処理状況</h2>

        <div className='t-dashboard__situation'>
          <section className='t-dashboard__situation-item'>
            <div className='t-dashboard__situation-title-unit'>
              <h3 className='t-dashboard__situation-title'>受付</h3>

              <Help text='テキストが入りますテキストが入りますテキストが入りますテキストが入りますテキストが入り' />

              <div className='t-dashboard__more'>
                <button className='t-dashboard__more-btn' type='button'>
                  <img
                    className='t-dashboard__more-icon'
                    src='/public/assets/images/icons/more-primary-36.svg'
                    alt=''
                  />
                </button>
              </div>
            </div>

            <dl className='t-dashboard__flow'>
              <div className='t-dashboard__flow-item -warning'>
                <dt className='t-dashboard__flow-key'>受付待ち</dt>

                <dd className='t-dashboard__flow-value'>
                  <Link to='#' className='t-dashboard__flow-link'>
                    100<span className='t-dashboard__flow-num-text'>件</span>
                  </Link>
                </dd>
              </div>

              <div className='t-dashboard__flow-item -warning'>
                <dt className='t-dashboard__flow-key'>一時保存中</dt>

                <dd className='t-dashboard__flow-value'>
                  <Link to='#' className='t-dashboard__flow-link'>
                    12<span className='t-dashboard__flow-num-text'>件</span>
                  </Link>
                </dd>
              </div>

              <div className='t-dashboard__flow-item'>
                <dt className='t-dashboard__flow-key'>配布・転送</dt>

                <dd className='t-dashboard__flow-value'>
                  <Link to='#' className='t-dashboard__flow-link'>
                    4,329<span className='t-dashboard__flow-num-text'>件</span>
                  </Link>
                </dd>
              </div>

              <div className='t-dashboard__flow-item'>
                <dt className='t-dashboard__flow-key'>返付</dt>

                <dd className='t-dashboard__flow-value'>
                  <Link to='#' className='t-dashboard__flow-link'>
                    15<span className='t-dashboard__flow-num-text'>件</span>
                  </Link>
                </dd>
              </div>
            </dl>
          </section>

          <section className='t-dashboard__situation-item'>
            <div className='t-dashboard__situation-title-unit'>
              <h3 className='t-dashboard__situation-title'>決裁</h3>

              <Help text='テキストが入りますテキストが入りますテキストが入りますテキストが入りますテキストが入り' />

              <div className='t-dashboard__more'>
                <button className='t-dashboard__more-btn' type='button'>
                  <img
                    className='t-dashboard__more-icon'
                    src='/public/assets/images/icons/more-primary-36.svg'
                    alt=''
                  />
                </button>
              </div>
            </div>

            <dl className='t-dashboard__flow'>
              <div className='t-dashboard__flow-item -warning'>
                <dt className='t-dashboard__flow-key'>一時保存中</dt>

                <dd className='t-dashboard__flow-value'>
                  <Link to='#' className='t-dashboard__flow-link'>
                    100<span className='t-dashboard__flow-num-text'>件</span>
                  </Link>
                </dd>
              </div>

              <div className='t-dashboard__flow-item -warning'>
                <dt className='t-dashboard__flow-key'>決裁中</dt>

                <dd className='t-dashboard__flow-value'>
                  <Link to='#' className='t-dashboard__flow-link'>
                    12<span className='t-dashboard__flow-num-text'>件</span>
                  </Link>
                </dd>
              </div>

              <div className='t-dashboard__flow-item'>
                <dt className='t-dashboard__flow-key'>完了処理待ち</dt>

                <dd className='t-dashboard__flow-value'>
                  <Link to='#' className='t-dashboard__flow-link'>
                    4,329<span className='t-dashboard__flow-num-text'>件</span>
                  </Link>
                </dd>
              </div>

              <div className='t-dashboard__flow-item -warning'>
                <dt className='t-dashboard__flow-key'>事前閲覧可</dt>

                <dd className='t-dashboard__flow-value'>
                  <Link to='#' className='t-dashboard__flow-link'>
                    15<span className='t-dashboard__flow-num-text'>件</span>
                  </Link>
                </dd>
              </div>

              <div className='t-dashboard__flow-item -danger'>
                <dt className='t-dashboard__flow-key'>文取差戻し</dt>

                <dd className='t-dashboard__flow-value'>
                  <Link to='#' className='t-dashboard__flow-link'>
                    15<span className='t-dashboard__flow-num-text'>件</span>
                  </Link>
                </dd>
              </div>

              <div className='t-dashboard__flow-item -danger'>
                <dt className='t-dashboard__flow-key'>審査未了</dt>

                <dd className='t-dashboard__flow-value'>
                  <Link to='#' className='t-dashboard__flow-link'>
                    15<span className='t-dashboard__flow-num-text'>件</span>
                  </Link>
                </dd>
              </div>

              <div className='t-dashboard__flow-item'>
                <dt className='t-dashboard__flow-key'>官報申請中</dt>

                <dd className='t-dashboard__flow-value'>
                  0<span className='t-dashboard__flow-num-text'>件</span>
                </dd>
              </div>

              <div className='t-dashboard__flow-item -warning'>
                <dt className='t-dashboard__flow-key'>公印申請中</dt>

                <dd className='t-dashboard__flow-value'>
                  <Link to='#' className='t-dashboard__flow-link'>
                    15<span className='t-dashboard__flow-num-text'>件</span>
                  </Link>
                </dd>
              </div>

              <div className='t-dashboard__flow-item -warning'>
                <dt className='t-dashboard__flow-key'>施行（送信中）</dt>

                <dd className='t-dashboard__flow-value'>
                  <Link to='#' className='t-dashboard__flow-link'>
                    15<span className='t-dashboard__flow-num-text'>件</span>
                  </Link>
                </dd>
              </div>

              <div className='t-dashboard__flow-item -dangerIcon'>
                <dt className='t-dashboard__flow-key'>督促</dt>

                <dd className='t-dashboard__flow-value'>
                  <Link to='#' className='t-dashboard__flow-link'>
                    15<span className='t-dashboard__flow-num-text'>件</span>
                  </Link>
                </dd>
              </div>
            </dl>
          </section>
        </div>

        <div className='t-dashboard__situation'>
          <section className='t-dashboard__situation-item'>
            <div className='t-dashboard__situation-title-unit'>
              <h3 className='t-dashboard__situation-title'>供覧</h3>

              <Help text='テキストが入りますテキストが入りますテキストが入りますテキストが入りますテキストが入り' />

              <div className='t-dashboard__more'>
                <button className='t-dashboard__more-btn' type='button'>
                  <img
                    className='t-dashboard__more-icon'
                    src='/public/assets/images/icons/more-primary-36.svg'
                    alt=''
                  />
                </button>
              </div>
            </div>

            <dl className='t-dashboard__flow'>
              <div className='t-dashboard__flow-item -warning'>
                <dt className='t-dashboard__flow-key'>起案中</dt>

                <dd className='t-dashboard__flow-value'>
                  <Link to='#' className='t-dashboard__flow-link'>
                    100<span className='t-dashboard__flow-num-text'>件</span>
                  </Link>
                </dd>
              </div>

              <div className='t-dashboard__flow-item -warning'>
                <dt className='t-dashboard__flow-key'>閲覧可</dt>

                <dd className='t-dashboard__flow-value'>
                  <Link to='#' className='t-dashboard__flow-link'>
                    12<span className='t-dashboard__flow-num-text'>件</span>
                  </Link>
                </dd>
              </div>

              <div className='t-dashboard__flow-item'>
                <dt className='t-dashboard__flow-key'>保存処理未了</dt>

                <dd className='t-dashboard__flow-value'>
                  <Link to='#' className='t-dashboard__flow-link'>
                    4,329<span className='t-dashboard__flow-num-text'>件</span>
                  </Link>
                </dd>
              </div>

              <div className='t-dashboard__flow-item'>
                <dt className='t-dashboard__flow-key'>文取差戻し</dt>

                <dd className='t-dashboard__flow-value'>
                  <Link to='#' className='t-dashboard__flow-link'>
                    15<span className='t-dashboard__flow-num-text'>件</span>
                  </Link>
                </dd>
              </div>

              <div className='t-dashboard__flow-item'>
                <dt className='t-dashboard__flow-key'>供覧終了</dt>

                <dd className='t-dashboard__flow-value'>
                  <Link to='#' className='t-dashboard__flow-link'>
                    15<span className='t-dashboard__flow-num-text'>件</span>
                  </Link>
                </dd>
              </div>
            </dl>
          </section>

          <section className='t-dashboard__situation-item'>
            <div className='t-dashboard__situation-title-unit'>
              <h3 className='t-dashboard__situation-title'>文書管理</h3>

              <Help text='テキストが入ります' />

              <div className='t-dashboard__more'>
                <button className='t-dashboard__more-btn' type='button'>
                  <img
                    className='t-dashboard__more-icon'
                    src='/public/assets/images/icons/more-primary-36.svg'
                    alt=''
                  />
                </button>
              </div>
            </div>

            <dl className='t-dashboard__flow'>
              <div className='t-dashboard__flow-item -warning'>
                <dt className='t-dashboard__flow-key'>受付待ち</dt>

                <dd className='t-dashboard__flow-value'>
                  <Link to='#' className='t-dashboard__flow-link'>
                    100<span className='t-dashboard__flow-num-text'>件</span>
                  </Link>
                </dd>
              </div>

              <div className='t-dashboard__flow-item -warning'>
                <dt className='t-dashboard__flow-key'>一時保存中</dt>

                <dd className='t-dashboard__flow-value'>
                  <Link to='#' className='t-dashboard__flow-link'>
                    12<span className='t-dashboard__flow-num-text'>件</span>
                  </Link>
                </dd>
              </div>

              <div className='t-dashboard__flow-item'>
                <dt className='t-dashboard__flow-key'>配布・転送</dt>

                <dd className='t-dashboard__flow-value'>
                  <Link to='#' className='t-dashboard__flow-link'>
                    4,329<span className='t-dashboard__flow-num-text'>件</span>
                  </Link>
                </dd>
              </div>

              <div className='t-dashboard__flow-item'>
                <dt className='t-dashboard__flow-key'>返付</dt>

                <dd className='t-dashboard__flow-value'>
                  <Link to='#' className='t-dashboard__flow-link'>
                    15<span className='t-dashboard__flow-num-text'>件</span>
                  </Link>
                </dd>
              </div>
            </dl>
          </section>
        </div>
      </section>

      <section className='t-dashboard__section'>
        <div className='t-dashboard__title-unit'>
          <h2 className='t-dashboard__title -primary'>組織内管理者からのお知らせ</h2>

          <Link to='#' className='t-dashboard__link'>
            すべて見る
          </Link>
        </div>

        <dl className='t-dashboard__notice'>
          <div className='t-dashboard__notice-item'>
            <dt className='t-dashboard__notice-key'>20/05/01</dt>

            <dd className='t-dashboard__notice-value'>
              <Link to='#' className='t-dashboard__notice-link'>
                新型コロナウイルス感染症の拡大防止への対応について
              </Link>
            </dd>
          </div>

          <div className='t-dashboard__notice-item'>
            <dt className='t-dashboard__notice-key'>20/05/01</dt>

            <dd className='t-dashboard__notice-value'>
              一元文書管理システムの利用方法変更を変更しました。（遷移がないお知らせ）
            </dd>
          </div>

          <div className='t-dashboard__notice-item'>
            <dt className='t-dashboard__notice-key'>20/05/01</dt>

            <dd className='t-dashboard__notice-value'>
              <Tag label='重要' theme='outline-red' />

              <Link to='#' className='t-dashboard__notice-link'>
                新型コロナウイルス感染症の拡大防止への対応について
              </Link>
            </dd>
          </div>
        </dl>
      </section>

      <section className='t-dashboard__section'>
        <div className='t-dashboard__title-unit'>
          <h2 className='t-dashboard__title -primary'>総務省のお知らせ</h2>

          <Link to='#' className='t-dashboard__link'>
            すべて見る
          </Link>
        </div>

        <dl className='t-dashboard__notice'>
          <div className='t-dashboard__notice-item'>
            <dt className='t-dashboard__notice-key'>20/05/01</dt>

            <dd className='t-dashboard__notice-value'>
              <img
                className='t-dashboard__notice-icon'
                src='/public/assets/images/icons/pin-blue.svg'
                alt=''
                aria-hidden='true'
              />

              <Link to='#' className='t-dashboard__notice-link'>
                新型コロナウイルス感染症の拡大防止への対応について
              </Link>
            </dd>
          </div>

          <div className='t-dashboard__notice-item'>
            <dt className='t-dashboard__notice-key'>20/05/01</dt>

            <dd className='t-dashboard__notice-value'>
              一元文書管理システムの利用方法変更を変更しました。（遷移がないお知らせ）
            </dd>
          </div>

          <div className='t-dashboard__notice-item'>
            <dt className='t-dashboard__notice-key'>20/05/01</dt>

            <dd className='t-dashboard__notice-value'>
              <Tag label='重要' theme='outline-red' />

              <Link to='#' className='t-dashboard__notice-link'>
                新型コロナウイルス感染症の拡大防止への対応について
              </Link>
            </dd>
          </div>
        </dl>
      </section>

      <section className='t-dashboard__section'>
        <h2 className='t-dashboard__title -primary'>集計情報</h2>

        <div className='t-dashboard__aggregate'>
          <section className='t-dashboard__aggregate-item'>
            <div className='t-dashboard__aggregate-title-unit'>
              <h3 className='t-dashboard__aggregate-title'>
                部門別電子決裁率
                <span className='t-dashboard__aggregate-title-aux'>
                  （過去30日間）
                </span>
              </h3>

              <div className='t-dashboard__more'>
                <button className='t-dashboard__more-btn' type='button'>
                  <img
                    className='t-dashboard__more-icon'
                    src='/public/assets/images/icons/more-primary-36.svg'
                    alt=''
                  />
                </button>
              </div>
            </div>

            <div className='t-dashboard__aggregate-body'>グラフ</div>
          </section>

          <section className='t-dashboard__aggregate-item'>
            <div className='t-dashboard__aggregate-title-unit'>
              <h3 className='t-dashboard__aggregate-title'>
                部門別ログイン回数
                <span className='t-dashboard__aggregate-title-aux'>
                  （過去30日間）
                </span>
              </h3>

              <div className='t-dashboard__more'>
                <button className='t-dashboard__more-btn' type='button'>
                  <img
                    className='t-dashboard__more-icon'
                    src='/public/assets/images/icons/more-primary-36.svg'
                    alt=''
                  />
                </button>
              </div>
            </div>

            <div className='t-dashboard__aggregate-body'>グラフ</div>
          </section>

          <button className='t-dashboard__aggregate-btn' type='button'>
            <img
              className='t-dashboard__aggregate-btn-icon'
              src='/public/assets/images/icons/add-primary-60.svg'
              alt=''
              aria-hidden='true'
            />
            集計情報を追加
          </button>
        </div>
      </section>
    </div>
  )
}
