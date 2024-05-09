import { ConfigService } from '@nestjs/config';
import { renderAsync } from '@react-email/components';
import { UserService } from '@/user/user.service';
interface SendMailConfig {
    email: string;
    subject: string;
    html?: string;
}
export declare class MailService {
    private readonly userService;
    private readonly configService;
    private transporter;
    constructor(userService: UserService, configService: ConfigService);
    private renderEmail;
    sendMailTo({ email, subject, html }: SendMailConfig): Promise<void>;
    sendMailByUserId(userId: string, ...params: Parameters<typeof renderAsync>): Promise<void>;
}
export {};
