import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { ConstantImage } from "../../utils/Images";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";
import {useState, useEffect} from 'react';
import { isBookmarked, removeBookmark, saveBookmark } from "../../utils/bookmarkUtils";
import { ConstantColors } from "../../utils/Colors";
import { useTheme } from "../../context/ThemeContext";

type ArticleItemProps = {
  item: {
    title: string;
    source: { name: string };
    publishedAt: string;
    urlToImage?: string;
  };
};

const ArticleItem: React.FC<ArticleItemProps> = ({ item }) => {
  const [bookmarked, setBookmarked] = useState(false);
  const {isDark, textColor} = useTheme();
  const isFocused = useIsFocused();

  
const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

useEffect(() => {
  if (isFocused) {
    isBookmarked(item.title).then(setBookmarked);
  }
}, [isFocused]);

  const toggleBookmark = async () => {
    if (bookmarked) {
      await removeBookmark(item.title);
    } else {
      await saveBookmark(item);
    }
    setBookmarked(!bookmarked);
  };

const onPress = () => {
  navigation.navigate('Detail', { article: item });
};
  return (
    <TouchableOpacity style={[styles.card, isDark && styles.cardDark]} onPress={onPress}
      >
      {/* <View> */}
      <Image
        source={ item.urlToImage ? { uri: item.urlToImage } : ConstantImage.newReport }
        style={styles.thumbnail}
      />
      <View style={styles.content}>
        <Text style={[styles.title, { color : textColor}]} >{item.title}</Text>
        <Text style={[styles.meta, { color: textColor}]}>
          {item.source.name} · {new Date(item.publishedAt).toLocaleDateString()}
        </Text>
      {/* </View> */}
      </View>
      <TouchableOpacity onPress={toggleBookmark} style={styles.bookmarkIcon} >
        <Image
          source={bookmarked ? ConstantImage.bookmarkSelected : ConstantImage.bookmark}
          style={[styles.bookmarkImage, { tintColor : isDark  ? ConstantColors.white : ConstantColors.balck}]}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  )
}
//f39c12
const styles = StyleSheet.create({
 card: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
    marginHorizontal: 10,
    backgroundColor: '#fff',
    marginVertical: 5,
    borderRadius: 5
  },
   cardDark: {
    backgroundColor: '#1c1c1c',
    borderColor: '#444',
  },
  thumbnail: {
    width: '20%',
    height: 70,
    borderRadius: 8,
    marginRight: 10,
  },
  content: {
    // flex: 1,
    width: '70%',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: ConstantColors.balck, 
  },
   titleDark: {
    color: ConstantColors.white,
  },
  meta: {
    color: '#666',
    marginTop: 4,
    fontSize: 12,
  },
  metaDark: {
    color: '#aaa',
  },
  bookmarkIcon: {
    width: "10%",
    // alignItems: "center",
    // justifyContent: "center",
  },
  bookmarkImage: {
    width: 24,
    height: 24,
  },
});

export default ArticleItem;