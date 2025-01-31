const WebSocket = require('ws');

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('New client connected');

  ws.on('message', async (data) => {
    const { senderId, receiverId, text } = JSON.parse(data);

    const sender = users.find(user => user.id === senderId);
    const receiver = users.find(user => user.id === receiverId);

    if (!sender || !receiver) {
      ws.send(JSON.stringify({ error: 'User not found' }));
      return;
    }

    let translatedText;
    if (sender.language !== receiver.language) {
      translatedText = await translateText(text, receiver.language);
    } else {
      translatedText = text; 
    }

    const message = {
      id: messages.length + 1,
      senderId,
      receiverId,
      originalText: text,
      translatedText,
      timestamp: new Date(),
    };

    messages.push(message);

    if (receiver.ws) {
      receiver.ws.send(JSON.stringify({
        type: 'message',
        data: {
          sender: sender.name,
          text: translatedText,
          timestamp: message.timestamp,
        },
      }));
    }

    ws.send(JSON.stringify({
      type: 'confirmation',
      data: {
        receiver: receiver.name,
        text: translatedText,
        timestamp: message.timestamp,
      },
    }));
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});
