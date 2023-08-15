import { styled } from 'styled-components';

export default function HashTag({ hashtag }) {
  return <StHashTag>{`#${hashtag}`}</StHashTag>;
}

const StHashTag = styled.li`
  padding: 1rem 1.2rem;

  border-radius: 2rem;
  background-color: ${({ theme }) => theme.colors.main};
  color: ${({ theme }) => theme.colors.White};
  ${({ theme }) => theme.fonts.Body3};
`;
