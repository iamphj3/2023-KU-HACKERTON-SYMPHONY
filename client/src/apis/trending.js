import { client } from './axios';

// 트랜딩 해시태그 TOP 10 API
export const getTrendingHashtag = async (period) => {
  try {
    const { data } = await client.get('/hashtag/top', {
      headers: {
        period: { period },
      },
    });
    return data;
  } catch (err) {
    console.error(err);
  }
};
