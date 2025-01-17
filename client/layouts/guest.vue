<script setup lang="ts">
const { status } = useAuth();

if (status.value === "authenticated") {
  navigateTo("/");
}
</script>

<template>
  <LayoutHeader />

  <slot />
</template>
