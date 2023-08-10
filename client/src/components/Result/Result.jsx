import { styled } from 'styled-components';
import TabSwitcher from '../common/TabSwitcher/TabSwitcher';
import PostCard from './PostCard';

const RESULT_TABS = {
  tabList: ['최신순', '좋아요 순', '댓글 많은 순'],
  selectedStyle: { color: '#6E53FF' },
  noSelectedStyle: { color: '#626273' },
  contents: [],
};

export default function Result() {
  const { tabList, selectedStyle, noSelectedStyle } = RESULT_TABS;

  return (
    <StResult>
      <div>
        <h2>검색 결과</h2>
        <TabSwitcher
          tabList={tabList}
          selectedStyle={selectedStyle}
          noSelectedStyle={noSelectedStyle}
        />
      </div>
      <PostCard />
    </StResult>
  );
}

const StResult = styled.section`
  & > div {
    display: flex;
    justify-content: space-between;
    align-items: end;

    & > h2 {
        ${({ theme }) => theme.fonts.Head1};
    }
  }
`;
