import React from 'react'
import {
  Grid,
  Form,
  Button,
  Header,
  Comment,
  Container,
  Segment,
  List,
  Image,
} from 'semantic-ui-react'
import { Actions } from '../constants'

const ChatRoom = ({ messages = [], users = [], dispatch }) => {
  const [message, setMessage] = React.useState('')
  const hasMessages = messages.length > 0

  const handleSubmit = () => {
    dispatch({ type: Actions.postMessage, payload: message })
  }

  const handleChange = (e, { value }) => {
    setMessage(value)
  }

  return (
    <Container>
      <Grid centered columns={2}>
        <Grid.Column computer={4} only="computer">
          <Segment>
            <List divided verticalAlign="middle">
              <List.Item>
                <List.Header>Connected Users</List.Header>
              </List.Item>
              {users.map((user) => {
                return (
                  <List.Item key={user.id}>
                    <Image
                      avatar
                      src={`https://api.adorable.io/avatars/91/${user.nickname}@adorable.io.png`}
                    />
                    <List.Content>
                      <List.Header as="a">{user.nickname}</List.Header>
                    </List.Content>
                  </List.Item>
                )
              })}
            </List>
          </Segment>
        </Grid.Column>
        <Grid.Column mobile={14} computer={8}>
          <Comment.Group>
            <Header as="h3" dividing>
              Messages
            </Header>

            {hasMessages &&
              messages.map((msg) => {
                return (
                  <Comment key={msg.id}>
                    <Comment.Avatar
                      src={`https://api.adorable.io/avatars/91/${msg.nickname}@adorable.io.png`}
                    />
                    <Comment.Content>
                      <Comment.Author>{msg.nickname}</Comment.Author>
                      <Comment.Text>{msg.text}</Comment.Text>
                    </Comment.Content>
                  </Comment>
                )
              })}

            <Form onSubmit={handleSubmit}>
              <Form.TextArea value={message} onChange={handleChange} />
              <Button
                content="Post message"
                labelPosition="left"
                icon="edit"
                primary
              />
            </Form>
          </Comment.Group>
        </Grid.Column>
      </Grid>
    </Container>
  )
}

export default ChatRoom
