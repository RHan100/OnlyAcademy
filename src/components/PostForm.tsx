import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
import {supabase} from '../config/initSupabase';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {RootStackParamList} from '../App';
import {useAuth} from '../provider/AuthProvider';
import {launchImageLibrary} from 'react-native-image-picker';
import {faker} from '@faker-js/faker';

// interface ProfileFormProps {
//   userId: string;
// }

type PostFormProps = NativeStackScreenProps<RootStackParamList, 'PostForm'>;

const PostForm = (props: PostFormProps) => {
  const [postType, setPostType] = useState('');
  const [content, setContent] = useState('');
  const [number, setNumber] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  // const [videoUrl, setVideoUrl] = useState('');
  // const [imagePath, setImagePath] = useState('');
  // const [likes, setLikes] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const {user} = useAuth();

  const handleImagePick = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.5,
    });
    if (result.assets) {
      console.log(result.assets);
      setSelectedImage(result.assets[0]);
      setImageUrl(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    try {
      let imagePath = '';
      if (selectedImage) {
        const contentType = 'image/jpeg'; // Ajuste o tipo de conteúdo conforme necessário
        const {data: imageData, error: imageError} = await supabase.storage
          .from('files')
          .upload(`${user.id}/${new Date().getTime()}.jpg`, selectedImage, {
            contentType,
          });
        if (imageError) {
          console.error('Error uploading image:', error);
          return;
        }

        imagePath = `${process.env.PUBLIC_SUPABASE_URL}/storage/v1/object/public/files/${imageData.path}`;
      }

      const {data, error} = await supabase
        .from('posts')
        .insert([
          {
            user_id: user.id,
            post_type: postType,
            content,
            number,
            image_url: imagePath,
            likes: faker.number.int(100),
          },
        ])
        .select();

      if (error) {
        console.error('Error creating post:', error);
      } else {
        console.log('Post created:', data);
        props.navigation.navigate('Home');
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crie seu Post</Text>
      <TextInput
        style={styles.input}
        placeholder="Tipo do Post"
        value={postType}
        onChangeText={setPostType}
      />
      <TextInput
        style={styles.input}
        placeholder="Conteúdo"
        value={content}
        onChangeText={setContent}
      />
      <TextInput
        style={styles.input}
        placeholder="Número"
        value={number}
        onChangeText={setNumber}
      />
      <TouchableOpacity style={styles.imageButton} onPress={handleImagePick}>
        <Text style={styles.imageButtonText}>Escolher Imagem</Text>
      </TouchableOpacity>
      {selectedImage && <Image source={{uri: imageUrl}} style={styles.image} />}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Enviar</Text>
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

export default PostForm;
