import React from 'react'
import './App.scss'
import 'semantic-ui-css/semantic.min.css'

import { Header } from 'semantic-ui-react'
import { reducer, initialState } from './state/store'
import LoginForm from './components/Login'

const App = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  return (
    <div className="App">
      <Header as="h1">Amazing Chat Application</Header>

      <LoginForm dispatch={dispatch} userStatus={state.userStatus} />
    </div>
  )
}

export default App
