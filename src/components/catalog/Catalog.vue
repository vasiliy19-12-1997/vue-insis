<script setup lang="ts">
import { useField } from 'vee-validate';
import { defineProps, reactive } from 'vue';
import type { IPost } from './catalog.interface';
const props = defineProps<{ title: string }>();

const isRequired = (value: string) =>
  (value && value.trim()) || 'This is required';

const { errorMessage, value } = useField(() => props.title, isRequired);
const state: { posts: IPost[] } = reactive({
  posts: [
    {
      id: Math.random(),
      userId: 1,
      title:
        'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
      body: 'quia et suscipitsuscipit recusandae consequuntur expedita et cumreprehenderit molestiae ut ut quas totamnostrum rerum est autem sunt rem eveniet architecto',
    },
  ],
});
const removePost = (id: number) => {
  const index = state.posts.findIndex((post) => post.id === id);
  index !== id ? state.posts.splice(index, 1) : null;
};

const addPost = () => {
  console.log(value);
  state.posts.push({ id: 2, title: value.value, userId: 2, body: '' });
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
