import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Story from 'react-native-story-component';
import {faker} from '@faker-js/faker';

const createStories = () => {
  const USER_COUNT = 10;
  const USER_STORY_COUNT = 2;

  return [...Array(USER_COUNT).keys()].map(i => ({
    id: `user-${i}`,
    avatar: faker.image.avatarGitHub(),
    name: faker.person.fullName(),
    stories: [...Array(USER_STORY_COUNT).keys()].map(y => ({
      id: `story-${i}-${y}`,
      image: faker.image.urlLoremFlickr({category: 'nature'}),
      swipeText: faker.lorem.text(),
      onPress: () => console.log(`Story ${i}-${y} deslizado!`),
    })),
  }));
};

const CustomSwipeButton = () => {
  return (
    <View>
      <Text style={styles.textElement}>Deslize</Text>
    </View>
  );
};

// const CustomStorieList = () => {
//   return (
//     <View>
//       <Text style={styles.textElement}> teste </Text>
//     </View>
//   );
// };

const STORIES = createStories();

export default function Stories() {
  return (
    <Story
      data={STORIES}
      duration={10}
      onImagesPrefetched={status => {
        console.log('is all images prefetched ->', status);
      }}
      customSwipeUpButton={CustomSwipeButton}
      // customStoryList={CustomStorieList}
    />
  );
}

const styles = StyleSheet.create({
  textElement: {
    color: '#fffffff',
  },
  // textStyle: {
  //   color: '#000000',
  // },
});
