import { PostService } from '@/api/Post.service';
import { useField } from 'vee-validate';
import { useMutation, useQueryClient } from 'vue-query';
import type { IPostDto } from './catalog.interface';
export const useCatalog = (props: Readonly<{ title: string }>) => {
  const isRequired = (value: string) =>
    (value && value.trim()) || 'This is required';

  const { errorMessage, value } = useField(() => props.title, isRequired);
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(
    'create post',
    (body: IPostDto) => PostService.create(body),
    {
      onSuccess() {
        queryClient.invalidateQueries('get posts');
        value.value = '';
      },
    }
  );
  const addPost = () => {
    mutate({
      body: '',
      title: value.value,
      userId: 1,
    });
  };
  return {
    addPost,
    isLoading,
    value,
    errorMessage,
  };
};

export default useCatalog;
