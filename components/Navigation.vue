<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <ul class="flex items-center gap-x-2">
    <li>
      <NuxtLink to="/resumes">
        <Button :variant="route.path === '/resumes' ? 'secondary' : 'ghost'">
          Resumes
        </Button>
      </NuxtLink>
    </li>
    <li>
      <NuxtLink to="/settings">
        <Button :variant="route.path === '/settings' ? 'secondary' : 'ghost'">
          Settings
        </Button>
      </NuxtLink>
    </li>
  </ul>
</template>
