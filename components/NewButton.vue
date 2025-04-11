<script setup lang="ts">
import { toast } from 'vue-sonner'

const { createResume } = useResumeAPI()

async function handleCreateResume() {
  const data = await createResume()

  if (data.value) {
    navigateTo(`/resumes/${data.value.id}`)
  }
  else {
    toast.error('Failed to create resume')
  }
}
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>
        New Resume
      </CardTitle>
      <CardDescription>
        Create a new resume
      </CardDescription>
    </CardHeader>
    <CardContent>
      <Button @click="handleCreateResume">
        Create
      </Button>
    </CardContent>
  </Card>
</template>
