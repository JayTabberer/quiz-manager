<template>
    <div>
        <h1>Create Quiz</h1>
        <form @submit.prevent="submitForm" class="form-block">
            <div class="form-group">
                <label class="label-title" for="title">Title:</label>
                <input type="text" v-model="title" required />
            </div>

            <div v-for="(question, qIndex) in questions" :key="qIndex" class="question-block">
                <div class="form-group">
                    <label>Question:</label>
                    <input type="text" v-model="question.text" required />
                </div>

                <div v-for="(answer, aIndex) in question.answers" :key="aIndex" class="answer-block">
                    <div class="form-group">
                        <label>Answer:</label>
                        <input type="text" v-model="answer.text" required />
                    </div>
                    <div class="form-group checkbox-group">
                        <label>Correct:</label>
                        <input type="checkbox" v-model="answer.is_correct" />
                    </div>
                </div>

                <button type="button" @click="addAnswer(qIndex)">Add Answer</button>
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
                    answers: [{ text: '', is_correct: false }],
                },
            ],
        };
    },
    methods: {
        addQuestion() {
            this.questions.push({
                text: '',
                answers: [{ text: '', is_correct: false }],
            });
        },
        addAnswer(qIndex) {
            this.questions[qIndex].answers.push({ text: '', is_correct: false });
        },
        async submitForm() {
            try {
                const quiz = {
                    title: this.title,
                    questions: this.questions,
                };
                await createQuiz(quiz);
                this.$router.push({ name: 'QuizList' });
            } catch (error) {
                console.error("Error creating quiz:", error);
            }
        },
    },
};
</script>

<style scoped>

.form-block {
    width: 50%;
    margin: 0 auto;
    padding: 20px;
    background-color: white;
    margin-top: 50px;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.question-block, .answer-block {
    margin-top: 15px;
    padding: 10px;
    background-color: whitesmoke;
}

label {
    background-color: whitesmoke;
}

.label-title {
    background-color: white
}

.form-group {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}

.form-group label {
    flex: 1;
    font-weight: bold;
    text-align: right;
    margin-right: 10px;
}

.form-group input {
    flex: 2;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.checkbox-group {
    flex-direction: row;
}

button {
    margin-top: 10px;
    padding: 10px;
    background-color: orange;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 5px;
}

button:hover {
    background-color: #2c7a6b;
}
</style>

