<script setup lang="ts">
import { VueElement, reactive, ref, defineProps } from 'vue';
import type { IPost } from './catalog.interface';
import { useField } from 'vee-validate';
const props = defineProps<{ title: string }>();

const isRequired = (value: string) =>
  (value && value.trim()) || 'This is required';

const { errorMessage, value } = useField(() => props.title, isRequired);
const state: { posts: IPost[] } = reactive({
  posts: [
    {
      id: 1,
      userId: 1,
      title:
        'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
      body: 'quia et suscipitsuscipit recusandae consequuntur expedita et cumreprehenderit molestiae ut ut quas totamnostrum rerum est autem sunt rem eveniet architecto',
    },
  ],
});
const removePost = (id: number) => {
  state.posts = state.posts.filter((post) => post.id !== id);
};

const addPost = () => {
  console.log(value);
  state.posts.push({ id: 2, title: value.value, userId: 2, body: '' });
  localStorage.setItem('posts', JSON.stringify(state.posts));
  value.value = '';
};
</script>

<template>
  <div>
    <h1>Add post</h1>
    <form action="">
      <input v-model="value" />
      <div v-if="errorMessage">{{ errorMessage }}</div>
      <button @click.prevent="addPost">Add</button>
    </form>
    <ul>
      <li :key="post.id" v-for="post in state.posts">
        <span>{{ post.id }} - {{ post.title }}</span>
        <button @click="removePost(post.id)">delete</button>
      </li>
    </ul>
  </div>
</template>
