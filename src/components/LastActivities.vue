<script setup lang="ts">
import { BookCheck, BookAlert } from 'lucide-vue-next';
import CreateActivities from './Classes/CreateActivities.vue';
import { useAuth } from '@/lib/useAuth';

const { userRole , getUserInfo } = useAuth();
getUserInfo();
</script>

<template>
    <div class="card flex flex-col gap-2">
        <div class="flex flex-row justify-between w-full">
            <h1>Frequência</h1>
            <CreateActivities v-if="userRole != 'Student'"/>
        </div>
        <div class="flex flex-col gap-2 overflow-auto">
        </div>
    </div>
</template>