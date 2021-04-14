// 이게 서버에요
const express = require('express');
const app = express();
const cors = require('cors');
const http =require('http');
const port = 3030;

app.use(express.json());
app.use(cors());
app.options('*',cors());

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
            res.end("Success");
          }
        }
      }
    
    res.send('실패');
    //res.end("로그인 성공");
});

let server = http.createServer(app);
server.listen(port);

server.on('listening', () => {
    console.log(`server listening on port ${port}`)
})

server.on('error', ()=> {

})

//44줄에서 가져오기
app.io = require('socket.io')(server);
var socketList = [];

app.io.sockets.on('connection', (socket) => {
  console.log('socket connect !');
  socketList.push(socket);

//   socket.on('newUserConnect', function (name) {
//     if (name != null) {
//       socket.name = name;

//       var message = name + '님이 입장하였습니다.';

//       app.io.sockets.emit('updateMessage', {
//         name: 'SERVER',
//         message: message
//       });
//     }

//   });

  socket.on('disconnect', () => {
    console.log('socket disconnect !');
    socketList.splice(socketList.indexOf(socket), 1);
    var message = socket.name + '님이 퇴장하였습니다.';
    if (socket.name != null) {
      socket.broadcast.emit('updateMessage', {
        name: 'SERVER',
        message: message
      });
    }
  });

  socket.on('sendMessage', function (data) { 
    data.name = socket.name;
    socketList.forEach(function (item, i) {
      if (item == socket) {
        data.me = 'true';
      }
    });
    app.io.sockets.emit('updateMessage', data);

  });
});