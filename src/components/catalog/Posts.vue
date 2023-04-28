<script lang="ts">
import { PostService } from '@/api/Post.service';
import axios from 'axios';
import { defineComponent } from 'vue';
import { useMutation, useQuery, useQueryClient } from 'vue-query';
export default defineComponent({
  name: 'Posts',
  setup() {
    const queryClient = useQueryClient;
    const { isLoading, data } = useQuery(
      'get posts',
      () => PostService.getAll(),
      {
        select: ({ data }) => data,
      }
    );
    const { mutate, isLoading: isLoadingDelete } = useMutation(
      'delete post',
      (id: number) => PostService.delete(id),
      {
        onSuccess() {
          queryClient.invalidateQueries('get posts');
        },
      }
    );

    return {
      isLoading,
      data,
      mutate,
      isLoadingDelete,
    };
  },
});
</script>

<template>
  <div v-if="isLoading">Loading...</div>
  <!-- <div v-eles-if="!posts?.data.length">Posts not found</div> -->
  <!-- <div v-eles-if="!posts?.data.length">Posts not found</div> -->
  <ul>
    <li :key="post.id" v-for="(post, index) in data">
      <span>{{ index }} - {{ post.title }}</span>
      <button :disabled="isLoadingDelete" @click="mutate(post.id)">X</button>
    </li>
  </ul>
</template>
