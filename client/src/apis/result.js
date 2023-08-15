import { client } from './axios';

// 해시태그 조회 API
export const getSearchResult = async ({ tagId, lastId, period, isAds, image_url }) => {
  try {
    let url = `/hashtag?tag_id=${tagId}&lastId=${lastId}&period=${period}&isAds=${isAds}`;
    if (image_url) {
      url += `&image_url=${image_url}`;
    }
    const { data } = await client.get(url);
    console.log(data.data);
    return data.data;
  } catch (err) {
    console.error(err);
  }
};

// 해시태그 조회 정렬 API
export const getSortedResult = async ({ _tagId, _isLast, _isLike, _isComment }) => {
  try {
    const { data } = await client.get(`/hashtag/sort?tag_id=${_tagId}&isLast=${_isLast}&isLike=${_isLike}&isComment=${_isComment}`);
    return data;
  } catch (err) {
    console.error(err);
  }
};
