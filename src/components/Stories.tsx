import {View, Text, StatusBar, StyleSheet} from 'react-native';
import React from 'react';
import Story from 'react-native-story-component';
import {faker} from '@faker-js/faker';
import {SafeAreaView} from 'react-native-safe-area-context';

const createStories = () => {
  const USER_COUNT = 5;
  const USER_STORY_COUNT = 3;

  return [...Array(USER_COUNT).keys()].map(i => ({
    id: `user-${i}`,
    avatar: faker.image.avatar(),
    name: faker.person.fullName(),

    stories: [...Array(USER_STORY_COUNT).keys()].map(y => ({
      id: `story-${i}-${y}`,
      image: faker.image.animals(1080, 1920, true),
      swipeText: faker.lorem.text(),
      onPress: () => console.log(`Story ${i}-${y} swiped!`),
    })),
  }));
};

const CustomSwipeButton = () => {
  return (
    <View>
      <Text style={styles.textElement}>Swipe</Text>
    </View>
  );
};

const STORIES = createStories();

export default function Stories() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <Story
        data={STORIES}
        duration={10}
        onImagesPrefetched={status => {
          console.log('is all images prefetched ->', status);
        }}
        customSwipeUpButton={CustomSwipeButton}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffafa',
  },
  textElement: {
    color: '#000000',
  },
});
