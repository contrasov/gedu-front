<script setup lang="ts">
import AppLayout from '@/layout/AppLayout.vue';

import { onMounted, ref } from 'vue';
import { getTeachers, type User } from '@/services/UsersService';
import CardTeachers from '@/components/CardUser.vue';

const teachers = ref<User[]>([])

const listTeachers = async () => {
    try {
        teachers.value = await getTeachers()
    } catch (e) {
        console.error('Erro ao buscar turmas:', e)
    }
}

onMounted(() => {
    listTeachers();
})
</script>

<template>
    <AppLayout>
        <div class="flex flex-row justify-between mb-6">
            <h1 class="text-2xl font-bold">Professores</h1>
        </div>

        <!-- Lista de Turmas -->
        <section class="grid grid-cols-3 gap-4">
            <CardTeachers v-for="userItem in teachers" :key="userItem._id" :user-item="userItem" />
        </section>
    </AppLayout>
</template>
