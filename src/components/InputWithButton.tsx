import styled from 'styled-components';
import { Input } from './Input';
import React from 'react';

const ButtonPh = styled.button`
  border: none;
  background-color: transparent;
  font-size: 14px;
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translate(0, -50%);
  color: #c2c2c2;
`;

const InputWrap = styled.div`
  position: relative;
`;

export const InputWithButton = ({ forwardedRef, ...props }) => {
  return (
    <InputWrap>
      <Input {...props} ref={forwardedRef} />
      <ButtonPh>Send</ButtonPh>
    </InputWrap>
  );
};
