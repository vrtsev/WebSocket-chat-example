$(document).ready(function() {

  var messageBox = $('#messages-box')
  var sock       = new WebSocket('ws://localhost:5001')
  // var sock       = new WebSocket('wss://echo.websocket.org')
  window.ws      = sock

  sock.onopen    = function(event) { messageBox.prepend('<div class="alert alert-success">Connection opened</div>') }
  sock.onclose   = function(event) { messageBox.prepend('<div class="alert alert-danger">Connection closed</div>') }
  sock.onerror   = function(event) { messageBox.prepend('<div class="alert alert-danger">Unknown error</div>'); console.log(event) }
  sock.onmessage = function(event) { messageBox.prepend('<div class="alert alert-secondary">' + event.data + '</div>'); console.log(event) }

  window.sendMessage = function() {
    var message = $('#message-input').val()
    sock.send(message)
  }
})