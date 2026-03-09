import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';
import { Post, User, Comment } from '../types/blog';
import { ArrowLeft, MessageSquare, User as UserIcon, Send } from 'lucide-react';

/**
 * PostDetail Component:
 * This component displays the full content of a single blog post and its comments.
 */
const PostDetail: React.FC = () => {
  /**
   * useParams:
   * A hook from react-router-dom to access URL parameters.
   * If the route is '/post/:id', then 'id' will contain the value from the URL.
   */
  const { id } = useParams<{ id: string }>();
  
  /**
   * useNavigate:
   * A hook that returns a function to programmatically navigate between routes.
   * Useful for redirects or back buttons.
   */
  const navigate = useNavigate();

  // Consume global state and actions from our BlogContext.
  const { posts, users, comments, addComment, currentUser, loading } = useBlog();
  
  /**
   * useState:
   * We use local state to store the specific post and author details we're viewing.
   * Initializing with 'null' as the data might not be found immediately.
   */
  const [post, setPost] = useState<Post | null>(null);
  const [author, setAuthor] = useState<User | null>(null);
  const [commentText, setCommentText] = useState('');

  /**
   * useEffect (Side Effects):
   * This hook runs after the component renders. 
   * It's used for synchronization, data fetching, or any logic that depends 
   * on props or state change.
   */
  useEffect(() => {
    // We search for the post in our global 'posts' array using the 'id' from the URL.
    const foundPost = posts.find(p => p.id === id);
    
    if (foundPost) {
      // If found, we update our local state.
      setPost(foundPost);
      const foundAuthor = users.find(u => u.id === foundPost.authorId);
      setAuthor(foundAuthor || null);
    } else {
      /**
       * If the post isn't found, we might want to redirect the user back to the home page.
       * We use a small timeout to avoid immediate redirection while data might be loading.
       */
      const timer = setTimeout(() => {
        if (!posts.find(p => p.id === id)) navigate('/');
      }, 100);

      /**
       * Cleanup function:
       * React runs this when the component unmounts or before the effect runs again.
       * It's crucial for preventing memory leaks (e.g., clearing timers).
       */
      return () => clearTimeout(timer);
    }
    /**
     * Dependency Array:
     * This effect only runs when 'id', 'posts', 'users', or 'navigate' changes.
     */
  }, [id, posts, users, navigate]);

  // Derive comments for this specific post from the global comments array.
  const postComments = comments.filter(c => c.postId === id);

  /**
   * handleCommentSubmit:
   * Form event handler. We prevent the default browser refresh and
   * call the 'addComment' action from our context.
   */
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || !currentUser || !id) return;

    await addComment({
      content: commentText,
      postId: id,
      authorId: currentUser.id,
    });
    // Reset the input field after successful submission.
    setCommentText('');
  };

  // Loading state: Show a message if the post hasn't been found yet.
  if (loading && !post) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!post) return <div className="text-center py-20 font-medium text-gray-400">Post not found.</div>;

  return (
    <div className="max-w-3xl mx-auto">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-indigo-600 font-semibold mb-8 hover:translate-x-1 transition-transform"
      >
        <ArrowLeft size={20} />
        Back to Feed
      </button>

      <article className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-12">
        <div className="p-8 md:p-12">
          <div className="flex items-center gap-3 mb-6">
            <img src={author?.avatar} className="w-10 h-10 rounded-full border border-gray-100" alt="" />
            <div>
              <p className="font-bold text-gray-900">{author?.name}</p>
              <p className="text-xs text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</p>
            </div>
          </div>

          <h1 className="text-4xl font-black text-gray-900 mb-6 leading-tight">{post.title}</h1>
          
          <div className="prose prose-indigo max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
            {post.content}
          </div>

          <div className="flex gap-2 mt-10">
            {post.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-full">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </article>

      <section className="space-y-8">
        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <MessageSquare size={20} className="text-indigo-600" />
          Comments ({postComments.length})
        </h3>

        <form onSubmit={handleCommentSubmit} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <textarea
            className="w-full border-none focus:ring-0 text-gray-700 placeholder-gray-400 resize-none"
            placeholder="Write a comment..."
            rows={3}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-50">
            <div className="flex items-center gap-2">
              <img src={currentUser?.avatar} className="w-6 h-6 rounded-full" alt="" />
              <span className="text-xs font-medium text-gray-500">{currentUser?.name}</span>
            </div>
            <button 
              type="submit"
              disabled={!commentText.trim() || loading}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <Send size={14} />
              )}
              {loading ? 'Posting...' : 'Comment'}
            </button>
          </div>
        </form>

        <div className="space-y-4">
          {postComments.map(comment => {
            const commentAuthor = users.find(u => u.id === comment.authorId);
            return (
              <div key={comment.id} className="flex gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                <img src={commentAuthor?.avatar} className="w-8 h-8 rounded-full" alt="" />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-sm text-gray-900">{commentAuthor?.name}</span>
                    <span className="text-[10px] text-gray-400">{new Date(comment.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-sm text-gray-700">{comment.content}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default PostDetail;
