import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import PaymentScreen from './PaymentScreen';
import UserPage from './UserPage';
import Feed from './Feed';
import CameraScreen from './CameraScreen';

type TabParamList = {
  Perfil: undefined;
  Feed: undefined;
  Câmera: undefined;
  Planos: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

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

export default HomeNavigator;
