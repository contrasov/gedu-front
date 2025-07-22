<script setup lang="ts">
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { getUserInfo, deleteUser, updateUser, type User } from '@/services/UsersService';
import { UserIcon } from 'lucide-vue-next';
import { onMounted, ref } from 'vue';
import { Button } from './ui/button';
import router from '@/router/router';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { type RegisterData } from '@/services/AuthService';

const editUserData = ref<{ phone: string; email: string }>({ phone: '', email: '' });

const { userItem } = defineProps<{
    userItem: {
        _id: string,
        name: string;
        email: string;
    }
}>();

const userInfo = ref<User | null>(null)

const showInfo = async (id: string) => {
    try {
        userInfo.value = await getUserInfo(id)
    } catch (e) {
        console.error('Erro ao buscar informações:', e)
    }
}

const userDelete = async (id: string) => {
    try {
        await deleteUser(id)
        router.go(0)
    } catch (e) {
        console.error('Erro ao deletar usuário:', e)
    }
}

const updateUserInfo = async (id: string) => {
    try {
        const currentUserInfo = await getUserInfo(id);
        
        const updatedData: RegisterData = {
            ...currentUserInfo, 
            phone: editUserData.value.phone ? editUserData.value.phone : currentUserInfo.phone, 
            email: editUserData.value.email ? editUserData.value.email : currentUserInfo.email,
        };

        if (editUserData.value.phone || editUserData.value.email) {
            await updateUser(id, updatedData); 
            router.go(0);
        }
    } catch (e) {
        console.error('Erro ao atualizar informações:', e);
    }
}

function formatPhone(value: string) {
  return value
    .replace(/\D/g, '')
    .replace(/^(\d{2})(\d)/g, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .slice(0, 15)
}

function onPhoneInput(e: Event){
    const rawValue = (e.target as HTMLInputElement).value
    const formatted = formatPhone(rawValue)
    editUserData.value.phone = formatted
}


onMounted(() => {
    showInfo(userItem._id)
})
</script>

<template>
    <Sheet>
        <span class="card flex flex-row gap-2 items-center hover-card">
            <span class="p-1 bg-primary-color text-white rounded-md">
                <UserIcon />
            </span>
            <SheetTrigger class="w-full text-left cursor-pointer ">{{ userItem.name }}</SheetTrigger>
        </span>
        <SheetContent>
            <SheetHeader>
                <SheetTitle>{{ userInfo?.name }}</SheetTitle>
                <p class="text-sm text-stroke-2 mt-[-4px]">{{ userInfo?.training }}</p>
                <p v-if="userInfo?.type === 'Student'" class="text-sm text-stroke-2 mt-[-4px]">{{ userInfo?.courseId.name }}</p>
                <SheetDescription>
                    <div class="flex flex-col gap-2 justify-between h-full">
                        <div class="flex flex-col gap-2">
                            <h1 class="text-primary-dark/90 font-medium">Informações Basicas</h1>
                            <div class="border rounded-md p-2 flex flex-col gap-1">
                                <span class="flex flex-row justify-between">
                                    <Label>Data de Nascimento:</Label>
                                    <p>{{ userInfo?.dateBirth }}</p>
                                </span>
                                <span class="flex flex-row justify-between">
                                    <Label>CPF:</Label>
                                    <p>{{ userInfo?.cpf }}</p>
                                </span>
                                <span class="flex flex-row justify-between">
                                    <Label>Telefone:</Label>
                                    <p>{{ userInfo?.phone }}</p>
                                </span>
                                <span class="flex flex-row justify-between">
                                    <Label>E-mail:</Label>
                                    <p>{{ userInfo?.email }}</p>
                                </span>
                            </div>
                        </div>

                        <div class="w-full flex flex-row gap-2 justify-end">
                            <Dialog>
                                <DialogTrigger as-child>
                                    <Button>
                                        Editar
                                    </Button>
                                </DialogTrigger>
                                <DialogContent class="sm:max-w-[625px]">
                                    <DialogHeader>
                                        <DialogTitle>Atualizar Informações</DialogTitle>
                                        <DialogDescription>
                                            <h2>Edite as informações básicas do usuário</h2>
                                        </DialogDescription>
                                    </DialogHeader>

                                    <div class="flex flex-col gap-1">
                                        <Input @input="onPhoneInput" v-model="editUserData.phone" placeholder="Telefone"/>
                                        <Input type="email" v-model="editUserData.email" placeholder="E-mail"/>
                                    </div>

                                    <DialogFooter>
                                        <DialogClose>
                                            <Button>Cancelar</Button>
                                        </DialogClose>
                                        <Button variant="outline" type="submit" @click="updateUserInfo(userItem._id)">
                                            Atualizar
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                            <Dialog>
                                <DialogTrigger as-child>
                                    <Button variant="outline">
                                        Apagar Usuário
                                    </Button>
                                </DialogTrigger>
                                <DialogContent class="sm:max-w-[625px]">
                                    <DialogHeader>
                                        <DialogTitle>Remover usuário da Gedu</DialogTitle>
                                        <DialogDescription>
                                            <h2>Deseja realmente excluir este usuário? Essa ação não poderá ser desfeita.</h2>
                                        </DialogDescription>
                                    </DialogHeader>

                                    <DialogFooter>
                                        <DialogClose>
                                            <Button>Cancelar</Button>
                                        </DialogClose>
                                        <Button variant="outline" type="submit" @click="userDelete(userItem._id)">
                                            Deletar
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                </SheetDescription>
            </SheetHeader>
        </SheetContent>
    </Sheet>
</template>