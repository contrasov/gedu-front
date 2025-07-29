<script setup lang="ts">
import { useAuth } from '@/lib/useAuth';
import LastActivities from '../Activities.vue';
import CreateNews from './CreateNews.vue';
import MakeAttendance from './MakeAttendance.vue';
import { getAttendanceByClass, getNewsByClass, type AttandaceData, type NewsInfo } from '@/services/ClassesService';
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
import { toast } from 'vue-sonner';

const { userRole, getUserInfo } = useAuth();
getUserInfo();

const props = defineProps<{
    studentIds: {
        _id: string;
        name: string;
        email: string;
    }[];
}>();

const route = useRoute();
const classId = route.params.id;

const news = ref<NewsInfo[]>([])
const attendance = ref<AttandaceData[]>([])

const getNews = async () => {
    try {
        news.value = await getNewsByClass(classId as string)
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

const getAtendance = async () => {
    try {
        attendance.value = await getAttendanceByClass(classId as string)
    } catch (e) {
        console.error('Erro ao buscar frequência:', e)
    }
}

onMounted(() => {
    getNews();
    getAtendance();
})
</script>

<template>
    <div class="flex flex-row gap-3 h-[100vh] justify-between">
        <div class="card h-full w-[60%] flex flex-col gap-2">
            <div class="flex flex-row justify-between w-full">
                <h1>Notícias</h1>
                <CreateNews v-if="userRole != 'Student'" />
            </div>
            <div class="flex flex-col gap-2">
                <div class="border rounded-md p-2" v-for="(item, index) in news.slice().reverse()" :key="index">
                    <span class="flex flex-row justify-between w-full">
                        <h2 class="font-medium">{{ item.title }}</h2>
                        <p class="text-xs">{{ formatDate(item.dateCreate) }}</p>
                    </span>
                    <p class="text-sm text-stroke-2">{{ item.description }}</p>
                </div>
            </div>
        </div>

        <div class="flex flex-col justify-between w-[40%] gap-2">
            <div class="card overflow-auto">
                <div class="flex flex-row justify-between w-full">
                    <h1>Frequência</h1>
                    <MakeAttendance v-if="userRole != 'Student'" :student-ids="props.studentIds" />
                </div>
                <div class="flex flex-col gap-2 mt-2">
                    <div class="border rounded-md p-2" v-for="(item, index) in attendance.slice().reverse()" :key="index">
                        <span class="flex flex-row justify-between w-full">
                            <p class="text-xs">{{ formatDate(item.date) }}</p>
                        </span>
                    </div>
                </div>
            </div>
            <LastActivities />
        </div>
    </div>
</template>