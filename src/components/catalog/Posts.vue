<script lang="ts">
import { PostService } from '@/api/Post.service';
import { defineComponent } from 'vue';
import { useMutation, useQuery, useQueryClient } from 'vue-query';
export default defineComponent({
  name: 'Posts',
  setup() {
    const queryClient = useQueryClient();
    const { isLoading, data } = useQuery('get posts', () =>
      PostService.getAll()
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
  <ul>
    <li :key="post.id" v-for="(post, index) in data?.data">
      <span v-if="post">{{ index }} - {{ post.title }} {{ post.body }}</span>
      <button :disabled="isLoadingDelete" @click="mutate(post.id)">X</button>
    </li>
  </ul>
</template>
