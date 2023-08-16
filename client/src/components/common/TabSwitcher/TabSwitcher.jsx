import { useState, useEffect } from 'react';
import { styled } from 'styled-components';

function TabSwitcher({ selectedtab, tabList, selectedStyle, noSelectedStyle, onTabChange }) {
  const [activeTab, setActiveTab] = useState(tabList[selectedtab]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
  }, [activeTab]);

  const handleTabClick = (tab) => {
    if (activeTab !== tab) {
      setLoading(true);
      setActiveTab(tab);
      onTabChange(tab);
    }
  };

  return (
    <section>
      <StTabs>
        {tabList.map((tab) => (
          <button
            type="button"
            key={tab}
            className={activeTab === tab ? 'active' : ''}
            onClick={() => handleTabClick(tab)}
            style={activeTab === tab ? selectedStyle : noSelectedStyle}
          >
            {tab}
          </button>
        ))}
      </StTabs>
      <StTabContents className="tab-content">
        {tabList.map((tab) => (
          <div key={tab} style={{ display: activeTab === tab ? 'block' : 'none' }}>
            {/* {loading ? <p>로딩중</p> : <p>{tab}</p>} */}
          </div>
        ))}
      </StTabContents>
    </section>
  );
}

export default TabSwitcher;

const StTabs = styled.div`
  display: flex;
  gap: 1rem;

  & > button {
    ${({ theme }) => theme.fonts.Body3};

    &:not(:last-child)::after {
      content: '|';
      padding-left: 1rem;
      color: ${({ theme }) => theme.colors.Gray4};
    }

    &.active {
      ${({ theme }) => theme.fonts.Body2};
    }
  }
`;

const StTabContents = styled.div``;
