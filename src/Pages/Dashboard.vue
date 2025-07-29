<script setup lang="ts">
import LastActivities from '@/components/LastActivities.vue';
import AppLayout from '@/layout/AppLayout.vue';
import { useAuth } from '@/lib/useAuth';

const { userName, getUserInfo } = useAuth();

getUserInfo();
</script>

<template>
<AppLayout>
    <div>
        <h1 class="font-bold mb-3">Olá {{ userName }}, Bem-vindo(a) 👋🏼</h1>
        <section class="flex flex-col gap-3 h-[85vh]"> 
            <div class="grid grid-cols-1 gap-3 h-full">
                <LastActivities/>
            </div>
        </section>
    </div>
</AppLayout>
</template>