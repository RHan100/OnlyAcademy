import React, {View, StyleSheet, FlatList, Image} from 'react-native';
import {Avatar, Button, Card, FAB, Text} from 'react-native-paper';
import {useState} from 'react';

export const Profile = ({}) => {
  const [showAll, setShowAll] = useState(true);
  const [showPhotos, setShowPhotos] = useState(false);
  const [showVideos, setShowVideos] = useState(false);

  const renderAllList = () => {
    const numColumns: number = 2;
    const items: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    return (
      <View style={styles.gridContainer}>
        <FlatList
          data={items}
          numColumns={numColumns}
          renderItem={({item}) => (
            <Card style={styles.gridItem} key={item}>
              <Card.Cover source={{uri: 'https://picsum.photos/800'}} />
            </Card>
          )}
        />
      </View>
    );
  };

  const renderPhotoList = () => {
    const numColumns: number = 2;
    const items: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    return (
      <View style={styles.gridContainer}>
        <FlatList
          data={items}
          numColumns={numColumns}
          renderItem={({item}) => (
            <Card style={styles.gridItem} key={item}>
              <Card.Cover source={{uri: 'https://picsum.photos/400'}} />
            </Card>
          )}
        />
      </View>
    );
  };

  const renderVideoList = () => {
    const numColumns: number = 2;
    const items: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    return (
      <View style={styles.gridContainer}>
        <FlatList
          data={items}
          numColumns={numColumns}
          renderItem={({item}) => (
            <Card style={styles.gridItem} key={item}>
              <Card.Cover source={{uri: 'https://picsum.photos/500'}} />
            </Card>
          )}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.backgroundImage}
        source={{uri: 'https://picsum.photos/700'}}
      />

      <FAB
        icon="arrow-left"
        style={styles.backFab}
        size={'small'}
        mode={'flat'}
        onPress={() => console.log('Pressed')}
      />

      <FAB
        icon="message-text-outline"
        style={styles.messageFab}
        size={'small'}
        mode={'flat'}
        onPress={() => console.log('Pressed')}
      />

      <View style={styles.profileContainer}>
        <View style={styles.avatarContainer}>
          <View style={{width: '40%', alignItems: 'center'}}>
            <Text style={{fontWeight: 'bold'}}>1k</Text>
            <Text>Seguidores</Text>
          </View>
          <View style={{width: '20%', alignItems: 'center'}}>
            <Avatar.Image
              size={100}
              style={{marginBottom: 90, borderStyle: 'solid'}}
              source={{uri: 'https://picsum.photos/600'}}
            />
          </View>
          <View style={{width: '40%', alignItems: 'center'}}>
            <Text style={{fontWeight: 'bold'}}>400</Text>
            <Text>Seguindo</Text>
          </View>
        </View>

        <View style={{alignItems: 'center'}}>
          <View style={{alignItems: 'center'}}>
            <Text
              variant={'titleMedium'}
              style={{fontStyle: 'italic', fontWeight: 'bold'}}>
              @Josh
            </Text>
          </View>
          <View style={{alignItems: 'center', width: '80%', margin: 8}}>
            <Text variant={'bodyMedium'} style={{textAlign: 'center'}}>
              Lorem ipsum lorem ipsum lorem ipsum, Lorem ipsum lorem ipsum lorem
              ipsum.
            </Text>
          </View>
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              marginBottom: 8,
            }}>
            <Button style={{margin: 8, shadowRadius: 10}} mode={'contained'}>
              Seguir
            </Button>
            <Button style={{margin: 8, shadowRadius: 10}} mode={'elevated'}>
              Mensagem
            </Button>
          </View>
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              marginBottom: 8,
            }}>
            <Button
              style={{margin: 8, shadowRadius: 10}}
              mode={showAll ? 'contained' : 'text'}
              onPress={() => {
                setShowAll(true);
                setShowPhotos(false);
                setShowVideos(false);
              }}>
              Tudo
            </Button>
            <Button
              style={{margin: 8, shadowRadius: 10}}
              mode={showPhotos ? 'contained' : 'text'}
              onPress={() => {
                setShowAll(false);
                setShowPhotos(true);
                setShowVideos(false);
              }}>
              Fotos
            </Button>
            <Button
              style={{margin: 8, shadowRadius: 10}}
              mode={showVideos ? 'contained' : 'text'}
              onPress={() => {
                setShowAll(false);
                setShowPhotos(false);
                setShowVideos(true);
              }}>
              Vídeos
            </Button>
          </View>
        </View>

        <View style={styles.gridContainer}>
          {showAll ? renderAllList() : null}
          {showPhotos ? renderPhotoList() : null}
          {showVideos ? renderVideoList() : null}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backFab: {
    position: 'absolute',
    margin: 16,
    borderRadius: 50,
    left: 0,
    top: 0,
  },
  messageFab: {
    position: 'absolute',
    margin: 16,
    borderRadius: 50,
    right: 0,
    top: 0,
  },
  container: {
    backgroundColor: 'red',
  },
  backgroundImage: {
    width: '100%',
    height: 300,
  },
  profileContainer: {
    position: 'absolute',
    backgroundColor: '#E6EEFA',
    alignContent: 'center',
    borderRadius: 50,
    marginTop: '50%',
  },
  avatarContainer: {
    flexDirection: 'row',
    height: 80,
    alignItems: 'center',
  },
  gridContainer: {
    paddingTop: 4,
    paddingLeft: 4,
    paddingRight: 4,
    backgroundColor: '#fff',
    borderRadius: 30,
  },
  gridItem: {
    flex: 1,
    margin: 6,
  },
});
