<script setup lang="ts">
import AppSidebar from '@/components/AppSidebar.vue';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
</script>

<template>
    <main class="bg-background-primary">
        <SidebarProvider>
            <AppSidebar />
            <section class="bg-background-secondary w-full p-4 m-3 rounded-md">
                <!-- <SidebarTrigger/> -->
                <slot/>
            </section>
        </SidebarProvider>
    </main>
</template>