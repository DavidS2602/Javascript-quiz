import { Button } from "@mui/material";
import useQuestionsStore from "./store/questions";

const Start = () => {
    const fetchQuestions = useQuestionsStore(state => state.fetchQuestions)
    const handleClick = () => {
        fetchQuestions(10)
    }
    return (
        <Button onClick={handleClick} variant="container">Empezar</Button>
    );
}

export default Start;