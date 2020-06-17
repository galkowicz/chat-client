import React from 'react'
import {
  Button,
  Form,
  Grid,
  Header,
  Segment,
  Loader,
  Dimmer,
} from 'semantic-ui-react'
import { Actions, userStatuses } from '../constants'

const LoginForm = ({ dispatch, userStatus }) => {
  const [nickName, setNickname] = React.useState()

  const handleChange = (e, { value }) => {
    dispatch({ type: Actions.enterNickname, payload: value })
    setNickname(value)
  }

  const handleSubmit = () => {
    dispatch({ type: Actions.startLogin })
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

            {!isLoading ? (
              <Button color="teal" fluid size="large">
                Enter Chat Room
              </Button>
            ) : (
              <Segment>
                <Dimmer active inverted>
                  <Loader />
                </Dimmer>
              </Segment>
            )}
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  )
}

export default LoginForm
