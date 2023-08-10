import { styled } from 'styled-components';
import { IcComment, IcLike } from '../../assets/icons';

export default function PostCard() {
  return (
    <StPostCard>
      <img alt="post-thumbnail" src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FdmCqfe%2Fbtq4jsZ6exh%2FIq71TMudD3jkBLjqmanaRK%2Fimg.jpg" />
      <StInteractions>
        <div>
          <IcLike />
          <span>30</span>
        </div>
        <div>
          <IcComment />
          <span>30</span>
        </div>
      </StInteractions>
      <StContent>
        <p>365일 중 제일 중요한;; 🐷삼삼데이🐷,, 솥뚜껑삼겹살에...</p>
      </StContent>
      <p>@wasabiihater</p>
      <p>23.07.23</p>
    </StPostCard>
  );
}

const StPostCard = styled.article`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 30rem;

  & > img {
    object-fit: cover;

    width: 100%;
    height: 16.8rem;
    margin-bottom: 0.9rem;

    border-radius: 1rem;
  }

  & > p {
    color : ${({ theme }) => theme.colors.Gray6};
    ${({ theme }) => theme.fonts.Body2};
  }
`;

const StInteractions = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 0.8rem;

  & > div {  
    display: flex;
    align-items: center;
    gap: 0.2rem;
  }

  span {
    padding-left: 0.2rem;
    color : ${({ theme }) => theme.colors.Gray6};
    ${({ theme }) => theme.fonts.Body2};
  }
`;

const StContent = styled.div`
  height: 4.9rem;
  margin-bottom: 0.4rem;

  & > p {
    ${({ theme }) => theme.fonts.Title2};
  }
`;
