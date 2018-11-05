import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList
} from 'react-native';
import { Constants } from 'expo';
import SpecsBar from '../components/SpecsBar';

export default class App extends React.Component {
  state = {
    dataAPI: [],
    dataAPISpecies: []
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

        megaCheck = responseJson.name.split('-');
        console.log('megaCheck: ', megaCheck),
          fetch(
            'https://pokeapi.co/api/v2/pokemon-species/' + responseJson.name,
            {
              method: 'GET'
            }
          )
            .then(response => response.json())
            .then(responseJson => {
              this.setState({
                dataAPISpecies: responseJson
              });
            })
            .catch(error => {
              console.error(error);
            })
            .catch(error => {
              console.error(error);
            });
      });
  };

  typeStyle = function(type) {
    switch (type) {
      case 'normal':
        return {
          backgroundColor: '#A8A77A'
        };
      case 'fire':
        return {
          backgroundColor: '#EE8130'
        };
      case 'water':
        return {
          backgroundColor: '#6390F0'
        };
      case 'electric':
        return {
          backgroundColor: '#F7D02C'
        };
      case 'grass':
        return {
          backgroundColor: '#7AC74C'
        };
      case 'ice':
        return {
          backgroundColor: '#96D9D6'
        };
      case 'fighting':
        return {
          backgroundColor: '#C22E28'
        };
      case 'poison':
        return {
          backgroundColor: '#A33EA1'
        };
      case 'ground':
        return {
          backgroundColor: '#E2BF65'
        };
      case 'flying':
        return {
          backgroundColor: '#A98FF3'
        };
      case 'grass':
        return {
          backgroundColor: '#7AC74C'
        };
      case 'psychic':
        return {
          backgroundColor: '#F95587'
        };
      case 'bug':
        return {
          backgroundColor: '#A6B91A'
        };
      case 'rock':
        return {
          backgroundColor: '#B6A136'
        };
      case 'ghost':
        return {
          backgroundColor: '#735797'
        };
      case 'dragon':
        return {
          backgroundColor: '#6F35FC'
        };
      case 'dark':
        return {
          backgroundColor: '#705746'
        };
      case 'steel':
        return {
          backgroundColor: '#B7B7CE'
        };
      case 'fairy':
        return {
          backgroundColor: '#D685AD'
        };
      default:
        return { backgroundColor: '#68A090' };
    }
  };

  onPressAbility = item => {
    this.props.navigation.navigate('Ability', item.url);
  };

  onPressTypes = item => {
    this.props.navigation.navigate('Types', item.url);
  };

  getTotalStats(stats) {
    let num = 0;
    stats.map(item => {
      num += item.base_stat;
    });
    return num;
  }

  renderType(types) {
    return (
      <View style={styles.pokeTypeBox}>
        {types
          ? types.map((type, i) => {
              return (
                <TouchableOpacity
                  key={i}
                  onPress={() => this.onPressTypes(type.type)}
                  style={styles.pokeTypeBtn}
                >
                  <View
                    style={[this.typeStyle(type.type.name), styles.pokeType]}
                  >
                    <Text style={styles.pokeTypeText}>
                      {type.type.name.charAt(0).toUpperCase() +
                        type.type.name.slice(1)}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })
          : ''}
      </View>
    );
  }

  getTotalSpecsNum(spec) {
    switch (spec) {
      case 'hp':
        return 255;
      case 'attack':
        return 190;
      case 'defense':
        return 230;
      case 'special-attack':
        return 194;
      case 'special-defense':
        return 230;
      case 'speed':
        return 180;
    }
  }
  flavor_text_entries(flavor_texts) {
    for (item of flavor_texts) {
      console.log(item);
      if (item.language.name === 'en') {
        return item.flavor_text;
      }
    }
  }

  renderPokemonInfo() {
    return (
      <View style={styles.container}>
        <Text style={styles.pokeName}>
          {this.state.dataAPI.name.charAt(0).toUpperCase() +
            this.state.dataAPI.name.slice(1)}
        </Text>
        <Image
          style={styles.avatarImage}
          source={{
            uri: this.state.dataAPI.sprites.front_default
          }}
        />
        <View style={styles.pokeMainInfoBox}>
          <View style={styles.pokeMainInfoDetBox}>
            <Text style={styles.pokeMainInfo}>
              Weight: {this.state.dataAPI.weight / 10}
              kg
            </Text>
            <Text style={styles.pokeMainInfo}>
              Height: {this.state.dataAPI.height / 10}m
            </Text>
          </View>
          {this.renderType(this.state.dataAPI.types)}
        </View>
        <View style={[styles.pokeInfoBlock, styles.pokeAbilityBlock]}>
          <FlatList
            style={styles.pokeInfoAbilityList}
            data={this.state.dataAPI.abilities.reverse()}
            renderItem={({ item }) => {
              if (item.is_hidden) {
                return (
                  <TouchableOpacity
                    onPress={() => this.onPressAbility(item.ability)}
                    style={styles.pokeInfoAbilityBtn}
                  >
                    <Text style={styles.pokeInfoAbilityTxt}>
                      {item.ability.name.charAt(0).toUpperCase() +
                        item.ability.name.slice(1)}{' '}
                      <Text style={styles.pokeInfoAbilityHdnTxt}>
                        (Hidden Ability)
                      </Text>
                    </Text>
                  </TouchableOpacity>
                );
              }
              return (
                <TouchableOpacity
                  style={styles.pokeInfoAbilityBtn}
                  onPress={() => this.onPressAbility(item.ability)}
                >
                  <Text style={styles.pokeInfoAbilityTxt}>
                    {item.ability.name.charAt(0).toUpperCase() +
                      item.ability.name.slice(1)}
                  </Text>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <View style={[styles.pokeInfoBlock, styles.pokeSpecsBlock]}>
          <FlatList
            style={styles.pokeInfoSpecsList}
            data={this.state.dataAPI.stats.reverse()}
            renderItem={({ item }) => {
              return (
                <View style={styles.pokeInfoSpecsItem}>
                  <Text style={styles.pokeInfoSpecsTxt}>
                    {item.stat.name.charAt(0).toUpperCase() +
                      item.stat.name.slice(1)}
                    <Text style={styles.pokeInfoSpecsNumTxt}>
                      {' ' + item.base_stat}
                    </Text>
                  </Text>
                  <View style={styles.pokeInfoSpecsBar}>
                    <SpecsBar
                      num={item.base_stat}
                      of={this.getTotalSpecsNum(item.stat.name)}
                    />
                  </View>
                </View>
              );
            }}
            keyExtractor={(item, index) => index.toString()}
          />
          <View style={styles.pokeInfoStatsBox}>
            <Text style={styles.pokeInfoStatsTxt}>
              Total Base Stat: {this.getTotalStats(this.state.dataAPI.stats)}
            </Text>
          </View>
        </View>
        <View style={[styles.pokeInfoBlock, styles.pokeDescrBlock]}>
          <Text style={styles.pokeInfoDescrTxt}>
            {this.flavor_text_entries(
              this.state.dataAPISpecies.flavor_text_entries
            )}
          </Text>
        </View>
      </View>
    );
  }

  render() {
    if (
      this.state.dataAPI.sprites != undefined &&
      this.state.dataAPISpecies.id != undefined
    ) {
      return (
        <ScrollView style={styles.scroll}>
          <View style={styles.appContainer}>
            <View style={styles.types}>{this.renderPokemonInfo()}</View>
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
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    width: '100%'
  },
  appContainer: {
    flex: 1,
    backgroundColor: '#424342',
    alignItems: 'center',
    justifyContent: 'center'
  },
  pokeName: {
    fontSize: 36,
    fontWeight: 'bold',
    paddingTop: 10,
    paddingBottom: 4,
    color: '#222'
  },
  avatarImage: {
    height: 250,
    width: 250,
    maxWidth: '90%',
    resizeMode: 'contain',
    marginBottom: 5
  },
  pokeMainInfoBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderBottomColor: '#111',
    borderTopColor: '#111',
    backgroundColor: '#444'
  },
  pokeMainInfoDetBox: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  pokeMainInfo: {
    fontSize: 20,
    paddingVertical: 2,
    color: '#fff'
  },
  pokeTypeBox: {
    flex: 1,
    flexDirection: 'column-reverse',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  pokeTypeBtn: {
    paddingVertical: 4
  },
  pokeType: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 50
  },
  pokeTypeText: {
    color: '#fff',
    fontSize: 16
  },
  pokeInfoBlock: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 1
  },
  pokeAbilityBlock: {
    borderBottomColor: '#428AD6',
    backgroundColor: '#6DAAEA'
  },
  pokeSpecsBlock: {
    flexDirection: 'column',
    borderBottomColor: '#D6484C',
    backgroundColor: '#DD7175'
  },
  pokeDescrBlock: {
    borderBottomColor: '#aaa',
    backgroundColor: '#fff'
  },
  pokeInfoAbilityList: {},
  pokeInfoAbilityBtn: {
    paddingVertical: 4
  },
  pokeInfoAbilityTxt: {
    color: '#fff',
    fontSize: 16
  },
  pokeInfoAbilityHdnTxt: {
    color: '#D8EAFC'
  },
  pokeInfoSpecsList: {
    width: '100%'
  },
  pokeInfoSpecsItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  pokeInfoSpecsTxt: {
    width: '50%',
    color: '#fff',
    fontSize: 14
  },
  pokeInfoSpecsNumTxt: {
    fontWeight: 'bold'
  },
  pokeInfoSpecsBar: {
    width: '50%'
  },
  pokeInfoStatsBox: {
    width: '100%',
    height: 40,
    paddingTop: 14
  },
  pokeInfoStatsTxt: {
    color: '#fff',
    fontSize: 18,
    height: 40
  },
  pokeInfoDescrTxt: {
    fontSize: 16,
    color: '#111',
    marginBottom: 20
  }
});
