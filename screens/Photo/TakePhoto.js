import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import * as Permissions from 'expo-permissions';
import Loader from '../../components/common/Loader';
import { Camera } from 'expo-camera';
import constants from '../../constants';
import { TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../styles';

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

function TakePhoto({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [hasPermissions, setHasPermissions] = useState(false);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.front);

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

  return loading ? (
    <Loader />
  ) : (
    <Container>
      {hasPermissions && (
        <Camera
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
      )}
    </Container>
  );
}

export default TakePhoto;
