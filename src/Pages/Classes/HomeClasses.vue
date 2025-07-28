<script setup lang="ts">
import CardClass from '@/components/CardClass.vue';
import AppLayout from '@/layout/AppLayout.vue';
import { getClasses, type ClassInfo } from '@/services/ClassesService';

import { onMounted, ref } from 'vue';
import CreateClass from '@/components/Classes/CreateClass.vue';
import EnrollmentClass from '@/components/Classes/EnrollmentClass.vue';
import { useAuth } from '@/lib/useAuth';

const { userRole, getUserInfo } = useAuth();


const classes = ref<ClassInfo[]>([])

const listClasses = async () => {
    try {
        classes.value = await getClasses()
    } catch (e) {
        console.error('Erro ao buscar turmas:', e)
    }
}

getUserInfo()

onMounted(() => {
    listClasses();
})
</script>

<template>
    <AppLayout>
        <div class="flex flex-row justify-between mb-6">
            <h1 class="text-2xl font-bold">Turmas</h1>
            <div class="flex flex-row gap-2">
                <CreateClass v-if="userRole === 'Adm'" />
                <EnrollmentClass v-if="userRole === 'Student'"/>
            </div>
        </div>

        <!-- Lista de Turmas -->
        <section class="grid grid-cols-3 gap-4">
            <CardClass v-for="classItem in classes" :key="classItem._id" :class-item="classItem" />
        </section>
    </AppLayout>
</template>
