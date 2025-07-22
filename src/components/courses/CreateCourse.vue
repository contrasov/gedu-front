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
import { Button } from '../ui/button';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

import { getCoursers, type Course } from '@/services/CoursesService';
import { ref, onMounted, watch } from 'vue';
import { getTeachers, type User } from '@/services/UsersService';
import { createClass, type ClassData } from '@/services/ClassesService';

const courses = ref<Course[]>([])
const teachers = ref<User[]>([])
const selectedCourseId = ref<string | null>(null)
const selectedCourse = ref<Course | null>(null)

const selectedDays = ref<string[]>([]);
const selectedTime = ref<string[]>([]);

const classData = ref<ClassData>({
    courseId: '',
    subjectId: '',
    teacherId: '',
    schedule: []
})

const daysOfWeek = [
    { id: '1', name: 'Segunda-feira' },
    { id: '2', name: 'Terça-feira' },
    { id: '3', name: 'Quarta-feira' },
    { id: '4', name: 'Quinta-feira' },
    { id: '5', name: 'Sexta-feira' },
];

const timeOfClass = [
    { id: '1', time: '08:00 - 10:00' },
    { id: '2', time: '10:00 - 12:00' },
    { id: '3', time: '13:30 - 15:30' },
    { id: '4', time: '15:30 - 17:30' }
]

const submitClass = async () => {
    if (!classData.value.courseId || !classData.value.subjectId || !classData.value.teacherId || !selectedTime.value.length || !selectedDays.value.length) {
        alert("Preencha todos os campos obrigatórios.");
        return;
    }
    try {
        const selectedTimeObj = timeOfClass.find(t => t.id === selectedTime.value[0]);
        const formattedSchedule = selectedDays.value.map(dayId => {
            const dayName = daysOfWeek.find(d => d.id === dayId)?.name;
            return `${dayName}: ${selectedTimeObj?.time}`;
        });

        classData.value.schedule = formattedSchedule;

        await createClass(classData.value)
    } catch (e) {
        console.error('Erro ao criar a turma:', e)
    }
}


const listCourses = async () => {
    try {
        courses.value = await getCoursers()
    } catch (e) {
        console.error('Erro ao buscar cursos:', e)
    }
}

const listTeachers = async () => {
    try {
        teachers.value = await getTeachers()
    } catch (e) {
        console.error('Erro ao buscar professores:', e)
    }
}

watch(selectedCourseId, (newId) => {
    selectedCourse.value = courses.value.find(course => course._id === newId) || null;
    classData.value.courseId = newId || '';
});

const handleDayClick = (dayId: string) => {
    if (selectedDays.value.includes(dayId)) {
        selectedDays.value = selectedDays.value.filter(day => day !== dayId);
    } else {
        if (selectedDays.value.length < 2) {
            selectedDays.value.push(dayId);
        }
    }
};

const handleTimeClick = (timeId: string) => {
    selectedTime.value = [timeId];
};

onMounted(() => {
    listCourses();
    listTeachers();
})
</script>

<template>
    <div>
        <!-- modal de criar turma -->
        <Dialog>
            <DialogTrigger as-child>
                <Button variant="outline">
                    Criar Curso
                </Button>
            </DialogTrigger>
            <DialogContent class="sm:max-w-[625px]">
                <DialogHeader>
                    <DialogTitle>Criar Curso</DialogTitle>
                    <DialogDescription>
                    </DialogDescription>
                </DialogHeader>
                <div class="grid gap-4 py-4">
                </div>
                <DialogFooter>
                    <Button type="submit" @click="submitClass">
                        Criar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
</template>

<style lang="scss" scoped></style>