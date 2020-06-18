import React from 'react'
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'
import { Actions, userStatuses } from '../constants'
import { loginToChat } from '../util/api'

const LoginForm = ({ dispatch, userStatus }) => {
  const [nickName, setNickname] = React.useState('')

  const handleChange = (e, { value }) => {
    dispatch({ type: Actions.enterNickname, payload: value })
    setNickname(value)
  }

  const handleSubmit = () => {
    dispatch({ type: Actions.startLogin })
    ;(async function () {
      try {
        const response = await loginToChat(nickName)
        dispatch({ type: Actions.loginSuccess, payload: response })
      } catch (err) {
        dispatch({ type: Actions.loginFail, payload: err })
      }
    })()
  }

  const isLoading = userStatus === userStatuses.loading

  return (
    <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          Choose a Nickname
        </Header>
        <Form size="large" onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              value={nickName}
              onChange={handleChange}
              iconPosition="left"
              placeholder="Nickname"
            />
            <Button
              color="teal"
              fluid
              size="large"
              loading={isLoading}
              disabled={isLoading}
            >
              Enter Chat Room
            </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  )
}

export default LoginForm
