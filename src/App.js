import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
  font-family: 'Crimson Text', serif;
  color: #fff;
`;

const Quote = styled.div`
  margin: 3rem 12rem;
  font-size: 2.8rem;
`;

const Author = styled.div`
  margin: 1rem;
  font-size: 1.8rem;
  max-width: 600px;
`;

const Button = styled.div`
  background: none;
  border: 1px solid #fff;
  padding: 15px 25px;
  border-radius: 5px;
  cursor: pointer;
  color: #fff;
  margin-top: 100px;
  font-family: 'Open Sans', sans-serif;
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

    document.body.style.background = `linear-gradient(45deg, ${hex1}, ${hex2})`;
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
