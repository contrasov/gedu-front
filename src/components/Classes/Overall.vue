<script setup lang="ts">
import LastActivities from '../LastActivities.vue';


const news = [
    {
        id: 1,
        name: "Amanhã 25/07 aula normal",
        description: 'Melhorou um pouco aqui em casa, então amanhã poderemos ter nossa aula normal. Abraço e até amanhã!!!',
        date: '15/06/2025 às 15:40',
    },
    {
        id: 2,
        name: "Amanhã não terá aula",
        description: 'Melhorou um pouco aqui em casa, então amanhã poderemos ter nossa aula normal. Abraço e até amanhã!!!',
        date: '13/06/2025 às 15:40',
    }
]

const attendanceDays = [
    { status: 'Presente', date: '16/07/2025' },
    { status: 'Presente', date: '14/07/2025' },
];

</script>

<template>
    <div class="flex flex-row gap-3 h-[100vh] justify-between">
        <div class="card h-full w-[60%] flex flex-col gap-2">
            <h1>Notícias</h1>
            <div class="flex flex-col gap-2">
                <!-- <div class="p-2 border border-stroke-3 rounded-md flex flex-row justify-between items-center"
                    v-for="item in news" :key="item.id">
                    <span>
                        <h2 class="text-sm font-semibold">{{ item.name }}</h2>
                        <p class="text-xs max-w-[90%]">{{ item.description }}</p>
                    </span>
                    <p class="text-xs text-stroke-2 w-[34%]">{{ item.date }}</p>
                </div> -->
            </div>
        </div>

        <div class="flex flex-col justify-between w-[40%] gap-2">
            <div class="card overflow-auto">
                <h1>Frequência</h1>
                <span class="flex flex-row gap-2 text-xs mb-3">
                    <p>Total: 0</p>
                    <p>Máximo Permitido: 18</p>
                </span>
                <div class="flex flex-col gap-2">
                    <!-- <div v-for="(day, index) in attendanceDays" :key="index">
                        <span class="text-sm border border-stroke-3 rounded-md py-2 px-4 flex flex-row justify-between">
                            <p>{{ day.status }}</p>
                            <p>{{ day.date }}</p>
                        </span>
                    </div> -->
                </div>
            </div>
            <LastActivities />
        </div>
    </div>
</template>