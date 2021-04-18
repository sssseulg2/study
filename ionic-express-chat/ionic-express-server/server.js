const express = require('express');
const cors = require('cors');
const http =require('http');
const bodyParser = require('body-parser');
const port = 3030;

const app = express();
const server = http.createServer(app);
server.listen(port);

const socket = require('socket.io');
app.io = socket(server);
// socket = socket.listen(server);

const authUser = [
    {
        username: '지형',
        password: '123'
    },
    {
        username: '슬기',
        password: '123'
    },
    {
        username: '준경',
        password: '123'
    }
]

app.use(express.json());
app.use(cors());
app.options('*',cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res, next) => {
    res.send('hi');
});

app.post('/auth', (req, res, next) => {
    const username = (req.body.username);
    const password = (req.body.password);
    console.log(username);
    console.log(password);
    for(i=0; i<authUser.length; i++) {
        if (authUser[i].username === username) {
          if (authUser[i].password === password) {
            res.end("성공");
            return;
          }
        }
      }
    res.send("실패");
    return;
});


server.on('listening', () => {
  console.log(`server listening on port ${port}`)
})

app.io.on('connection', (socket) => {
  console.log("@@연결")
 
  socket.on('newUser', (name) => {
    socket.username = name;
    console.log(socket.username + "입장");
    app.io.sockets.emit('userChange', {username: 'server', message: `${socket.username}님이 입장했습니다.`});    
  });

  socket.on('disconnect', function(){
    console.log(socket.username + "퇴장")
    app.io.sockets.emit('userChange', {username: 'server', message: `${socket.username}님이 퇴장했습니다.`});   
  });
  
  socket.on('send', (data) => {
    app.io.sockets.emit('newChat', { username: socket.username, message: data.message });    
  });
});