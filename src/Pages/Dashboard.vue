<script setup lang="ts">
import InitialKpis from '@/components/InitialKpis.vue';
import LastActivities from '@/components/LastActivities.vue';
import NextTests from '@/components/NextTests.vue';
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
            <InitialKpis/>
            <div class="grid grid-cols-2 gap-3 h-full">
                <LastActivities/>
                <NextTests/>
            </div>
        </section>
    </div>
</AppLayout>
</template>