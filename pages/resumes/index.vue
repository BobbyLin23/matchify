<script setup lang="ts">
definePageMeta({
  layout: 'main',
})

const { getResumes } = useResumeAPI()

const resumes = await getResumes()
</script>

<template>
  <div class="container mx-auto my-4 grid grid-cols-4 gap-4">
    <ResumeCard v-for="resume in resumes" :key="resume.id" :resume="resume" />
    <NewButton />
  </div>
</template>
