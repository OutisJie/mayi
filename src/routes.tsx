import React, { Suspense } from 'react'
import { Route } from 'react-router-dom'
import { Spin } from 'antd'

import Q1 from 'pages/question1'
import Q2 from 'pages/question2'
import Q3 from 'pages/question3'
import Q4 from 'pages/question4'

const routes = (
  <Suspense fallback={<Spin className="layout-spinning" />}>
    <Route exact path="/question1" component={Q1} />
    <Route exact path="/question2" component={Q2} />
    <Route exact path="/question3" component={Q3} />
    <Route exact path="/question4" component={Q4} />
  </Suspense>
)

export default routes
