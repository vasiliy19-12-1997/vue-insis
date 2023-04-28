export interface IPost {
  id: number;
  userId: number;
  title: string;
  body: string;
}
export interface IResponse<T> {
  data: T[];
}
