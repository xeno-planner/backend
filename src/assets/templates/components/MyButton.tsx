import * as React from 'react'
import { Button } from '@react-email/components';

interface IMyButtonProps extends Omit<React.ComponentProps<typeof Button>, 'href'> {
  url: string, children?: string
}

const MyButton = ({ url, children, style, ...props }: IMyButtonProps) => {
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
        ...style
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default MyButton;
