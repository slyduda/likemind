<template>
  <div class="w-full h-full flex items-center justify-center">
    <BaseModal>
      <div class="mb-4 w-full flex justify-center flex-col items-center">
        <h1 class="text-2xl font-semibold archivo">
          Signup
        </h1>
        <div>Already have an account?<NuxtLink to="/pilots/login" class="text-indigo-500 font-bold ml-1 underline">Login
          </NuxtLink>
        </div>
      </div>
      <BaseInput v-model="body.email" class="mb-4" name="email" label="Email" type="email" required
        placeholder="example@email.com" border :rounded="'xl'" />
      <BaseInput v-model="body.handle" class="mb-4" name="handle" label="Handle" required placeholder="handle" border
        :rounded="'xl'" />
      <BaseInput v-model="body.password" class="mb-4" name="password" label="Password" type="password" required
        placeholder="password" border :rounded="'xl'" />
      <BaseButton :pending="pending" :disabled="disabled" class="mt-2 bg-blue-500 text-indigo-50 w-full"
        @click="makeRequests">
        Signup
      </BaseButton>
      <NuxtLink to="/pilots/signup" class="text-blue-500 font-bold mt-4 underline archivo">Login</NuxtLink>
    </BaseModal>
  </div>
</template>

<script setup lang="ts">
const body = reactive({
  email: "",
  handle: "",
  password: "",
})
const headers = reactive({
  authorization: ""
})

const pending = ref(false)
const disabled = computed(() => !body.email || !body.password || !body.handle)

const makeRequests = async () => {
  pending.value = true
  await postUsersSignup()
  pending.value = false
}

const postUsersSignup = async () => {
  await $fetch("/api/users", {
    method: "POST",
    headers,
    body,
  }).then(() => {
    alert("success!")
  }).catch(() => {
    alert("failure!")
  })
}
</script>