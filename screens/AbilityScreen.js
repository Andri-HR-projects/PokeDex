import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image
} from 'react-native';
import { Constants } from 'expo';

export default class App extends React.Component {
  state = {
    dataAPI: []
  };
  componentDidMount = () => {
    fetch(this.props.navigation.state.params, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          dataAPI: responseJson
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  onPressAbility = item => {
    this.props.navigation.push('Ability', item.url);
    this.forceUpdate();
  };

  onPressPokemon = item => {
    this.props.navigation.push('Detail', item.url);
    this.forceUpdate();
  };

  render() {
    if (this.state.dataAPI.effect_entries != undefined) {
      return (
        <ScrollView style={styles.scroll}>
          <View style={styles.container}>
            <Text style={styles.name}>
              {this.state.dataAPI.name.charAt(0).toUpperCase() +
                this.state.dataAPI.name.slice(1)}
            </Text>
            <Text style={styles.description}>
              {this.state.dataAPI.effect_entries[0].effect}
            </Text>
            <Text style={styles.otherTxt}>Pokémons with this ability:</Text>
            <FlatList
              scrollEnabled={false}
              style={styles.list}
              data={this.state.dataAPI.pokemon}
              renderItem={({ item, index }) => {
                if (
                  item.pokemon.name.includes('-mega') ||
                  item.pokemon.name.includes('-alola') ||
                  item.pokemon.name.includes('-totem')
                ) {
                  return;
                }
                if (item.is_hidden) {
                  return (
                    <TouchableOpacity
                      style={styles.listItem}
                      onPress={() => this.onPressPokemon(item.pokemon)}
                    >
                      <Text style={styles.listItemTxt}>
                        {item.pokemon.name.charAt(0).toUpperCase() +
                          item.pokemon.name.slice(1)}{' '}
                        (Hidden Ability)
                      </Text>
                      <Image
                        style={styles.avatarImage}
                        source={{
                          uri:
                            'https://img.pokemondb.net/artwork/' +
                            item.pokemon.name +
                            '.jpg'
                        }}
                      />
                    </TouchableOpacity>
                  );
                } else {
                  return (
                    <TouchableOpacity
                      style={styles.listItem}
                      onPress={() => this.onPressPokemon(item.pokemon)}
                    >
                      <Text style={styles.listItemTxt}>
                        {item.pokemon.name.charAt(0).toUpperCase() +
                          item.pokemon.name.slice(1)}
                      </Text>
                      <Image
                        style={styles.avatarImage}
                        source={{
                          uri:
                            'https://img.pokemondb.net/artwork/' +
                            item.pokemon.name +
                            '.jpg'
                        }}
                      />
                    </TouchableOpacity>
                  );
                }
              }}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </ScrollView>
      );
    } else {
      return (
        <View style={styles.appContainer}>
          <ActivityIndicator size="large" color="#CC5500" />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  scroll: {
    minHeight: '100%'
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#fff'
  },
  appContainer: {
    flex: 1,
    backgroundColor: '#424342',
    alignItems: 'center',
    justifyContent: 'center'
  },
  name: {
    fontSize: 30,
    color: '#fff',
    backgroundColor: '#333',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    width: '100%',
    paddingVertical: 16
  },
  description: {
    fontSize: 14,
    color: '#444',
    marginBottom: 30,
    width: '100%',
    paddingHorizontal: 16
  },
  otherTxt: {
    fontSize: 20,
    color: '#111',
    fontWeight: 'bold',
    marginBottom: 10,
    width: '100%',
    paddingHorizontal: 16
  },
  list: {
    marginBottom: 20,
    width: '100%'
  },
  listItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: '#eee',
    borderBottomWidth: 1
  },
  listItemTxt: {
    fontSize: 16
  },
  avatarImage: {
    flex: 1,
    width: 50,
    height: 50,
    maxWidth: 50,
    resizeMode: 'contain'
  }
});
