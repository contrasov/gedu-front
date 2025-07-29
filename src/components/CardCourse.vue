<script setup lang="ts">
import { GraduationCap } from 'lucide-vue-next';
import { useRouter } from 'vue-router';

const router = useRouter()

const { courseItem } = defineProps<{
    courseItem: {
        _id: string,
        name: string;
        subjectIds: [
            {
            _id: string;
            name: string;
            },
        ]
    }
}>();

const goToClass = () => {
    router.push(`/courses/${courseItem._id}`)
}


</script>

<template>
    <div class="card hover-card flex flex-col gap-2" @click="goToClass">
        <div class="flex flex-row gap-2 items-center">
            <span class="bg-primary-color p-2 rounded-md text-white" >
                <GraduationCap class="h-5 w-5"/>
            </span>
            <div class="flex flex-col">
                <span class="flex flex-row gap-2 items-center">
                    <h1 class="text-sm" >{{ courseItem.name }}</h1>
                </span>
            </div>
        </div>
    </div>
</template>