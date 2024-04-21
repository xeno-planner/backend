import React from 'react';
import { Button } from '@react-email/components';

const MyButton = ({ url, children }: { url: string, children?: string }) => {
  return (
    <Button
      href={url}
      style={{
        cursor: 'pointer',
        userSelect: 'none',
        fontSize: '1em', // 1em = 16px
        padding: '1em 1.5em',
        borderRadius: '8px',
        background: '#6E51D7',
        color: '#E6E5E6',
      }}
    >
      {children}
    </Button>
  );
};

export default MyButton;
