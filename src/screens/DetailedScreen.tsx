import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {useTheme} from '../context/ThemeContext';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {RootStackParamList} from '../../App';
import {ConstantImage} from '../utils/Images';
import {ConstantColors} from '../utils/Colors';
import {useEffect, useState} from 'react';
import {
  isBookmarked,
  removeBookmark,
  saveBookmark,
} from '../utils/bookmarkUtils';

type DetailRouteProp = RouteProp<RootStackParamList, 'Detail'>;

function DetailedScreen(): React.JSX.Element {
  const {params} = useRoute<DetailRouteProp>();
  const {article} = params;
  const {backgroundColor, textColor, isDark} = useTheme();
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    isBookmarked(article.title).then(setBookmarked);
  }, []);

  const toggleBookmark = async () => {
    if (bookmarked) {
      await removeBookmark(article.title);
    } else {
      await saveBookmark(article);
    }
    setBookmarked(!bookmarked);
  };

  return (
    <SafeAreaView style={{backgroundColor, flex: 1}}>
      <ScrollView>
        <Image
          source={
            article.urlToImage
              ? {uri: article.urlToImage}
              : ConstantImage.newReport
          }
          style={styles.image}
        />
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.subTitle, {color: textColor}]}>
            {article.title}
          </Text>
          <TouchableOpacity
            onPress={toggleBookmark}
            style={styles.bookmarkIcon}>
            <Image
              source={
                bookmarked
                  ? ConstantImage.bookmarkSelected
                  : ConstantImage.bookmark
              }
              style={[
                styles.bookmarkImage,
                {
                  tintColor: isDark
                    ? ConstantColors.white
                    : ConstantColors.balck,
                },
              ]}
            />
          </TouchableOpacity>
        </View>
        <Text style={[styles.meta, {color: textColor}]}>
          {article.source.name} ·{' '}
          {new Date(article.publishedAt).toLocaleDateString()}
        </Text>
        <Text style={[styles.content, {color: textColor}]}>
          {article.description || 'No description available.'}
          {article.content || ''}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: ConstantColors.balck,
    backgroundColor: 'red',
    width: '100%',
    padding: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  subTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    width: '85%',
    color: ConstantColors.balck,
    marginHorizontal: 16,
    textAlign: 'justify',
  },
  meta: {
    color: ConstantColors.grey,
    marginTop: 4,
    fontSize: 12,
    marginHorizontal: 16,
  },
  image: {
    width: '93%',
    height: 400,
    marginVertical: 10,
    marginHorizontal: 16,
    borderRadius: 5,
  },
  content: {
    marginHorizontal: 16,
    fontSize: 14,
    textAlign: 'justify',
    marginVertical: 5,
  },
  bookmarkIcon: {
    width: '10%',
  },
  bookmarkImage: {
    width: 24,
    height: 24,
  },
});

export default DetailedScreen;
