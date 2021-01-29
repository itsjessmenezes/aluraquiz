import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { useRouter } from 'next/router';

import db from '../db.json';
import Widget from '../src/components/Widget';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import QuizLogo from '../src/components/QuizLogo';
import Input from '../src/components/Input';
import Button from '../src/components/Button';

// const BackgroundImage = styled.div`
// background-image: url(${db.bg});
// flex: 1;
// background-size: cover;
// background-position: center;
// `;


export default function Home() {
  const router = useRouter();
  const [name, setName] = React.useState('');
  return(
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>AluraQuiz</title>
      </Head>
      <QuizContainer>
        <QuizLogo />
        <Widget>
        <Widget.Header>
          <h1>English Time!</h1>
          </Widget.Header>
        <Widget.Content>
          <p>Te desafio a acertar os questionarios de inglês sobre pronuncias e significados de algumas palavras</p>

          <form onSubmit={function (e) {
            e.preventDefault();
            router.push(`./quiz?name${name}`)
          }}>
            <Input
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder="Diz aí seu nome"
            name="nomeDoUsuario"
            value={name}
            />
            <Button type="submit" disabled={name.length === 0}>{`Bora jogar ${name}?`}</Button>
          </form>
        </Widget.Content>
        </Widget>

        <Widget>
          <Widget.Content>
          <h1>Quizes da galera</h1>
            
          <p>Lorem ipsum dolor sit amet...</p>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/itsjessmenezes" />
      </QuizBackground>
  )
}
