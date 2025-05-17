export enum REWARD_ITEM_CATEGORY_CODE {
  ITEM = 'item',
  POINT = 'point',
  COUPON = 'coupon',
}

export const RewardItemCategorySeedData = [
  {
    code: REWARD_ITEM_CATEGORY_CODE.ITEM,
    name: '아이템',
    description: '유저에게 지급되는 특별 아이템',
  },
  {
    code: REWARD_ITEM_CATEGORY_CODE.POINT,
    name: '포인트',
    description: '마일리지 또는 포인트',
  },
  {
    code: REWARD_ITEM_CATEGORY_CODE.COUPON,
    name: '쿠폰',
    description: '유저가 사용할 수 있는 할인 쿠폰',
  },
];
