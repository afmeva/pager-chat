import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Border } from '../components/Border';
import { Input } from '../components/Input';
import { MainWrap } from '../components/MainWrap';
import { useAutoFocus } from '../hooks/autofocus.hook';

const Title = styled.p`
  font-size: 32px;
`;

const Label = styled.p`
  font-weight: bold;
  font-size: 14px;
  margin-top: 40px;
`;

const InputWrap = styled.div`
  margin-top: 4px;
`;

const Button = styled.button`
  border-radius: 6px;
  font-weight: bold;
  font-size: 14px;
  height: 40px;
  padding: 10px 40px;
  background-color: #ff8200;
  color: white;
  border: none;
  margin-top: 40px;
  width: fit-content;
  align-self: flex-end;
  text-decoration: none;
  cursor: pointer;
  line-height: 22px;
`;

const Form = styled.form`
  width: 90%;
  max-width: 600px;
`;

const Container = styled(Border)`
  padding: 40px;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

type Props = {
  onSubmit: Dispatch<SetStateAction<string>>;
};
export const Login = ({ onSubmit }: Props) => {
  const [username, setUsername] = useState('');
  const autofocusRef = useAutoFocus();

  const onSubmitHandler = useCallback(
    (evt: React.FormEvent<HTMLFormElement>) => {
      evt.preventDefault();

      if (username) {
        onSubmit(username);
        history.push('/chat');
      }
    },
    [username]
  );

  const history = useHistory();
  return (
    <MainWrap>
      <Form onSubmit={onSubmitHandler}>
        <Container>
          <Title>Join chat</Title>
          <Label>Please enter your username</Label>
          <InputWrap>
            <Input
              placeholder="Type in your username"
              ref={autofocusRef}
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </InputWrap>
          <Button type="submit">Next</Button>
        </Container>
      </Form>
    </MainWrap>
  );
};
