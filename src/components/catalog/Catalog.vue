<script setup lang="ts">
import s from './Catalog.module.scss';
import useCatalog from './useCatalogForm';
const props = defineProps<{ title: string }>();

const { state, value, addPost, removePost, errorMessage } = useCatalog(props);
// const { data, isLoading } = useQuery('get posts', () =>
//   axios.get('https://jsonplaceholder.typicode.com/posts')
// );
// console.log(data);
</script>

<template>
  <div :class="s.wrapper">
    <h1>Add post</h1>
    <form action="">
      <input v-model="value" placeholder="Enter post title..." />
      <div v-if="errorMessage">{{ errorMessage }}</div>
      <button @click.prevent="addPost">Add</button>
    </form>
    <!-- <div v-if="isLoading">Loading...</div> -->
    <div v-if="!state.posts.length">Posts not found</div>
    <ul>
      <li :key="post.id" v-for="(post, index) in state.posts">
        <span>{{ index }} - {{ post.title }}</span>
        <button @click="removePost(post.id)">X</button>
      </li>
    </ul>
  </div>
</template>
