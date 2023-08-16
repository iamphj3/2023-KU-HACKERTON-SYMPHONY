import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

const UploadedImage = atom({
  key: 'uploadedImage',
  default: null,
  effects_UNSTABLE: [persistAtom],
});

const HashtagList = atom({
  key: 'hashtagList',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

const PeriodState = atom({
  key: 'periodState',
  default: 0,
  effects_UNSTABLE: [persistAtom],
});

const IsAdsState = atom({
  key: 'isAdsState',
  default: true,
  effects_UNSTABLE: [persistAtom],
});

const SortState = atom({
  key: 'sortState',
  default: '최신순',
  effects_UNSTABLE: [persistAtom],
});

export { UploadedImage, HashtagList, PeriodState, IsAdsState, SortState };
