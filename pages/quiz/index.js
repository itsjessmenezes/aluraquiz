// import React from 'react';
// import db from '../../db.json';
// import Widget from '../../src/components/Widget';
// import QuizBackground from '../../src/components/QuizBackground';
// import QuizContainer from '../../src/components/QuizContainer';
// import AlternativesForm from '../../src/components/AlternativesForm';
// import QuizLogo from '../../src/components/QuizLogo';
// import Button from '../../src/components/Button';
// import Footer from '../../src/components/Footer';

// function ResultWidget({ results }) {
//   const [name, setName] = React.useState('');
//   return (
//     <>
//     <Widget>
//       <Widget.Header>Tela de Resultado:</Widget.Header>

//       <Widget.Content>
//         <h2>{`Thanks you ${name}`}</h2>
//         <p>
//           Você acertou
//           {' '}
//           {results.filter((isTrue) => isTrue).length}
//           {/* {results.reduce((actualSummation, actualResult) => {
//             const isRight = actualResult === true;
//             if(isRight) {
//               return actualSummation + 1;
//             }
//             return actualSummation;
//           }, 0)} */}
//           {' '}
//           perguntas</p>
//         <ul>
//           {results.map((result, index) => (
//             <li key={`result__${result}`}>
//               #0
//               {index + 1}
//               {' '}
//               Resultado: {
//               result === true
//               ? 'Acertou'
//               : 'Errou'
//               }</li>
//           ))}
//         </ul>
//       </Widget.Content>
//     </Widget>

//     <Footer>
//       <a href="https://www.instagram.com/inglescomshane/"></a>
//           <p>
//             Perguntas inspiradas no conteúdo do professor
//             {' '}
            
//             {' '}
//             <a href="https://www.instagram.com/inglescomshane/">
//               <span>Shane.</span>
//             </a>
//             {' '}
//             Um americano que vive no Brasil e compartilha conteúdos incríveis!
//             {' '}
//             <a href="https://www.instagram.com/inglescomshane/">
//               <span>Aproveita para conferir!</span>
//             </a>
//           </p>
//     </Footer>
//     <Footer style={{ backgroundColor: 'transparent', fontSize: '10px'}}>
//       <a href="https://www.freepik.com/free-vector/learn-language-illustration-study-foreign-languages-concept_2703421.htm">Freepik background</a>
//     </Footer>
//     </>
//   );
// }

// function LoadingWidget() {
//   return (
//     <Widget>
//       <Widget.Header>Carregando...</Widget.Header>

//       <Widget.Content>[Desafio do Loading]</Widget.Content>
//     </Widget>
//   );
// }

// function QuestionWidget({
//   question,
//   questionIndex,
//   totalQuestions,
//   onSubmit,
//   addResult,
// }) {
//   const [selectedAlternative, setSelectedAlternative] = React.useState(undefined);
//   const [isQuestionSubmitted, setQuestionSubmitted] = React.useState(false);
//   const questionId = `question__${questionIndex}`;
//   const isCorrect = selectedAlternative === question.answer;
//   const hasAlternativeSelected = selectedAlternative !== undefined;
  
//   return (
//     <Widget>
//       <Widget.Header>
//         <h3>{`Pergunta ${questionIndex + 1} de ${totalQuestions}`}</h3>
//       </Widget.Header>
//       {/* <img
//         alt="Descrição"
//         style={{
//           width: '100%',
//           height: '150px',
//           objectFit: 'cover',
//         }}
//         src="https://placehold.it/400x400"
//         /> */}
//       <Widget.Content>
//         <h2>{question.title}</h2>
//         <p>{question.description}</p>

//         <AlternativesForm
//           onSubmit={e => {
//             e.preventDefault();
//             setQuestionSubmitted(true);
//             setTimeout(() => {
//               addResult(isCorrect);
//               onSubmit();
//               setQuestionSubmitted(false);
//               setSelectedAlternative(undefined);
//             }, 1 * 1000);
//           }}
//         >
//           {question.alternatives.map((alternative, alternativeIndex) => {
//             const alternativeId = `alternative__${alternativeIndex}`;
//             const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
//             const isSelected = selectedAlternative === alternativeIndex;
//             return (
//               <Widget.Topic
//               as="label"
//               key={alternativeId}
//               data-selected={isSelected}
//               data-status={isQuestionSubmitted && alternativeStatus}
//               htmlFor={alternativeId}
//               >
//                 <input
//                   type="radio"
//                   style={{ display: 'none'}}
//                   id={alternativeId}
//                   name={questionId}
//                   onChange={() => setSelectedAlternative(alternativeIndex)}
//                 />
//                 {alternative}
//               </Widget.Topic>
//             );
//           })}
//           {/* <pre>
//             {JSON.stringify(question, null, 4)}
//           </pre> */}
//           <Button type="submit" disabled={!hasAlternativeSelected}>
//             Confirmar
//           </Button>
//           {isQuestionSubmitted && isCorrect && <p>Você acertou!</p>}
//           {isQuestionSubmitted && !isCorrect && <p>Você errou!</p>}
//         </AlternativesForm>
//       </Widget.Content>
//     </Widget>
//   );
// }

// const screenStates = {
//   QUIZ: 'QUIZ',
//   LOADING: 'LOADING',
//   RESULT: 'RESULT',
// };

// export default function QuizPage() {
//   const [screenState, setScreenState] = React.useState(screenStates.LOADING);
//   const [currentQuestion, setCurrentQuestion] = React.useState(0);
//   const questionIndex = currentQuestion;
//   const question = db.questions[questionIndex];
//   const totalQuestions = db.questions.length;
//   const [results, setResults] = React.useState([]);

//   function addResult(result) {
//     setResults([
//       ...results,
//       result,
//     ]);
//   }

//   React.useEffect(() => {
//     setTimeout(() => {
//       setScreenState(screenStates.QUIZ);
//     }, 1 * 1000);
//     //didMount
//   }, []);

//   function handleSubmitQuiz() {
//     const nextQuestion = questionIndex + 1;
//     if (nextQuestion < totalQuestions) {
//       setCurrentQuestion(nextQuestion);
//     } else {
//       setScreenState(screenStates.RESULT);
//     }
//   }

//   return (
//     <QuizBackground backgroundImage={db.bg}>
//       <QuizContainer>
//         <QuizLogo />
//         {screenState === screenStates.QUIZ && (
//           <QuestionWidget
//             question={question}
//             questionIndex={questionIndex}
//             totalQuestions={totalQuestions}
//             onSubmit={handleSubmitQuiz}
//             addResult={addResult}
//           />
//         )}
//         {screenState === screenStates.LOADING && <LoadingWidget />}

//         {screenState === screenStates.RESULT && <ResultWidget results={results} />}
//       </QuizContainer>
//     </QuizBackground>
//   );
// }


import React from 'react';
import { ThemeProvider } from 'styled-components';
import QuizScreen from '../../src/screens/Quiz';
import db from '../../db.json';

export default function QuizDaGaleraPage() {
  return (
    <ThemeProvider theme={db.theme}>
      <QuizScreen
        externalQuestions={db.questions}
        externalBg={db.bg}
      />
    </ThemeProvider>
  );
}