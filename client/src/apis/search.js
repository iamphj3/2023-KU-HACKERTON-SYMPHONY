import { client } from './axios';

// 해시태그, 이미지 검색 API
export const postSearch = async (period, isAds, hashtags, image_url) => {
  try {
    console.log('해시태그, 이미지 검색 API 로딩중');

    // const hashtagsQueryParam = hashtags.map((tag) => `hashtags=${tag}`).join('&');
    // let url = `/hashtag/?period=${period}&isAds=${isAds}&${hashtagsQueryParam}`;
    // if (image_url) {
    //   url += `&image_url=${image_url}`;
    // }

    const requestPayload = {
      period,
      isAds,
      hashtags,
    };

    if (image_url) {
      requestPayload.image_url = image_url;
    }

    const data = await client.post('/hashtag/', requestPayload);

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
