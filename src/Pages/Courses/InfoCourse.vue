<script setup lang="ts">
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import AppLayout from '@/layout/AppLayout.vue';
import router from '@/router/router';
import { Book, ChevronLeft } from 'lucide-vue-next';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { createSubject, getCourseInfo, type Course, type SubjectData } from '@/services/CoursesService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'vue-sonner';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/lib/useAuth';

const route = useRoute();
const courseId = route.params.id;

const { userRole, getUserInfo } = useAuth();

getUserInfo();

const courseInfo = ref<Course | null>(null);

const subjectData = ref<SubjectData>({
    name: '',
    description: '',
    courseId: courseId as string,
    status: true
})

const fetchCourseInfo = async () => {
    const id = route.params.id as string;
    courseInfo.value = await getCourseInfo(id);
};

const submitSubject = async () => {
    if (!subjectData.value.name || !subjectData.value.description) {
        toast.info('Preencha todos os dados')
    }

    try{
        await createSubject(subjectData.value)
        toast.success('Disciplina Criada')
        router.go(0)
    } catch (e) {
        console.error('Erro ao criar disciplina:', e)
        toast.error('Erro ao criar disciplina')
    }
}

onMounted(() => {
    fetchCourseInfo();
});

const back = () => {
    router.back();
};
</script>

<template>
    <AppLayout class="overflow-auto">
        <ChevronLeft @click="back" class="w-fit mb-3 hover:text-primary-color cursor-pointer" />
        <div class="flex flex-col justify-between gap-3">
            <div class="card flex flex-col gap-2">
                <h1>{{ courseInfo?.name }}</h1>
            </div>
            <div class="card overflow-auto h-[97%]">
                <div class="flex flex-row justify-between items-center">
                    <h2 class="font-medium">Disciplinas</h2>
                    <Dialog v-if="userRole === 'Adm'">
                        <DialogTrigger as-child>
                            <Button variant="outline">
                                Cadastrar Disciplina
                            </Button>
                        </DialogTrigger>
                        <DialogContent class="sm:max-w-[625px]">
                            <DialogHeader>
                                <DialogTitle>Adicionar uma Disciplina</DialogTitle>
                                <DialogDescription>
                                </DialogDescription>
                            </DialogHeader>
                            <div class="grid gap-4 py-4">
                                <div class="flex flex-col gap-2">
                                    <Label>Titulo</Label>
                                    <Input v-model="subjectData.name"/>
                                </div>
                                <div class="flex flex-col gap-2">
                                    <Label>Descrição da Disciplina</Label>
                                    <Textarea v-model="subjectData.description" />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit" @click="submitSubject">
                                    Criar
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
                <div v-if="courseInfo?.subjectIds && courseInfo.subjectIds.length">
                    <div v-for="subject in courseInfo.subjectIds" :key="subject._id"
                        class="flex flex-row gap-3 p-2 items-center">
                        <span class="bg-primary-color p-2 rounded-md text-white">
                            <Book class="h-5 w-5" />
                        </span>
                        <h3 class="font-medium">{{ subject.name }}</h3>
                    </div>
                </div>
                <div v-else>
                    <p>Nenhuma disciplina cadastrada.</p>
                </div>
            </div>
        </div>
    </AppLayout>
</template>