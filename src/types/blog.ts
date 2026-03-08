export interface User {
  id: string;
  name: string;
  avatar: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: string;
  tags: string[];
}

export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  content: string;
  createdAt: string;
}

export interface BlogState {
  posts: Post[];
  users: User[];
  comments: Comment[];
  currentUser: User | null;
}
