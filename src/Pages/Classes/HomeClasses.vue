<script setup lang="ts">
import CardClass from '@/components/CardClass.vue';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layout/AppLayout.vue';
import { getClasses } from '@/services/ClassesService';
import { onMounted, ref } from 'vue';

const classes = ref([])

const listClasses = async () => {
    try {
       classes.value = await getClasses()
    } catch (e) {
        console.error('Erro ao buscar turmas:', e)
    }
}

onMounted(()=> {
    listClasses();
})

</script>

<template>
    <AppLayout>
        <div class="flex flex-row justify-between">
            <h1 class="font-bold">Turmas</h1>
            <Button>Fazer Matrícula</Button>
        </div>
        <section class="grid grid-cols-3">
            <CardClass 
                v-for="classItem in classes" 
                :class-item="classItem" 
            />
        </section>
    </AppLayout>
</template>