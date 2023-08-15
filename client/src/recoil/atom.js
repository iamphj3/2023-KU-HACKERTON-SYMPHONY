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

const SearchOption = atom({
  key: 'searchOption',
  default: {
    tag_id: '',
    lastId: '000000000000000000000000',
    period: 0,
    isAds: true,
    image_url: '',
  },
  effects_UNSTABLE: [persistAtom],
});

export { UploadedImage, HashtagList, SearchOption };
