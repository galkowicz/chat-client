import { Actions, userStatuses } from '../constants'

export const initialState = {
  nickName: null,
  avatar: null,
  userStatus: userStatuses.loggedOut,
  error: '',
  messages: [], // message object: {writerNickname, text, ?timestamp }
}

export const reducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case Actions.startLogin:
      return { ...state, userStatus: userStatuses.loading }

    case Actions.loginSuccess:
      return { ...state, userStatus: userStatuses.loggedIn } // TODO get connected users and last 10 messages and webscocket connection

    case Actions.loginFail:
      return { ...state, userStatus: userStatuses.loggedOut } // TODO get error

    case Actions.enterNickname:
      return { ...state, nickName: payload }
    default:
      throw new Error()
  }
}
