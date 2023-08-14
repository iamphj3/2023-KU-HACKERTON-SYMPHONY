import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

const UploadedImage = atom({
  key: 'uploadedImage',
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export { UploadedImage };
