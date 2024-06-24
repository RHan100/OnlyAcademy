import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Snackbar, TextInput, Button, Title} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
// import {Text, TextInput, Button, Snackbar} from 'react-native-paper';
// import auth from '@react-native-firebase/auth';
// import {GoogleSignin} from '@react-native-google-signin/google-signin';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigation = useNavigation();
  const {}

  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);

  //   const handleEmailLogin = async () => {
  //     try {
  //       await auth().signInWithEmailAndPassword(email, password);
  //     } catch (error) {
  //       setErrorMessage(error.message);
  //       onToggleSnackBar();
  //     }
  //   };

  const handleLogin = () => {
    // Lógica de login aqui
    // ...

    // Após o login ser realizado com sucesso, navegue para a tela inicial
    navigation.navigate('Home');
  };

  //   const handleGoogleLogin = async () => {
  //     try {
  //       await GoogleSignin.hasPlayServices();
  //       const {idToken} = await GoogleSignin.signIn();
  //       const credential = auth.GoogleAuthProvider.credential(idToken);
  //       await auth().signInWithCredential(credential);
  //     } catch (error) {
  //       setErrorMessage(error.message);
  //       onToggleSnackBar();
  //     }
  //   };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Bem-vindo ao Only Academy</Title>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        label="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      {/* <Button mode="contained" onPress={handleEmailLogin} style={styles.button}>
        Login
      </Button> */}
      <Button mode="contained" onPress={handleLogin} style={styles.button}>
        Login
      </Button>
      {/* <Button
        mode="contained"
        onPress={handleGoogleLogin}
        style={styles.button}>
        Login with Google
      </Button> */}
      <Button mode="contained" style={styles.button}>
        Login com Google
      </Button>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Fechar',
          onPress: () => {
            onDismissSnackBar();
          },
        }}>
        {errorMessage}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fffafa',
  },
  title: {
    fontSize: 24,
    // fontFamily: 'FontePersonalizada',
    marginBottom: 20,
    textAlign: 'center',
    color: '#6A5ACD',
  },
  input: {
    width: '80%',
    marginVertical: 10,
  },
  button: {
    marginVertical: 10,
  },
});

export default Login;
