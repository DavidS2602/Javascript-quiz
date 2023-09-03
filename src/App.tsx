import './App.css'
import { Container, Stack, Typography } from '@mui/material'
import JavascriptLogo from './JavascriptLogo'
import Start from './Start'
import useQuestionsStore from './store/questions'

function App() {
  const questions = useQuestionsStore((state) => state.questions)
  console.log(questions)
  return (
    <main>
      <Container maxWidth="sm">
        <Stack direction='row' gap={2} alignItems='center' justifyContent='center'>
          <JavascriptLogo />
          <Typography variant="h2" component='h1'>
            Javascript Quiz
          </Typography>
        </Stack>
        {questions.length === 0 ? <Start /> : <p>Juego</p>}
      </Container>
    </main>
  )
}

export default App
