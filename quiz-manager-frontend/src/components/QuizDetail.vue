<template>
    <div class="max-w-3xl mx-auto mt-10">
        <h1 class="text-2xl font-bold mb-4 quiz-title">{{ quiz.title }}</h1>

        <form class="test-class" @submit.prevent="submitQuiz">
            <div v-for="(question, index) in quiz.questions" :key="question.id" class="mb-6 testy-one">
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

            <div v-if="score !== null" class="mt-4 p-4 bg-green-100 rounded">
                <h2 class="text-lg font-bold">Your Score: {{ score }} / {{ totalQuestions }}</h2>
            </div>
        </form>
    </div>
</template>

<script>
import { getQuizById, submitQuiz } from '@/services/quizService';

export default {
    name: 'QuizDetail',
    data() {
        return {
            quiz: { title: '', questions: [] },
            selectedAnswers: {},
            score: null,
            totalQuestions: null,
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
        async submitQuiz() {
            try {
                const quizId = this.$route.params.id;
                const result = await submitQuiz(quizId, this.selectedAnswers);
                this.score = result.score;
                this.totalQuestions = result.totalQuestions;
                console.log('Quiz submitted:', result);
            } catch (error) {
                console.error('Error submitting quiz:', error);
            }
        },
    },
};
</script>

<style scoped>

    .quiz-title {
        text-align: center;
    }

    .testy-one {
        background-color: aquamarine;
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
