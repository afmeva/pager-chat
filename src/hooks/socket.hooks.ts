import { useEffect, useState } from 'react';
import { createSocket } from '../utils/socket';
import { getConfigFile } from 'ts-loader/dist/config';

export type Message = {
  type: 'image' | 'text';
  username: string;
  time: Date;
  text?: string;
  url?: string;
  alt?: string | null;
};

export type List = {
  [username: string]: {
    messages: Message[];
  };
};

const createMessage = (messages) => ({ messages });

export const useMessages = (username: string): List => {
  const [messages, setMessages] = useState<List>({});

  const socket = createSocket('https://pager-hiring.herokuapp.com', username);

  useEffect(() => {
    if (socket) {
      socket.on('message', (message) => {
        setMessages((messages) => {
          const msg = messages[message.username] || createMessage([]);
          return {
            ...messages,
            [message.username]: {
              ...msg,
              messages: [...msg.messages, message],
            },
          };
        });
      });
    }
  }, [socket]);

  return messages;
};

export const useSendMessage = (username: string) => {
  const socket = createSocket('https://pager-hiring.herokuapp.com', username);

  const [text, setText] = useState('');

  useEffect(() => {
    if (text) {
      socket.emit('text-message', text);
    }
  }, [text]);

  return setText;
};

export const useSendImage = (username: string) => {
  const socket = createSocket('https://pager-hiring.herokuapp.com', username);

  const [term, setTerm] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    const getGif = async () => {
      const response = await fetch(
        `http://api.giphy.com/v1/gifs/random?api_key=W782v2Cc7KOxnpb5eZywWKttNd9xkI5p&tag=${term}`
      );

      const {
        data: { fixed_height_downsampled_url },
      } = await response.json();

      setUrl(fixed_height_downsampled_url);
    };

    if (term) {
      getGif();
    }
  }, [term]);

  useEffect(() => {
    if (url) {
      socket.emit('image-message', {
        url: url,
        alt: term,
      });
    }
  }, [url]);

  return setTerm;
};

export const useSendIsTyping = (username) => {
  const socket = createSocket('https://pager-hiring.herokuapp.com', username);

  const [isTyping, setIsTyping] = useState(false);

  let timeout = null;
  useEffect(() => {
    socket.emit('typing', isTyping);

    clearTimeout(null);

    timeout = setTimeout(() => {
      setIsTyping(false);
    }, 1000);
  }, [isTyping]);

  return setIsTyping;
};

export const useWhosTyping = (username) => {
  const socket = createSocket('https://pager-hiring.herokuapp.com', username);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on('is-typing', (usersTyping) => {
      setUsers([
        ...Object.entries(usersTyping).reduce((current, [user, isTyping]) => {
          if (isTyping && user !== username) {
            current.push(user);
          }

          return current;
        }, []),
      ]);
    });
  }, [username]);

  return users;
};
