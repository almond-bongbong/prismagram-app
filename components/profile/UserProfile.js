import React, { useState } from 'react';
import { Image, Platform, TouchableOpacity, ScrollView } from 'react-native';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../styles';
import constants from '../../constants';
import SquarePhoto from '../post/SquarePhoto';
import Post from '../post/Post';

const defaultAvatar = require('../../assets/default-avatar.jpg');

const ProfileHeader = styled.View`
  padding: 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const HeaderColumn = styled.View``;

const ProfileStats = styled.View`
  flex-direction: row;
`;

const Stat = styled.View`
  align-items: center;
  margin-left: 40px;
`;

const Bold = styled.Text`
  font-weight: 600;
`;

const StatName = styled.Text`
  margin-top: 5px;
  font-size: 12px;
  color: ${styles.darkGreyColor};
`;

const ProfileMeta = styled.View`
  margin-top: 10px;
  padding-horizontal: 20px;
`;

const Bio = styled.Text``;

const ButtonContainer = styled.View`
  flex-direction: row;
  margin-top: 30px;
`;

const Button = styled.View`
  width: ${constants.width / 2}px;
  align-items: center;
`;

function UserProfile({
  avatar,
  posts,
  postsCount,
  followersCount,
  followingCount,
  bio,
  fullName,
}) {
  const [isGrid, setIsGrid] = useState(true);
  const defaultAvatar = require('../../assets/default-avatar.jpg');
  const avatarSource = avatar ? { uri: avatar } : defaultAvatar;

  return (
    <ScrollView>
      <ProfileHeader>
        <Image
          style={{ height: 80, width: 80, borderRadius: 40 }}
          source={avatarSource}
        />
        <HeaderColumn>
          <ProfileStats>
            <Stat>
              <Bold>{postsCount}</Bold>
              <StatName>Posts</StatName>
            </Stat>
            <Stat>
              <Bold>{followersCount}</Bold>
              <StatName>Followers</StatName>
            </Stat>
            <Stat>
              <Bold>{followingCount}</Bold>
              <StatName>Following</StatName>
            </Stat>
          </ProfileStats>
        </HeaderColumn>
      </ProfileHeader>
      <ProfileMeta>
        <Bold>{fullName}</Bold>
        <Bio>{bio}</Bio>
      </ProfileMeta>
      <ButtonContainer>
        <TouchableOpacity onPress={() => setIsGrid(true)}>
          <Button>
            <Ionicons
              color={isGrid ? styles.blackColor : styles.darkGreyColor}
              size={32}
              name={Platform.OS === 'ios' ? 'ios-grid' : 'md-grid'}
            />
          </Button>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsGrid(false)}>
          <Button>
            <Ionicons
              color={!isGrid ? styles.blackColor : styles.darkGreyColor}
              size={32}
              name={Platform.OS === 'ios' ? 'ios-list' : 'md-list'}
            />
          </Button>
        </TouchableOpacity>
      </ButtonContainer>
      {posts?.map((p) =>
        isGrid ? (
          <SquarePhoto
            key={p.id}
            id={p.id}
            files={p.files}
            onPress={(_) => _}
          />
        ) : (
          <Post key={p.id} {...p} />
        )
      )}
    </ScrollView>
  );
}

UserProfile.propTypes = {
  id: PropTypes.string.isRequired,
  avatar: PropTypes.string,
  username: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  isFollowing: PropTypes.bool.isRequired,
  isSelf: PropTypes.bool.isRequired,
  bio: PropTypes.string.isRequired,
  followingCount: PropTypes.number.isRequired,
  followersCount: PropTypes.number.isRequired,
  postsCount: PropTypes.number.isRequired,
  posts: PropTypes.arrayOf(
    PropTypes.shape({
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
    })
  ),
};

UserProfile.defaultProps = {
  posts: [],
  avatar: defaultAvatar,
};

export default UserProfile;
