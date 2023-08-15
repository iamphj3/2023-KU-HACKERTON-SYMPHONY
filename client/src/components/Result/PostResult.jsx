import { styled } from 'styled-components';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect, useCallback } from 'react';
import PostCard from './PostCard';

const POST_DATA = {
  isFinal: false,
  results: [
    {
      pk: '3168330299339274157',
      id: '64d900efb4e2fe7fd947e3fd',
      date: '2023-08-13T08:13:45',
      user_name: '5_yeeeeeah',
      image_url:
        'https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-15/367390592_1461620257983703_1748973046590572844_n.jpg?stp=dst-jpg_e35_s1080x1080&_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_cat=107&_nc_ohc=YxSkePj7mxAAX88AaXB&edm=AMKDjl4BAAAA&ccb=7-5&ig_cache_key=MzE2ODMzMDI5OTMzOTI3NDE1Nw%3D%3D.2-ccb7-5&oh=00_AfBCt4eqJUJIqiVO6oF989tR3I_K6kqihxGtZVusVo2RgA&oe=64DDD7BE&_nc_sid=472314',
      text: '다음주 주말이 빨리 왔으면 좋겠다...💜🤍',
      like_count: 632,
      comment_count: 11,
      isAds: false,
    },
    {
      pk: '3168420331273404411',
      id: '64d900efb4e2fe7fd947e3fe',
      date: '2023-08-13T11:12:38',
      user_name: 'iroulri',
      image_url: null,
      text: '일요팅 업데이트 슬금슬금 하고 이쒀용 ~ 오늘부터 휴가 기간 주문건들 전부 오더 들어가고용 택배는 16일부터 나가용 🙏🏻 15일 광복절 휴무라 14일 택배 못나가용 택배가 쉽니당 ㅠ 기나긴 휴가 기간에도 많이들 찾아주셔서 감사합니동 ♥',
      like_count: 59,
      comment_count: 5,
      isAds: false,
    },
    {
      pk: '3168330299339274157',
      id: '64d900efb4e2fe7fd947e3fd',
      date: '2023-08-13T08:13:45',
      user_name: '5_yeeeeeah',
      image_url:
        'https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-15/367390592_1461620257983703_1748973046590572844_n.jpg?stp=dst-jpg_e35_s1080x1080&_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_cat=107&_nc_ohc=YxSkePj7mxAAX88AaXB&edm=AMKDjl4BAAAA&ccb=7-5&ig_cache_key=MzE2ODMzMDI5OTMzOTI3NDE1Nw%3D%3D.2-ccb7-5&oh=00_AfBCt4eqJUJIqiVO6oF989tR3I_K6kqihxGtZVusVo2RgA&oe=64DDD7BE&_nc_sid=472314',
      text: '다음주 주말이 빨리 왔으면 좋겠다...💜🤍',
      like_count: 632,
      comment_count: 11,
      isAds: false,
    },
    {
      pk: '3168420331273404411',
      id: '64d900efb4e2fe7fd947e3fe',
      date: '2023-08-13T11:12:38',
      user_name: 'iroulri',
      image_url: null,
      text: '일요팅 업데이트 슬금슬금 하고 이쒀용 ~ 오늘부터 휴가 기간 주문건들 전부 오더 들어가고용 택배는 16일부터 나가용 🙏🏻 15일 광복절 휴무라 14일 택배 못나가용 택배가 쉽니당 ㅠ 기나긴 휴가 기간에도 많이들 찾아주셔서 감사합니동 ♥',
      like_count: 59,
      comment_count: 5,
      isAds: false,
    },
    {
      pk: '3168330299339274157',
      id: '64d900efb4e2fe7fd947e3fd',
      date: '2023-08-13T08:13:45',
      user_name: '5_yeeeeeah',
      image_url:
        'https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-15/367390592_1461620257983703_1748973046590572844_n.jpg?stp=dst-jpg_e35_s1080x1080&_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_cat=107&_nc_ohc=YxSkePj7mxAAX88AaXB&edm=AMKDjl4BAAAA&ccb=7-5&ig_cache_key=MzE2ODMzMDI5OTMzOTI3NDE1Nw%3D%3D.2-ccb7-5&oh=00_AfBCt4eqJUJIqiVO6oF989tR3I_K6kqihxGtZVusVo2RgA&oe=64DDD7BE&_nc_sid=472314',
      text: '다음주 주말이 빨리 왔으면 좋겠다...💜🤍',
      like_count: 632,
      comment_count: 11,
      isAds: false,
    },
    {
      pk: '3168420331273404411',
      id: '64d900efb4e2fe7fd947e3fe',
      date: '2023-08-13T11:12:38',
      user_name: 'iroulri',
      image_url: null,
      text: '일요팅 업데이트 슬금슬금 하고 이쒀용 ~ 오늘부터 휴가 기간 주문건들 전부 오더 들어가고용 택배는 16일부터 나가용 🙏🏻 15일 광복절 휴무라 14일 택배 못나가용 택배가 쉽니당 ㅠ 기나긴 휴가 기간에도 많이들 찾아주셔서 감사합니동 ♥',
      like_count: 59,
      comment_count: 5,
      isAds: false,
    },
    {
      pk: '3168330299339274157',
      id: '64d900efb4e2fe7fd947e3fd',
      date: '2023-08-13T08:13:45',
      user_name: '5_yeeeeeah',
      image_url:
        'https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-15/367390592_1461620257983703_1748973046590572844_n.jpg?stp=dst-jpg_e35_s1080x1080&_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_cat=107&_nc_ohc=YxSkePj7mxAAX88AaXB&edm=AMKDjl4BAAAA&ccb=7-5&ig_cache_key=MzE2ODMzMDI5OTMzOTI3NDE1Nw%3D%3D.2-ccb7-5&oh=00_AfBCt4eqJUJIqiVO6oF989tR3I_K6kqihxGtZVusVo2RgA&oe=64DDD7BE&_nc_sid=472314',
      text: '다음주 주말이 빨리 왔으면 좋겠다...💜🤍',
      like_count: 632,
      comment_count: 11,
      isAds: false,
    },
    {
      pk: '3168420331273404411',
      id: '64d900efb4e2fe7fd947e3fe',
      date: '2023-08-13T11:12:38',
      user_name: 'iroulri',
      image_url: null,
      text: '일요팅 업데이트 슬금슬금 하고 이쒀용 ~ 오늘부터 휴가 기간 주문건들 전부 오더 들어가고용 택배는 16일부터 나가용 🙏🏻 15일 광복절 휴무라 14일 택배 못나가용 택배가 쉽니당 ㅠ 기나긴 휴가 기간에도 많이들 찾아주셔서 감사합니동 ♥',
      like_count: 59,
      comment_count: 5,
      isAds: false,
    },
    {
      pk: '3168330299339274157',
      id: '64d900efb4e2fe7fd947e3fd',
      date: '2023-08-13T08:13:45',
      user_name: '5_yeeeeeah',
      image_url:
        'https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-15/367390592_1461620257983703_1748973046590572844_n.jpg?stp=dst-jpg_e35_s1080x1080&_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_cat=107&_nc_ohc=YxSkePj7mxAAX88AaXB&edm=AMKDjl4BAAAA&ccb=7-5&ig_cache_key=MzE2ODMzMDI5OTMzOTI3NDE1Nw%3D%3D.2-ccb7-5&oh=00_AfBCt4eqJUJIqiVO6oF989tR3I_K6kqihxGtZVusVo2RgA&oe=64DDD7BE&_nc_sid=472314',
      text: '다음주 주말이 빨리 왔으면 좋겠다...💜🤍',
      like_count: 632,
      comment_count: 11,
      isAds: false,
    },
    {
      pk: '3168420331273404411',
      id: '64d900efb4e2fe7fd947e3fe',
      date: '2023-08-13T11:12:38',
      user_name: 'iroulri',
      image_url: null,
      text: '일요팅 업데이트 슬금슬금 하고 이쒀용 ~ 오늘부터 휴가 기간 주문건들 전부 오더 들어가고용 택배는 16일부터 나가용 🙏🏻 15일 광복절 휴무라 14일 택배 못나가용 택배가 쉽니당 ㅠ 기나긴 휴가 기간에도 많이들 찾아주셔서 감사합니동 ♥',
      like_count: 59,
      comment_count: 5,
      isAds: false,
    },
  ],
};

export default function PostResult() {
  const [postList, setPostList] = useState([]);

  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  const getPostList = useCallback(() => {
    setPostList(POST_DATA.results);
  });

  useEffect(() => {
    getPostList();
  }, [inView]);

  return (
    <StPostResult>
      <p>총 100개의 게시물</p>
      <StPostList>
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
      </StPostList>
    </StPostResult>
  );
}

const StPostResult = styled.section`
  & > p {
    margin-bottom: 1.6rem;
    ${({ theme }) => theme.fonts.Title1};
  }
`;

const StPostList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  row-gap: 4rem;
  column-gap: 0.9rem;
`;
