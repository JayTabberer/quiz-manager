import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '@/components/HomePage.vue';
import QuizList from '@/components/QuizList.vue';
import QuizForm from '@/components/QuizForm.vue';
import CreateUser from '@/components/CreateUser.vue';
import LoginPage from '@/components/LoginPage.vue';
import QuizDetail from '@/components/QuizDetail.vue';
import EditQuiz from '@/components/EditQuiz.vue';

Vue.use(Router);

export default new Router({
    mnode: 'history',
    routes: [
        {
            path: '/',
            name: 'CreateUser',
            component: CreateUser,
        },
        {
            path: '/login-page',
            name: 'LoginPage',
            component: LoginPage,
        },
        {
            path: '/home-page',
            name: 'HomePage',
            component: HomePage,
        },
        {
            path: '/quizzes',
            name: 'QuizList',
            component: QuizList,
        },
        {
            path: '/quiz-detail/:id',
            name: 'QuizDetail',
            component: QuizDetail,
        },
        {
            path: '/create-quiz',
            name: 'QuizForm',
            component: QuizForm,
        },
        {
            path: '/edit-quiz',
            name: 'EditQuiz',
            component: EditQuiz,
        },
    ],
});