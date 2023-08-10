import { styled } from 'styled-components';
import TabSwitcher from '../common/TabSwitcher/TabSwitcher';

const TRENDING_TABS = {
  tabList: ['일별', '월별'],
  selectedStyle: { color: `${({ theme }) => theme.colors.Black}` },
  noSelectedStyle: { color: `${({ theme }) => theme.colors.Gray4}` },
  contents: [],
};

export default function Trending() {
  const currentDate = new Date();
  const year = currentDate.getFullYear().toString();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const day = currentDate.getDate().toString().padStart(2, '0');
  const today = `${year}.${month}.${day}`;
  const datetime = `${year}-${month}-${day}`;

  const { tabList, selectedStyle, noSelectedStyle } = TRENDING_TABS;

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
