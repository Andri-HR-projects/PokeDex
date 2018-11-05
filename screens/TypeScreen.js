import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView
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

  onPressType = item => {
    this.props.navigation.push('Types', item.url);
    this.forceUpdate();
  };

  damage_relations(stats) {
    return (
      <FlatList
        style={styles.list}
        data={stats}
        scrollEnabled={false}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              style={[this.typeStyle(item.name), styles.listItem]}
              onPress={() => this.onPressType(item)}
            >
              <Text style={styles.listTxt}>
                {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
              </Text>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  }

  render() {
    if (this.state.dataAPI.name != undefined) {
      return (
        <ScrollView>
          <View style={styles.container}>
            <View
              style={[
                this.typeStyle(this.state.dataAPI.name),
                styles.headingBox
              ]}
            >
              <Text style={styles.headingTxt}>
                {this.state.dataAPI.name.charAt(0).toUpperCase() +
                  this.state.dataAPI.name.slice(1)}
              </Text>
            </View>
            {this.state.dataAPI.damage_relations.double_damage_from.length >
            0 ? (
              <View style={styles.listcontainer}>
                <Text style={styles.listTitle}>Double damage from</Text>
                <View style={styles.listBox}>
                  {this.damage_relations(
                    this.state.dataAPI.damage_relations.double_damage_from
                  )}
                </View>
              </View>
            ) : (
              <View />
            )}
            {this.state.dataAPI.damage_relations.half_damage_from.length > 0 ? (
              <View style={styles.listcontainer}>
                <Text style={styles.listTitle}>Half damage from</Text>
                <View style={styles.listBox}>
                  {this.damage_relations(
                    this.state.dataAPI.damage_relations.half_damage_from
                  )}
                </View>
              </View>
            ) : (
              <View />
            )}
            {this.state.dataAPI.damage_relations.double_damage_to.length > 0 ? (
              <View style={styles.listcontainer}>
                <Text style={styles.listTitle}>Double damage to</Text>
                <View style={styles.listBox}>
                  {this.damage_relations(
                    this.state.dataAPI.damage_relations.double_damage_to
                  )}
                </View>
              </View>
            ) : (
              <View />
            )}
            {this.state.dataAPI.damage_relations.half_damage_to.length > 0 ? (
              <View style={styles.listcontainer}>
                <Text style={styles.listTitle}>Half damage to</Text>
                <View style={styles.listBox}>
                  {this.damage_relations(
                    this.state.dataAPI.damage_relations.half_damage_to
                  )}
                </View>
              </View>
            ) : (
              <View />
            )}
            {this.state.dataAPI.damage_relations.no_damage_from.length > 0 ? (
              <View style={styles.listcontainer}>
                <Text style={styles.listTitle}>Immune to</Text>
                <View style={styles.listBox}>
                  {this.damage_relations(
                    this.state.dataAPI.damage_relations.no_damage_from
                  )}
                </View>
              </View>
            ) : (
              <View />
            )}
            {this.state.dataAPI.damage_relations.no_damage_to.length > 0 ? (
              <View style={styles.listcontainer}>
                <Text style={styles.listTitle}>No damage to</Text>
                <View style={styles.listBox}>
                  {this.damage_relations(
                    this.state.dataAPI.damage_relations.no_damage_to
                  )}
                </View>
              </View>
            ) : (
              <View />
            )}
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
    display: 'flex',
    flexDirection: 'column',
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
  headingBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 20,
    width: '100%'
  },
  headingTxt: {
    color: '#fff',
    fontSize: 26
  },
  listcontainer: {
    display: 'flex',
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#eee',
    borderTopColor: '#ddd',
    borderTopWidth: 1
  },
  listTitle: {
    color: '#222',
    fontSize: 18,
    marginBottom: 8,
    fontWeight: 'bold'
  },
  listBox: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  list: {
    width: '100%'
  },
  listItem: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 6,
    marginBottom: 6
  },
  listTxt: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
});
