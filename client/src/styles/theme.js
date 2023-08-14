import { css } from 'styled-components';

const colors = {
  Black: '#212121',
  White: '#FFFFFF',
  Gray1: '#F5F5F9',
  Gray2: '#E9E9EE',
  Gray3: '#C6C6CD',
  Gray4: '#9090A0',
  Gray5: '#626273',
  Gray6: '#464656',
  main: '#597CFF',
};

const fonts = {
  Head1: css`
    font-family: Pretendard;
    font-size: 2.2rem;
    font-style: normal;
    font-weight: 700;
    line-height: 130%;`,

  Head2: css`
    font-family: Pretendard;
    font-size: 1.8rem;
    font-style: normal;
    font-weight: 700;
    line-height: 130%;
    `,

  Head3: css`
    font-family: Pretendard;
    font-size: 1.8rem;
    font-style: normal;
    font-weight: 500;
    line-height: 130%; 
    `,

  Title1: css`
    font-family: Pretendard;
    font-size: 1.6rem;
    font-style: normal;
    font-weight: 700;
    line-height: 130%;
  `,

  Title2: css`
    font-family: Pretendard;
    font-size: 1.4rem;
    font-style: normal;
    font-weight: 700;
    line-height: 150%;
  `,

  Body1: css`
    font-family: Pretendard;
    font-size: 1.6rem;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
  `,

  Body2: css`
    font-family: Pretendard;
    font-size: 1.4rem;
    font-style: normal;
    font-weight: 500;
    line-height: 150%;
  `,

  Body3: css`
    font-family: Pretendard;
    font-size: 1.4rem;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
  `,

  Body4: css`
    font-family: Pretendard;
    font-size: 1.2rem;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
  `,

  Body5: css`
    font-family: Pretendard;
    font-size: 1.2rem;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
  `,

  Body6: css`
    font-family: Pretendard;
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: 130%;
  `,
};

const theme = {
  colors,
  fonts,
};

export default theme;
