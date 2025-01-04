import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ServerAnalyticsModule } from './admin/server-analytics/server-analytics.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { PomodoroModule } from './pomodoro/pomodoro.module';
import { RolesModule } from './roles/roles.module';
import { TaskModule } from './task/task.module';
import { TimeBlockModule } from './time-block/time-block.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot(),
    UserModule,
    TaskModule,
    TimeBlockModule,
    PomodoroModule,
    MailModule,
    RolesModule,
    ServerAnalyticsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
