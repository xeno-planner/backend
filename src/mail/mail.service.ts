import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { renderAsync } from '@react-email/components';

import { UserService } from '@/user/user.service';

interface SendMailConfig {
  email: string;
  subject: string;
  html?: string;
}

@Injectable()
export class MailService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

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
   *
   * @TODO Integrate Rusender API here.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async sendMailTo({ email, subject, html }: SendMailConfig) {
    // await this.transporter.sendMail({
    //   from: this.configService.get('SMTP_EMAIL_HOST_USER'),
    //   to: email,
    //   subject,
    //   html,
    // });
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
