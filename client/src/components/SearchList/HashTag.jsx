import { styled } from 'styled-components';
import { IcCancel } from '../../assets/icons';

export default function HashTag({ hashtag, onDelete }) {
  const handleDelete = () => {
    onDelete(hashtag);
  };

  return (
    <StHashTag>
      {`#${hashtag}`}
      <IcCancel onClick={handleDelete} />
    </StHashTag>
  );
}

const StHashTag = styled.li`
  display: flex;
  align-items: center;
  gap: 0.6rem;

  padding: 1rem 1.2rem;

  border-radius: 2rem;
  background-color: ${({ theme }) => theme.colors.main};
  color: ${({ theme }) => theme.colors.White};
  ${({ theme }) => theme.fonts.Body3};
`;
