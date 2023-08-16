import { styled } from 'styled-components';
import { skeletonAnimation } from '../../utils';

export default function PostSkeleton() {
  return (
    <StPostSkeleton>
      <div className="image" />
      <div className="title" />
      <div className="text" />
      <div className="text" />
      <div className="name" />
      <div className="date" />
    </StPostSkeleton>
  );
}

const StPostSkeleton = styled.div`
  display: flex;
  flex-direction: column;

  .image {
    width: 16.8rem;
    height: 16.8rem;
    border-radius: 1rem;
    background-color: ${({ theme }) => theme.colors.Gray3};
    animation: ${skeletonAnimation} 2s infinite linear;
  }
  .title {
    margin: 1rem 0rem;

    width: 9.5rem;
    height: 2.2rem;
    border-radius: 0.4rem;
    background-color: ${({ theme }) => theme.colors.Gray3};
    animation: ${skeletonAnimation} 2s infinite linear;
  }
  .text {
    margin-bottom: 0.4rem;

    width: 16.8rem;
    height: 1.7rem;
    border-radius: 0.4rem;
    background-color: ${({ theme }) => theme.colors.Gray3};
    animation: ${skeletonAnimation} 2s infinite linear;
  }
  .name {
    margin-top: 0.4rem;

    width: 9.8rem;
    height: 1.7rem;
    border-radius: 0.4rem;
    background-color: ${({ theme }) => theme.colors.Gray3};
    animation: ${skeletonAnimation} 2s infinite linear;
  }
  .date {
    margin-top: 0.8rem;

    width: 6rem;
    height: 1.7rem;
    border-radius: 0.4rem;
    background-color: ${({ theme }) => theme.colors.Gray3};
    animation: ${skeletonAnimation} 2s infinite linear;
  }
`;
