import io from 'socket.io-client';

const createSocketFactory = () => {
  let socket = null;
  return (url, username) => {
    if (!socket) {
      console.log('SOCKET CONNECTION!');
      socket = io(url, {
        query: {
          username,
        },
      });
    }

    return socket;
  };
};

export const createSocket = createSocketFactory();
