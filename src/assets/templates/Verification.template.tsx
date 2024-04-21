import React from 'react';
import MyButton from './components/MyButton';
import EmailLayout from '@/assets/templates/components/EmailLayout';
import { Heading } from '@react-email/components';

const VerificationTemplate = ({ url }: { url: string }) => {
  return (
    <EmailLayout>
      <Heading as={'h1'}>Подтверждение учетной записи на сайте XENO Planner</Heading>

      <MyButton url={url}>
        Подтвердить регистрацию
      </MyButton>
    </EmailLayout>
  );
};

export default VerificationTemplate;
