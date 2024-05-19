// import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
// import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';

// import {PaperProvider} from 'react-native-paper';

import Login from './components/Login';
import UserPage from './components/UserPage';
import Feed from './components/Feed';
import CameraScreen from './components/CameraScreen';
import PaymentScreen from './components/PaymentScreen';
import PremiumMonthPayment from './components/PremiumMonthPayment';
import PremiumAnnualPayment from './components/PremiumAnnualPayment';

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Pagamento: undefined;
  Mensal: undefined;
  Anual: undefined;
};

type TabParamList = {
  Perfil: undefined;
  Feed: undefined;
  Câmera: undefined;
  Planos: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

const App: React.FC = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={HomeNavigator} />
      <Stack.Screen name="Pagamento" component={PaymentScreen} />
      <Stack.Screen name="Mensal" component={PremiumMonthPayment} />
      <Stack.Screen name="Anual" component={PremiumAnnualPayment} />
    </Stack.Navigator>
  </NavigationContainer>
);

const HomeNavigator: React.FC = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="Perfil"
      component={UserPage}
      options={{
        tabBarIcon: ({color, size}) => (
          <Icon name="person" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Feed"
      component={Feed}
      options={{
        tabBarIcon: ({color, size}) => (
          <Icon name="newspaper" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Câmera"
      component={CameraScreen}
      options={{
        tabBarIcon: ({color, size}) => (
          <Icon name="camera" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Planos"
      component={PaymentScreen}
      options={{
        tabBarIcon: ({color, size}) => (
          <Icon name="card" size={size} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default App;
