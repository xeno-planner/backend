import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
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
    private readonly mailerService: MailerService,
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
   */
  async sendMailTo({ email, subject, html }: SendMailConfig) {
    await this.mailerService
      .sendMail({
        to: email,
        subject,
        html,
      })
      .catch(err => {
        throw new UnprocessableEntityException(
          `Error in mailer work: ${JSON.stringify(err)}`,
        );
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
