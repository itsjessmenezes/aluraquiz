import React, {useState} from 'react';
import db from '../../../db.json';
import Widget from '../../components/Widget';
import QuizBackground from '../../components/QuizBackground';
import QuizContainer from '../../components/QuizContainer';
import AlternativesForm from '../../components/AlternativesForm';
import QuizLogo from '../../components/QuizLogo';
import Button from '../../components/Button';
import Footer from '../../components/Footer';
import BackLinkArrow from '../../components/BackLinkArrow';
import Lottie from 'react-lottie';
import animationData from '../../../data.json';
import { useRouter } from 'next/router';

function ResultWidget({ results }) {
  const router = useRouter();
  const { name } = router.query;
  console.log(name);

  return (
    <>
    <Widget>
      <Widget.Header>Tela de Resultado:</Widget.Header>

      <Widget.Content>
        <h2>
          {db.external ? '' :
          `Thank you ${name}! `}</h2>
        <p>
          Você acertou
          {' '}
          {results.filter((isTrue) => isTrue).length}
          {/* {results.reduce((actualSummation, actualResult) => {
            const isRight = actualResult === true;
            if(isRight) {
              return actualSummation + 1;
            }
            return actualSummation;
          }, 0)} */}
          {' '}
          perguntas</p>
        <ul>
          {results.map((result, index) => (
            <li key={`result__${result}`}>
              #
              {index + 1}
              {' '}
              Resultado: {
              result === true
              ? 'Acertou'
              : 'Errou'
              }</li>
          ))}
        </ul>
      </Widget.Content>
    </Widget>

    <Footer>
      {db.external
      ?
      <>
        <a href="https://www.alura.com.br/">
          <img src="https://www.alura.com.br/assets/img/alura-logo-white.1570550707.svg" alt="Logo Alura" />
        </a>
          <p>
            Orgulhosamente criado durante
            {' '}
            a
            {' '}
            <a href="https://www.alura.com.br/">
              <span>Imersão React da Alura</span>
            </a>
          </p>
      </>
      :
      <>
      <a href="https://www.instagram.com/inglescomshane/"></a>
          <p>
            Perguntas inspiradas no conteúdo do professor
            {' '}
            
            {' '}
            <a href="https://www.instagram.com/inglescomshane/">
              <span>Shane.</span>
            </a>
            {' '}
            Um americano que vive no Brasil e compartilha conteúdos incríveis!
            {' '}
            <a href="https://www.instagram.com/inglescomshane/">
              <span>Aproveita para conferir!</span>
            </a>
          </p>
      </> 
    }
    </Footer>
    <Footer style={{ backgroundColor: 'transparent', fontSize: '10px'}}>
      {db.external ? '' : <a href="https://www.freepik.com/free-vector/learn-language-illustration-study-foreign-languages-concept_2703421.htm">Freepik background</a>}
    </Footer>
    </>
  );
}

function LoadingWidget() {
  const[animationState, setAnimationState] = useState({
    isStopped: false,
    isPaused: false,
  });
  const defaultOptions = {
    loog: true,
    autoplay: true,
    animationData: animationData,
    renderedSettings: {
      preserveAspectRation: 'xMidYMid slice'
    } 
  };

  return (
    <Widget>
      <Widget.Header>Carregando...</Widget.Header>

      <Widget.Content>
        {/* [Desafio do Loading] */}
        <div>
          <Lottie
            options={defaultOptions}
            height={200}
            width={200}
            isStopped={animationState.isStopped}
            isPaused={animationState.isPaused}
          />
        </div>

        </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({
  question,
  questionIndex,
  totalQuestions,
  onSubmit,
  addResult,
}) {
  const [selectedAlternative, setSelectedAlternative] = React.useState(undefined);
  const [isQuestionSubmitted, setQuestionSubmitted] = React.useState(false);
  const questionId = `question__${questionIndex}`;
  const isCorrect = selectedAlternative === question.answer;
  const hasAlternativeSelected = selectedAlternative !== undefined;
  
  return (
    <Widget>
      <Widget.Header>
        <BackLinkArrow href="/" />
        <h3>{`Pergunta ${questionIndex + 1} de ${totalQuestions}`}</h3>
      </Widget.Header>
      <Widget.Content>
        <h2>{question.title}</h2>
        <p>{question.description}</p>

        <AlternativesForm
          onSubmit={e => {
            e.preventDefault();
            setQuestionSubmitted(true);
            setTimeout(() => {
              addResult(isCorrect);
              onSubmit();
              setQuestionSubmitted(false);
              setSelectedAlternative(undefined);
            }, 1 * 1000);
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            const isSelected = selectedAlternative === alternativeIndex;
            return (
              <Widget.Topic
              as="label"
              key={alternativeId}
              data-selected={isSelected}
              data-status={isQuestionSubmitted && alternativeStatus}
              htmlFor={alternativeId}
              >
                <input
                  type="radio"
                  style={{ display: 'none'}}
                  id={alternativeId}
                  name={questionId}
                  onChange={() => setSelectedAlternative(alternativeIndex)}
                />
                {alternative}
              </Widget.Topic>
            );
          })}
          {/* <pre>
            {JSON.stringify(question, null, 4)}
          </pre> */}
          <Button type="submit" disabled={!hasAlternativeSelected}>
            Confirmar
          </Button>
          {isQuestionSubmitted && isCorrect && <p>Você acertou!</p>}
          {isQuestionSubmitted && !isCorrect && <p>Você errou!</p>}
        </AlternativesForm>
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

export default function QuizPage({ externalQuestions, externalBg  }) {
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion;
  const question = externalQuestions[questionIndex];
  const [results, setResults] = React.useState([]);
  const totalQuestions = externalQuestions.length;
  const bg = externalBg;

  function addResult(result) {
    setResults([
      ...results,
      result,
    ]);
  }

  React.useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 3 * 1000);
    //didMount
  }, []);

  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground backgroundImage={bg}>
      <QuizContainer>
        <QuizLogo />
        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
            onSubmit={handleSubmitQuiz}
            addResult={addResult}
          />
        )}
        {screenState === screenStates.LOADING && <LoadingWidget />}

        {screenState === screenStates.RESULT && <ResultWidget results={results} />}
      </QuizContainer>
    </QuizBackground>
  );
}
