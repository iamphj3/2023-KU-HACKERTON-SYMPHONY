import { useState, useEffect } from 'react';
import { styled } from 'styled-components';

function TabSwitcher({
  tabName, selectedStyle, noSelectedStyle,
}) {
  const [activeTab, setActiveTab] = useState(tabName[0]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
  }, [activeTab]);

  const handleTabClick = (tab) => {
    if (activeTab !== tab) {
      setLoading(true);
      setActiveTab(tab);
    }
  };

  return (
    <section>
      <StTabs>
        {tabName.map(() => (
          <button
            type="button"
            key={tabName}
            className={activeTab === tabName ? 'active' : ''}
            onClick={() => handleTabClick(tabName)}
            style={activeTab === tabName ? selectedStyle : noSelectedStyle}
          >
            {tabName}
          </button>
        ))}
      </StTabs>
      <StTabContents className="tab-content">
        {tabName.map(() => (
          <div key={tabName} style={{ display: activeTab === tabName ? 'block' : 'none' }}>
            {loading ? <p>로딩중</p> : <p>{tabName}</p>}
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
