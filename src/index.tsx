import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'
import 'app/services/scroll/smoothScroll'
import 'core-js'
import 'what-input'

import React from 'react'
// import { DndProvider } from 'react-dnd-multi-backend';
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import ModalContainer from 'common/blocks/modal/modal-container.component'
// import { PromptProvider } from 'common/blocks/prompt'
import ToastContainer from 'common/parts/toast/toast-container.component'
import Bootstrap from 'common/utils/bootstrap/bootstrap.component'
import { ErrorBoundary } from 'common/utils/page/error-boundary.component';
import store from 'app/stores'
import 'app/services/global'

import './styles/main.scss'

ReactDOM.render(
  <Provider store={store}>
    {/* <DndProvider options={HTML5Backend}> */}
    <ErrorBoundary>
      <BrowserRouter>
        {/* <PromptProvider> */}
        <Bootstrap />

        <div id='modal-root'>
          <ModalContainer />
        </div>

        <ToastContainer />

        {/* </PromptProvider> */}
      </BrowserRouter>
    </ErrorBoundary>

    {/* </DndProvider> */}
  </Provider>,
  document.getElementById('root'),
)
