import { styled } from 'styled-components';
import PostSkeleton from './PostSkeleton';

export default function PostLayout() {
  return (
    <StPostLayout>
      <PostSkeleton />
      <PostSkeleton />
      <PostSkeleton />
      <PostSkeleton />
    </StPostLayout>
  );
}

const StPostLayout = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 4.2rem 0.9rem;
`;
