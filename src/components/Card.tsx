import styled from 'styled-components';
import React from 'react';
import { ChatItem, Message } from '../hooks/socket.hooks';

const Avatar = styled.img`
  border-radius: 6px;
  width: 40px;
  height: 40px;
  background-color: #d6d6d6;
  border: none;
`;

const UserName = styled.span`
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
  max-width: 100%;
  height: 200px;
  margin-top: 4px;

  @media (max-width: 400px) {
    height: 100px;
  }
`;

const TimeStamp = styled.span`
  font-size: 12px;
  color: #b0b0b0;
  margin-left: 10px;
`;

export const Card = ({ username, messages }: ChatItem) => (
  <CardContainer>
    <Avatar src={`https://ui-avatars.com/api/?name=${username}`} />
    <div>
      <div>
        <UserName>{username}</UserName>
        <TimeStamp>
          {new Date(messages[messages.length - 1].time).toLocaleTimeString()}
        </TimeStamp>
      </div>
      {messages.map((msg, index) =>
        msg.type === 'image' ? (
          <Img key={index} src={msg.url} alt={msg.alt} />
        ) : (
          <UserText key={index}>{msg.text}</UserText>
        )
      )}
    </div>
  </CardContainer>
);
