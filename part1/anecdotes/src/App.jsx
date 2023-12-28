import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Header = (props) => (
  <h1> {props.text} </h1>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [array, setArray] = useState(new Uint8Array(8))
  const [highest, setHighest] = useState(0)

  const handleSelected = () => {
    setSelected(Math.floor(Math.random() * (anecdotes.length - 0)))
    console.log(Math.floor(Math.random() * (anecdotes.length - 0)))
    setHighest(array.indexOf(Math.max(...array)))
  }

  const handleVote = () => {
    const copy = [...array]
    copy[selected] += 1
    setArray(copy)
    setHighest(copy.indexOf(Math.max(...copy)))
  }

  return (
    <div>
      <Header text="Anecdote of the day" />
      {anecdotes[selected]} <br></br>
      has {array[selected]} votes <br></br>
      <Button handleClick={handleSelected} text="next anecdote" /> 
      <Button handleClick={handleVote} text="vote" />
      <Header text="Anecdote with most votes" />
      {anecdotes[highest]} <br></br>
      has {array[highest]} votes <br></br>
    </div>
  )
}

export default App