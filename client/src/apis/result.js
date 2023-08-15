import { client } from './axios';

// 해시태그 조회 API
export const getSearchResult = async ({ _tagId, _lastId, _period, _isAds, _amount }) => {
  try {
    const { data } = await client.get(`/hashtag?tag_id=${_tagId}&lastId=${_lastId}&period=${_period}&isAds=${_isAds}&amount=${_amount}`);
    return data;
  } catch (err) {
    console.error(err);
  }
};
