import React from 'react';

import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';

import {PaperProvider} from 'react-native-paper';

import Stories from './components/Stories';
import Feed from './components/Feed';
import Camera from './components/Camera';
// import UserPage from './components/UserPage';
// import Login from './components/Login';

const App = () => {
  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <Camera />
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        {/* <Login /> */}
        <Stories />
        {/* <Foto /> */}
        <Feed />
        {/* <UserPage /> */}
      </SafeAreaView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6A5ACD',
  },
});
export default App;
