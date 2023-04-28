import type { IPost } from '@/components/catalog/catalog.interface';
import axios from 'axios';
axios.defaults['baseURL'] = 'http://localhost:3000';
interface IPostDto extends Omit<IPost, 'id'> {}
export const PostService = {
  async getAll() {
    return axios.get<IPost[]>('/posts');
  },

  async create(body: IPostDto) {
    return axios.post('/posts', body, {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
  },

  async delete(id: number) {
    return axios.delete(`/posts/${id}`);
  },
};
