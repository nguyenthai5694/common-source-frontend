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
import ModalContainer from 'soumu/blocks/modal/modal-container.component'
// import { PromptProvider } from 'soumu/blocks/prompt'
import ToastContainer from 'soumu/parts/toast/toast-container.component'
import Bootstrap from 'soumu/utils/bootstrap/bootstrap.component'
import { ErrorBoundary } from 'soumu/utils/page/error-boundary.component';
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
