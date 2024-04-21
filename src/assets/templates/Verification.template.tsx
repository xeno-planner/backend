import React from 'react';
import { Html } from '@react-email/components';
import MyButton from './components/MyButton';
import { Header } from './components/Header';

const VerificationTemplate = ({ url }: { url: string }) => {
  return (
    <Html
      style={{
        fontSize: '20px',
        background: '#0C0D0E',
        color: '#E6E5E6',
      }}
    >
      <Header />

      <MyButton url={url}>
        Подтвердить регистрацию
      </MyButton>
    </Html>
  );
};

export default VerificationTemplate;
