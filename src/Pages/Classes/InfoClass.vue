<script setup lang="ts">
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/components/ui/tabs'

import AppLayout from '@/layout/AppLayout.vue';
import router from '@/router/router';
import { getInfoClass } from '@/services/ClassesService';
import { ChevronLeft, Book, BookCopy, GraduationCap, CalendarDays } from 'lucide-vue-next';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { type ClassInfo } from '@/services/ClassesService';
import Overall from '@/components/Classes/Overall.vue';

const route = useRoute();
const classInfo = ref<ClassInfo | null>(null);

const fetchClassInfo = async () => {
    const id = route.params.id as string;
    classInfo.value = await getInfoClass(id);
};

onMounted(() => {
    fetchClassInfo();
});

const back = () => {
    router.back()
}

</script>

<template>
    <AppLayout class="overflow-auto">
        <ChevronLeft @click="back" class="w-fit mb-3 hover:text-primary-color cursor-pointer" />
        <div class="flex flex-row justify-between gap-3">
            <div class="card flex flex-col gap-2">
                <div class="flex flex-row justify-between items-center">
                    <div class="flex flex-row gap-2 items-center">
                        <span class="bg-primary-color p-2 rounded-md text-white">
                            <BookCopy class="h-5 w-5" />
                        </span>
                        <div class="flex flex-col">
                            <span class="flex flex-row gap-2 items-center">
                                <h1>{{ classInfo?.name }}</h1>
                                <p class="text-xs font-medium text-stroke-2">{{ classInfo?.subjectId.code }}</p>
                            </span>
                            <span class="flex flex-row gap-1 items-center">
                                <GraduationCap class="h-4 w-fit" />
                                <h2 class="text-sm font-medium">{{ classInfo?.teacherId.name }}</h2>
                            </span>
                        </div>
                    </div>
                    <p class="text-xs text-stroke-2 hover:underline hover:cursor-pointer mt-[-20px]">Cancelar Matricula
                    </p>
                </div>
                <div class="flex flex-row gap-3">
                    <div v-for="item in classInfo?.schedule" :key="item" class="text-sm flex flex-row gap-1">
                        <CalendarDays class="h-4 w-fit" />
                        <h3>{{ item }}</h3>
                    </div>
                </div>
            </div>

            <div class="card w-[20%] font-medium">
                <span class="flex flex-row items-center gap-1">
                    <Book class="w-4 h-4" />
                    <p>Nota 1: --</p>
                </span>
                <span class="flex flex-row items-center gap-1">
                    <Book class="w-4 h-4" />
                    <p>Nota 2: --</p>
                </span>
                <span class="flex flex-row items-center gap-1">
                    <Book class="w-4 h-4" />
                    <p>Nota Final: --</p>
                </span>
            </div>
        </div>

        <Tabs default-value="all" class="mt-2">
            <TabsList class="grid w-[30%] grid-cols-2">
                <TabsTrigger value="all">
                    Geral
                </TabsTrigger>
                <TabsTrigger value="participants">
                    Participantes
                </TabsTrigger>
            </TabsList>
            <TabsContent value="all">
                <Overall />
            </TabsContent>
            <TabsContent value="participants">
                <div class="grid grid-cols-3 gap-3">
                    <div class="card">
                        <template v-if="classInfo?.studentIds?.length">
                        <div>
                            <div v-for="student in classInfo.studentIds" :key="student._id">
                                <p class="font-medium">{{ student.name || student }}</p>
                                <p class="text-sm">{{ student.email || student }}</p>
                            </div>
                        </div>
                    </template>
                    <template v-else>
                        <p>Nenhum Aluno ainda</p>
                    </template>
                </div>
            </div>

            </TabsContent>
        </Tabs>
    </AppLayout>
</template>