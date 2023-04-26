<script setup lang="ts">
import { useField } from 'vee-validate';
import { defineProps, reactive } from 'vue';
import type { IPost } from './catalog.interface';
const props = defineProps<{ title: string }>();

const isRequired = (value: string) =>
  (value && value.trim()) || 'This is required';

const { errorMessage, value } = useField(() => props.title, isRequired);
const state: { posts: IPost[] } = reactive({
  posts: [],
});
const removePost = (id: number) => {
  state.posts = state.posts.filter((post) => post.id !== id);
};

const addPost = () => {
  console.log(value);
  state.posts.push({
    id: Math.random(),
    title: value.value,
    userId: 2,
    body: '',
  });
  value.value = '';
};
</script>

<template>
  <div class="bg-red-100">
    <h1 class="text-3xl font-bold underline">Add post</h1>
    <form action="">
      <input v-model="value" />
      <div v-if="errorMessage">{{ errorMessage }}</div>
      <button @click.prevent="addPost">Add</button>
    </form>
    <ul>
      <li :key="post.id" v-for="(post, index) in state.posts">
        <span>{{ index }} - {{ post.title }}</span>
        <button @click="removePost(post.id)">delete</button>
      </li>
    </ul>
  </div>
</template>
