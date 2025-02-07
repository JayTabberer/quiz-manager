<template>
    <div>
        <h1>Edit Quiz</h1>
        <form v-if="quiz" @submit.prevent="submitForm" class="form-block">
            <div>
                <label for="title">Title:</label>
                <input type="text" v-model="quiz.title" required />
            </div>

            <div v-for="(question, qIndex) in quiz.questions" :key="qIndex" class="question-block">
                <label>Question:</label>
                <input type="text" v-model="question.text" required />

                <div v-for="(answer, aIndex) in question.answers" :key="aIndex" class="answer-block">
                    <label>Answer:</label>
                    <input type="text" v-model="answer.text" required />
                    <label>Correct:</label>
                    <input 
                        type="radio" 
                        :name="'correctAnswer-' + qIndex" 
                        :value="aIndex" 
                        v-model="question.correctAnswer" 
                    />
                </div>

                <button type="button" @click="addAnswer(qIndex)">Add Answer</button>
            </div>

            <button type="button" @click="addQuestion">Add Question</button>
            <button type="submit">Save Changes</button>
        </form>
    </div>
</template>

<script>
import { getQuizById, updateQuiz } from '@/services/quizService';

export default {
    data() {
        return {
            quiz: null,
        };
    },
    async created() {
        const quizId = this.$route.params.id;
        try {
            const data = await getQuizById(quizId);
            console.log("Fetched quiz data:", data); // Debugging

            // Ensure Vue tracks reactivity
            this.quiz = JSON.parse(JSON.stringify(data));

            // Convert correct answer into an index
            this.quiz.questions.forEach(question => {
                const correctIndex = question.answers.findIndex(a => a.is_correct);
                question.correctAnswer = correctIndex !== -1 ? correctIndex : null;
            });

        } catch (error) {
            console.error('Error fetching quiz:', error);
        }
    },
    methods: {
        addQuestion() {
            this.quiz.questions.push({ text: '', answers: [{ text: '', is_correct: false }], correctAnswer: null });
        },
        addAnswer(qIndex) {
            this.quiz.questions[qIndex].answers.push({ text: '', is_correct: false });
        },
        async submitForm() {
            try {
                // Convert correctAnswer index back to is_correct for each question's answers
                this.quiz.questions.forEach(question => {
                    question.answers.forEach((answer, index) => {
                        // Set is_correct based on the selected correctAnswer index
                        answer.is_correct = index === question.correctAnswer;
                    });
                });

                console.log("Submitting quiz data:", this.quiz); 

                await updateQuiz(this.quiz);
                this.$router.push({ name: 'QuizList' });
            } catch (error) {
                console.error("Error updating quiz:", error);
            }
        }
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
