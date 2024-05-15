import React from 'react';
import {ScrollView} from 'react-native';
import {faker} from '@faker-js/faker';
import Post from './Post';

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
    <ScrollView>
      {posts.map((post, index) => (
        <Post key={index} {...post} />
      ))}
    </ScrollView>
  );
};

export default Feed;
