import * as React from 'react'
import { Header } from '@/assets/templates/components/Header';
import { Html } from '@react-email/components';

const EmailLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Html
      style={{
        fontSize: '20px',
        background: '#0C0D0E',
        color: '#E6E5E6',
      }}
    >
      <Header />

      {children}
    </Html>
  );
};

export default EmailLayout;
