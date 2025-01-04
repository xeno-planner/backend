import { LiteralToPrimitiveDeep } from 'type-fest';

export interface MailDto
  extends LiteralToPrimitiveDeep<{
    mail: {
      to: {
        email: 'user@example.com';
        name: 'string';
      };
      from: {
        email: 'user@example.com';
        name: 'string';
      };
      subject: 'string';
      previewTitle?: 'string';
      headers?: Record<string, string>;
      cc?: 'string';
      bcc?: 'string';
      html: 'string';
      text?: 'string';
    };
  }> {}
