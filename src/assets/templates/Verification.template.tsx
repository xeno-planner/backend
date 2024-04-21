import React from 'react';
import MyButton from './components/MyButton';
import EmailLayout from '@/assets/templates/components/EmailLayout';

const VerificationTemplate = ({ url }: { url: string }) => {
  return (
    <EmailLayout>
      <MyButton url={url}>
        Подтвердить регистрацию
      </MyButton>
    </EmailLayout>
  );
};

export default VerificationTemplate;
