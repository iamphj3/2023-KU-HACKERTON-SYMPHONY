import { styled } from 'styled-components';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect, useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { useLocation } from 'react-router-dom';
import PostCard from './PostCard';
import { HashtagList, IsAdsState, PeriodState, UploadedImage } from '../../recoil/atom';
import { getSearchResult, getTotalPostNum } from '../../apis/result';

export default function PostResult() {
  const location = useLocation();
  const searchDataId = location.state ? location.state.searchDataId : null;

  const [postList, setPostList] = useState([]);
  const [totalPost, setTotalPost] = useState();
  const [lastId, setLastId] = useState('000000000000000000000000');
  const [isAdFiltered, setIsAdFiltered] = useRecoilState(IsAdsState);
  const [periodState, setPeriodState] = useRecoilState(PeriodState);
  const [imageUrl, setImageUrl] = useRecoilState(UploadedImage);

  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  const getTotalPost = async () => {
    try {
      const total = await getTotalPostNum(searchDataId);
      setTotalPost(total);
    } catch (error) {
      console.error(error);
    }
  };

  const getPost = async () => {
    try {
      const posts = await getSearchResult({
        tagId: searchDataId,
        lastId,
        period: periodState,
        isAds: isAdFiltered,
        image_url: imageUrl,
      });

      const postnum = posts.results.length - 1;
      setLastId(posts.results[postnum].id);
      setPostList((prevList) => [...prevList, ...posts.results]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (searchDataId) {
      getTotalPost();
      getPost();
    }
  }, [searchDataId]);

  useEffect(() => {
    if (inView) {
      getPost();
    }
  }, [inView]);

  return (
    <StPostResult>
      {searchDataId ? (
        <>
          <p>{`총 ${totalPost}개의 게시물`}</p>
          <StPostList>
            {postList.slice(10).map((data) => (
              <div key={data.id} ref={ref}>
                <PostCard postData={data} />
              </div>
            ))}
          </StPostList>
        </>
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
