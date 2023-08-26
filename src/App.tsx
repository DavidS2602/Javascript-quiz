import './App.css'
import { Container, Stack, Typography } from '@mui/material'
import JavascriptLogo from './JavascriptLogo'

function App() {

  return (
    <main>
      <Container maxWidth="sm">
        <Stack>
          <JavascriptLogo />
          <Typography variant="h1">
            App
          </Typography>
        </Stack>
      </Container>
    </main>
  )
}

export default App
