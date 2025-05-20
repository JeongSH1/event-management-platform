import { Injectable } from '@nestjs/common';
import { LogService } from '../log/log.service';
import {Reward} from "../../reward/schemas/reward.schema";

@Injectable()
export class ProvisionService {
  constructor(private readonly logService: LogService) {}

  provisionRewardToUser(userId: string, reward: Reward) {

  }
}
