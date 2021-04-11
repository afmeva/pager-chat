import styled from 'styled-components';
import React from 'react';
import { List, Message } from '../hooks/socket.hooks';

const Avatar = styled.img`
  border-radius: 6px;
  width: 40px;
  height: 40px;
  background-color: #d6d6d6;
  border: none;
`;

const UserName = styled.p`
  font-weight: bold;
  font-size: 14px;
`;

const UserText = styled.p`
  font-size: 14px;
  margin-top: 4px;
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: 40px 1fr;
  gap: 15px;
  & ~ & {
    margin-top: 24px;
  }
`;

const Img = styled.img`
  display: block;
  height: 200px;
  margin-top: 4px;
`;

type cardProps = {
  username: string;
  userText: Message[];
};

export const Card = ({ username, userText }: cardProps) => (
  <CardContainer>
    <Avatar src={`https://ui-avatars.com/api/?name=${username}`} />
    <div>
      <UserName>{username}</UserName>
      {userText.map((msg, index) =>
        msg.type === 'image' ? (
          <Img key={index} src={msg.url} alt={msg.alt} />
        ) : (
          <UserText key={index}>{msg.text}</UserText>
        )
      )}
    </div>
  </CardContainer>
);
