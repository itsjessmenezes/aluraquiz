import styled from 'styled-components';
import db from '../../../db.json';

const QuizBackground = styled.div`
  width: 100%;
  background-size: cover;
  background-position: right;
  background-image: url(${({ backgroundImage }) => backgroundImage});
  background-color: ${({ theme }) => theme.colors.mainBg};
  flex: 1;
  @media screen and (max-width: 950px) {
    background-image: none;
    &:after {
      content: "";
      background-size: right; 
      background-position: center;
      background-size: cover;
      background-image:
        linear-gradient(transparent, ${({ theme }) => theme.colors.mainBg}),
        url(${({ backgroundImage }) => db.external ? backgroundImage : "https://blogsaverroes.juntadeandalucia.es/cristeacher/files/2020/06/cropped-hardest-part-learning-english.jpg"});
      display: block;
      width: 100%;
      height: 210px;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1;
    }
    *:first-child {
      position: relative;
      z-index: 10;
    }
  }
`;

export default QuizBackground;
