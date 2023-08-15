import { styled } from 'styled-components';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect, useCallback } from 'react';
import { useRecoilState } from 'recoil';
import PostCard from './PostCard';
import { HashtagList } from '../../recoil/atom';
// import useGetPostList from '../../hooks/useGetPostList';
import { postSearch } from '../../apis/search';

export default function PostResult() {
  const [postList, setPostList] = useState([]);
  const [hashtagList, setHashtagList] = useRecoilState(HashtagList);

  // const { postList, isLoading, isError, size, setSize } = useGetPostList();

  useEffect(() => {}, []);

  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  // const getMorePost = useCallback(() => {
  //   if (postList && postList.results) {
  //     setSize((prev) => prev + 1);
  //   }
  // }, [postList, setSize]);

  // useEffect(() => {
  //   if (inView && postList.results) {
  //     getMorePost();
  //   }
  // }, [inView]);

  const getMorePost = useCallback(() => {
    // if (postList && postList.results) {
    // const mergedList = postList.flatMap((post) => [post]).concat(nextposts);
    // setPostList(mergedList);
    // setPostList((prevList) => ({ ...prevList }));
    // }
  }, [postList]);

  useEffect(() => {
    if (inView) {
      getMorePost();
    }
  }, [inView]);

  return (
    <StPostResult>
      {postList ? (
        <>
          <p>{`총 ${postList.length}개의 게시물`}</p>
          <StPostList>
            {postList.map((data) => (
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
