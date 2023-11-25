<template>
  <form @submit.prevent="handleDataUpload">
    <label for="username" class="form-label">Username:</label>
    <input type="text" name="username" v-model="username" required class="form-input" />

    <label for="password" class="form-label">Password:</label>
    <input type="password" v-model="password" required class="form-input" />

    <input multiple type="file" @change="handleFile($event)" />
    <input type="submit" />
  </form>
</template>

<script setup>
import { ref } from 'vue';

const files = ref();
const username = ref('');
const password = ref('');

async function handleDataUpload() {
  const fd = new FormData();
  Array.from(files.value).forEach((file, index) => {
    fd.append("file", file);
  });

  fd.append('username', username.value);
  fd.append('password', password.value);

  try {
    const response = await $fetch('/api/backend', {
      method: 'POST',
      body: fd,
      // headers: {
      //       'Content-Type': 'multipart/form-data'
      //     }
    });

    console.log('Response from backend:', response);
  } catch (error) {
    console.error('Error uploading data:', error.message);
  }
}

function handleFile(e) {
  files.value = e.target.files;
}
</script>
