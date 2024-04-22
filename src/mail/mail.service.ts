import { Injectable } from '@nestjs/common';
import { renderAsync } from '@react-email/components';

import { UserService } from '@/user/user.service';

@Injectable()
export class MailService {
  constructor(private readonly userService: UserService) {}

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
   * Send email to email of user with certain __userId__.
   * @param userId
   * @param params
   */
  async sendMailByUserId(
    userId: string,
    ...params: Parameters<typeof renderAsync>
  ) {
    const { email: emailAddress } = await this.userService.getById(userId);
    const html = await this.renderEmail(...params);

    console.log({
      emailAddress,
      html,
    });
  }
}
