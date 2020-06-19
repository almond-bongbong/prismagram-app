import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';
import Loader from '../../components/common/Loader';
import { Camera } from 'expo-camera';
import constants from '../../constants';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../styles';

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const ButtonWrap = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Button = styled.View`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  border: 10px solid ${styles.lightGreyColor};
`;

function TakePhoto() {
  const [loading, setLoading] = useState(true);
  const [hasPermissions, setHasPermissions] = useState(false);
  const [canTakePhoto, setCanTakePhoto] = useState(true);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.front);
  const cameraRef = useRef(null);
  const [photo, setPhoto] = useState(null);

  const askPermission = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      const isGranted = status === Permissions.PermissionStatus.GRANTED;
      setHasPermissions(isGranted);
    } catch (e) {
      console.log(e);
      setHasPermissions(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    askPermission();
  }, []);

  const toggleCameraType = () => {
    const { back, front } = Camera.Constants.Type;
    setCameraType((prev) => (prev === front ? back : front));
  };

  const takePhoto = async () => {
    if (!canTakePhoto) return;
    try {
      setCanTakePhoto(false);
      const photo = await cameraRef.current.takePictureAsync({
        quality: 1,
        exif: true,
      });
      const asset = await MediaLibrary.createAssetAsync(photo.uri);
      console.log(asset);
    } catch (e) {
      setCanTakePhoto(true);
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <Container>
      {hasPermissions && (
        <>
          <Camera
            ref={cameraRef}
            type={cameraType}
            style={{
              justifyContent: 'flex-end',
              padding: 15,
              width: constants.width,
              height: constants.height / 2,
            }}
          >
            <TouchableOpacity onPress={toggleCameraType}>
              <Ionicons
                name={
                  Platform.OS === 'ios'
                    ? 'ios-reverse-camera'
                    : 'md-reverse-camera'
                }
                size={28}
                color={styles.lightGreyColor}
              />
            </TouchableOpacity>
          </Camera>

          <ButtonWrap>
            <TouchableOpacity onPress={takePhoto} disabled={!canTakePhoto}>
              <Button />
            </TouchableOpacity>
          </ButtonWrap>
        </>
      )}
    </Container>
  );
}

export default TakePhoto;
