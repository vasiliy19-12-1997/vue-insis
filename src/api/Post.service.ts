import type { IPost } from '@/components/catalog/Catalog.interface';
import axios from 'axios';
axios.defaults['baseURL'] = 'https://jsonplaceholder.typicode.com';
interface IPostDto extends Omit<IPost, 'id'> {}
export const PostService = {
  getAll: async () => {
    return axios.get<IPost[]>('/posts?_limit=5');
  },

  create: async (body: IPostDto) => {
    return axios.post('/posts?', body, {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
  },

  delete: async (id: number) => {
    return axios.delete(`/posts/${id}`);
  },
};
