import { create } from "zustand";
import { type Question } from "../types";

interface State {
    questions: Question[];
    currentQuestion: number;
    fetchQuestions: (limit: number) => Promise<void>;
    selectAnswer: (questionId: number, answerIndex: number) => void
    goNextQuestion: () => void
    goPrevQuestion: () => void
}

const useQuestionsStore = create<State>((set, get) => {
    return {
        questions: [],
        currentQuestion: 0,
        fetchQuestions: async (limit: number) => {
            const res = await fetch('http://localhost:5173/Questions.json')
            const json = await res.json()
            const questions = json.sort(() => Math.random() - 0.5).slice(0, limit)
            set({ questions })
        },
        selectAnswer: (questionId: number, answerIndex: number) => {
            const { questions } = get()
            const newQuestion = structuredClone(questions)
            const QuestionIndex = newQuestion.findIndex(q => q.id === questionId)
            const questionInfo = newQuestion[QuestionIndex]
            const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex
            newQuestion[QuestionIndex] = {
                ...questionInfo,
                isCorrectUserAnswer,
                userSelectedAnswer: answerIndex,
            }

            set({ questions: newQuestion })
        },
        goNextQuestion: () => {
            const { currentQuestion, questions } = get()
            const nextQuestion = currentQuestion + 1
            if (currentQuestion < questions.length) {
                set({ currentQuestion: nextQuestion })
            }
        },
        goPrevQuestion: () => {
            const { currentQuestion } = get()
            const prevQuestion = currentQuestion - 1
            if (currentQuestion > 0) {
                set({ currentQuestion: prevQuestion })
            }
        }
    };
});

export default useQuestionsStore;
