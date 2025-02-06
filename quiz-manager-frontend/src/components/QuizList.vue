<template>
    <div class="max-w-3xl mx-auto mt-10">
        <h1 class="text-2xl font-bold mb-6">Quizzes</h1>

        <table class="w-full border-collapse border border-gray-300 shadow-lg">
            <thead class="bg-gray-100">
                <tr>
                    <th class="border border-gray-300 p-3 text-left">Title</th>
                    <th class="border border-gray-300 p-3 text-center">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="quiz in quizzes" :key="quiz.id" class="hover:bg-gray-50">
                    <td class="border border-gray-300 p-3">
                        <router-link
                            :to="{ name: 'QuizDetail', params: { id: quiz.id } }"
                            class="text-blue-600 hover:underline"
                        >
                            {{ quiz.title }}
                        </router-link>
                    </td>
                    <td class="border border-gray-300 p-3 text-center space-x-2">
                        <button
                            @click="editQuiz(quiz.id)"
                            class="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                        >
                            Edit
                        </button>
                        <button
                            @click="deleteQuiz(quiz.id)"
                            class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
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
import { getQuizzes } from '@/services/quizService';

export default {
    name: 'QuizList',
    data() {
        return {
            quizzes: [],
        };
    },
    async created() {
        try {
            const data = await getQuizzes();
            console.log(data);
            this.quizzes = data;
        } catch (error) {
            console.error('Failed to load quizzes:', error);
        }
    },
    methods: {
        editQuiz(id) {
            console.log(`Edit quiz with ID: ${id}`);
        },
        deleteQuiz(id) {
            console.log(`Delete quiz with ID: ${id}`);
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
        background-color: floralwhite;
    }

    th {
        background-color: #f5f5f5;
    }

    tr:nth-child(even) {
        background-color: #f9f9f9;
    }

    tr:hover {
        background-color: #f3f3f3;
    }

    button {
        cursor: pointer;
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
        background-color: white;
        color: black;
    }

    a:hover {
        text-decoration: underline;
    }

    a:focus {
        outline: none;
    }


</style>
