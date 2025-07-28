<script setup lang="ts">
import { Label } from '@/components/ui/label';
import AppLayout from '@/layout/AppLayout.vue';
import { useAuth } from '@/lib/useAuth';
import { Switch } from '@/components/ui/switch'


const { userName, userEmail , getUserInfo } = useAuth();

getUserInfo();
</script>

<template>
    <AppLayout class="overflow-auto">
        <h1 class="text-2xl font-bold mb-3">Cursos</h1>
        <section class="flex flex-col gap-3">
            <div class="card">
                <h2 class="font-bold text-primary-dark">Perfil</h2>
                <div class="p-3 flex flex-col gap-3">
                    <span class="flex flex-col gap-1">
                        <Label class="text-stroke-2">Nome</Label>
                        <h3>{{ userName }}</h3>
                    </span>

                    <span class="flex flex-col gap-1">
                        <Label class="text-stroke-2">E-mail</Label>
                        <h3>{{ userEmail }}</h3>
                    </span>
                </div>
            </div>

            <div class="card">
                <h2 class="font-bold text-primary-dark">Tema (*)</h2>
                <div class="p-3 flex flex-row gap-3">
                    <span class="flex flex-row gap-2 items-center">
                        <Switch />
                        <p>Tema Branco (Padrão)</p>
                    </span>

                    <span class="flex flex-row gap-2 items-center">
                        <Switch />
                        <p>Tema Preto</p>
                    </span>
                </div>
            </div>
        </section>
    </AppLayout>
</template>