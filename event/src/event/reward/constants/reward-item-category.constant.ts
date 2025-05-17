export enum REWARD_ITEM_CATEGORY_CODE {
  GAME_ITEM = 'game_item',
  MAPLE_POINT = 'maple_point',
  MESO = 'meso',
}

export const RewardItemCategorySeedData = [
  {
    code: REWARD_ITEM_CATEGORY_CODE.GAME_ITEM,
    name: '게임 아이템',
    description: '유저에게 지급되는 특별 게임 아이템',
  },
  {
    code: REWARD_ITEM_CATEGORY_CODE.MAPLE_POINT,
    name: '메이플 포인트',
    description: '캐시샵에서 사용할 수 있는 포인트',
  },
  {
    code: REWARD_ITEM_CATEGORY_CODE.MESO,
    name: '메소',
    description: '유저가 사용할 수 있는 게임 재화',
  },
];
