import { MailerService } from '@nestjs-modules/mailer';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { JobsEnum } from './enums/jobs.enum';
import { RedisQueueEnum } from './enums/redis-queue.enum';
import {
  SendConfirmationMailDto,
  SendSchedulingVoucherMailDto,
} from './dto/send-mail.dto';

@Processor(RedisQueueEnum.MAIL_QUEUE)
export class SendMailConsumer {
  constructor(private readonly mailerService: MailerService) {}

  @Process(JobsEnum.SEND_MAIL)
  async sendConfirmationMailConsumer(job: Job<SendConfirmationMailDto>) {
    const { email, name, url } = job.data;

    await this.mailerService.sendMail({
      to: email,
      from: process.env.EMAIL_LOGIN,
      subject: 'Agendify | Confirmação',
      template: 'confirmation.hbs',
      context: {
        name,
        url,
      },
    });
  }

  @Process(JobsEnum.SEND_SCHEDULING_VOUCHER)
  async sendSchedulingVoucherMailConsumer(
    job: Job<SendSchedulingVoucherMailDto>,
  ) {
    const { email, name, date, time, businessName } = job.data;

    await this.mailerService.sendMail({
      to: email,
      from: process.env.EMAIL_LOGIN,
      subject: 'Agendify | Comprovante',
      template: 'scheduling-voucher.hbs',
      context: {
        name,
        email,
        date,
        time,
        businessName,
      },
    });
  }
}
