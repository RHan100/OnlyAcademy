import {View, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useAuth} from '../provider/AuthProvider';
import {supabase} from '../config/initSupabase';
import Icon from 'react-native-vector-icons/Ionicons';
import {launchImageLibrary} from 'react-native-image-picker';
import {FileObject} from '@supabase/storage-js';
import {ActivityIndicator, Button, Card, Text} from 'react-native-paper';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {RootStackParamList} from '../App';

interface UploadFileState {
  selectedFile: null;
  uploading: boolean;
  uploadError: string | null;
  previewSource: string | null;
}

type ImagesListScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'ImagesList'
>;

const ImagesList = (props: ImagesListScreenProps) => {
  const {user} = useAuth();
  const [images, setImages] = useState<FileObject[]>([]);
  const [file, setFile] = useState<UploadFileState>({
    selectedFile: null,
    uploading: false,
    uploadError: null,
    previewSource: null,
  });

  useEffect(() => {
    if (!user) {
      return;
    }
    console.log({file});

    // Load user images
    loadImages();
    console.log(images);
  }, [user]);

  const loadImages = async () => {
    const {data} = await supabase.storage.from('files').list(user!.id);
    if (data) {
      setImages(images);
    }
  };

  const onSelectImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.5,
    });
    if (result.assets) {
      console.log(result.assets[0]);
      setFile({...file, selectedFile: result.assets[0]});
    }
  };

  const handleUpload = async () => {
    setFile({...file, uploading: true});
    try {
      const contentType = file.selectedFile.type;

      const {data, error} = await supabase.storage
        .from('files')
        .upload(
          `${user.id}/${new Date().getTime()}.${file.selectedFile.fileName}`,
          file.selectedFile,
          {
            contentType,
          },
        );
      console.log(data, error);
      let {updateData, updateError} = await supabase
        .from('profile')
        .update({profile_picture: data?.path})
        .eq('user_id', user.id);
      if (error) {
        setFile({...file, uploadError: error.message});
      } else {
        setFile({...file, selectedFile: null});
      }
    } catch (error) {
      console.error(error);
      setFile({...file, uploadError: error.message});
    } finally {
      setFile({...file, uploading: false});
      props.navigation.navigate('Home');
    }
  };

  return (
    <View>
      {file.selectedFile ? (
        <View>
          <Card style={{marginTop: 20}}>
            <Card.Cover
              source={{uri: file.selectedFile.uri}}
              resizeMode="center"
              style={styles.customCover}
            />
            <Text>Nome do arquivo: {file.selectedFile.fileName}</Text>
          </Card>
          <Button
            style={styles.buttonCustomStyle}
            onPress={handleUpload}
            mode="contained">
            Upload
          </Button>
        </View>
      ) : (
        <View>
          <TouchableOpacity onPress={onSelectImage} style={styles.fab}>
            <Icon name="camera-outline" size={30} color={'black'} />
          </TouchableOpacity>
        </View>
      )}
      {file.uploading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Text>{file.uploadError}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#151515',
  },
  fab: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    position: 'static',
    bottom: -300,
    right: -200,
    height: 70,
    backgroundColor: '#2b825b',
    borderRadius: 100,
  },
  buttonCustomStyle: {
    marginTop: 40,
    color: 'black',
  },
  customCover: {
    height: 250,
  },
});

export default ImagesList;
