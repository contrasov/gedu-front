<script setup lang="ts">
import { ref } from 'vue';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import AuthLayout from '../../layout/Auth/AuthLayout.vue';
import { BookText, GraduationCap } from 'lucide-vue-next';

const selectRole = ref<'Student' | 'Teacher' | null>(null);

</script>

<template>
<AuthLayout>
    <div class="flex flex-col gap-4 pt-[30%] pb-[4%] w-[60%]">
        <div class="flex flex-col gap-2 items-start">
            <img src="@/assets/logoBlack.svg" alt="Logo Geud" class="h-[4vh]">
            <h1 class="font-bold text-2xl">Registro Gedu</h1>
            <span class="flex flex-row gap-1 text-sm">
                <p>Já tem uma conta?</p>
                <RouterLink to="/"  class="text-primary-color">Entre agora</RouterLink>
            </span>
        </div>
            
        <div class="flex flex-col gap-3">
            <div class="flex flex-row gap-3 text-stroke-1">
                <div class="flex flex-col items-center gap-3 border p-3 w-full rounded-md cursor-pointer"
                :class="selectRole === 'Student' ? 'text-primary-color border-primary-color' : ''"
                @click="selectRole = 'Student'"
                >
                    <BookText/>
                    <Label>Estudante</Label>
                </div>

                <div class="flex flex-col items-center gap-3 border p-3 w-full rounded-md cursor-pointer"
                :class="selectRole === 'Teacher' ? 'text-primary-color border-primary-color' : ''"
                @click="selectRole = 'Teacher'"
                >
                    <GraduationCap/>
                    <Label>Professor</Label>
                </div>
            </div>

            
            <div class="flex flex-col gap-2">
                <Label>Nome Completo</Label>
                <Input/>
            </div>

            <div class="flex flex-col gap-2">
                <Label>Data de Nascimento</Label>
                <Input/>
            </div>

            <div class="flex flex-col gap-2">
                <Label>CPF</Label>
                <Input/>
            </div>

            <div class="flex flex-col gap-2">
                <Label>Telefone</Label>
                <Input/>
            </div>

            <div v-if="selectRole === 'Teacher'" class="flex flex-col gap-2">
                <Label>Formação</Label>
                <Input/>
            </div>

            <div class="flex flex-col gap-2">
                <Label>E-mail</Label>
                <Input/>
            </div>

            <div class="flex flex-col gap-2">
                <Label>Senha</Label>
                <Input/>
            </div>

            <div class="flex flex-col gap-2">
                <Label>Código</Label>
                <Input/>
            </div>

            <Button>Criar Conta</Button>
        </div>
    </div>
</AuthLayout>
</template>

<style>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
</style>