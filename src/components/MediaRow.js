import React, { Component } from 'react';
import {
  AppRegistry,
  Image, Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Style from '../Style';
import MusicPlayerModule from '../modules/MusicPlayerModule';

class MovieRow extends Component {
  constructor(props) {
    super(props);
  }

  render({ onPress } = this.props) {
    const { navigation } = this.props;
    const { navigate } = navigation;

    return (
      <TouchableOpacity
        onPress={() => MusicPlayerModule.playThisSong(this.props.songURL, this.props.Song, this.props.AlbumArt)}
        activeOpacity={0.7}
      >

        <View style={Style.list_container}>
          <View style={Style.list_image_thumb}>
            <TouchableOpacity
              onPress={() => navigate('Detail',
                {
                  Song: this.props.Song,
                  Artist: this.props.Artist,
                  Album: this.props.Album,
                  AlbumArt: this.props.AlbumArt,
                })}
              activeOpacity={0.7}
            >
              <Image
                source={{ uri: this.props.AlbumArt }}
                defaultSource={require('../assets/img/place_holder.jpg')}
                style={{ width: 100, height: 100 }}
              />
            </TouchableOpacity>
          </View>

          <View style={Style.list_items}>
            <Text style={Style.heading_blue} numberOfLines={1}>
              {this.props.Song}
              {'\n'}
            </Text>
            <Text style={Style.meta_data_list} numberOfLines={1}>{this.props.Artist}</Text>
            <Text style={Style.meta_data_list} numberOfLines={1}>{this.props.Album}</Text>

          </View>

        </View>
      </TouchableOpacity>
    );
  }
}

export default MovieRow;

AppRegistry.registerComponent('MovieRow', () => MovieRow);
