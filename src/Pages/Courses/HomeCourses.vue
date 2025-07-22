<script setup lang="ts">
import AppLayout from '@/layout/AppLayout.vue';

import { onMounted, ref } from 'vue';
import CreateCourse from '@/components/courses/CreateCourse.vue';
import { getCoursers, type Course } from '@/services/CoursesService';
import CardCourse from '@/components/CardCourse.vue';

const courses = ref<Course[]>([])

const listCourses = async () => {
    try {
        courses.value = await getCoursers()
    } catch (e) {
        console.error('Erro ao buscar turmas:', e)
    }
}

onMounted(() => {
    listCourses();
})
</script>

<template>
    <AppLayout>
        <div class="flex flex-row justify-between mb-6">
            <h1 class="text-2xl font-bold">Cursos</h1>
            <div class="flex flex-row gap-2">
                <CreateCourse/>
            </div>
        </div>

        <!-- Lista de Turmas -->
        <section class="grid grid-cols-3 gap-4">
            <CardCourse v-for="courseItem in courses" :key="courseItem._id" :course-item="courseItem" />
        </section>
    </AppLayout>
</template>
