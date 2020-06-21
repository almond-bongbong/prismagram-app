import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Image, ScrollView, TouchableOpacity } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';
import Loader from '../../components/common/Loader';
import constants from '../../constants';
import styles from '../../styles';

const View = styled.View`
  flex: 1;
  background-color: #fff;
`;

const Button = styled.TouchableOpacity`
  width: 100px;
  height: 30px;
  position: absolute;
  right: 5px;
  top: 15px;
  background-color: ${styles.blueColor};
  justify-content: center;
  align-items: center;
  border-radius: 5px;
`;

const Text = styled.Text`
  color: white;
  font-weight: 600;
`;

function SelectPhoto({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [hasPermissions, setHasPermissions] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [allPhotos, setAllPhotos] = useState(null);

  const askPermission = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      const isGranted = status === Permissions.PermissionStatus.GRANTED;
      setHasPermissions(isGranted);
    } catch (e) {
      console.log(e);
      setHasPermissions(false);
    }
  };

  const getPhotos = async () => {
    try {
      const { assets } = await MediaLibrary.getAssetsAsync();
      const [firstPhoto] = assets;
      setSelectedPhoto(firstPhoto);
      setAllPhotos(assets);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const changeSelected = (photo) => {
    setSelectedPhoto(photo);
  };

  useEffect(() => {
    askPermission();
  }, []);

  useEffect(() => {
    if (hasPermissions) {
      getPhotos();
    }
  }, [hasPermissions]);

  const handleSelectPhoto = () => {
    navigation.navigate('UploadPhoto', { photo: selectedPhoto });
  };

  return loading ? (
    <Loader />
  ) : (
    <View>
      {hasPermissions ? (
        <>
          <Image
            style={{ width: constants.width, height: constants.height / 2 }}
            source={{ uri: selectedPhoto.uri }}
          />
          <Button onPress={handleSelectPhoto}>
            <Text>Select Photo</Text>
          </Button>
          <ScrollView
            style={{ height: constants.height }}
            contentContainerStyle={{ flexWrap: 'wrap', flexDirection: 'row' }}
          >
            {allPhotos.map((p) => (
              <TouchableOpacity key={p.uri} onPress={() => changeSelected(p)}>
                <Image
                  source={{ uri: p.uri }}
                  style={{
                    opacity: selectedPhoto.id === p.id ? 0.5 : 1,
                    width: constants.width / 3,
                    height: constants.height / 6,
                  }}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </>
      ) : null}
    </View>
  );
}

export default SelectPhoto;
