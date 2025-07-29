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
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { ref } from 'vue';
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'vue-sonner'
import { createNews, type NewsData } from '@/services/ClassesService';
import { useRoute } from 'vue-router';
import router from '@/router/router';

const route = useRoute()
const classId = route.params.id;

const newsData = ref<NewsData>({
    title: '',
    description: '',
})

const submitNews = async () => {
    if (!newsData.value.title || !newsData.value.description){
        alert("Preencha todos os campos obrigatórios.");
        return
    }
    try {
        await createNews(classId as string, newsData.value)
        toast.success('Notícia criada')
        router.go(0)
    } catch (e){
        console.error('Erro ao criar notícia:', e)
    }
}

</script>

<template>
    <div>
        <Dialog>
            <DialogTrigger as-child>
                <Button variant="outline">
                    Criar Notícia
                </Button>
            </DialogTrigger>
            <DialogContent class="sm:max-w-[625px]">
                <DialogHeader>
                    <DialogTitle>Criar uma notícia para turma</DialogTitle>
                    <DialogDescription>
                    </DialogDescription>
                </DialogHeader>
                <div class="grid gap-4 py-4">
                    <div class="flex flex-col gap-2">
                        <Label>Titulo</Label>
                        <Input v-model="newsData.title" />
                    </div>
                    <div class="flex flex-col gap-2">
                        <Label>Descrição</Label>
                        <Textarea v-model="newsData.description" />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" @click="submitNews">
                        Criar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
</template>

<style lang="scss" scoped></style>