import { client } from './axios';

// 해시태그, 이미지 검색 API
export const postSearch = async (hashtags) => {
  try {
    console.log('해시태그, 이미지 검색 API 로딩중');
    const hashtagsQueryParam = hashtags.map((tag) => `hashtags=${tag}`).join('&');
    const data = await client.post(`/hashtag/?${hashtagsQueryParam}`);
    return data.status;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// 해시태그 id API
export const getHashtagId = async (hashtags) => {
  try {
    console.log('해시태그 id API 로딩중');
    const hashtagsQueryParam = hashtags.map((tag) => `hashtags=${tag}`).join('&');
    const { data } = await client.get(`/hashtag/id?${hashtagsQueryParam}`);
    console.log(data.data.tag_id);
    return data.data.tag_id;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
