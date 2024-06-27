import {
  Alert,
  View,
  Button,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useState} from 'react';
import React from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import {supabase} from '../config/initSupabase';
import {useNavigation} from '@react-navigation/native';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Sign in with email and password
  const onSignInPress = async () => {
    setLoading(true);

    const {data: loginData, error} = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    const user = loginData.session.user;
    if (error) {
      Alert.alert(error.message);
    }
    console.log(user);
    let {data: queryProfile, queryError} = await supabase
      .from('profile')
      .select('id')
      .eq('user_id', user.id);
    if (queryError) {
      return;
    }
    console.log({queryProfile});
    if (queryProfile.length === 0) {
      const {data, error} = await supabase
        .from('profile')
        .insert([{user_id: user.id}])
        .select();
      console.log(data);
    }
    setLoading(false);
  };

  // Create a new user
  const onSignUpPress = async () => {
    setLoading(true);
    const {error} = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert(error.message);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Spinner visible={loading} />

      <Text style={styles.header}>Only Academy</Text>

      <TextInput
        autoCapitalize="none"
        placeholder="Digite seu email"
        value={email}
        onChangeText={setEmail}
        style={styles.inputField}
      />
      <TextInput
        placeholder="Digite sua senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.inputField}
      />

      <TouchableOpacity onPress={onSignInPress} style={styles.button}>
        <Text style={{color: '#fff'}}>Entrar</Text>
      </TouchableOpacity>
      <Button onPress={onSignUpPress} title="CRIAR CONTA" color={'#ccc'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 200,
    padding: 20,
    backgroundColor: '#fffafa',
  },
  header: {
    fontSize: 30,
    textAlign: 'center',
    margin: 50,
    color: '#6A5ACD',
  },
  inputField: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderColor: '#2b825b',
    borderRadius: 4,
    padding: 10,
    color: '#fff',
    backgroundColor: '#363636',
  },
  button: {
    marginVertical: 15,
    alignItems: 'center',
    backgroundColor: '#6A5ACD',
    padding: 12,
    borderRadius: 4,
  },
});

export default Login;
