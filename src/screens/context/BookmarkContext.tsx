import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Article = {
  title: string;
  source: { name: string };
  publishedAt: string;
  urlToImage?: string;
  description?: string;
  content?: string;
};

type BookmarkContextType = {
  bookmarks: Article[];
  addBookmark: (article: Article) => void;
  removeBookmark: (article: Article) => void;
  isBookmarked: (article: Article) => boolean;
};

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export const BookmarkProvider: React.FC = ({ children } : any) => {
  const [bookmarks, setBookmarks] = useState<Article[]>([]);

  useEffect(() => {
    AsyncStorage.getItem('@bookmarks').then(data => {
      if (data) setBookmarks(JSON.parse(data));
    });
  }, []);

  const saveBookmarks = async (newBookmarks: Article[]) => {
    setBookmarks(newBookmarks);
    await AsyncStorage.setItem('@bookmarks', JSON.stringify(newBookmarks));
  };

  const addBookmark = (article: Article) => {
    if (!isBookmarked(article)) {
      saveBookmarks([...bookmarks, article]);
    }
  };

  const removeBookmark = (article: Article) => {
    saveBookmarks(bookmarks.filter(a => a.title !== article.title));
  };

  const isBookmarked = (article: Article) => {
    return bookmarks.some(a => a.title === article.title);
  };

  return (
    <BookmarkContext.Provider value={{ bookmarks, addBookmark, removeBookmark, isBookmarked }}>
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarks = () => {
  const context = useContext(BookmarkContext);
  if (!context) throw new Error('useBookmarks must be used within BookmarkProvider');
  return context;
};