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

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

import { Button } from '@/components/ui/button';
import { onMounted, ref, watch } from 'vue';
import { getCoursers, getCourse, type Course } from '@/services/CoursesService';
import { enrollStudent } from '@/services/ClassesService';
import router from '@/router/router';

const courses = ref<Course[]>([])
const selectedSuject = ref<string | null>(null)
const selectedCourseId = ref<string | null>(null)
const subjects = ref<any[]>([])


const listCourses = async () => {
    try {
        courses.value = await getCoursers()
    } catch (e) {
        console.error('Erro ao buscar cursos:', e)
    }
}

const fetchSelectedCourse = async(id: string) => {
    try {
        const subjectsData = await getCourse(id)
        subjects.value = subjectsData || []
        console.log(subjectsData)
    } catch (e) {
        console.error('Erro ao buscar curso', e)
    }
}

const toEnroll = async(id: string) => {
    try {
        await enrollStudent(id)
        router.go(0)
    } catch (e) {
        console.error('Erro ao fazer matricula', e)
    }
}

watch(selectedCourseId, (newId) => {
  if (newId) {
    fetchSelectedCourse(newId)
  } else {
    subjects.value = []
  }
})

onMounted(() => {
    listCourses();
})
</script>

<template>
    <div>
        <Dialog>
            <DialogTrigger as-child>
                <Button>
                    Fazer Matrícula
                </Button>
            </DialogTrigger>
            <DialogContent class="sm:max-w-[625px]">
                <DialogHeader>
                    <DialogTitle>Solicitação de Matrícula</DialogTitle>
                    <DialogDescription>
                        Esta solicitação permite que você selecione a turma desejada.
                        Para prosseguir, certifique-se de que você atende a todos os requisitos específicos para
                        a
                        matrícula nesta turma.
                        Nossa equipe validará sua solicitação.
                    </DialogDescription>
                </DialogHeader>
                <div class="grid gap-4 py-4">
                    <Select v-model="selectedCourseId">
                        <SelectTrigger class="w-full">
                            <SelectValue placeholder="Selecione o Curso" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Cursos</SelectLabel>
                                <SelectItem v-for="course in courses" :key="course._id" :value="course._id">
                                    {{ course.name }}
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    <!-- Novo Select para Subjects -->
                    <Select v-if="subjects.length > 0" v-model="selectedSuject">
                        <SelectTrigger class="w-full">
                            <SelectValue placeholder="Selecione a Turma" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Turmas</SelectLabel>
                                <template v-for="subject in subjects" :key="subject._id">
                                    <SelectItem v-for="classId in subject.classIds" :key="classId._id" :value="classId._id">
                                        {{ classId.name }}
                                    </SelectItem>
                                </template>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <DialogFooter>
                    <Button type="submit" @click="selectedSuject ? toEnroll(selectedSuject) : null">
                        Solicitar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
</template>