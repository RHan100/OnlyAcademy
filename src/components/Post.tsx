import React, {useState} from 'react';
import {View, Text, Image} from 'react-native';
import {StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';

interface PostProps {
  user: string;
  title: string;
  description: string;
  image: string;
  like: number;
}

const Post: React.FC<PostProps> = ({user, title, description, image, like}) => {
  const [likes, setLikes] = useState(like);
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setLiked(!liked);
  };

  return (
    <View style={styles.feedItem}>
      <Text style={styles.caption}>{user}</Text>
      <Text style={styles.caption}>{title}</Text>
      <Image source={{uri: image}} style={styles.image} />
      <Text style={styles.caption}>{description}</Text>
      <Text style={styles.caption}>{like} Likes</Text>
      <Button onPress={handleLike}>
        <Text>{liked ? 'Dislike' : 'Like'}</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  feedItem: {
    marginVertical: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 300,
  },
  captionContainer: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  caption: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  likes: {
    fontSize: 14,
    color: '#888',
  },
});

export default Post;
