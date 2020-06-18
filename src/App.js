import React from 'react'
import './App.scss'
import 'semantic-ui-css/semantic.min.css'

import { Header } from 'semantic-ui-react'
import { reducer, initialState } from './state/store'
import LoginForm from './components/Login'
import { userStatuses } from './constants'
import ChatRoom from './components/ChatRoom'

const App = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  const { userStatus, messages, connectedUsers, userId, nickname } = state

  return (
    <div className="app">
      <Header as="h1" textAlign="center" className="app__header">
        Amazing Chat Application
      </Header>
      {userStatus === userStatuses.loggedOut ? (
        <LoginForm dispatch={dispatch} userStatus={state.userStatus} />
      ) : (
        userId &&
        nickname && (
          <ChatRoom
            dispatch={dispatch}
            nickname={nickname}
            messages={messages}
            users={connectedUsers}
            userId={userId}
          />
        )
      )}
    </div>
  )
}

export default App
