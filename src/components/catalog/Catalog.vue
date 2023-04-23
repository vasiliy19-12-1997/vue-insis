<script setup lang="ts">
import { VueElement, reactive, ref,   } from 'vue'
import type { IPost } from './catalog.interface'
const title = ref('')
const state: { posts: IPost[] } = reactive({
  posts: [
    {
      id: 1,
      userId: 1,
      title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
      body: 'quia et suscipitsuscipit recusandae consequuntur expedita et cumreprehenderit molestiae ut ut quas totamnostrum rerum est autem sunt rem eveniet architecto'
    }
  ]
})
const removePost = (id: number) => {
  state.posts = state.posts.filter((post) => post.id !== id)
}
const addPost = () => {
  console.log(title);
  state.posts.push ({id:2, title:title.value, userId:2, body:''})
}
</script>

<template>
  <div>
    <h1>Add post</h1>
    <form action="">
      <input v-model="title" />
      <button @click.prevent="addPost">Add</button>
    </form>
    <ul>
      <li :key="post.id" v-for="post in state.posts">
        <span>{{ post.id }} - {{ post.title }}</span>
        <button @click="removePost(post.id)"></button>
      </li>
    </ul>
  </div>
</template>
