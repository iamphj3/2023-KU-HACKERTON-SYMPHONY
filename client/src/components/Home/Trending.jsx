import { styled } from 'styled-components';
import TabSwitcher from '../common/TabSwitcher/TabSwitcher';
import { getToday } from '../../utils';

const TRENDING_TABS = {
  tabList: ['일별', '주간별'],
  selectedStyle: { color: '#212121' },
  noSelectedStyle: { color: '#9090A0' },
  contents: [],
};

export default function Trending() {
  const { tabList, selectedStyle, noSelectedStyle } = TRENDING_TABS;
  const { today, datetime } = getToday();

  return (
    <StTrending>
      <h3>
        트렌딩 해시태그
        <span> TOP10</span>
      </h3>
      <time dateTime={datetime}>{today}</time>
      <TabSwitcher
        tabList={tabList}
        selectedStyle={selectedStyle}
        noSelectedStyle={noSelectedStyle}
      />
    </StTrending>
  );
}

const StTrending = styled.section`  
  height: 23.1rem;
  padding: 2.4rem 1.6rem;

  background-color: ${({ theme }) => theme.colors.White};
  border-radius: 1.2rem;

  & > h3 {
      ${({ theme }) => theme.fonts.Head2};

    & > span {
        ${({ theme }) => theme.fonts.Head2};
        color : ${({ theme }) => theme.colors.main};
    }
  }
`;
