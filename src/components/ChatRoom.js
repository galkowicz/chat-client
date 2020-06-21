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
  Ref,
} from 'semantic-ui-react'
import { connectToChatWebsocket } from '../util/api'
import { Actions } from '../constants'
import './ChatRoom.scss'
let socket = null

const ChatRoom = ({
  messages = [],
  users = [],
  dispatch,
  userId,
  nickname,
}) => {
  const [message, setMessage] = React.useState('')
  const commentsList = React.useRef(null)
  const hasMessages = messages.length > 0

  React.useEffect(() => {
    socket = connectToChatWebsocket(userId)
    socket.emit('new user')
    socket.on('chat message', function (msg) {
      dispatch({ type: Actions.newMessage, payload: msg })
    })
    socket.on('user update', function (connectedUsers) {
      dispatch({ type: Actions.userUpdate, payload: connectedUsers })
    })
  }, [])

  React.useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = () => {
    if (message === '') {
      return
    }
    setMessage('')
    socket.emit('chat message', { text: message, userId, nickname })
  }

  const handleChange = (e, { value }) => {
    setMessage(value)
  }

  const handleKeyDown = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const scrollToBottom = () => {
    if (commentsList.current) {
      commentsList.current.scrollTop = commentsList.current.scrollHeight
    }
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
                  <List.Item key={user.id} active={user.id === userId}>
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
          <Ref innerRef={commentsList}>
            <Comment.Group>
              <Header as="h3" dividing>
                Messages
              </Header>

              {hasMessages &&
                messages.map((msg) => {
                  return (
                    <Comment
                      key={msg.id}
                      className={msg.userId === userId ? 'self' : ''}
                    >
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
            </Comment.Group>
          </Ref>
          <Form onSubmit={handleSubmit}>
            <Form.TextArea
              value={message}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
            <Button
              content="Post message"
              labelPosition="left"
              icon="edit"
              primary
            />
          </Form>
        </Grid.Column>
      </Grid>
    </Container>
  )
}

export default ChatRoom
