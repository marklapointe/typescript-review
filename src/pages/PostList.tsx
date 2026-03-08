import React, { useMemo, useState } from 'react';
import { useBlog } from '../context/BlogContext';
import { Link } from 'react-router-dom';
import { Post, User } from '../types/blog';
import { Calendar, Tag, Trash2, Search } from 'lucide-react';
import { GenericList } from '../components/Common';

/**
 * TypeScript Interfaces:
 * Defining the shape of props for the PostCard component.
 * This ensures that we get autocomplete and error checking when using this component.
 */
interface PostCardProps {
  post: Post;
  author: User | undefined;
}

/**
 * PostCard Component:
 * A sub-component used to render individual posts in the list.
 */
const PostCard: React.FC<PostCardProps> = ({ post, author }) => {
  // Use the custom hook to access global blog state.
  const { deletePost, currentUser } = useBlog();
  
  // Derived state: Check if the current user is the author of this post.
  const isOwner = currentUser?.id === post.authorId;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow group mb-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
            {/* Link from react-router-dom for client-side navigation */}
            <Link to={`/post/${post.id}`}>{post.title}</Link>
          </h2>
          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <img src={author?.avatar} className="w-5 h-5 rounded-full" alt="" />
              <span>{author?.name}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
        {/* Conditional Rendering: Only show the delete button if the user is the owner. */}
        {isOwner && (
          <button 
            onClick={() => deletePost(post.id)}
            className="text-gray-300 hover:text-red-500 transition-colors p-1"
            title="Delete post"
          >
            <Trash2 size={18} />
          </button>
        )}
      </div>
      
      <p className="text-gray-600 line-clamp-3 mb-4 leading-relaxed">
        {post.content}
      </p>

      <div className="flex flex-wrap gap-2 mt-auto">
        {/* Array.map: Converting an array of strings (tags) into React elements. */}
        {post.tags.map(tag => (
          <span key={tag} className="px-2 py-1 bg-indigo-50 text-indigo-600 text-xs font-semibold rounded-md flex items-center gap-1">
            <Tag size={10} />
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

/**
 * PostList Component:
 * The main page component that lists all blog posts with search functionality.
 */
const PostList: React.FC = () => {
  const { posts, users } = useBlog();
  
  /**
   * useState:
   * Managing the search input value locally.
   */
  const [searchTerm, setSearchTerm] = useState('');

  /**
   * useMemo (Performance Optimization):
   * We filter the 'posts' array based on the 'searchTerm'.
   * useMemo ensures that we only re-run the filtering logic when 'posts' or 'searchTerm' changes,
   * rather than on every single re-render of the component.
   */
  const filteredPosts = useMemo(() => {
    return posts.filter(post => 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [posts, searchTerm]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-black text-gray-900">Latest Posts</h1>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search posts..." 
            className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full md:w-64"
            /**
             * Controlled Input:
             * The value of the input is controlled by React state.
             * 'value' binds it to our 'searchTerm' state.
             * 'onChange' updates the state when the user types.
             */
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/**
       * GenericList:
       * An example of a reusable component that takes a list of items and a render function.
       */}
      <GenericList
        items={filteredPosts}
        emptyMessage="No posts found matching your search."
        renderItem={(post) => (
          <PostCard 
            key={post.id} 
            post={post} 
            author={users.find(u => u.id === post.authorId)} 
          />
        )}
      />
    </div>
  );
};

export default PostList;
