<script setup lang="ts">
import { BookCheck, BookAlert } from 'lucide-vue-next';

const activities = [
    {
        id: 1,
        name: 'Estudar Vue.js',
        class: 'Front-end',
        limitDate: '2025-07-20T23:59',
        status: 'pending'
    },
    {
        id: 2,
        name: 'Praticar TypeScript',
        class: 'Back-end',
        limitDate: '2025-07-22T23:59',
        status: 'pending'
    },
    {
        id: 3,
        name: 'Revisar Expressões Regulares',
        class: 'Lógica de Programação',
        limitDate: '2025-07-25T23:59',
        status: 'done'
    }
]

const formatDate = (dataIso: string): string => {
    const data = new Date(dataIso)
    return data.toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })
}

</script>

<template>
    <div class="card flex flex-col gap-2">
        <h1 class="font-bold">Últimas Atividades</h1>
        <div class="flex flex-col gap-2">
            <div class="py-[6px] px-3.5 border border-stroke-3 rounded-[6px]" v-for="task in activities" :key="task.id">
                <div class="flex flex-row justify-between items-center">
                    <div class="flex flex-row gap-2 items-center">
                        <span :class="task.status === 'pending' ? 'bg-pending p-1.5 rounded-md' : 'bg-done' + ' p-1.5 rounded-md'">
                            <component 
                                :is="task.status === 'pending' ? BookAlert : BookCheck" 
                                class="h-4 w-4" 
                            />
                        </span>
                        <div>
                            <h1 class="font-bold text-sm">{{ task.name }}</h1>
                            <p class="text-xs">{{ task.class }}</p>
                        </div>
                    </div>

                    <h2 class="text-background-primary text-xs">Entregar em: {{ formatDate(task.limitDate) }}</h2>
                </div>
            </div>
        </div>
    </div>
</template>