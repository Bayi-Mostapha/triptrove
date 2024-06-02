import { Server } from 'socket.io';

let io;

export function initSocket(server) {
  io = new Server(server, {
    cors: {
      origin: 'http://localhost:5173',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('A user connected');
    
    socket.on('joinRoom', (hostId) => {
      socket.join(hostId);
      console.log(`Host with ID: ${hostId} joined their room`);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
   
  return io;
}

export function getSocket() {
  if (!io) {
    throw new Error('Socket.io not initialized!');
  }
  return io;
}
