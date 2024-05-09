import * as React from 'react';
import { Button } from '@react-email/components';
interface IMyButtonProps extends Omit<React.ComponentProps<typeof Button>, 'href'> {
    url: string;
    children?: string;
}
declare const MyButton: ({ url, children, style, ...props }: IMyButtonProps) => React.JSX.Element;
export default MyButton;
