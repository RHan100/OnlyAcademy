import React from 'react';

import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';

import Stories from './components/Stories';
import Feed from './components/Feed';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <Stories />
      <Feed />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffafa',
  },
});
export default App;
