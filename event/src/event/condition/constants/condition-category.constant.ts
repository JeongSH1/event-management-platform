export enum CONDITION_CATEGORY_CODE {
  CHECK_ATTENDANCE = 'check_attendance',
  CHANGE_NAME = 'change_name',
  CHANGE_EMAIL = 'change_email',
  HAS_RECOMMENDER = 'has_recommender',
}

export const ConditionCategorySeedData = [
  {
    code: CONDITION_CATEGORY_CODE.CHECK_ATTENDANCE,
    description: '출석 체크 조건',
  },
  {
    code: CONDITION_CATEGORY_CODE.CHANGE_NAME,
    description: '이름 변경 여부 조건',
  },
  {
    code: CONDITION_CATEGORY_CODE.CHANGE_EMAIL,
    description: '이메일 변경 여부 조건',
  },
  {
    code: CONDITION_CATEGORY_CODE.HAS_RECOMMENDER,
    description: '추천인 입력 여부 조건',
  },
];