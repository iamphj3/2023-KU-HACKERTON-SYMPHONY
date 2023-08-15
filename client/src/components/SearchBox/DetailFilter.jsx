import { styled } from 'styled-components';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { IcArrowDown, IcToggleOn, IcToggleOff } from '../../assets/icons';
import { PeriodState, IsAdsState } from '../../recoil/atom';

const PERIODS = ['전체', '1주', '1개월', '3개월', '6개월', '1년'];
const PERIOD_VALUES = [0, 7, 30, 90, 180, 365];

export default function DetailFilter() {
  const [selectedPeriod, setSelectedPeriod] = useState(PERIODS[0]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAdFiltered, setIsAdFiltered] = useRecoilState(IsAdsState);
  const [periodState, setPeriodState] = useRecoilState(PeriodState);

  const handleFilter = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleToggle = () => {
    setIsAdFiltered((prev) => !prev);
  };

  const handlePeriodChange = (period) => {
    const periodIndex = PERIODS.indexOf(period);
    if (periodIndex !== -1) {
      setPeriodState(PERIOD_VALUES[periodIndex]);
    }
    setSelectedPeriod(period);
  };

  return (
    <StDetailFilterWrapper>
      <StInfo>
        <p>* 여러개 입력 시 스페이스 혹은 엔터로 구분</p>
        <StFilterBtn type="button" onClick={handleFilter} className={isExpanded ? 'expanded' : ''} isExpanded={isExpanded}>
          상세 필터
          <IcArrowDown />
        </StFilterBtn>
      </StInfo>
      <StDetailFilter className={isExpanded ? 'expanded' : ''}>
        <p>기간</p>
        <ul>
          {PERIODS.map((period) => (
            <li
              key={period}
              className={selectedPeriod === period ? 'selected' : ''}
              selected={selectedPeriod === period}
              onClick={() => handlePeriodChange(period)}
              role="presentation"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setSelectedPeriod(period);
                }
              }}
            >
              {period}
            </li>
          ))}
        </ul>
        <StAdToggle>
          <p>광고 해시태그 필터링</p>
          <button type="button" onClick={handleToggle}>
            {isAdFiltered ? <IcToggleOn /> : <IcToggleOff />}
          </button>
        </StAdToggle>
      </StDetailFilter>
    </StDetailFilterWrapper>
  );
}

const StDetailFilterWrapper = styled.div``;
const StInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > p {
    color: ${({ theme }) => theme.colors.Gray5};
    ${({ theme }) => theme.fonts.Body5};
  }
`;

const StFilterBtn = styled.button`
  display: flex;
  align-items: center;

  color: ${({ theme }) => theme.colors.Gray5};
  ${({ theme }) => theme.fonts.Body2};

  & > svg {
    transform: rotate(360deg);
    transition: transform 0.3s ease-in-out;
  }

  &.expanded > svg {
    transform: rotate(180deg);
  }
`;

const StDetailFilter = styled.div`
  display: none;

  margin-top: 1.75rem;

  &.expanded {
    display: flex;
    flex-direction: column;
  }
  & > p {
    margin-bottom: 1.2rem;
    ${({ theme }) => theme.fonts.Title2};
  }
  & > ul {
    display: flex;
    justify-content: space-around;
    gap: 1.4rem;

    & > li {
      color: ${({ selected, theme }) => (selected ? theme.colors.main : theme.colors.Gray5)};
      ${({ theme }) => theme.fonts.Body4};

      cursor: pointer;

      &::before {
        content: '●';
        margin-right: 0.5rem;
        color: ${({ theme }) => theme.colors.Gray5};
      }
      &.selected {
        color: ${({ theme }) => theme.colors.main};

        &::before {
          color: ${({ theme }) => theme.colors.main};
        }
      }
    }
  }
`;

const StAdToggle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-top: 1.6rem;

  & > p {
    ${({ theme }) => theme.fonts.Title2};
  }
`;
