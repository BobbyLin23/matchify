<script lang="ts" setup>
import type { Resume } from '~/types'

const props = defineProps<{
  resume: Resume
}>()

function handleEditResume() {
  navigateTo(`/resumes/${props.resume.id}`)
}
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>{{ resume.title }}</CardTitle>
      <CardDescription>
        123
      </CardDescription>
    </CardHeader>
    <CardContent>
      <Button variant="outline" @click="handleEditResume">
        Edit
      </Button>
    </CardContent>
  </Card>
</template>
