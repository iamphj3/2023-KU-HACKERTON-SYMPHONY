import { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import { getTrendingHashtag } from '../../apis/trending';

const RANK = ['건대맛집', '건대맛집', '건대맛집', '건대맛집', '건대맛집', '건대맛집', '건대맛집', '건대맛집', '건대맛집', '건대맛집'];

const cachedRankData = {
  일별: ['건대s맛집', '건대맛집1', '건대맛집2', '건대맛집3', '건대4맛집', '건대5맛집', '건6대맛집', '건대맛7집', '건대맛8집', '건대9집'],
  주간별: ['주간1', '주간2', '주간3', '주간4', '주간5', '주간6', '주간7', '주간8', '주간9', '주간10'],
};

export default function TrendingRank({ selectedPeriod }) {
  const [period, setPeriod] = useState(selectedPeriod);
  const [rank, setRank] = useState([]);
  const [cachedRank, setCachedRank] = useState(cachedRankData);

  const leftRank = rank.slice(0, 5);
  const rightRank = rank.slice(5);

  const getRank = async () => {
    let reqPeriod;
    if (period === '일별') {
      reqPeriod = 1;
    }
    if (period === '주간별') {
      reqPeriod = 7;
    }
    try {
      if (cachedRank[selectedPeriod]) {
        setRank(cachedRank[selectedPeriod]);
      } else {
        const rankData = await getTrendingHashtag(reqPeriod);
        setRank(rankData);
        setCachedRank((prevCachedData) => ({
          ...prevCachedData,
          [selectedPeriod]: rankData,
        }));
      }
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
            <li key={index}>
              <span>{index + 1}</span>
              {hashtag}
            </li>
          ))}
        </ol>
      </StLeftColumn>
      <StRightColumn>
        <ol>
          {rightRank.map((hashtag, index) => (
            <li key={index}>
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
