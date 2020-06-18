import io from 'socket.io-client'

const loginToChat = async (nickname) => {
  try {
    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nickname }),
    })

    return response.json()
  } catch (e) {
    console.error('failed to login', e)
  }
  return false
}

const connectToChatWebsocket = (userId) => {
  return io('http://localhost:5000', { query: `userId=${userId}` })
}

export { loginToChat, connectToChatWebsocket }
