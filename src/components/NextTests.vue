<script setup lang="ts">
import { LibraryBig } from 'lucide-vue-next';

const tests = [
    {
        id: 1,
        name: 'Prova AV2',
        class: 'Banco de Dados',
        date: '2025-07-20T13:30'
    },
    {
        id: 2,
        name: 'Prova AV3',
        class: 'Redes de Computadores',
        date: '2025-07-23T10:00'
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
        <h1>Próximas Provas</h1>
        <div class="flex flex-col gap-2">
            <div class="py-[6px] px-3.5 border border-stroke-3 rounded-[6px]" v-for="test in tests" :key="test.id">
                <div class="flex flex-row justify-between items-center">
                    <div class="flex flex-row gap-2 items-center">
                        <div class="bg-tests py-2 px-1 rounded-md">
                            <library-big class="h-4 w-4'"/>
                        </div>
                        <div>
                            <h1 class="font-bold text-sm">{{ test.name }}</h1>
                            <p class="text-xs">{{ test.class }}</p>
                        </div>
                    </div>

                    <h2 class="text-background-primary text-xs">Será realizada: {{ formatDate(test.date) }}</h2>
                </div>
            </div>
        </div>
    </div>
</template>