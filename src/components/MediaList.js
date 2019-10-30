import React, { Component } from 'react';
import {
  ListView, ActivityIndicator,
  Text, View,
  RefreshControl,
} from 'react-native';
import MediaRow from './MediaRow';
import Style from '../Style';
import MusicPlayerModule from '../modules/MusicPlayerModule';

export default class MediaList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 }),
      isRefreshing: false,
      loaded: false,
    };
  }

  componentDidMount = () => {
    MusicPlayerModule.fetchAllSongs(
      (errroMessage) => {
        alert(
          'Error :',
          errroMessage,
        );
      },
      (responseJSON) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(JSON.parse(responseJSON)),
          loaded: true,
        });
      },
    );
  }

  onRefresh() {
    this.setState({ isRefreshing: true });
    const { dataSource } = this.state;

    MusicPlayerModule.fetchAllSongs(
      (errroMessage) => {
        alert(
          'Error :',
          errroMessage,
        );
      },
      (responseJSON) => {
        this.setState({
          dataSource: dataSource.cloneWithRows(JSON.parse(responseJSON)),
          loaded: true,
          isRefreshing: false,
        });
      },
    );
  }

  render() {
    const { navigation } = this.props;
    const { navigate } = navigation;
    const { loaded, dataSource, isRefreshing } = this.state;

    if (!loaded) {
      return (
        <View style={{ flex: 1 }}>
          <Text>
           Fetching Songs...
          </Text>

          <ActivityIndicator
            size="large"
            color="#00aa00"
          />
        </View>
      );
    }

    return (
      <View style={{ flex: 1 }}>

        <ListView
          navigate={navigate}
          contentContainerStyle={Style.list}
          dataSource={dataSource}
          renderRow={(rowData) => (
            <MediaRow
              Song={rowData.songName}
              AlbumArt={rowData.albumArt}
              Artist={rowData.artistName}
              Album={rowData.albumName}
              songURL={rowData.fullPath}
              navigation={navigation}
            />
          )}

          refreshControl={(
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={() => this.onRefresh()}
              tintColor="#ff0000"
              title="Loading..."
              titleColor="#00ff00"
              colors={['#ff0000', '#00ff00', '#0000ff']}
              progressBackgroundColor="#ffff00"
            />
             )}
        />
      </View>
    );
  }
}
