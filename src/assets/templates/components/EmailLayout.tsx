import * as React from 'react'
import { Header } from '@/assets/templates/components/Header';
import { Html, Section } from '@react-email/components';
import Logo from '@/assets/templates/components/Logo';

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

      <Logo />

      <Section
        style={{
          padding: '0 24px 24px'
        }}
      >
        {children}
      </Section>
    </Html>
  );
};

export default EmailLayout;
