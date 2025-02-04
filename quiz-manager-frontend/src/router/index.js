import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '@/components/HomePage.vue';
import QuizList from '@/components/QuizList.vue';
import QuizForm from '@/components/QuizForm.vue';

Vue.use(Router);

export default new Router({
    mnode: 'history',
    routes: [
        {
            path: '/',
            name: 'HomePage',
            component: HomePage,
        },
        {
            path: '/quizzes',
            name: 'QuizList',
            component: QuizList,
        },
        {
            path: '/create-quiz',
            name: 'QuizForm',
            component: QuizForm,
        },
    ],
});