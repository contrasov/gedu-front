<script setup lang="ts">
import { Toaster } from '@/components/ui/sonner'
import 'vue-sonner/style.css' // vue-sonner v2 requires this import
</script>

<template>
  <div id="app">
    <Toaster />
    <router-view></router-view>
  </div>
</template>