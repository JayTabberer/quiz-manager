<template>
    <div class="max-w-3xl mx-auto mt-10">
      <h1 class="text-2xl font-bold mb-4 quiz-title">{{ quiz.title }}</h1>

      <div v-if="score !== null" class="mt-4 p-4 bg-green-100 rounded">
          <h2 class="text-lg font-bold w-50">Your Score: {{ score }} / {{ totalQuestions }}</h2>
        </div>
  
      <form class="form-container form-margin mb-5" @submit.prevent="submitQuiz">
        <div v-for="(question, index) in quiz.questions" :key="question.id" class="mb-6 question-container">
          <h2 class="font-semibold quiz-question-title">{{ index + 1 }}. {{ question.text }}</h2>
  
          <div class="form-background" v-for="answer in question.answers" :key="answer.id">
            <label class="flex items-center space-x-2">
              <input
                type="radio"
                :name="'question-' + question.id"
                :value="answer.id"
                v-model="selectedAnswers[question.id]"
              />
              <span>{{ answer.text }}</span>
            </label>
          </div>
        </div>
  
        <button 
            type="submit" 
            class="get-results-button"
            :disabled="userRole === 'viewer'"
            >
            Get results
        </button>

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
        userRole: null,
      };
    },
    mounted() {
      this.getTheQuiz();
    },
    methods: {
      async getTheQuiz() {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user && user.role) {
                this.userRole = user.role;
            }
            const quizId = this.$route.params.id;
            this.quiz = await getQuizById(quizId);
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
  /* Title */
  .quiz-title {
    text-align: center;
  }

  .get-results-button:disabled {
    background-color: gray;
    cursor: not-allowed;
    opacity: 0.6;
    }
  
  /* Question Titles */
  .quiz-question-title {
    text-align: center;
    background-color: lightsteelblue;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 6px;
    font-size: 1.1em;
  }
  
  /* Question Container */
  .question-container {
    padding: 10px;
    background-color: #fafafa;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
  }
  
  /* Form Background */
  .form-background {
    background-color: floralwhite;
    display: flex;
    align-items: center;
    padding: 10px;
    width: 100%;
    border-radius: 6px;
    margin-bottom: 5px;
  }
  
  .form-background:hover {
    background-color: #f9f9f9;
  }
  
  /* Form Layout */
  .form-container {
    width: 45%;
    display: inline-block;
    background-color: #f5f5f5;
    padding: 20px;
    border-radius: 10px;
  }
  
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  /* Label Styling */
  label {
    display: flex;
    align-items: center;
    width: 100%;
    cursor: pointer;
  }
  
  input[type="radio"] {
    appearance: none;
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
    background-color: orangered;
  }
  
  /* Button Styling */
  .get-results-button {
    width: 30%;
    padding: 10px;
    font-size: 16px;
    background-color: orange;
    color: white;
    border-radius: 5px;
    transition: all 0.2s;
    margin-top: 20px;
  }
  
  .get-results-button:hover {
    filter: brightness(0.9);
  }
  
  .get-results-button:active {
    filter: brightness(0.8);
  }
  
  /* Result Section */
  .mt-4 {
    margin-top: 20px;
  }
  
  .bg-green-100 {
    background-color: #d4edda;
  }
  
  .rounded {
    border-radius: 5px;
  }
  
  /* Answer Text */
  span {
    flex: 1;
    cursor: pointer;
    background-color: white;
    color: black;
  }
  
  /* General Spacing */
  .mb-6 {
    margin-bottom: 20px;
  }
  
  /* Margin for form container */
  .form-margin {
    margin-bottom: 5%;
  }
  </style>
  