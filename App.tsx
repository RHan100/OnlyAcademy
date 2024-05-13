import React from 'react';

import {SafeAreaView, StyleSheet} from 'react-native';

// import Feed from './Feed';
import Stories from './src/components/Stories';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Stories />
      {/* <Feed /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffafa',
  },
  textElement: {
    color: '#000000',
  },
});

export default App;
