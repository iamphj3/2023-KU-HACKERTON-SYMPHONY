import { styled } from 'styled-components';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect, useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { useLocation, useNavigate } from 'react-router-dom';
import PostCard from './PostCard';
import {
  HashtagList,
  IsAdsState,
  PeriodState,
  UploadedImage,
  LastIdState,
} from '../../recoil/atom';
import { getSearchResult, getTotalPostNum } from '../../apis/result';
import { PostLayout } from '../../layouts/PostLayout';

export default function PostResult({ searchDataId }) {
  const [searchId, setSearchId] = useState(searchDataId);
  const [postList, setPostList] = useState([]);
  const [totalPost, setTotalPost] = useState();
  const [lastId, setLastId] = useRecoilState(LastIdState);
  const [isAdFiltered, setIsAdFiltered] = useRecoilState(IsAdsState);
  const [periodState, setPeriodState] = useRecoilState(PeriodState);
  const [imageUrl, setImageUrl] = useRecoilState(UploadedImage);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  const getTotalPost = async () => {
    try {
      const total = await getTotalPostNum(searchId);
      setTotalPost(total);
    } catch (error) {
      console.error(error);
    }
  };

  const getPost = async () => {
    try {
      const posts = await getSearchResult({
        tagId: searchId,
        lastId,
        period: periodState,
        isAds: isAdFiltered,
        image_url: imageUrl,
      });

      const postnum = posts.results.length - 1;
      setLastId(posts.results[postnum].id);
      setPostList((prevList) => [...prevList, ...posts.results]);
      console.log('posts', posts);
      console.log('postList', postList);
      console.log('lastId', lastId);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchId) {
      setLastId('000000000000000000000000');
      getTotalPost();
      getPost();
    }
  }, [searchId]);

  useEffect(() => {
    if (inView) {
      getPost();
    }
  }, [inView]);

  return (
    <StPostResult key={searchId}>
      {searchId ? (
        loading ? (
          <PostLayout />
        ) : (
          <>
            {/* <p>{`총 ${totalPost}개의 게시물`}</p> */}
            <StPostList>
              {postList.slice(10).map((data) => (
                <div key={data.id} ref={ref}>
                  <PostCard postData={data} />
                </div>
              ))}
            </StPostList>
          </>
        )
      ) : (
        <StEmptyView>
          <p>
            다음 해시태그에 해당하는
            <br />
            검색 결과가 없습니다.
          </p>
        </StEmptyView>
      )}
    </StPostResult>
  );
}
const StPostResult = styled.section`
  & > p {
    margin-bottom: 1.6rem;
    ${({ theme }) => theme.fonts.Title1};
  }
`;

const StPostList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  row-gap: 4rem;
  column-gap: 0.9rem;
`;

const StEmptyView = styled.div`
  & > p {
    margin-top: 14.1rem;
    text-align: center;

    color: ${({ theme }) => theme.colors.Gray5};
    ${({ theme }) => theme.fonts.Body1};
  }
`;
