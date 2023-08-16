import { styled } from 'styled-components';
import { skeletonAnimation } from '../../utils';

export default function TrendingLayout() {
  return (
    <StTrendingLayout>
      <StTrend>
        <div />
        <div />
        <div />
        <div />
        <div />
      </StTrend>
      <StTrend>
        <div />
        <div />
        <div />
        <div />
        <div />
      </StTrend>
    </StTrendingLayout>
  );
}

const StTrendingLayout = styled.div`
  display: flex;
  gap: 3.9rem;

  width: 100%;
`;

const StTrend = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & > div {
    width: 11rem;
    height: 2.1rem;

    border-radius: 0.4rem;
    background-color: ${({ theme }) => theme.colors.Gray2};

    animation: ${skeletonAnimation} 2s infinite linear;
  }
`;
