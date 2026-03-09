/**
 * Context API:
 * This file sets up a global state management system using React's built-in Context API.
 * It allows us to share data (posts, users, comments) and actions (addPost, deletePost)
 * across the entire application without passing props down manually through every component.
 */
import React, { createContext, useContext, useState, useMemo, useCallback, useEffect } from 'react';
import { Post, Comment, User, BlogState } from '../types/blog';

// The Context Type defines the structure of our global state and the functions to update it.
interface BlogContextType extends BlogState {
  addPost: (post: Omit<Post, 'id' | 'createdAt'>) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
  addComment: (comment: Omit<Comment, 'id' | 'createdAt'>) => Promise<void>;
  setCurrentUser: (user: User | null) => void;
}

// Initial mock data to populate our application on first load.
const initialUsers: User[] = [
  { id: '1', name: 'John Doe', avatar: 'https://i.pravatar.cc/150?u=2' },
  { id: '2', name: 'Jane Smith', avatar: 'https://i.pravatar.cc/150?u=1' },
];

const initialPosts: Post[] = [
  {
    id: 'p1',
    title: 'Getting Started with React and TypeScript',
    content: 'React and TypeScript are a powerful combination for building scalable web applications. This post explores the basics...',
    authorId: '1',
    createdAt: new Date().toISOString(),
    tags: ['React', 'TypeScript', 'WebDev']
  },
  {
    id: 'p2',
    title: 'Mastering React Hooks',
    content: 'Hooks changed the way we write React components. In this article, we dive deep into useEffect, useMemo, and useCallback.',
    authorId: '2',
    createdAt: new Date().toISOString(),
    tags: ['React', 'Hooks', 'Advanced']
  }
];

// Create the context. We use 'undefined' initially and handle it in the useBlog hook.
const BlogContext = createContext<BlogContextType | undefined>(undefined);

/**
 * BlogProvider:
 * This component wraps the App and provides the state to all child components.
 * It's the central place where our state logic lives.
 */
export const BlogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  /**
   * useState:
   * We use a single state object to hold all our blog data.
   * 'state' is the current value, and 'setState' is the function we call to update it.
   */
  const [state, setState] = useState<BlogState>({
    posts: [],
    users: [],
    comments: [],
    currentUser: null,
    loading: true,
  });

  /**
   * Simulate initial data fetching using async/await.
   */
  useEffect(() => {
    const fetchData = async () => {
      // Simulate a network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setState(prev => ({
        ...prev,
        posts: initialPosts,
        users: initialUsers,
        currentUser: initialUsers[0],
        loading: false,
      }));
    };

    fetchData();
  }, []);

  /**
   * useCallback:
   * This hook memoizes functions. It ensures that the function reference doesn't change
   * on every re-render unless its dependencies change. This is good for performance
   * when passing functions to child components that use 'React.memo'.
   */
  const addPost = useCallback(
      async (postData: Omit<Post, 'id' | 'createdAt'>) => {
        setState(prev => ({ ...prev, loading: true }));
        
        // Simulate an asynchronous API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const newPost: Post = {
          ...postData,
          id: Math.random().toString(36).substr(2, 9),
          createdAt: new Date().toISOString(),
        };

        setState(prev => ({
          ...prev,
          posts: [newPost, ...prev.posts],
          loading: false,
        }));
      },
      []
  );

  const deletePost = useCallback(async (id: string) => {
    setState(prev => ({ ...prev, loading: true }));
    
    // Simulate an asynchronous API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setState(prev => ({
      ...prev,
      posts: prev.posts.filter(p => p.id !== id),
      loading: false
    }));
  }, []);

  const addComment = useCallback(async (commentData: Omit<Comment, 'id' | 'createdAt'>) => {
    setState(prev => ({ ...prev, loading: true }));
    
    // Simulate an asynchronous API call
    await new Promise(resolve => setTimeout(resolve, 600));

    const newComment: Comment = {
      ...commentData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
    };
    
    setState(prev => ({
      ...prev,
      comments: [...prev.comments, newComment],
      loading: false
    }));
  }, []);

  const setCurrentUser = useCallback((user: User | null) => {
    setState(prev => ({ ...prev, currentUser: user }));
  }, []);

  /**
   * useMemo:
   * Similar to useCallback, but for values. It recalculates the 'value' object
   * only when 'state' or any of the functions change. This prevents unnecessary
   * re-renders of components that consume this context.
   */
  const value = useMemo(() => ({
    ...state,
    addPost,
    deletePost,
    addComment,
    setCurrentUser,
  }), [state, addPost, deletePost, addComment, setCurrentUser]);

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
};

/**
 * useBlog (Custom Hook):
 * This is a helper hook that makes it easy for components to access the BlogContext.
 * Instead of calling 'useContext(BlogContext)' everywhere, we use 'useBlog()'.
 */
export const useBlog = () => {
  const context = useContext(BlogContext);
  // Guard clause: Ensure the hook is used inside a Provider.
  if (!context) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};
