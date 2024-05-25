import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import React, {useState} from 'react';
import {View, Button, Image} from 'react-native';

const Camera = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleChoosePhoto = async () => {
    try {
      const {edges} = await CameraRoll.getPhotos({first: 1});
      if (edges.length > 0) {
        const selectedUri = edges[0].node.image.uri;
        setSelectedImage(selectedUri);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Button title="Escolher Foto" onPress={handleChoosePhoto} />
      {selectedImage && (
        <Image
          source={{uri: selectedImage}}
          style={{width: 200, height: 200}}
        />
      )}
    </View>
  );
};

export default Camera;
