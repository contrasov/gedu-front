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
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { ref } from 'vue';
import { toast } from 'vue-sonner'
import { useRoute } from 'vue-router';
import { createActivity, type ActivitiesData, ActivityType } from '@/services/ClassesService';

const route = useRoute()
const classId = route.params.id;

const activityData = ref<ActivitiesData>({
    name: '',
    endDate: '',
    type: ActivityType.Tarefa
})

const submitActivity = async () => {
    if (!activityData.value.name || !activityData.value.endDate || !activityData.value.type){
        alert("Preencha todos os campos obrigatórios.");
        return
    }
    try {
        await createActivity(classId as string, activityData.value)
        toast.success('Atividade criada')
    } catch (e){
        console.error('Erro ao criar notícia:', e)
        toast.error('Erro ao criar atividade')
    }
}

</script>

<template>
    <div>
        <Dialog>
            <DialogTrigger as-child>
                <Button variant="outline">
                    Criar Atividade
                </Button>
            </DialogTrigger>
            <DialogContent class="sm:max-w-[625px]">
                <DialogHeader>
                    <DialogTitle>Crie uma atividade para turma</DialogTitle>
                    <DialogDescription>
                    </DialogDescription>
                </DialogHeader>
                <div class="grid gap-4 py-4">
                    <div class="flex flex-col gap-2">
                        <Label>Nome da Atividade</Label>
                        <Input v-model="activityData.name" />
                    </div>
                    <div class="flex flex-col gap-2">
                        <Label>Data</Label>
                        <Input type="datetime-local" v-model="activityData.endDate" />
                    </div>

                    <Select v-model="activityData.type">
                        <SelectTrigger class="w-full">
                            <SelectValue placeholder="Selecione o tipo da atividade" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Tipo</SelectLabel>
                                <SelectItem v-for="type in ActivityType" :key="type" :value="type">
                                    {{ type }}
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <DialogFooter>
                    <Button type="submit" @click="submitActivity">
                        Criar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
</template>

<style lang="scss" scoped></style>