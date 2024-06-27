import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
import {supabase} from '../config/initSupabase';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {RootStackParamList} from '../App';
import {useAuth} from '../provider/AuthProvider';

// interface ProfileFormProps {
//   userId: string;
// }

type ProfileFormProps = NativeStackScreenProps<
  RootStackParamList,
  'ProfileForm'
>;

const ProfileForm = (props: ProfileFormProps) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [id, setId] = useState('');
  const {user} = useAuth();
  // const [profilePicture, setProfilePicture] = useState<string | null>(null);
  // const [coverPhoto, setCoverImage] = useState<string | null>(null);

  // const handleProfileImagePick = async () => {
  //   const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
  //   if (status !== 'granted') {
  //     alert('Sorry, we need camera roll permissions to make this work!');
  //     return;
  //   }

  //   const result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });

  //   if (!result.cancelled) {
  //     setProfileImage(result.uri);
  //   }
  // };

  // const handleCoverImagePick = async () => {
  //   const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
  //   if (status !== 'granted') {
  //     alert('Sorry, we need camera roll permissions to make this work!');
  //     return;
  //   }

  //   const result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsEditing: true,
  //     aspect: [16, 9],
  //     quality: 1,
  //   });

  //   if (!result.cancelled) {
  //     setCoverImage(result.uri);
  //   }
  // };

  useEffect(() => {
    const getId = async () => {
      let {data: queryProfile, error} = await supabase
        .from('profile')
        .select('id')
        .eq('user_id', user.id);
      if (error) {
        return;
      }
      console.log({queryProfile});
      if (queryProfile?.length > 0) {
        setId(queryProfile[0].id);
      }
    };
    getId();
  }, []);

  const handleSubmit = async () => {
    try {
      const {data, error} = await supabase
        .from('profile')
        .upsert([
          {
            id,
            user_id: user.id,
            first_name: firstName,
            last_name: lastName,
            bio,
            location,
            birthdate,
            cover_photo: 'string foto de capa',
          },
        ])
        .select();

      if (error) {
        console.error('Error creating profile:', error);
      } else {
        console.log('Profile created:', data);
        props.navigation.navigate('Home');
      }
    } catch (error) {
      console.error('Error creating profile:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Your Profile</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Bio"
        value={bio}
        onChangeText={setBio}
      />
      <TextInput
        style={styles.input}
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
      />
      <TextInput
        style={styles.input}
        placeholder="Birth Date (YYYY-MM-DD)"
        value={birthdate}
        onChangeText={setBirthdate}
      />
      {/* <TouchableOpacity
        style={styles.imageButton}
        onPress={handleProfileImagePick}>
        <Text style={styles.imageButtonText}>Choose Profile Image</Text>
      </TouchableOpacity>
      {profileImage && (
        <Image source={{uri: profileImage}} style={styles.image} />
      )}
      <TouchableOpacity
        style={styles.imageButton}
        onPress={handleCoverImagePick}>
        <Text style={styles.imageButtonText}>Choose Cover Image</Text>
      </TouchableOpacity>
      {coverImage && <Image source={{uri: coverImage}} style={styles.image} />} */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'black',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  imageButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    marginVertical: 10,
  },
  imageButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 200,
    marginVertical: 10,
  },
  submitButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    marginVertical: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ProfileForm;
