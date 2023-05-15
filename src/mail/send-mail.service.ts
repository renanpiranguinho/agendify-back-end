import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { JobsEnum } from './enums/jobs.enum';
import { RedisQueueEnum } from './enums/redis-queue.enum';
import {
  SendConfirmationMailDto,
  SendSchedulingVoucherMailDto,
} from './dto/send-mail.dto';

@Injectable()
export class SendMailService {
  constructor(
    @InjectQueue(RedisQueueEnum.MAIL_QUEUE) private mailQueue: Queue,
  ) {}

  async sendConfirmationMail(sendConfirmationMailDto: SendConfirmationMailDto) {
    await this.mailQueue.add(JobsEnum.SEND_MAIL, sendConfirmationMailDto);
  }

  async sendSchedulingVoucherMail(
    sendSchedulingVoucherMailDto: SendSchedulingVoucherMailDto,
  ) {
    await this.mailQueue.add(
      JobsEnum.SEND_SCHEDULING_VOUCHER,
      sendSchedulingVoucherMailDto,
    );
  }
}
