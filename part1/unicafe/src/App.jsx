import { useState } from 'react'

const Header = ({ text }) => {
  return <h1>{text}</h1>
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticLine = (props) => {
  return <tr>
      <td> {props.text} </td>
      <td> {props.value} </td> 
   </tr>
}

const Statistics = (props) => {
  if (props.good + props.neutral + props.bad == 0) {
    return <p> No feedback given </p>
  }
  return <table>
      <tbody>
        <StatisticLine text="good" value={props.good} />
        <StatisticLine text="neutral" value={props.neutral} />
        <StatisticLine text="bad" value={props.bad} />
        <StatisticLine text="all" value={props.good + props.neutral + props.bad} />
        <StatisticLine text="average" value={((props.good * 1) + (props.bad * -1)) / (props.good + props.neutral + props.bad)} />
        <StatisticLine text="positive" value= {(props.good) / (props.good + props.neutral + props.bad) * 100 +'%'} />
      </tbody>
    </table>
}





const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }

  const handleBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <Header text = "give feedback" />
      <Button handleClick={handleGood} text="good" />
      <Button handleClick={handleNeutral} text="neutral" />
      <Button handleClick={handleBad} text="bad" />
      <Header text = "statistics" />
      <Statistics good = {good} neutral = {neutral} bad = {bad} />
    </div>
  )
}

export default App