import { Injectable } from '@nestjs/common';
import { renderAsync } from '@react-email/components';

import { UserService } from '@/user/user.service';

@Injectable()
export class MailService {
  constructor(private readonly userService: UserService) {}

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

    /** Rendered html content as string. */
    const html = await renderAsync(...params);

    console.log({
      email,
      html,
    });
  }
}
