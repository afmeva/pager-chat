import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { Border } from './Border';
import { Input } from './Input';
import { Card } from './Card';
import { MainWrap } from './MainWrap';
import {
  useChatItems,
  useSendImage,
  useSendIsTyping,
  useSendMessage,
  useWhosTyping,
} from '../hooks/socket.hooks';
import { useAutoScroll } from '../hooks/autoscroll.hook';
import { InputWithButton } from './InputWithButton';
import { useAutoFocus } from '../hooks/autofocus.hook';

const Form = styled.form`
  margin-top: 24px;
`;

const Small = styled.small`
  font-size: 12px;
  color: #d6d6d6;
`;

const Wrap = styled.div`
  margin-top: 8px;
  height: 18px;
`;
const UserTyping = ({ users = [] }) => {
  if (!users.length) {
    return <Wrap />;
  }

  return (
    <Wrap>
      <Small>
        {users.length > 1 ? 'People are' : `${users[0]} is`} typing...
      </Small>
    </Wrap>
  );
};

const Container = styled(Border)`
  padding: 24px 24px 12px;
  display: flex;
  flex-direction: column;
  width: 90%;
  max-width: 600px;
`;

const ChatWrap = styled.div`
  height: 300px;
  overflow: auto;
`;

type Props = {
  username: string;
};

export const Chat = ({ username }: Props) => {
  const [text, setText] = useState('');

  const messages = useChatItems(username);
  const sendMessage = useSendMessage(username);
  const users = useWhosTyping(username);
  const sendIsTyping = useSendIsTyping(username);
  const sendImage = useSendImage(username);

  const autoScrollRef = useAutoScroll();
  const autofocusRef = useAutoFocus();

  const onChangeHandler = useCallback((evt) => {
    const value = evt.target.value;

    setText(value);
    sendIsTyping(true);
  }, []);

  const onSubmitHandler = useCallback(
    (evt) => {
      evt.preventDefault();

      if (!text) {
        return;
      }

      const [cmd, ...rest] = text.split(' ');
      if (cmd === '/gif') {
        sendImage(rest.join(' '));
      } else {
        sendMessage(text);
      }
      setText('');
    },
    [text]
  );

  return (
    <MainWrap>
      <Container>
        <ChatWrap ref={autoScrollRef}>
          {messages.map((message, index) => (
            <Card key={index} {...message} />
          ))}
        </ChatWrap>
        <Form onSubmit={onSubmitHandler}>
          <InputWithButton
            placeholder="Message"
            forwardedRef={autofocusRef}
            value={text}
            onChange={onChangeHandler}
          />
        </Form>

        <UserTyping users={users} />
      </Container>
    </MainWrap>
  );
};
