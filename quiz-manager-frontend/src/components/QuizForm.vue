<template>
    <div>
        <h1>Create Quiz</h1>
        <form @submit.prevent="submitForm" class="form-block">
            <div style="background-color: white;">
                <label for="title">Title:</label>
                <input type="text" v-model="title" required />
            </div>
            <form style="background-color: white;" v-for="(question, index) in questions" :key="index">
                <label for="question">Question:</label>
                <input type="text" v-model="question.text" required />
                <form style="background-color: white;" v-for="(answer, idx) in question.answers" :key="idx">
                    <label for="answer">Answer:</label>
                    <input type="text" v-model="answer.text" required />
                    <label for="is_correct">Correct:</label>
                    <input type="checkbox" v-model="answer.is_correct" />
                </form>
            </form>
            <button type="button" @click="addAnswer(index)">Add Answer</button>
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

<style>

    .form-block {
        justify-content: center;
        width: 50%;
        margin: 0 auto;
        padding: 20px;
        background-color: white;
        margin-top: 50px;
    }

    label {
        width: 45%;
        display: inline-block;
        margin-top: 10px;
        background-color: white;
    }

    input {
        width: 45%;
        padding: 5px;
        margin-top: 5px;
        background-color: white;
    }

    button {
        margin-top: 10px;
        padding: 5px;
        background-color: orange;
        color: white;
        justify-content: space-around;
    }

    button:hover {
        background-color: #2c7a6b;
    }