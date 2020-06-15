import React, { useRef, useState, useEffect } from 'react';
import { Image } from 'react-native';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Swiper from 'react-native-swiper';
import { Ionicons } from '@expo/vector-icons';
import { gql } from 'apollo-boost';
import styles from '../../styles';
import constants from '../../constants';
import { useMutation } from 'react-apollo-hooks';
import { useNavigation } from '@react-navigation/native';

const Container = styled.View``;

const Header = styled.View`
  padding: 15px;
  flex-direction: row;
  align-items: center;
`;

const Touchable = styled.TouchableOpacity``;
const HeaderUserContainer = styled.View`
  margin-left: 10px;
`;

const Bold = styled.Text`
  font-weight: 500;
`;

const Location = styled.Text`
  font-size: 12px;
`;

const IconsContainer = styled.View`
  flex-direction: row;
  margin-bottom: 5px;
`;

const IconContainer = styled.View`
  margin-right: 10px;
`;

const InfoContainer = styled.View`
  padding: 10px;
`;

const Caption = styled.Text`
  margin: 3px 0;
`;

const CommentCount = styled.Text`
  margin-top: 5px;
  opacity: 0.5;
  font-size: 12px;
`;

const LIKE_POST = gql`
  mutation toggleLike($postId: String!, $isLike: Boolean!) {
    toggleLike(postId: $postId, isLike: $isLike) {
      result
    }
  }
`;

const Post = ({
  id,
  user,
  location,
  caption,
  likeCount,
  files = [],
  comments = [],
  isLiked,
}) => {
  const navigation = useNavigation();
  const defaultAvatar = require('../../assets/default-avatar.jpg');
  const avatarSource = user.avatar ? { uri: user.avatar } : defaultAvatar;
  const swiperHeight = constants.height / 2.5;
  const isIOS = Platform.OS === 'ios';
  const isDidMount = useRef(false);
  const [localIsLiked, setLocalIsLiked] = useState(isLiked);
  const [localLikeCount, setLocalLikeCount] = useState(likeCount);
  const [toggleLikeMutation] = useMutation(LIKE_POST);

  const handleLike = async () => {
    setLocalIsLiked((p) => !p);

    try {
      const { data } = await toggleLikeMutation({
        variables: { postId: id, isLike: !localIsLiked },
      });
      const { result } = data?.toggleLike;
      setLocalIsLiked(result);
    } catch (e) {
      console.error(e);
    }
  };

  const handleUserProfile = () => {
    navigation.navigate('UserDetail', { username: user.username });
  };

  useEffect(() => {
    if (isDidMount.current) {
      setLocalLikeCount((p) => (localIsLiked ? p + 1 : p - 1));
    }
    isDidMount.current = true;
  }, [localIsLiked]);

  return (
    <Container>
      <Header>
        <Touchable onPress={handleUserProfile}>
          <Image
            style={{ height: 40, width: 40, borderRadius: 20 }}
            source={avatarSource}
          />
        </Touchable>
        <Touchable onPress={handleUserProfile}>
          <HeaderUserContainer>
            <Bold>{user.username}</Bold>
            <Location>{location}</Location>
          </HeaderUserContainer>
        </Touchable>
      </Header>
      <Swiper style={{ height: swiperHeight }}>
        {files?.map((f) => (
          <Image
            key={f.id}
            style={{ width: constants.width, height: swiperHeight }}
            source={{ uri: f.url }}
          />
        ))}
      </Swiper>
      <InfoContainer>
        <IconsContainer>
          <Touchable onPress={handleLike}>
            <IconContainer>
              <Ionicons
                size={28}
                color={localIsLiked ? styles.redColor : styles.blackColor}
                name={
                  isIOS
                    ? localIsLiked
                      ? 'ios-heart'
                      : 'ios-heart-empty'
                    : localIsLiked
                    ? 'md-heart'
                    : 'md-heart-empty'
                }
              />
            </IconContainer>
          </Touchable>
          <Touchable>
            <IconContainer>
              <Ionicons
                size={28}
                color={styles.blackColor}
                name={isIOS ? 'ios-text' : 'md-text'}
              />
            </IconContainer>
          </Touchable>
        </IconsContainer>
        <Touchable>
          <Bold>
            {localLikeCount === 1 ? '1 like' : `${localLikeCount} likes`}
          </Bold>
        </Touchable>
        <Caption>
          <Bold>{user.username}</Bold> {caption}
        </Caption>
        <Touchable>
          <CommentCount>See all {comments.length} comments</CommentCount>
        </Touchable>
      </InfoContainer>
    </Container>
  );
};

Post.propTypes = {
  id: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired,
  }).isRequired,
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
  likeCount: PropTypes.number.isRequired,
  isLiked: PropTypes.bool.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
  caption: PropTypes.string.isRequired,
  location: PropTypes.string,
  createdAt: PropTypes.string.isRequired,
};

export default Post;
