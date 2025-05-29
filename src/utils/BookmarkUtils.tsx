import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'BOOKMARKED_ARTICLES';

export const getBookmarks = async () => {
  const json = await AsyncStorage.getItem(STORAGE_KEY);
  return json ? JSON.parse(json) : [];
};

export const saveBookmark = async (article: any) => {
  const bookmarks = await getBookmarks();
  const updated = [article, ...bookmarks.filter((a : any) => a.title !== article.title)];
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

export const removeBookmark = async (title: string) => {
  const bookmarks = await getBookmarks();
  const updated = bookmarks.filter((a : any) => a.title !== title);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

export const isBookmarked = async (title: string) => {
  const bookmarks = await getBookmarks();
  return bookmarks.some((a : any) => a.title === title);
};