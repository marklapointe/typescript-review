import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';
import { Home, PlusSquare, User as UserIcon } from 'lucide-react';

/**
 * Layout Component:
 * This component defines the common structure (header, navigation, footer) 
 * that will be shared across all pages of the application.
 */
const Layout: React.FC = () => {
  // Access global state to show the current user's profile in the header.
  const { currentUser } = useBlog();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          {/**
           * NavLink:
           * A special version of the 'Link' component that knows whether it's "active".
           */}
          <NavLink to="/" className="text-xl font-bold text-indigo-600 flex items-center gap-2">
            <Home size={24} />
            <span>ReactTS Blog</span>
          </NavLink>
          
          <nav className="flex items-center gap-6">
            <NavLink 
              to="/" 
              /**
               * Active State:
               * We can pass a function to 'className' to conditionally style 
               * the link based on whether its path matches the current URL.
               */
              className={({ isActive }) => 
                `flex items-center gap-1 text-sm font-medium ${isActive ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-500'}`
              }
            >
              Feed
            </NavLink>
            <NavLink 
              to="/new" 
              className={({ isActive }) => 
                `flex items-center gap-1 text-sm font-medium ${isActive ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-500'}`
              }
            >
              <PlusSquare size={18} />
              New Post
            </NavLink>
          </nav>

          <div className="flex items-center gap-3 border-l border-gray-200 pl-6 ml-6">
            <div className="text-right">
              <p className="text-xs text-gray-400 font-medium">Signed in as</p>
              <p className="text-sm font-semibold text-gray-700">{currentUser?.name}</p>
            </div>
            {currentUser?.avatar ? (
              <img src={currentUser.avatar} alt={currentUser.name} className="w-8 h-8 rounded-full border border-gray-200" />
            ) : (
              <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                <UserIcon size={16} />
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
        {/**
         * Outlet:
         * This is a placeholder for the child routes defined in App.tsx.
         * When we visit "/", the 'PostList' will be rendered here.
         * When we visit "/new", the 'PostForm' will be rendered here.
         */}
        <Outlet />
      </main>

      <footer className="bg-white border-t border-gray-200 py-8 text-center text-sm text-gray-400 mt-auto">
        <p>&copy; {new Date().getFullYear()} React + TypeScript Concepts Review Blog</p>
        <div className="mt-2 space-x-4">
          <span>Built with: React, TypeScript, Vite, React Router, Lucide Icons, TailWind CSS</span>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
