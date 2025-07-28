<script setup lang="ts">
import { useAuth } from '@/lib/useAuth';
import LastActivities from '../LastActivities.vue';
import CreateNews from './CreateNews.vue';
import MakeAttendance from './MakeAttendance.vue';

const { userRole , getUserInfo } = useAuth();
getUserInfo();

</script>

<template>
    <div class="flex flex-row gap-3 h-[100vh] justify-between">
        <div class="card h-full w-[60%] flex flex-col gap-2">
            <div class="flex flex-row justify-between w-full">
                <h1>Notícias</h1>
                <CreateNews v-if="userRole != 'Student'" />
            </div>
            <div class="flex flex-col gap-2">
            </div>
        </div>

        <div class="flex flex-col justify-between w-[40%] gap-2">
            <div class="card overflow-auto">
                <div class="flex flex-row justify-between w-full">
                    <h1>Frequência</h1>
                    <MakeAttendance v-if="userRole != 'Student'" />
                </div>
                <span class="flex flex-row gap-2 text-xs mb-3">
                    <p>Total: 0</p>
                    <p>Máximo Permitido: 18</p>
                </span>
                <div class="flex flex-col gap-2">
                </div>
            </div>
            <LastActivities />
        </div>
    </div>
</template>