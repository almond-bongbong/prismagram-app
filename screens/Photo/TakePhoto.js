import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { TouchableOpacity } from 'react-native';
import * as Permissions from 'expo-permissions';
import Loader from '../../components/common/Loader';

const View = styled.View`
  flex: 1;
  background-color: #fff;
`;

const Text = styled.Text``;

function TakePhoto({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [hasPermissions, setHasPermissions] = useState(false);

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

  return loading ? (
    <Loader />
  ) : (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate('UploadPhoto')}>
        <Text>Take</Text>
      </TouchableOpacity>
    </View>
  );
}

export default TakePhoto;
