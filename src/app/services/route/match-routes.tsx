import React, { Suspense } from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import { History } from 'history';
import PageError, { PageErrorType } from 'soumu/blocks/page-error/page-error.component';
import { Lazy } from 'soumu/utils/lazy/lazy.component';
import { setActiveCookie } from 'app/services/active-cookie'
import { NormalizedRoute } from 'app/services/route';
import { handleMiddlewareError } from './handle-middleware-error';
import { parseQuery } from './route.helper'
import { setCurrentRouteId } from './route.store'
import { runMiddleware } from './run-middleware';

/**
 * TODO:
 * - (1): let client decide what component should be used to display when page not found.
 * - (2): optimize code.
 */

interface MatchRoutesProps {
  routes: NormalizedRoute[];
}

/**
 * Outermost history object.
 */
export let rootHistory: History;

export function MatchRoutes(props: MatchRoutesProps) {
  rootHistory = useHistory();

  return displayRoutes(props.routes);
}

function displayRoutes(routes: NormalizedRoute[]) {
  const children = [];

  routes.forEach(route => {
    const { fullPath } = route;

    if (route.redirectTo) {
      children.push(
        <Redirect
          key={fullPath}
          to={route.redirectTo}
          exact={route.exact}
        />,
      );

      return;
    }

    if (route.middlewares) {
      if (route.children) {
        children.push(
          <Route
            key={fullPath}
            path={fullPath}
            render={props => {
              return <Lazy promise={runMiddleware(route, props)} onComplete={result => {
                if (result === 'running') {
                  return <route.fallback />;
                }

                if (result !== true) {
                  return handleMiddlewareError(result);
                }

                // (2)
                const newProps = {
                  ...props,
                  parsedQueries: parseQuery(props.location.search),
                }

                setCurrentRouteId(route.id);

                return (
                  <Suspense fallback={<route.fallback />}>
                    <route.component {...newProps}>{displayRoutes(route.children)}</route.component>
                  </Suspense>
                );
              }} />
            }}
          />,
        );

        return;
      }

      children.push(
        <Route
          key={fullPath}
          render={props => {
            return <Lazy promise={runMiddleware(route, props)} onComplete={result => {
              if (result === 'running') {
                return <route.fallback />
              }

              if (result !== true) {
                return handleMiddlewareError(result);
              }

              // (2)
              const newProps = {
                ...props,
                parsedQueries: parseQuery(props.location.search),
              }

              setCurrentRouteId(route.id);
              setActiveCookie(window.location.pathname);

              return <route.component {...newProps}></route.component>;
            }} />
          }}
          path={fullPath}
          exact
        />,
      );

      return;
    }

    if (route.children) {
      children.push(
        <Route
          key={fullPath}
          path={fullPath}
          render={props => {
            // (2)
            const newProps = {
              ...props,
              parsedQueries: parseQuery(props.location.search),
            }

            setCurrentRouteId(route.id);

            return (
              <Suspense fallback={<route.fallback />}>
                <route.component {...newProps}>{displayRoutes(route.children)}</route.component>
              </Suspense>
            )
          }}
        />,
      );

      return;
    }

    children.push(
      <Route
        key={fullPath}
        render={props => {
          // (2)
          const newProps = {
            ...props,
            parsedQueries: parseQuery(props.location.search),
          }

          setCurrentRouteId(route.id);
          setActiveCookie(window.location.pathname);

          return <route.component {...newProps} />
        }}
        path={fullPath}
        exact
      />,
    );

    // (1)
    // children.push(
    //   <Route
    //     key={fullPath}
    //     path={fullPath}
    //     component={() => <div>404 - 1</div>}
    //   />,
    // );
  });

  // (1)
  children.push(
    <Route
      key={''}
      path={''}
      component={() => <PageError error={PageErrorType.PAGE_NOTFOUND} />}
    />,
  );

  return <Switch>{children}</Switch>;
}
