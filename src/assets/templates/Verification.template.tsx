import * as React from 'react'
import MyButton from './components/MyButton';
import EmailLayout from '@/assets/templates/components/EmailLayout';
import { Heading, Section } from '@react-email/components';

const VerificationTemplate = ({ url }: { url: string }) => {
  return (
    <EmailLayout>
      <Heading
        as={'h2'}
      >
        Подтверждение учетной записи на сайте XENO Planner</Heading>

      <Section>
        <MyButton url={url}>
          Подтвердить регистрацию
        </MyButton>
      </Section>
    </EmailLayout>
  );
};

export default VerificationTemplate;
