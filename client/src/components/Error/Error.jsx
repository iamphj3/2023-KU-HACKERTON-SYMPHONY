import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';

export default function Error() {
  const navigate = useNavigate();
  return (
    <StError>
      <h2>원하시는 페이지를 찾을 수 없습니다.</h2>
      <p>
        요청하신 페이지의 주소가 잘못 입력되었거나,
        <br />
        주소가 변경, 삭제되어 찾을 수 없습니다.
      </p>
      <StHomeBtn
        type="button"
        onClick={() => {
          navigate('/');
        }}
      >
        insTAG 홈 가기
      </StHomeBtn>
    </StError>
  );
}

const StError = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > h2 {
    margin-bottom: 0.8rem;

    color: ${({ theme }) => theme.colors.Gray5};
    ${({ theme }) => theme.fonts.Head3};
  }
  & > p {
    margin-bottom: 2rem;

    color: ${({ theme }) => theme.colors.Gray4};
    ${({ theme }) => theme.fonts.Body3};
  }
`;

const StHomeBtn = styled.button`
  padding: 1rem 2rem;

  border: 0.1rem solid ${({ theme }) => theme.colors.main};
  border-radius: 2rem;
  color: ${({ theme }) => theme.colors.main};
  ${({ theme }) => theme.fonts.Body3};
`;
