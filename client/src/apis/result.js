import { client } from './axios';

// 총 게시물 개수 API
export const getTotalPostNum = async (tag_id) => {
  try {
    const { data } = await client.get(`/hashtag/total?tag_id=${tag_id}`);
    return data.data;
  } catch (err) {
    console.error(err);
  }
};

// 해시태그 조회 API
export const getSearchResult = async ({ tagId, lastId, period, isAds, image_url }) => {
  try {
    let url = `/hashtag/?tag_id=${tagId}&lastId=${lastId}&period=${period}&isAds=${isAds}`;
    if (image_url) {
      url += `&image_url=${image_url}`;
    }
    const { data } = await client.get(url);
    console.log(url, 'url');
    console.log(data, 'data');
    return data.data;
  } catch (err) {
    console.error(err);
  }
};

// 해시태그 조회 정렬 API
export const getSortedResult = async (tagId, isLast, isLike, isComment) => {
  try {
    console.log(tagId, isLast, isLike, isComment);
    const { data } = await client.get(`/hashtag/sort?tag_id=${tagId}&isLast=${isLast}&isLike=${isLike}&isComment=${isComment}`);
    return data;
  } catch (err) {
    console.error(err);
  }
};
