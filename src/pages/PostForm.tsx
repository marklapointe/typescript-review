import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';
import { Tag as TagIcon, X, PlusCircle, Send } from 'lucide-react';

/**
 * PostForm Component:
 * This component demonstrates how to handle forms in React using "Controlled Components".
 * In a controlled component, form data is handled by a React component's state.
 */
const PostForm: React.FC = () => {
  const navigate = useNavigate();
  const { addPost, currentUser } = useBlog();
  
  /**
   * useState:
   * We use multiple state variables to track each input field in our form.
   */
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [currentTag, setCurrentTag] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  /**
   * handleAddTag:
   * Logic for adding a tag to our list of tags. 
   * It handles both button clicks and the 'Enter' key press.
   */
  const handleAddTag = (e: React.KeyboardEvent | React.MouseEvent) => {
    // Only proceed if it's a mouse click or if the 'Enter' key was pressed.
    if ('key' in e && e.key !== 'Enter') return;
    
    // Prevent default form submission if 'Enter' is pressed in the tag input.
    e.preventDefault();
    
    const trimmedTag = currentTag.trim();
    // Check if tag is not empty and not already in our list.
    if (trimmedTag && !tags.includes(trimmedTag)) {
      // Functional state update: creating a new array with the old tags plus the new one.
      setTags([...tags, trimmedTag]);
      // Clear the input field.
      setCurrentTag('');
    }
  };

  /**
   * removeTag:
   * Logic for removing a tag from the list using 'Array.filter'.
   */
  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  /**
   * handleSubmit:
   * Form submission handler. It collects all our state values and 
   * calls the 'addPost' action from our global context.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation.
    if (!title || !content || !currentUser) return;

    addPost({
      title,
      content,
      tags,
      authorId: currentUser.id,
    });

    // Navigate the user back to the feed after posting.
    navigate('/');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-black text-gray-900 mb-8">Create New Post</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <label htmlFor="title" className="block text-sm font-bold text-gray-700 mb-2">Title</label>
          <input
            id="title"
            type="text"
            required
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
            placeholder="Something catchy..."
            /**
             * Controlled Input:
             * 'value' is synced with React state, and 'onChange' updates that state.
             */
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-bold text-gray-700 mb-2">Content</label>
          <textarea
            id="content"
            required
            rows={8}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none resize-none"
            placeholder="Share your thoughts..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="tags" className="block text-sm font-bold text-gray-700 mb-2">Tags</label>
          <div className="flex gap-2 mb-3">
            <input
              id="tags"
              type="text"
              className="flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Add a tag (press Enter)"
              value={currentTag}
              onChange={(e) => setCurrentTag(e.target.value)}
              onKeyDown={handleAddTag}
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="p-2 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors"
            >
              <PlusCircle size={24} />
            </button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {/**
             * Mapping over tags array to display each tag as a removable badge.
             */}
            {tags.map(tag => (
              <span key={tag} className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium border border-indigo-100">
                <TagIcon size={12} />
                {tag}
                <button 
                  type="button" 
                  onClick={() => removeTag(tag)}
                  className="ml-1 hover:text-red-500"
                >
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2"
        >
          <Send size={18} />
          Publish Post
        </button>
      </form>
    </div>
  );
};

export default PostForm;
