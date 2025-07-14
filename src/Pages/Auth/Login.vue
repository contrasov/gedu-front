<script setup lang="ts">
import { ref } from 'vue';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import AuthLayout from '../../layout/Auth/AuthLayout.vue';
import { login, type LoginData} from '@/services/AuthService';
import router from '@/router/router';

const loginData = ref<LoginData>({
    email: '',
    password: ''
})

const submitLogin = async () => {
    try {
        await login(loginData.value)
        router.push('/dashboard')        
    } catch (e) {
        console.error('Erro ao logar:', e)
    }
}

</script>

<template>
<AuthLayout>
    <div class="flex flex-col gap-4 w-[60%] mt-[-10%]">
        <div class="flex flex-col gap-2 items-start">
            <img src="@/assets/logoBlack.svg" alt="Logo Geud" class="h-[4vh]">
            <h1 class="font-bold text-2xl">Entre na sua conta</h1>
            <span class="flex flex-row gap-1 text-sm">
                <p>Ainda não tem uma conta?</p>
                <RouterLink to="/register" class="text-primary-color">Registre uma agora</RouterLink>
            </span>
        </div>
            
        <form class="flex flex-col gap-3"  @submit.prevent="submitLogin">
            <div class="flex flex-col gap-2">
                <Label>E-mail</Label>
                <Input required type="email" v-model="loginData.email" />
            </div>

            <div class="flex flex-col gap-2">
                <Label>Senha</Label>
                <Input required type="password" v-model="loginData.password"/>
            </div>
            <Button type="submit" >Entrar</Button>
        </form>
    </div>
</AuthLayout>
</template>