import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';

const Home = () => {

  const [userInput, setUserInput] = useState('');

  const onUserChangedText =(event) => {
    
    setUserInput(event.target.value);
  };

  return (
    <div className="root">
      <Head>
        <title>GPT-3 Writer | buildspace</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Generate a fresh workout program with Arnie. </h1>
          </div>
          <div className="header-subtitle">
            <h2> Ask Arnie for any body part program and tell him how many days you want the program to run for (Ex. Upper body gym workout over 3 days) </h2>
          </div>
          <div className="prompt-container">
          <textarea 
          placeholder="start typing here" 
          className="prompt-box"
          value={userInput}
          onChange= {onUserChangedText} 
          />
        </div>
      <div className='prompt-buttons'>
        <a className='generate-button' onClick= {null}>
          <div className='generate'>
            <p> Generate</p>
          </div>
        </a>
      </div>
        </div>
      </div>
      <div className="badge-container grow">
        <a
          href="https://buildspace.so/builds/ai-writer"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p>build with buildspace</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
