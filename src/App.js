import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import breakpoints from './breakpoints'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  text-align: center;
  /* font-family: 'Jost', sans-serif; */
  color: #fff;
  height: 100vh;
`

const Quote = styled.div`
  /* padding: 3rem 12rem; */
  font-size: 2.8rem;

  ${breakpoints.sm`
    font-size: 1.5rem;
    padding: 2rem;
  `}
  ${breakpoints.md`
    font-size: 2.3rem;
    padding: 4rem;
  `}
  ${breakpoints.lg`
    font-size: 2.5rem;
    padding: 6rem;
  `}

`

const Author = styled.div`

  ${breakpoints.sm`
    font-size: 1.3rem;
    margin-bottom: 4rem;
  `}
  ${breakpoints.md`
    font-size: 1.5rem;
    margin-bottom: 6rem;
  `}
  ${breakpoints.lg`
    font-size: 1.8rem;
    margin-bottom: 8rem;
  `}
`

const Button = styled.div`
  background: none;
  border: 1px solid #fff;
  padding: 1rem 2rem;
  border-radius: 4px;
  cursor: pointer;
  color: #fff;

  ${breakpoints.sm`
    // margin-top: 5rem;
  `}
  ${breakpoints.md`
  
  `}
  ${breakpoints.lg`
   
  `}
  `

function RandomQuote() {
  const [quote, setQuote] = useState('')
  const [author, setAuthor] = useState('')
  const [effectToggle, setEffectToggle] = useState(true)
  const [error, setError] = useState('')

  const changeBackground = () => {
    const hexValues = [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
    ]
    let hex1 = '#'
    let hex2 = '#'

    for (let i = 0; i < 6; i++) {
      const index1 = Math.floor(Math.random() * hexValues.length)
      const index2 = Math.floor(Math.random() * hexValues.length)
      hex1 += hexValues[index1]
      hex2 += hexValues[index2]
    }

    document.body.style.backgroundImage = `linear-gradient(45deg, ${hex1}, ${hex2})`
  }

  const handleClick = () => setEffectToggle(!effectToggle)

  useEffect(() => {
    const getDataAndUpdateState = async () => {
      try {
        const response = await axios({
          method: 'GET',
          url: 'https://random-math-quote-api.herokuapp.com/',
        })
        setQuote(response.data.quote)
        setAuthor(response.data.author)
        changeBackground()
      } catch (error) {
        setError(error)
      }
    }
    getDataAndUpdateState()
  }, [effectToggle])

  return (
    <>
      {error && <div>Error: {error}</div>}
      <Wrapper onKeyDown={handleClick} tabIndex={0}>
        <Quote>{quote}</Quote>
        <Author>{author}</Author>
        <Button onClick={handleClick}>click for a new quote</Button>
      </Wrapper>
    </>
  )
}

export default RandomQuote
