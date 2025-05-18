import { v4 as uuidv4 } from 'uuid';

export function generateEventId(): string {
  return `evt_${uuidv4()}`;
}

export function generateRewardId(): string {
  return `rew_${uuidv4()}`;
}