import { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import { getTrendingHashtag } from '../../apis/trending';
import { TrendingLayout } from '../../layouts/TrendingLayout';

export default function TrendingRank({ selectedPeriod }) {
  const [rank, setRank] = useState([]);
  const [loading, setLoading] = useState(true);

  const getRank = async () => {
    let reqPeriod;
    if (selectedPeriod === '일별') {
      reqPeriod = 1;
      setLoading(true);
    }
    if (selectedPeriod === '주간별') {
      reqPeriod = 7;
      setLoading(true);
    }
    try {
      const rankData = await getTrendingHashtag(reqPeriod);
      setRank(rankData.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching trending hashtags:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getRank();
  }, [selectedPeriod]);

  const leftRank = rank.slice(0, 5);
  const rightRank = rank.slice(5);

  return (
    <StTrendingRank>
      {loading ? (
        <TrendingLayout />
      ) : (
        <>
          <div>
            <ol>
              {leftRank.map((hashtag, index) => (
                <li key={hashtag}>
                  <span>{index + 1}</span>
                  {hashtag}
                </li>
              ))}
            </ol>
          </div>
          <div>
            <ol>
              {rightRank.map((hashtag, index) => (
                <li key={hashtag}>
                  <span>{index + 6}</span>
                  {hashtag}
                </li>
              ))}
            </ol>
          </div>
        </>
      )}
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
