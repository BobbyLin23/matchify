<script setup lang="ts">
import { toast } from 'vue-sonner'

const loading = ref(false)

async function loginWithGithub() {
  await authClient.signIn.social({
    provider: 'github',
    callbackURL: '/resumes',
  }, {
    onRequest: () => {
      loading.value = true
    },
    onError: ({ error }) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      })
    },
  })
}
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle class="text-2xl font-bold">
        Welcome to the Matchify
      </CardTitle>
      <CardDescription>
        Please use your social account to login
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div class="space-y-4 w-[350px]">
        <Button variant="outline" class="w-full" :disabled="loading" @click="loginWithGithub">
          <Icon v-if="loading" name="i-mdi-loading" class="animate-spin" />
          <Icon v-else name="i-carbon-logo-github" />
          Login with Github
        </Button>
      </div>
    </CardContent>
  </Card>
</template>
