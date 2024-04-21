import React from 'react';
import { Button, Html } from '@react-email/components';
import MyButton from '@/assets/templates/components/MyButton';

const VerificationTemplate = ({ url }: { url: string }) => {
  return (
    <Html
      style={{
        fontSize: '20px',
        background: '#0C0D0E',
        color: '#E6E5E6'
      }}
    >
      <MyButton url={url}>
        Подтвердить регистрацию
      </MyButton>
    </Html>
  );
};

export default VerificationTemplate;
