import React, { memo, Suspense } from 'react'
import {Provider} from 'react-redux'
import { useRoutes,HashRouter } from 'react-router-dom'

import routes from '@/router'
import store from '@/store'

import JXAppHeader from '@/components/app-header'
import JXAppFooter from '@/components/app-footer'
import JXAppPlayerBar from '@/pages/player/app-player-bar'

function RouteElement() {
    const element = useRoutes(routes)
    return element
}

export default memo(function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <JXAppHeader />
        <Suspense fallback={<div>page loading</div>}>
          <RouteElement />
        </Suspense>
        <JXAppFooter />
        <JXAppPlayerBar />
      </HashRouter>
    </Provider>
  )
})
