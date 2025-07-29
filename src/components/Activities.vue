<script setup lang="ts">
import { BookCheck, BookAlert } from 'lucide-vue-next';
import CreateActivities from './Classes/CreateActivities.vue';
import { useAuth } from '@/lib/useAuth';
import { useRoute } from 'vue-router';
import { getActivitiesByClass, type ActivitiesData } from '@/services/ClassesService';
import { onMounted, ref } from 'vue';

const { userRole, getUserInfo } = useAuth();
getUserInfo();

const route = useRoute();
const classId = route.params.id;

const activities = ref<ActivitiesData[]>([])

const getActivities = async () => {
    try {
        activities.value = await getActivitiesByClass(classId as string)
    } catch (e) {
        console.error('Erro ao buscar as notícias:', e)
    }
}

const formatDate = (newsDate: string) => {
    const date = new Date(newsDate);
    return date.toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'America/Sao_Paulo',
    });
}

onMounted(() => {
    getActivities();
})
</script>

<template>
    <div class="card flex flex-col gap-2">
        <div class="flex flex-row justify-between w-full">
            <h1>Atividades</h1>
            <CreateActivities v-if="userRole != 'Student'" />
        </div>
        <div class="flex flex-col gap-2 overflow-auto">
            <div class="flex flex-row gap-2 items-center border rounded-md p-2" v-for="(item, index) in activities" :key="index">
                <div class="bg-tests py-2 px-1 rounded-md">
                    <BookAlert class="h-4 w-4'" />
                </div>
                <span class="flex flex-row justify-between w-full">
                    <span>
                        <h2 class="font-medium">{{ item.name }}</h2>
                        <p class="text-xs">{{ item.type }}</p>
                    </span>
                    <p class="text-xs">até: {{ formatDate(item.endDate) }}</p>
                </span>
            </div>
        </div>
    </div>
</template>