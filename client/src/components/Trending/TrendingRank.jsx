import { useState } from 'react';
import { styled } from 'styled-components';

export default function TrendingRank(selectedPeriod) {
  const [period, setPeriod] = useState(selectedPeriod);

  return (
    <StTrendingRank>
      <StLeftColumn>
        <ol>
          <li>
            <span>1</span>
            건대맛집
          </li>
          <li>
            <span>1</span>
            건대맛집
          </li>
          <li>
            <span>1</span>
            건대맛집
          </li>
          <li>
            <span>1</span>
            건대맛집
          </li>
          <li>
            <span>1</span>
            건대맛집
          </li>
        </ol>
      </StLeftColumn>
      <StRightColumn>
        <ol>
          <li>
            <span>1</span>
            건대맛집
          </li>
          <li>
            <span>1</span>
            건대맛집
          </li>
          <li>
            <span>1</span>
            건대맛집
          </li>
          <li>
            <span>1</span>
            건대맛집
          </li>
          <li>
            <span>1</span>
            건대맛집
          </li>
        </ol>
      </StRightColumn>
    </StTrendingRank>
  );
}

const StTrendingRank = styled.article`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  * > li {
    margin-bottom: 1.2rem;
    ${({ theme }) => theme.fonts.Body2};
  }
  * > span {
    margin-right: 1rem;
    ${({ theme }) => theme.fonts.Title2};
  }
`;

const StLeftColumn = styled.div``;

const StRightColumn = styled.div``;
