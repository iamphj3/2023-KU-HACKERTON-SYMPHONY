import { atom } from 'recoil';

const UploadedImage = atom({
  key: 'uploadedImage',
  default: null,
});

export { UploadedImage };
