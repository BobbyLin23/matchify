<script setup lang="ts">
import { LogOutIcon } from 'lucide-vue-next'

const router = useRouter()

const session = authClient.useSession()

async function handleLogout() {
  await authClient.signOut({
    fetchOptions: {
      onSuccess: () => {
        router.push('/auth')
      },
    },
  })
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <Avatar>
        <AvatarImage :src="session.data?.user?.image || ''" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem @click="handleLogout">
        <LogOutIcon />
        Logout
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
