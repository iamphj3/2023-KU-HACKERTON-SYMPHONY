import { useState, useEffect } from 'react';
import { styled } from 'styled-components';

function TabSwitcher({ tabs }) {
  const [activeTab, setActiveTab] = useState(tabs[0].tabName);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
  }, []);

  const handleTabClick = (tab) => {
    if (activeTab !== tab) {
      setLoading(false);
      setActiveTab(tab);
    }
  };

  return (
    <section>
      <StTabs>
        {tabs.map(({
          tabName, tabStyle, selectedStyle, noSelectedStyle,
        }) => (
          <button
            type="button"
            key={tabName}
            className={activeTab === tabName ? 'active' : ''}
            onClick={() => handleTabClick(tabName)}
            style={[
              activeTab === tabName ? selectedStyle : noSelectedStyle,
              tabStyle,
            ]}
          >
            {tabName}
          </button>
        ))}
      </StTabs>
      <StTabContents className="tab-content">
        {tabs.map(({ tabName, contents }) => (
          <div key={tabName} style={{ display: activeTab === tabName ? 'block' : 'none' }}>
            {loading ? <p>로딩중</p> : contents}
          </div>
        ))}
      </StTabContents>
    </section>
  );
}

export default TabSwitcher;

const StTabs = styled.div`
  
`;

const StTabContents = styled.div`
  
`;
