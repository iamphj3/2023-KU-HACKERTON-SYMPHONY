import { styled } from 'styled-components';
import PostCard from './PostCard';

export default function PostResult() {
  return (
    <StPostResult>
      <p>총 100개의 게시물</p>
      <StPostList>
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
      </StPostList>
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
