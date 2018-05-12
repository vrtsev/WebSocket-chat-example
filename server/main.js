var server = require('ws').Server
var s = new server({ port: 5001 })
CLIENTS=[];

s.on('connection', function(ws) {
  CLIENTS.push(ws);
  console.log('New connection')

  ws.on('message', function(message) {
    console.log('Received: ', message);
    sendAll(message);
  })

  ws.send("You joined this conversation");
  sendExceptCurrent(ws, 'New user joined this conversation')
})

function sendExceptCurrent (client, message) {
  for (var i=0; i<CLIENTS.length; i++) {
    if (CLIENTS[i] == client) { continue }

    CLIENTS[i].send(message);
  }
}

function sendAll (message) {
  for (var i=0; i<CLIENTS.length; i++) {
    CLIENTS[i].send(message);
  }
}