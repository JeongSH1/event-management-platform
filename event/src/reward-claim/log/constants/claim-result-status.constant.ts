export enum CLAIM_RESULT_STATUS {
  SUCCESS = 'success', // 정상 수령
  FAILED = 'failed', // 시스템 오류 등 일반 실패
  CONDITION_NOT_MET = 'condition_not_met', // 조건 불충족
  DUPLICATE = 'duplicate', // 중복 요청

  EVENT_NOT_FOUND = 'event_not_found', // 존재하지 않는 이벤트
  EVENT_INACTIVE = 'event_inactive', // 비활성화된 이벤트
  EVENT_NOT_STARTED = 'event_not_started', // 이벤트 시작 전
  EVENT_ENDED = 'event_ended', // 이벤트 종료됨

  REWARD_ALREADY_GIVEN = 'reward_already_given', // 같은 이벤트로 이미 지급된 경우
}
