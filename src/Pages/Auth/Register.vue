<script setup lang="ts">
import { ref, watch } from 'vue';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import AuthLayout from '../../layout/Auth/AuthLayout.vue';
import { BookText, GraduationCap } from 'lucide-vue-next';
import { register, type RegisterData } from '@/services/AuthService';
import router from '@/router/router';

const selectRole = ref<'Student' | 'Teacher' | null>(null);

watch(selectRole, (newRole)=> {
    registerData.value.type = newRole ?? ''
})

const registerData = ref<RegisterData>({
    type: '',
    code: '',
    name: '',
    dateBirth: '',
    phone: '',
    email: '',
    cpf: '',
    password: ''
})


const submitRegister = async () => {
    if (!selectRole.value){
        alert('Selecione o tipo da conta.')
        return
    }
    try {
        await register(registerData.value)
        router.push('/')
    } catch (e) {
        console.error('Erro ao se registrar:', e)
    }
}

function formatCPF(value: string){
    return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
}

function formatPhone(value: string) {
  return value
    .replace(/\D/g, '')
    .replace(/^(\d{2})(\d)/g, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .slice(0, 15)
}

function onCPFInput(e: Event) {
  const rawValue = (e.target as HTMLInputElement).value
  const formatted = formatCPF(rawValue)
  registerData.value.cpf = formatted
}

function onPhoneInput(e: Event){
    const rawValue = (e.target as HTMLInputElement).value
    const formatted = formatPhone(rawValue)
    registerData.value.phone = formatted
}

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
            
        <form class="flex flex-col gap-3" @submit.prevent="submitRegister">
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
                <Input required v-model="registerData.name"/>
            </div>

            <div class="flex flex-col gap-2">
                <Label>Data de Nascimento</Label>
                <Input v-model="registerData.dateBirth"equired type="date"/>
            </div>

            <div class="flex flex-col gap-2">
                <Label>CPF</Label>
                <Input
                required
                v-model="registerData.cpf"
                @input="onCPFInput"
                maxlength="14"
                placeholder="000.000.000-00"
                />
            </div>

            <div class="flex flex-col gap-2">
                <Label>Telefone</Label>
                <Input
                required
                v-model="registerData.phone"
                @input="onPhoneInput"
                maxlength="15"
                placeholder="(00) 00000-0000"
                />
            </div>

            <div v-if="selectRole === 'Teacher'" class="flex flex-col gap-2">
                <Label>Formação</Label>
                <Input required v-model="registerData.training"/>
            </div>

            <div class="flex flex-col gap-2">
                <Label>E-mail</Label>
                <Input required type="email" v-model="registerData.email"/>
            </div>

            <div class="flex flex-col gap-2">
                <Label>Senha</Label>
                <Input required type="password" v-model="registerData.password"/>
            </div>

            <div class="flex flex-col gap-2">
                <Label>Código</Label>
                <Input required v-model="registerData.code"/>
            </div>

            <Button type="submit">Criar Conta</Button>
        </form>
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