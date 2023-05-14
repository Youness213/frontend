<template>
    <Recover :Recover="$store.state.auth.recover"/>
  </template>
  
  <script setup>
    import Recover from '@/components/Recover.vue'
  </script>
  