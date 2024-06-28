import React, {useState} from 'react';
import {View, Text, Image} from 'react-native';
import {StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';

interface PostProps {
  user: string;
  image_avatar: string;
  title: string;
  description: string;
  image: string;
  like: number;
}

const Post: React.FC<PostProps> = ({
  user,
  image_avatar,
  title,
  description,
  image,
  like,
}) => {
  const [likes, setLikes] = useState(like);
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    if (liked) {
      setLikes(Number(likes) - 1);
    } else {
      setLikes(Number(likes) + 1);
    }
    setLiked(!liked);
  };

  return (
    <View style={styles.feedItem}>
      <View style={styles.userContainer}>
        <Image source={{uri: image_avatar}} style={styles.avatar} />
        <Text style={styles.user}>{user}</Text>
      </View>
      <Text style={styles.normal}>{title}</Text>
      <Image source={{uri: image}} style={styles.image} />
      <Text style={styles.normal}>{description}</Text>
      <Text style={styles.likes}>{likes} Likes</Text>
      <Button onPress={handleLike}>
        <Text>{liked ? 'Dislike' : 'Like'}</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  // container: {
  //   padding: 16,
  // },
  feedItem: {
    marginVertical: 16,
    backgroundColor: '#F5F5DC',
    borderRadius: 0,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  user: {
    marginLeft: 16,
    marginRight: 16,
    fontSize: 18,
    color: '#000',
  },
  image: {
    width: '100%',
    height: 300,
  },
  // captionContainer: {
  //   padding: 16,
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  // },
  normal: {
    marginLeft: 16,
    marginRight: 16,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  likes: {
    fontSize: 14,
    marginLeft: 16,
    color: '#888',
  },
});

export default Post;
