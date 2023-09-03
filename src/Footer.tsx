import useQuestionsStore from './store/questions';
const Footer = () => {
    const questions = useQuestionsStore((state) => state.questions);
    let correct= 0
    let incorrect= 0
    let unanwsered= 0
    
    questions.forEach((question) => {
        const { userSelectedAnswer, correctAnswer } = question
        if (userSelectedAnswer == null) unanwsered++
        if (userSelectedAnswer === correctAnswer) correct++
        if (userSelectedAnswer !== correctAnswer) incorrect++
        else unanwsered++
    })
    return (
        <>
            <footer style={{ marginTop: '16px' }}>
                <strong>{`✓${correct} correctas ✕${incorrect} incorrectas  ${unanwsered} sin responder`}</strong>
            </footer>
        </>
    );
}

export default Footer;