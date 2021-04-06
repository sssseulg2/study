const http = require('http');
const express = require('express'); 
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app);
const port = 5000;

const socketio = require('socket.io');
app.io = socketio(server);

const authUser = [
  ['김준경', '1111'],
  ['이슬기', '2222'],
  ['권지형', '3333'],
  ['슬기', '4444']
]

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
  })
app.post('/auth', (req, res) => {
  const username = (req.body.username);
  const password = (req.body.password);
  console.log(username + password);

  for(i=0; i<authUser.length; i++) {
    if (authUser[i][0] === username) {
      if (authUser[i][1] === password) {
        res.end("Success");
      }
    }
  }
  // return error("login error");
});


server.listen(port, () => {
  console.log("server listen");
})
app.io.on('connection', (socket)=>{
  console.log('user 연결 @@')
  socket.on('sendMessage', (data) => { 
    console.log(data.username + ": " + data.message)
    app.io.sockets.emit('updateMessage', data);
  });
})
