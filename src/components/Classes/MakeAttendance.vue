<script setup lang="ts">
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { toast } from 'vue-sonner';
import { Checkbox } from '../ui/checkbox';
import { createAttendance, type AttandaceData, AttandaceType } from '@/services/ClassesService';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const classId = route.params.id;
const presentStudents = ref<string[]>([])


const props = defineProps<{
    studentIds: { _id: string; name: string; email: string; }[];
}>();

const attendanceData = ref<AttandaceData>({
    date: '',
    records: [{
        studentId: '',
        status: AttandaceType.Faltou
    }]
})

const submitAttendance = async () => {
    attendanceData.value.records = props.studentIds.map(student => ({
        studentId: student._id,
        status: presentStudents.value.includes(student._id)
            ? AttandaceType.Presente
            : AttandaceType.Faltou,
    }));

    try {
        await createAttendance(classId as string, attendanceData.value);
        toast.success('Frequência Feita');
    } catch (e) {
        console.error('Error ao fazer frequencia:', e);
        toast.error('Erro ao realizar frequência');
    }
};
</script>

<template>
    <div>
        <Dialog>
            <DialogTrigger as-child>
                <Button variant="outline">
                    Lançar Frequência
                </Button>
            </DialogTrigger>
            <DialogContent class="sm:max-w-[625px]">
                <DialogHeader>
                    <DialogTitle>Lançar frequência da turma</DialogTitle>
                    <DialogDescription>
                        Selecione os alunos presentes
                    </DialogDescription>
                </DialogHeader>
                <div class="grid gap-4 py-4">
                    <div class="flex flex-col gap-2">
                        <Label>Data</Label>
                        <Input type="datetime-local" v-model="attendanceData.date" />
                    </div>
                    <div v-for="studentId in studentIds" :key="studentId._id"
                        class="flex flex-row gap-1 justify-between items-center">
                        <Label :for="studentId._id">{{ studentId.name }}</Label>
                        <input type="checkbox" :id="studentId._id" :value="studentId._id" v-model="presentStudents" />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" @click="submitAttendance">
                        Criar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
</template>

<style lang="scss" scoped></style>