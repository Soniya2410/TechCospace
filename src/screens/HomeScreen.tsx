import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TextInput,
  RefreshControl,
  SafeAreaView,
} from 'react-native';
import {useTheme} from '../context/ThemeContext';
import {CONSTANT} from '../utils/Constant';
import ArticleItem from './component/ArticleItems';
import axios from 'axios';
import articleData from '../utils/article.json';
import { ConstantColors } from '../utils/Colors';
import { fetchArticles } from '../services/newsApi';
import SearchInput from './component/SearchInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

type Article = {
  title: string;
  source: {name: string};
  publishedAt: string;
  urlToImage: string;
};

function HomeScreen(): React.JSX.Element {
  const {backgroundColor, textColor} = useTheme();

  const [articles, setArticles] = useState<Article[]>([]);
  // const [articles, setArticles] = useState<Article[]>(articleData);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
   const [query, setQuery] = useState('');

 useEffect(() => {
    loadArticles(1, true);
  }, [query]);

  const loadArticles = async (pageNum: number, refresh = false) => {
     const isConnected = (await NetInfo.fetch()).isConnected;
      if ((loadingMore && !refresh) || (totalResults && articles.length >= totalResults)) return;
      refresh ? setRefreshing(true) : setLoadingMore(true);
      try {
        if (isConnected) {
          const data = await fetchArticles(pageNum, query);
          setTotalResults(data.totalResults);
          const updatedArticles = refresh ? data.articles : [...articles, ...data.articles];
          setArticles(updatedArticles);
          await AsyncStorage.setItem('@articles', JSON.stringify(updatedArticles));
          setPage(pageNum + 1);
        } else {
          const cached = await AsyncStorage.getItem('@articles');
          if (cached) {
            const offlineArticles = JSON.parse(cached);
            setArticles(offlineArticles);
            console.log('Loaded offline articles');
          } else {
            console.log('No cached data available');
          }
        }
    } catch (e) {
      console.log('Load Articles Error:', e);
    } finally {
      setLoadingMore(false);
      setRefreshing(false);
    }
};

  const onRefresh = () => {
    setRefreshing(true);
  try {
    loadArticles(1, true);
  } finally {
    setRefreshing(false);
  }
  };

  const loadMore = () => {
    if (articles.length < totalResults) {
      loadArticles(page);
    }
  };
  
  const renderFooter = () =>
    loadingMore ? (
      <View style={styles.footer}>
        <ActivityIndicator size="small" />
      </View>
    ) : null;

  return (
    <SafeAreaView style={{backgroundColor, flex: 1}}>
      <SearchInput query={query} setQuery={setQuery} />
      <FlatList
        data={articles}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item}) => <ArticleItem item={item} />}
        onEndReached={loadMore}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh}  />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title:{
    fontSize: 20,
    color: ConstantColors.balck,
    backgroundColor: ConstantColors.red,
    width: '100%',
    padding: 10,
    textAlign:'center',
    fontWeight: 'bold'
  },
  footer: {
    padding: 10,
    alignItems: 'center',
  },
});

export default HomeScreen;
