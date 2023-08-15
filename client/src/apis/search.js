import { client } from './axios';

// 해시태그, 이미지 검색 API
export const postSearch = async (hashtags) => {
  try {
    const { data } = await client.post(`/hashtag?hashtags=${hashtags}`);
    return data;
  } catch (err) {
    console.error(err);
  }
};

// 해시태그 id API
export const getHashtagId = async (hashtags) => {
  try {
    const { data } = await client.get(`/hashtag/id?hashtags=${hashtags}`);
    return data;
  } catch (err) {
    console.error(err);
  }
};
