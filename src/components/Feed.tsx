import React from 'react';
import {SafeAreaView, ScrollView, StatusBar, StyleSheet} from 'react-native';
import {faker} from '@faker-js/faker';
import Post from './Post';
import Stories from './Stories';

const Feed: React.FC = () => {
  const posts = Array.from({length: 10}, () => ({
    user: faker.internet.userName(),
    image_avatar: faker.image.avatarGitHub(),
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
    image: faker.image.url(),
    like: faker.number.int(100),
  }));

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <Stories />
      <ScrollView>
        {posts.map((post, index) => (
          <Post key={index} {...post} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6A5ACD',
  },
});

export default Feed;
