import { useEffect, useState } from 'react';
import { createSocket } from '../utils/socket';

export type Message = {
  type: 'image' | 'text';
  username: string;
  time: Date;
  text?: string;
  url?: string;
  alt?: string | null;
};
export type ChatItem = {
  username: string;
  messages: Message[];
};

export const useChatItems = (username: string): ChatItem[] => {
  const [chatItems, setChatItems] = useState<ChatItem[]>([]);

  const socket = createSocket('https://pager-hiring.herokuapp.com', username);

  useEffect(() => {
    if (socket) {
      socket.on('message', (message) => {
        setChatItems((m) => {
          const last = m[m.length - 1];

          if (last && last.username === message.username) {
            m.pop();
            return [
              ...m,
              {
                ...last,
                messages: [...last.messages, message],
              },
            ];
          }
          return [
            ...m,
            {
              username: message.username,
              messages: [message],
            },
          ];
        });
      });
    }
  }, [socket]);
  return chatItems;
};

export const useSendMessage = (username: string) => {
  const socket = createSocket('https://pager-hiring.herokuapp.com', username);

  const [text, setText] = useState<string>('');

  useEffect(() => {
    if (text) {
      socket.emit('text-message', text);
    }
  }, [text]);

  return setText;
};

export const useSendImage = (username: string) => {
  const socket = createSocket('https://pager-hiring.herokuapp.com', username);

  const [term, setTerm] = useState<string>('');
  const [url, setUrl] = useState<string>('');

  useEffect(() => {
    const getGif = async () => {
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/random?api_key=W782v2Cc7KOxnpb5eZywWKttNd9xkI5p&tag=${term}`
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

  const [isTyping, setIsTyping] = useState<boolean>(false);

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

  const [users, setUsers] = useState<string[]>([]);

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
