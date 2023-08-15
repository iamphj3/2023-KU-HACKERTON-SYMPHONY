import { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import { getTrendingHashtag } from '../../apis/trending';

const RANK = ['건대맛집', '건대맛집', '건대맛집', '건대맛집', '건대맛집', '건대맛집', '건대맛집', '건대맛집', '건대맛집', '건대맛집'];

export default function TrendingRank(selectedPeriod) {
  const [period, setPeriod] = useState(selectedPeriod);
  const [rank, setRank] = useState([]);

  const leftRank = RANK.slice(0, 5);
  const rightRank = RANK.slice(5);

  const getRank = async () => {
    try {
      const rankData = await getTrendingHashtag(selectedPeriod);
      setRank(rankData);
    } catch (error) {
      console.error('Error fetching trending hashtags:', error);
    }
  };

  useEffect(() => {
    getRank();
  }, [selectedPeriod]);

  return (
    <StTrendingRank>
      <StLeftColumn>
        <ol>
          {leftRank.map((hashtag, index) => (
            <li key={hashtag}>
              <span>{index + 1}</span>
              {hashtag}
            </li>
          ))}
        </ol>
      </StLeftColumn>
      <StRightColumn>
        <ol>
          {rightRank.map((hashtag, index) => (
            <li key={hashtag}>
              <span>{index + 1}</span>
              {hashtag}
            </li>
          ))}
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
