import React, { useState } from 'react';
import { View, Image, ActivityIndicator, Alert } from 'react-native';
import styled from 'styled-components';
import axios from 'axios';
import styles from '../../styles';
import constants from '../../constants';
import { gql } from 'apollo-boost';
import { useMutation } from 'react-apollo-hooks';
import { FEED_QUERY } from '../Tabs/Home';

const Container = styled.View`
  padding: 20px;
  flex-direction: row;
`;

const Form = styled.View`
  justify-content: flex-start;
`;

const STextInput = styled.TextInput`
  margin-bottom: 10px;
  border: 0 solid ${styles.lightGreyColor};
  border-bottom-width: 1px;
  padding-bottom: 10px;
  width: ${constants.width - 180}px;
`;

const Button = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.blueColor};
  padding: 10px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
`;

const Text = styled.Text`
  color: white;
  font-weight: 600;
`;

const UPLOAD = gql`
  mutation upload($caption: String!, $files: [String!]!, $location: String) {
    upload(caption: $caption, files: $files, location: $location) {
      id
    }
  }
`;

function UploadPhoto({ navigation, route }) {
  const { photo } = route.params;
  const [loading, setIsLoading] = useState(false);
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('');
  const [uploadMutation] = useMutation(UPLOAD);

  const handleSubmit = async () => {
    if (caption === '' || location === '') {
      return Alert.alert('All fields are required');
    }

    const formData = new FormData();
    const splitName = photo.filename.split('.');
    const type = splitName[splitName.length - 1];
    formData.append('file', {
      name: photo.filename,
      type: type.toLowerCase(),
      uri: photo.uri,
    });

    try {
      setIsLoading(true);
      const { data } = await axios.post(
        'http://192.168.0.3:4000/api/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      const {
        data: { upload },
      } = await uploadMutation({
        variables: { caption, location, files: [data.location] },
        refetchQueries: () => [{ query: FEED_QUERY }],
      });
      console.log(upload);

      if (upload.id) {
        navigation.navigate('TabNavigation');
      }
    } catch (e) {
      console.log(e);
      Alert.alert('Cant upload', 'Try later');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View>
      <Container>
        <Image
          source={{ uri: photo.uri }}
          style={{ height: 80, width: 80, marginRight: 30 }}
        />
        <Form>
          <STextInput
            onChangeText={setCaption}
            value={caption}
            placeholder="Caption"
            multiline={true}
            placeholderTextColor={styles.darkGreyColor}
          />
          <STextInput
            onChangeText={setLocation}
            value={location}
            placeholder="Location"
            multiline={true}
            placeholderTextColor={styles.darkGreyColor}
          />
          <Button onPress={handleSubmit}>
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text>Upload </Text>
            )}
          </Button>
        </Form>
      </Container>
    </View>
  );
}

export default UploadPhoto;
