<template>
    <div class="max-w-3xl mx-auto mt-10">
        <h1 class="text-2xl font-bold mb-6">Quizzes</h1>

        <!-- Create Quiz Button (Only for Admin & Editors) -->
        <button
            v-if="userRole === 'admin' || userRole === 'editor'"
            @click="goToCreateQuiz"
            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
        >
            Create Quiz
        </button>

        <table class="w-full">
            <thead class="bg-gray-100">
                <tr>
                    <th class="border border-gray-300 text-left">Title</th>
                    <th class="border border-gray-300 text-center">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="quiz in quizzes" :key="quiz.id" class="hover:bg-gray-50">
                    <td class="p-3">
                        <router-link
                            :to="{ name: 'QuizDetail', params: { id: quiz.id } }"
                            class="text-blue-600 hover:underline"
                        >
                            {{ quiz.title }}
                        </router-link>
                    </td>
                    <td class="p-3 text-center space-x-2">
                        <button
                            v-if="userRole === 'admin' || userRole === 'editor'"
                            @click="editQuiz(quiz.id)"
                            class="edit-button"
                        >
                            Edit
                        </button>
                        <button
                            v-if="userRole === 'admin'"
                            @click="deleteQuiz(quiz.id)"
                            class="delete-button"
                        >
                            Delete
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { getQuizzes, deleteQuiz } from '@/services/quizService';

export default {
    name: 'QuizList',
    data() {
        return {
            quizzes: [],
            userRole: null,
        };
    },
    async created() {
        try {
            const data = await getQuizzes();
            this.quizzes = data;

            // Retrieve user role from local storage
            const user = JSON.parse(localStorage.getItem('user'));
            if (user && user.role) {
                this.userRole = user.role;
            }
        } catch (error) {
            console.error('Failed to load quizzes:', error);
        }
    },
    methods: {
        goToCreateQuiz() {
            this.$router.push({ name: 'QuizForm' });
        },
        editQuiz(id) {
            this.$router.push({ name: 'EditQuiz', params: { id } });
        },
        async deleteQuiz(id) {
            if (!confirm("Are you sure you want to delete this quiz?")) return;
            
            try {
                await deleteQuiz(id);
                this.quizzes = this.quizzes.filter(quiz => quiz.id !== id);
                alert("Quiz deleted successfully.");
            } catch (error) {
                console.error("Error deleting quiz:", error);
            }
        },
    }
};
</script>

<style scoped>
table {
    width: 60%;
    background-color: white;
    margin-left: 20%;
}
th, td {
    padding: 0.75rem;
    background-color: whitesmoke;
}
th {
    background-color: white;
}
tr:nth-child(even) {
    background-color: #f9f9f9;
}
tr:hover {
    background-color: #f3f3f3;
}
button {
    cursor: pointer;
    width: 15%;
    margin-bottom: 2%;
}

.edit-button {
    background-color: #f0ad4e;
    color: white;
    border: none;
    width: 30%;
    margin-right: 2%;
}

.edit-button:hover {
    background-color: #ed900e;
}

.delete-button {
    background-color: #f0ad4e;
    color: white;
    border: none;
    width: 30%;
}

.delete-button:hover {
    background-color: red;
}

button:hover {
    filter: brightness(0.9);
}
button:active {
    filter: brightness(0.8);
}
button:focus {
    outline: none;
}
a {
    text-decoration: none;
    color: black;
}
a:hover {
    text-decoration: underline;
}
a:focus {
    outline: none;
}
</style>
