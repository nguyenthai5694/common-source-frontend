import { RouteComponentProps } from 'react-router-dom';
import { Page } from 'common/blocks/breadcrumb/breadcrumb.component'
import GenericComponent from 'common/utils/generic/generic.component'
import { RECOVERY_PREV_PATH } from 'app/const/env.const';
import { isLoggedIn } from 'app/services/auth';

export interface BasePageProps<Queries = { [key: string]: any }, State = any, Context = any>
  extends RouteComponentProps<any, Context, State> {
  /* Other props... */
  parsedQueries: Queries;
}

/**
 * Usage:
 * ```ts
 * class AbcPage extends PageComponent {
 * }
 * ```
 *
 * OR
 *
 * ```ts
 * class AbcPage extends PageComponent<AbcPageState> {
 * }
 * ```
 *
 * OR
 *
 * ```ts
 * import BasePageProps from 'app/types/base-page-props'
 *
 * interface AbcPageProps implements BasePageProps {
 *   otherProp: string;
 * }
 *
 * class AbcPage extends PageComponent<AbcPageState, AbcPageProps> {
 * }
 * ```
 */
export default abstract class PageComponent<S = any, P extends BasePageProps = BasePageProps>
  extends GenericComponent<P, S> {
  abstract pageTitle: string;

  breadcrumb?: Page[] = [];

  protected getBreadcrumb: () => Page[];

  constructor(props) {
    super(props);

    const topPage = this.getPathRedirectTopPage();

    if (window.location.pathname === '/' && topPage) this.props.history.push(topPage);
  }

  componentDidMount() {
    if (this.breadcrumb.length) {
      return;
    }

    if (this.getBreadcrumb) {
      this.breadcrumb = this.getBreadcrumb();

      return;
    }
  }

  componentUpdateLockItem = (bunNos: Array<number>) => {

  }

  private getPathRedirectTopPage = () => {
    // const activeCookie = getActiveCookie();

    /**
     * Handle redirect from prev url
     */
    const prevPath = sessionStorage.getItem(RECOVERY_PREV_PATH);

    if (prevPath && isLoggedIn()) {
      sessionStorage.removeItem(RECOVERY_PREV_PATH);

      return prevPath;
    }

    /**
     * Access normal cookie
     */
    return '';
  }
}
