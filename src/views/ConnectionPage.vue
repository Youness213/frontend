<template>
  <Connexion :Active="$store.state.auth.status"/>
</template>

<script setup>
  import Connexion from '@/components/Connexion.vue'
</script>
