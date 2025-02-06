<template>
    <div class="max-w-3xl mx-auto mt-10">
        <h1 class="text-2xl font-bold mb-4 quiz-title">{{ quiz.title }}</h1>

        <form class="test-class" @submit.prevent="submitQuiz">
            <div v-for="(question, index) in quiz.questions" :key="question.id" class="mb-6">
                <h2 class="font-semibold quiz-question-title">{{ index + 1 }}. {{ question.text }}</h2>

                <div class="form-background" v-for="answer in question.answers" :key="answer.id">
                    <label class="flex items-center space-x-2">
                        <input
                            type="radio"
                            :name="'question-' + question.id"
                            :value="answer.id"
                            v-model="selectedAnswers[question.id]"
                        />
                    </label>
                    <span style="margin-left: 10%;">{{ answer.text }}</span>
                </div>
            </div>

            <button type="submit" class="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Submit Quiz
            </button>
        </form>
    </div>
</template>

<script>
import { getQuizById } from '@/services/quizService';

export default {
    name: 'QuizDetail',
    data() {
        return {
            quiz: { title: '', questions: [] },
            selectedAnswers: {},
        };
    },
    mounted() {
        this.getTheQuiz();
    },
    methods: {
        async getTheQuiz() {
        try {
            const quizId = this.$route.params.id;
            this.quiz = await getQuizById(quizId);
            console.log('Fetched quiz:', this.quiz);
        } catch (error) {
            console.error('Error fetching quiz:', error);
        }
    },
        submitQuiz() {
            console.log('Submitted answers:', this.selectedAnswers);
            // TODO: Send selectedAnswers to API
        },
    },
};
</script>

<style scoped>

    .quiz-title {
        text-align: center;
    }

    .quiz-question-title {
        text-align: center;
        background-color: #f5f5f5;
        padding: 10px;
    }

    .test-class {
        width: 45%;
        display: inline-block;
    }

    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #f5f5f5;
        padding: 20px;
    }

    .form-background {
        background-color: floralwhite;
        display: flex;
        align-items: center;  /* Ensures everything is vertically aligned */
        padding: 10px;
        width: 100%;
    }

    /* 🛠️ Ensures radio button and text stay on the same line */
    label {
        display: flex;
        align-items: center;
        width: 20%;
        cursor: pointer;
        background-color: floralwhite;
    }

    /* ✅ Radio button styles */
    input[type="radio"] {
        appearance: none; /* Removes default styles */
        width: 20px;
        height: 20px;
        border: 2px solid black;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        margin-right: 10px;
        background-color: white;
        transition: background 0.3s;
    }

    /* ✅ When selected, background turns red */
    input[type="radio"]:checked {
        background-color: darkblue;
    }

    /* ✅ Make answer text align properly */
    span {
        flex: 1; /* Makes sure text expands evenly */
        cursor: pointer;
        background-color: floralwhite;
        color: black;
    }

    button {
        cursor: pointer;
        padding: 10px 20px;
        font-size: 16px;
        background-color: orange;
        color: white;
        border-radius: 5px;
        transition: all 0.2s;
    }

    button:hover {
        filter: brightness(0.9);
    }

    button:active {
        filter: brightness(0.8);
    }

</style>
