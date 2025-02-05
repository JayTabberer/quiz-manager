<template>
    <div>
        <h1>Quizzes</h1>
        <ul>
            <li v-for="quiz in quizzes" :key="quiz.id">
                <router-link :to="{ name: 'QuizDetail', params: { id: quiz.id } }">{{ quiz.title }}</router-link>
            </li>
        </ul>
        
        <h1>A list of quizes shold live here</h1>
    </div>
</template>

<script>
import { getQuizzes } from '@/services/quizService';

export default {
    data() {
        return {
            quizzes: [],
        };
    },
    async created() {
        const quizzes = await getQuizzes();
        this.quizzes = quizzes;
    },
};
</script>