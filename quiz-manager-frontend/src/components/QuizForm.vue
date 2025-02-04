<template>
    <div>
        <h1>Create Quiz</h1>
        <form @submit.prevent="submitForm">
            <div>
                <label for="title">Title:</label>
                <input type="text" v-model="title" required />
            </div>
            <div v-for="(question, index) in questions" :key="index">
                <label for="question">Question:</label>
                <input type="text" v-model="question.text" required />
                <div v-for="(answer, idx) in question.answers" :key="idx">
                    <label for="answer">Answer:</label>
                    <input type="text" v-model="answer.text" required />
                    <label for="is_correct">Correct:</label>
                    <input type="checkbox" v-model="answer.is_correct" />
                </div>
                <button type="button" @click="addAnswer(index)">Add Answer</button>
            </div>
            <button type="button" @click="addQuestion">Add Question</button>
            <button type="submit">Create Quiz</button>
        </form>
    </div>
</template>

<script>
import { createQuiz } from '@/services/quizService';

export default {
    data() {
        return {
            title: '',
            questions: [
                {
                    text: '',
                    answers: [
                        { text: '', is_correct: false },
                    ],
                },
            ],
        };
    },
    methods: {
        addQuestion() {
            this.questions.push({
                text: '',
                answers: [
                    { text: '', is_correct: false },
                ],
            });
        },
        addAnswer(index) {
            this.questions[index].answers.push({ text: '', is_correct: false });
        },
        async submitForm() {
            const quiz = {
                title: this.title,
                questions: this.questions,
            };
            await createQuiz(quiz);
            this.$router.push({ name: 'QuizList' });
        },
    },
};
</script>