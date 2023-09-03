import { Card, IconButton, List, ListItem, ListItemButton, ListItemText, Stack, Typography } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SyntaxHighlighter from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/hljs";
import useQuestionsStore from './store/questions';
import { type Question as QuestionType } from "./types";

const getbackgroundColor = (info: QuestionType, index: number) => {
    const { userSelectedAnswer, correctAnswer } = info
    if (userSelectedAnswer == null) return 'transparent'
    if (index !== correctAnswer && index !== userSelectedAnswer) return 'transparent'
    if (index === correctAnswer) return '#4caf50'
    if (index === userSelectedAnswer) return '#f44336'

    return 'transparent'
}
const Question = ({ info } : { info: QuestionType }) => {
    const selectAnswer = useQuestionsStore(state => state.selectAnswer)

    const handleClick = (answerIndex: number) => () => {
        selectAnswer(info.id, answerIndex)
    }

    return (
        <Card variant="outlined" sx={{ bgcolor:'transparent', p:2, color:'white', textAlign: 'left', marginTop: 4 }}>
            <Typography variant="h5">
                {info.question}
            </Typography>

            <SyntaxHighlighter language="javascript" style={nightOwl}>
                {info.code}
            </SyntaxHighlighter>

            <List sx={{ bgcolor: '#333' }} disablePadding>
                {info.answers.map((answer, index) => (
                    <ListItem key={index} divider>
                        <ListItemButton
                            disabled={info.userSelectedAnswer != null}
                            sx={{ bgcolor: getbackgroundColor(info, index) }}
                            onClick={handleClick(index)}>
                            <ListItemText primary={answer} sx={{ textAlign: 'center' }} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Card>
    )
}
const Game = () => {
    const questions = useQuestionsStore(state => state.questions)
    const currentQuestion = useQuestionsStore(state => state.currentQuestion)
    const goNextQuestion = useQuestionsStore(state => state.goNextQuestion)
    const goPrevQuestion = useQuestionsStore(state => state.goPrevQuestion)

    const questionInfo = questions[currentQuestion]

    return (
        <>
            <Stack direction='row' alignItems='center' justifyContent='center'>
                <IconButton onClick={goPrevQuestion} disabled={currentQuestion === 0} sx={{ color: 'white' }}>
                    <ArrowBackIosIcon />
                </IconButton>
                {currentQuestion + 1} / {questions.length}
                <IconButton onClick={goNextQuestion} disabled={currentQuestion >=  questions.length - 1}>
                    <ArrowForwardIosIcon />
                </IconButton>
            </Stack>
            <Question info={questionInfo}/>
        </>
    );
}

export default Game;