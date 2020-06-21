import io from 'socket.io-client'

const apiUrl = process.env.API_HOSTNAME || 'http://localhost:5000'

const loginToChat = async (nickname) => {
  try {
    const response = await fetch(`${apiUrl}/login`, {
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
  return io(apiUrl, {
    query: `userId=${userId}`,
  })
}

export { loginToChat, connectToChatWebsocket }
