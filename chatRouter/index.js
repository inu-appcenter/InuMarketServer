module.exports = function(io) {
    io.on('connection', (socket) => {
        console.log(`${socket.id}`);
      socket.on('disconnect', () => {
          console.log('user disconnected');
        socket.on("clientMessgae", (data)=>{
        console.log(data)
        var message = {
            msg: "server",
            data: "data"
        }
        socket.emit('serverMessage', message)
    })
      });

      socket.on("clientMessgae", (data)=>{
          console.log(data)
          var message = {
              msg: "server",
              data: "data"
          }
          socket.emit('serverMessage', message)
      })
    
      socket.on('leaveRoom', (roomname, name) => {
          socket.leave(roomname, () => {
              console.log(name + ' leave a ' + roomname);
              io.to(roomname).emit('leaveRoom', roomname, name);
          });
      });
    
    
      socket.on('joinRoom', (roomname, name) => {    
          socket.join(roomname, () => {
              console.log(name + ' join a ' + roomname);
              io.to(roomname).emit('joinRoom', roomname, name);
          });
      });
    
    
      socket.on('chat message', (roomname, name, msg) => {
          console.log(roomname, name, msg);
          io.to(roomname).emit('chat message', name, msg);
      });
  
    });
  
  };
  