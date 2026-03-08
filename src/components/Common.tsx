import React from 'react';

/**
 * TypeScript Generics:
 * The '<T>' indicates that this interface is generic. 
 * It can work with any type of data (Post, User, etc.) without knowing 
 * what that data is ahead of time.
 */
interface ListProps<T> {
  items: T[];
  // renderItem is a function that tells the component how to display each 'T'.
  renderItem: (item: T) => React.ReactNode;
  emptyMessage?: string;
  className?: string;
}

/**
 * GenericList:
 * A highly reusable component that can render a list of anything.
 * It uses the "Render Prop" pattern: instead of defining the UI for 
 * an item here, it delegates that responsibility to the 'renderItem' prop.
 */
export function GenericList<T>({ 
  items, 
  renderItem, 
  emptyMessage = "No items to display.", 
  className = "" 
}: ListProps<T>) {
  // Conditional rendering: Show a fallback if the list is empty.
  if (items.length === 0) {
    return (
      <div className="p-8 text-center text-gray-400 font-medium bg-white rounded-xl border border-dashed border-gray-200">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className={className}>
      {/**
       * Mapping over the generic items. 
       * We use React.Fragment to avoid adding extra DOM nodes.
       */}
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {renderItem(item)}
        </React.Fragment>
      ))}
    </div>
  );
}

/**
 * Card Component:
 * A simple "Container Component" or "Shell Component".
 * It provides consistent styling (shadow, borders, padding) 
 * for any content passed to it via the 'children' prop.
 */
interface CardProps {
  children: React.ReactNode; // Special prop for nested content.
  title?: string;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, title, className = "" }) => {
  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden ${className}`}>
      {title && (
        <div className="px-6 py-4 border-b border-gray-50">
          <h3 className="font-bold text-gray-900">{title}</h3>
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};
