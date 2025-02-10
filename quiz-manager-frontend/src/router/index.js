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

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'CreateUser', component: CreateUser, meta: { requiresAuth: false } },
    { path: '/login-page', name: 'LoginPage', component: LoginPage, meta: { requiresAuth: false } },
    { path: '/home-page', name: 'HomePage', component: HomePage, meta: { requiresAuth: true } },
    { path: '/quizzes', name: 'QuizList', component: QuizList, meta: { requiresAuth: true } },
    { path: '/quiz-detail/:id', name: 'QuizDetail', component: QuizDetail, props: true, meta: { requiresAuth: true } },
    { path: '/create-quiz', name: 'QuizForm', component: QuizForm, meta: { requiresAuth: true, allowedRoles: ['admin', 'editor'] } },
    { path: '/edit-quiz/:id', name: 'EditQuiz', component: EditQuiz, props: true, meta: { requiresAuth: true, allowedRoles: ['admin', 'editor'] } }
  ]
});

router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const isLoggedIn = !!user;
  
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isLoggedIn) {
      return next('/login-page');
    }
    
    if (to.meta.allowedRoles && !to.meta.allowedRoles.includes(user.role)) {
      return next('/home-page');
    }
  }

  next();
});

export default router;
