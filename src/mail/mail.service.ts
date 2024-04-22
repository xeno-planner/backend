import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { renderAsync } from '@react-email/components';
import { Transporter, createTransport } from 'nodemailer';

import { UserService } from '@/user/user.service';

interface SendMailConfig {
  email: string;
  subject: string;
  html?: string;
}

@Injectable()
export class MailService {
  private transporter: Transporter;

  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {
    // Connection data
    const host = this.configService.get('MAIL_HOST');
    const port = Number(this.configService.get('MAIL_PORT')) || 0;
    const secure = this.configService.get('MAILER_SECURE') === 'true';

    // Auth
    const user = this.configService.get('MAIL_USER');
    const password = this.configService.get('MAIL_PASSWORD');

    // From
    const fromName = this.configService.get('MAIL_FROM_NAME');
    const fromAddress = this.configService.get('MAIL_FROM_ADDRESS');

    this.transporter = createTransport(
      {
        host,
        port,
        secure,
        auth: {
          user,
          pass: password,
        },
      },
      {
        from: {
          name: fromName,
          address: fromAddress,
        },
      },
    );
  }

  /**
   * Method that renders react-email components to string html.
   * @param params
   * @private
   */
  private async renderEmail(
    ...params: Parameters<typeof renderAsync>
  ): Promise<string> {
    return renderAsync(...params);
  }

  /**
   * This method sends email to given address.
   * @param email
   * @param subject
   * @param html
   */
  async sendMailTo({ email, subject, html }: SendMailConfig) {
    await this.transporter.sendMail({
      to: email,
      subject,
      html,
    });
  }

  /**
   * Send email to email of user with certain __userId__.
   * @param userId
   * @param params
   */
  async sendMailByUserId(
    userId: string,
    ...params: Parameters<typeof renderAsync>
  ) {
    const { email } = await this.userService.getById(userId);
    const html = await this.renderEmail(...params);

    /** Send email letter to user`s email address. */
    await this.sendMailTo({
      email,
      subject: 'Подтверждение учетной записи',
      html,
    });
  }
}
