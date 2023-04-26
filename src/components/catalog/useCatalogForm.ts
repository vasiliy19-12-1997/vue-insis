import { useField } from 'vee-validate';
import { reactive } from 'vue';
import type { IPost } from './Catalog.interface';
export const useCatalog = (props: Readonly<{ title: string }>) => {
  const isRequired = (value: string) =>
    (value && value.trim()) || 'This is required';

  const { errorMessage, value } = useField(() => props.title, isRequired);
  const state: { posts: IPost[] } = reactive({
    posts: [],
  });
  const removePost = (id: number) => {
    // const index = state.posts.findIndex((post) => post.id === id);
    // index !== id ? state.posts.splice(index, 1) : null;
    state.posts = state.posts.filter((post) => post.id !== id);
  };

  const addPost = () => {
    state.posts.push({
      id: Math.random(),
      title: value.value,
      userId: 2,
      body: '',
    });
    value.value = '';
  };
  return {
    state,
    value,
    addPost,
    removePost,
    errorMessage,
  };
};

export default useCatalog;
