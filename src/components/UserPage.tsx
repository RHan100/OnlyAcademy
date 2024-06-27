import React, {useEffect, useState} from 'react';
import {Text, Avatar, Button} from 'react-native-paper';
import {faker} from '@faker-js/faker';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useAuth} from '../provider/AuthProvider';
import {supabase} from '../config/initSupabase';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {RootStackParamList} from '../App';

type UserPageNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'UserPage'
>;

const UserPage = (props: UserPageNavigationProps) => {
  const [userInfo, setUserInfo] = useState({
    name: faker.internet.userName(),
    bio: faker.person.bio(),
    image_avatar: faker.image.avatarGitHub(),
    followers: faker.number.int(3000000),
    following: faker.number.int(7000),
    media: [faker.image.url(), faker.image.url(), faker.image.url()],
  });
  const navigation = useNavigation();
  const {user} = useAuth();
  const isFocused = useIsFocused();
  useEffect(() => {
    const getDados = async () => {
      let {data: queryProfile, error} = await supabase
        .from('profile')
        .select('first_name, last_name, bio, profile_picture')
        .eq('user_id', user.id);
      if (error) {
        return;
      }
      const imageUrl = `${process.env.PUBLIC_SUPABASE_URL}/storage/v1/object/public/files/${queryProfile[0].profile_picture}`;

      console.log(imageUrl);
      setUserInfo({
        ...userInfo,
        name: `${queryProfile[0].first_name} ${queryProfile[0].last_name}`,
        bio: queryProfile[0].bio,
        image_avatar: imageUrl,
      });
    };
    getDados();
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => props.navigation.navigate('ImagesList')}>
        <Avatar.Image
          size={80}
          margin={16}
          source={{uri: userInfo.image_avatar}}
        />
      </TouchableOpacity>
      <Text style={styles.name}>{userInfo.name}</Text>
      <Text style={styles.bio}>{userInfo.bio}</Text>
      <View style={styles.followContainer}>
        <Text>Seguidores: {userInfo.followers}</Text>
        <Text>Seguindo: {userInfo.following}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button mode="contained" style={styles.button}>
          Seguir
        </Button>
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => navigation.navigate('ProfileForm')}>
          Editar Perfil
        </Button>
      </View>

      <ScrollView
        contentContainerStyle={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
        {userInfo.media.map((media, index) => (
          <Image key={index} source={{uri: media}} style={styles.mediaItem} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fffafa',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  bio: {
    fontSize: 16,
    marginTop: 10,
  },
  followContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginTop: 10,
  },
  mediaContainer: {
    marginTop: 20,
  },
  mediaItem: {
    margin: 5,
    width: '100%',
    height: 300,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    margin: 20,
  },
});

export default UserPage;
