<script setup lang="ts">
</script>

<template>
    <main class="h-screen">
        <section class="flex flex-row">
            <div class="bg-[#E34C37] h-screen w-[50%] flex items-center justify-center">
                <img src="/src/assets/logoItem.svg" alt="">
            </div>
            <div class="flex flex-col items-center justify-center w-[50%] pt-[5%] h-screen overflow-auto hide-scrollbar">
                <slot/>
            </div>
        </section>
    </main>
</template>