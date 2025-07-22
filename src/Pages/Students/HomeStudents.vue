<script setup lang="ts">
import AppLayout from '@/layout/AppLayout.vue';

import { onMounted, ref } from 'vue';
import CreateCourse from '@/components/courses/CreateCourse.vue';
import { getStudents, type User } from '@/services/UsersService';
import CardStudents from '@/components/CardUser.vue';

const students = ref<User[]>([])

const listStudents = async () => {
    try {
        students.value = await getStudents()
    } catch (e) {
        console.error('Erro ao buscar turmas:', e)
    }
}



onMounted(() => {
    listStudents();
})
</script>

<template>
    <AppLayout>
        <div class="flex flex-row justify-between mb-6">
            <h1 class="text-2xl font-bold">Alunos</h1>
        </div>
        <section class="grid grid-cols-3 gap-4">
            <CardStudents v-for="userItem in students" :key="userItem._id" :user-item="userItem" />
        </section>
    </AppLayout>
</template>
