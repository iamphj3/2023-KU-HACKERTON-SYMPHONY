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
export const getSearchResult = async ({ tagId, lastId }) => {
  try {
    console.log('해시태그 조회 API 로딩중');
    const data = await client.get(`/hashtag/?tag_id=${tagId}&lastId=${lastId}`);
    console.log(data);

    if (data.status === 204) {
      return null;
    }
    if (data.status === 200) {
      return data.data.data;
    }
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
