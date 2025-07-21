<script setup lang="ts">
import { BookCopy, GraduationCap, CalendarDays } from 'lucide-vue-next';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const { classItem } = defineProps<{
    classItem: {
        _id: string,
        name: string;
        subjectId: {
            code: string;
        };
        schedule: Array<string>;
        teacherId: {
            name: string;
        };
    }
}>();

const formatDay = (dayString: string) => {
    if (dayString.endsWith('-feira')) {
        return dayString.replace('-feira', '');
    }
    return dayString;
};

const groupedSchedule = computed(() => {
    const scheduleMap = new Map<string, string[]>(); 

    classItem.schedule.forEach(scheduleItem => {
        const parts = scheduleItem.split(' ');
        const day = parts[0]; 
        const time = parts.slice(1).join(' '); 

        const formattedDay = formatDay(day);

        if (scheduleMap.has(time)) {
            scheduleMap.get(time)!.push(formattedDay);
        } else {
            scheduleMap.set(time, [formattedDay]);
        }
    });

    const result: { days: string[]; time: string }[] = [];
    scheduleMap.forEach((days, time) => {
        result.push({ days: days, time: time });
    });

    return result;
});

const router = useRouter()

const goToClass = () => {
    router.push(`/classes/${classItem._id}`)
}

</script>

<template>
    <div class="card hover-card flex flex-col gap-2" @click="goToClass">
        <div class="flex flex-row gap-2 items-center">
            <span class="bg-primary-color p-2 rounded-md text-white" >
                <BookCopy class="h-5 w-5"/>
            </span>
            <div class="flex flex-col">
                <span class="flex flex-row gap-2 items-center">
                    <h1 class="text-sm" >{{ classItem.name }}</h1>
                    <p class="text-xs font-medium text-stroke-2">{{ classItem.subjectId.code }}</p>
                </span>
                <span class="flex flex-row gap-1 items-center">
                    <GraduationCap class="h-4 w-fit"/>
                    <h2 class="text-sm font-medium">{{ classItem.teacherId.name }}</h2>
                </span>
            </div>
        </div>
        <div class="flex flex-row gap-1 items-center">
            <CalendarDays class="h-4 w-fit"/>
            <div class="flex flex-col text-xs">
                <h3 v-for="(scheduleGroup, index) in groupedSchedule" :key="index">
                    <span class="font-bold">{{ scheduleGroup.days.join(' e ') }}</span> {{ scheduleGroup.time }}
                </h3>
            </div>
        </div>
    </div>
</template>