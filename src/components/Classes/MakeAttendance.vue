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
import { createCourse, type CreateCourse } from '@/services/CoursesService';
import { ref } from 'vue';
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'vue-sonner'


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
                    </DialogDescription>
                </DialogHeader>
                <div class="grid gap-4 py-4">

                </div>
                <DialogFooter>
                    <Button type="submit">
                        Criar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
</template>

<style lang="scss" scoped></style>