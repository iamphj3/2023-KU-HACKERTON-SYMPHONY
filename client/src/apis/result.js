import { client } from './axios';

// 총 게시물 개수 API
export const getTotalPostNum = async (tag_id) => {
  try {
    const { data } = await client.get(`/hashtag/total?tag_id=${tag_id}`);
    return data.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// 해시태그 조회 API
export const getSearchResult = async ({ tagId, lastId, period, isAds, image_url }) => {
  try {
    console.log('해시태그 조회 API 로딩중');
    console.log(tagId, lastId, period, isAds, image_url);
    let url = `/hashtag/?tag_id=${tagId}&lastId=${lastId}&period=${period}&isAds=${isAds}`;
    if (image_url) {
      url += `&image_url=${image_url}`;
    }
    const data = await client.get(url);
    console.log(data);
    console.log(data.data.data);
    return data.data.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// 해시태그 조회 정렬 API
export const getSortedResult = async (tagId, isLast, isLike, isComment) => {
  try {
    const { data } = await client.post(
      `/hashtag/sort?tag_id=${tagId}&isLast=${isLast}&isLike=${isLike}&isComment=${isComment}`,
    );
    return data.status;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
