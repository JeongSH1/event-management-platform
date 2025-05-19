import { CLAIM_RESULT_STATUS } from '../constants/claim-result-status.constant';

export interface RewardClaimLogResponse {
  userId: string;
  eventId: string;
  rewardId: string;
  status: CLAIM_RESULT_STATUS;
  createdAt: string;
}
