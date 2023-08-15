import { styled } from 'styled-components';
import { IcComment, IcHeart } from '../../assets/icons';
import formatDate from '../../utils/formatDate';

export default function PostCard({ postData }) {
  const { comment_count, date, id, image_url, isAds, like_count, pk, text, user_name } = postData;
  return (
    <StPostCard>
      <img alt="post-thumbnail" src={image_url} />
      <StInteractions>
        <div>
          <IcHeart />
          <span>{like_count}</span>
        </div>
        <div>
          <IcComment />
          <span>{comment_count}</span>
        </div>
      </StInteractions>
      <StContent>
        <p>{text}</p>
      </StContent>
      <p>@{user_name}</p>
      <p>{formatDate(date).postDate}</p>
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
    color: ${({ theme }) => theme.colors.Gray6};
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
    color: ${({ theme }) => theme.colors.Gray6};
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
