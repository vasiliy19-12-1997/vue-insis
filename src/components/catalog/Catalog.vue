<script setup lang="ts">
import s from './Catalog.module.scss';
import useCatalog from './useCatalog';
import Posts from '@/components/catalog/Posts.vue';
const props = defineProps<{ title: string }>();

const { value, errorMessage, addPost, isLoading } = useCatalog(props);
</script>

<template>
  <div :class="s.wrapper">
    <h1>Add post</h1>
    <form action="">
      <input v-model="value" placeholder="Enter post title..." />
      <div v-if="errorMessage">{{ errorMessage }}</div>
      <button :disabled="isLoading" @click.prevent="addPost">Add</button>
    </form>
    <Posts />
  </div>
</template>
