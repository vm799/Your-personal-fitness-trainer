import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';

const Home = () => {

  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
 
  const callGenerateEndpoint = async () => {
    setIsGenerating(true);
    console.log("Calling OpenAI...")
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text)

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  }

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
            <h1>Bored in the gym?  </h1>
          </div>
          <div className="header-subtitle">
            <h2 className='header-highlight'>Get some fresh ideas on whatever you want to train today</h2>
            <h2>  Type in the body part you want to train today and you will get a workout, warm up and day of food inspo with snacks!</h2>
          </div>
          <div className="prompt-container">
          <textarea 
          placeholder="Please type the body part you fancy working on in the gym today." 
          className="prompt-box"
          value={userInput}
          onChange= {onUserChangedText} 
          />
        </div>
      <div className='prompt-buttons'>
        <a className={isGenerating ? 'generate-button loading' : 'generate-button'} 
           onClick= {callGenerateEndpoint}
        >
          <div className='generate'>
            {isGenerating ? <span className='loader'></span> :    
            <p> Generate your workout</p>}
          </div>
        </a>
      </div>
      {apiOutput && (
        <div className='output'>
          <div className='output-header-container'>
            <div className='output-header'>
              <h3> YOUR WORKOUT & MEAL PLAN FOR TODAY</h3>
              </div>
              </div>
              <div className='output-content'>
                <p>{apiOutput}</p>
                </div>
                </div>
      )}
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
