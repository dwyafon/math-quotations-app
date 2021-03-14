import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import breakpoints from './breakpoints'

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
  font-family: 'Amiri', serif;
  color: #fff;
`;

const Quote = styled.div`

  ${breakpoints.sm`
    margin: 1rem auto 2rem;
    padding: 1rem;
    font-size: 1.5rem;
  `}

  ${breakpoints.md`
    margin: 1rem 2rem;
    font-size: 2rem;
  `}

  ${breakpoints.lg`
    margin: 4rem 6rem;
    padding: 1rem;
    font-size: 2.5rem;
  `}

${breakpoints.xl`
    margin: 1rem 8rem;
    font-size: 2.8rem;
  `}
`;

const Author = styled.div`
  margin: 1rem;


  ${breakpoints.sm`
    font-size: 1.5rem;
  `}

  ${breakpoints.md`
    margin: 2em 5rem;
    font-size: 2rem;
  `}

  ${breakpoints.lg`
    margin: 1rem 1rem;
    font-size: 2.2rem;
  `}

${breakpoints.xl`
    font-size: 2.5rem;
  `}
`;

const Button = styled.div`
  background: none;
  border: 1px solid #fff;
  padding: 1rem 2rem;
  border-radius: 4px;
  cursor: pointer;
  color: #fff;
  margin-top: 5rem;
  font-family: 'Jost', sans-serif;
  `;

function RandomQuote() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [effectToggle, setEffectToggle] = useState(true)
  const [error, setError] = useState('')
 
  const changeBackground = () => {
    const hexValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
    let hex1 = '#';
    let hex2 = '#';
  
    for (let i = 0; i < 6; i++) {
      const index1 = Math.floor(Math.random() * hexValues.length);
      const index2 = Math.floor(Math.random() * hexValues.length);
      hex1 += hexValues[index1];
      hex2 += hexValues[index2];
    }

    document.body.style.background = `linear-gradient(45deg, ${hex1}, ${hex2}) center center/cover`;
  }

  const handleClick = () => setEffectToggle(!effectToggle);

  useEffect(() => {
    const getDataAndUpdateState = async () => {
      try {
        const response = await axios({
          method: 'GET',
          url: 'https://random-math-quote-api.herokuapp.com/'
        });
        setQuote(response.data.quote);
        setAuthor(response.data.author);
        changeBackground();
      } catch (error) {
        setError(error);
      }
    }
    getDataAndUpdateState()
  }, [effectToggle]);

  return (
    <>
    {error && (<div>Error: {error}</div>)}
    <Wrapper onKeyDown={handleClick} tabIndex={0}>
      <Quote>{quote}</Quote>
      <Author>{author}</Author>
      <Button onClick={handleClick}>click for a new quote</Button>
    </Wrapper>
    </>
  );
}

export default RandomQuote;
