import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BlogProvider } from './context/BlogContext';
import Layout from './components/Layout';
import PostList from './pages/PostList';
import PostDetail from './pages/PostDetail';
import PostForm from './pages/PostForm';
import './index.css';

/**
 * App Component:
 * The root component of our application. 
 * It sets up the global state provider and the routing system.
 */
const App: React.FC = () => {
  return (
    /**
     * BlogProvider:
     * We wrap the entire app with our Context Provider.
     * This makes the blog state available to any component in the tree.
     */
    <BlogProvider>
      {/**
       * BrowserRouter:
       * Enables client-side routing using the browser's history API.
       */}
      <BrowserRouter>
        {/**
         * Routes & Route:
         * Defining our application's page structure.
         */}
        <Routes>
          {/**
           * Nested Routing:
           * The 'Layout' component acts as a shell for all pages.
           * It contains shared UI like the header and navigation.
           */}
          <Route path="/" element={<Layout />}>
            {/* 'index' means this is the default route for the parent path '/' */}
            <Route index element={<PostList />} />
            
            {/* Dynamic Route: ':id' is a parameter we can access in PostDetail */}
            <Route path="post/:id" element={<PostDetail />} />
            
            {/* Static Route: Navigate here to create a new post */}
            <Route path="new" element={<PostForm />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </BlogProvider>
  );
};

export default App;
