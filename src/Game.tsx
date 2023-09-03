import { Card, IconButton, List, ListItem, ListItemButton, ListItemText, Stack, Typography } from "@mui/material";
import SyntaxHighlighter from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/hljs";
import useQuestionsStore from './store/questions';
import { type Question as QuestionType } from "./types";

const Question = ({ info } : { info: QuestionType }) => {
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
                        <ListItemButton>
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

    const questionInfo = questions[currentQuestion]

    return (
        <Question info={questionInfo}/>
    );
}

export default Game;