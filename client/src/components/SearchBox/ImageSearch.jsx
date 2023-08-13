import { styled } from 'styled-components';
import { IcUploadPurple } from '../../assets/icons';

export default function ImageSearch() {
  return (
    <StImageSearchBtn type="button">
      <IcUploadPurple />
      <p>사진 업로드하기</p>
      <span>PNG, JPG 형식만 지원됩니다.</span>
    </StImageSearchBtn>
  );
}
const StImageSearchBtn = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  padding: 2rem 0;
  margin-bottom: 1.6rem;

  border-radius: 1rem;
  background-color: ${({ theme }) => theme.colors.Gray2};

  & > p {
    margin: 0.4rem 0 0.8rem 0;

    color: ${({ theme }) => theme.colors.main};
    ${({ theme }) => theme.fonts.Title2};
  }
  & > span {
    color: ${({ theme }) => theme.colors.Gray6};
    ${({ theme }) => theme.fonts.Body5};
  }
`;
