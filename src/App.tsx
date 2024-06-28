import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import Icon from 'react-native-vector-icons/Ionicons';
import {PaperProvider} from 'react-native-paper';

import Login from './components/Login';
// import UserPage from './components/UserPage';
// import Feed from './components/Feed';
// import CameraScreen from './components/CameraScreen';
import PaymentScreen from './components/PaymentScreen';
import PremiumMonthPayment from './components/PremiumMonthPayment';
import PremiumAnnualPayment from './components/PremiumAnnualPayment';
import HomeNavigator from './components/HomeNavigator';
import {useAuth} from './provider/AuthProvider';
import Icon from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native';
import ProfileForm from './components/ProfileForm';
import ImagesList from './components/list';
import PostForm from './components/PostForm';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Pagamento: undefined;
  Mensal: undefined;
  Anual: undefined;
  ProfileForm: undefined;
  PostForm: undefined;
  UserPage: undefined;
  ImagesList: undefined;
};

// type TabParamList = {
//   Perfil: undefined;
//   Feed: undefined;
//   Câmera: undefined;
//   Planos: undefined;
// };

const Stack = createStackNavigator<RootStackParamList>();
// const Tab = createBottomTabNavigator<TabParamList>();

function App() {
  const {signOut, initialized} = useAuth();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerRight: () => (
            <TouchableOpacity onPress={signOut}>
              <Icon name="log-out-outline" size={30} color={'black'} />
            </TouchableOpacity>
          ),
        }}>
        {initialized ? (
          <>
            <Stack.Screen
              name="Home"
              component={HomeNavigator}
              options={{headerTitle: ''}}
            />
            <Stack.Screen name="Pagamento" component={PaymentScreen} />
            <Stack.Screen name="Mensal" component={PremiumMonthPayment} />
            <Stack.Screen name="Anual" component={PremiumAnnualPayment} />
            <Stack.Screen name="ProfileForm" component={ProfileForm} />
            <Stack.Screen name="PostForm" component={PostForm} />
            <Stack.Screen name="ImagesList" component={ImagesList} />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{headerShown: false}}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// const App: React.FC = () => (
//   const {signOut} = useAuth();
//   return(

//   <NavigationContainer
//     screenOptions={{
//       headerRight: () => (
//         <TouchableOpacity onPress={signOut}>
//           <Icon name="log-out-outline" size={30} color={'#fff'} />
//         </TouchableOpacity>
//       ),
//     }}>
//     <Stack.Navigator>
//       <Stack.Screen
//         name="Login"
//         component={Login}
//         options={{headerShown: false}}
//       />
//       <Stack.Screen name="Home" component={HomeNavigator} />
//       <Stack.Screen name="Pagamento" component={PaymentScreen} />
//       <Stack.Screen name="Mensal" component={PremiumMonthPayment} />
//       <Stack.Screen name="Anual" component={PremiumAnnualPayment} />
//     </Stack.Navigator>
//   </NavigationContainer>
//   )
// );

export default App;
