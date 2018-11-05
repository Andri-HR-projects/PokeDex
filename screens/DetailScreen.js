import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList
} from "react-native";
import { Constants } from "expo";

export default class App extends React.Component {
  state = {
    dataAPI: [],
    dataAPISpecies: []
  };
  componentDidMount = () => {
    fetch(this.props.navigation.state.params, {
      method: "GET"
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          dataAPI: responseJson
        });

        megaCheck = responseJson.name.split("-");
        console.log("megaCheck: ", megaCheck),
          fetch(
            "https://pokeapi.co/api/v2/pokemon-species/" + responseJson.name,
            {
              method: "GET"
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
      case "normal":
        return {
          backgroundColor: "#A8A77A"
        };
      case "fire":
        return {
          backgroundColor: "#EE8130"
        };
      case "water":
        return {
          backgroundColor: "#6390F0"
        };
      case "electric":
        return {
          backgroundColor: "#F7D02C"
        };
      case "grass":
        return {
          backgroundColor: "#7AC74C"
        };
      case "ice":
        return {
          backgroundColor: "#96D9D6"
        };
      case "fighting":
        return {
          backgroundColor: "#C22E28"
        };
      case "poison":
        return {
          backgroundColor: "#A33EA1"
        };
      case "ground":
        return {
          backgroundColor: "#E2BF65"
        };
      case "flying":
        return {
          backgroundColor: "#A98FF3"
        };
      case "grass":
        return {
          backgroundColor: "#7AC74C"
        };
      case "psychic":
        return {
          backgroundColor: "#F95587"
        };
      case "bug":
        return {
          backgroundColor: "#A6B91A"
        };
      case "rock":
        return {
          backgroundColor: "#B6A136"
        };
      case "ghost":
        return {
          backgroundColor: "#735797"
        };
      case "dragon":
        return {
          backgroundColor: "#6F35FC"
        };
      case "dark":
        return {
          backgroundColor: "#705746"
        };
      case "steel":
        return {
          backgroundColor: "#B7B7CE"
        };
      case "fairy":
        return {
          backgroundColor: "#D685AD"
        };
      default:
        return { backgroundColor: "#68A090" };
    }
  };

  onPressAbility = item => {
    this.props.navigation.navigate("Ability", item.url);
  };

  onPressTypes = item => {
    this.props.navigation.navigate("Types", item.url);
  };

  renderType(types) {
    // !Refactor this
    if (types.length == 2) {
      return (
        <View style={styles.types}>
          <TouchableOpacity onPress={() => this.onPressTypes(types[0].type)}>
            <View style={[this.typeStyle(types[0].type.name), styles.type]}>
              <Text>
                {types[0].type.name.charAt(0).toUpperCase() +
                  types[0].type.name.slice(1)}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onPressTypes(types[1].type)}>
            <View style={[this.typeStyle(types[1].type.name), styles.type]}>
              <Text>
                {types[1].type.name.charAt(0).toUpperCase() +
                  types[1].type.name.slice(1)}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={styles.types}>
          <TouchableOpacity onPress={() => this.onPressTypes(types[0].type)}>
            <View style={[this.typeStyle(types[0].type.name), styles.type]}>
              <Text>
                {types[0].type.name.charAt(0).toUpperCase() +
                  types[0].type.name.slice(1)}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
  }
  flavor_text_entries(flavor_texts) {
    for (item of flavor_texts) {
      console.log(item);
      if (item.language.name === "en") {
        return item.flavor_text;
      }
    }
  }

  renderPokemonInfo() {
    return (
      <View style={styles.container}>
        <Image
          style={[styles.avatarImage, { width: 150, height: 150 }]}
          source={{
            uri: this.state.dataAPI.sprites.front_default
          }}
        />
        <Text>
          {this.state.dataAPI.name.charAt(0).toUpperCase() +
            this.state.dataAPI.name.slice(1)}
        </Text>
        <Text>
          Weight: {this.state.dataAPI.weight / 10}
          kg
        </Text>
        <Text>Height: {this.state.dataAPI.height / 10}m</Text>

        <View>{this.renderType(this.state.dataAPI.types)}</View>

        <View style={styles.parentInfo}>
          <FlatList
            data={this.state.dataAPI.abilities.reverse()}
            renderItem={({ item }) => {
              if (item.is_hidden) {
                return (
                  <TouchableOpacity
                    onPress={() => this.onPressAbility(item.ability)}
                  >
                    <View style={styles.infoContainer}>
                      <Text>
                        {item.ability.name.charAt(0).toUpperCase() +
                          item.ability.name.slice(1)}{" "}
                        (Hidden Ability)
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              }
              return (
                <TouchableOpacity
                  onPress={() => this.onPressAbility(item.ability)}
                >
                  <View style={styles.infoContainer}>
                    <Text>
                      {item.ability.name.charAt(0).toUpperCase() +
                        item.ability.name.slice(1)}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>

        <View style={styles.parentInfo}>
          <FlatList
            data={this.state.dataAPI.stats.reverse()}
            renderItem={({ item }) => {
              return (
                <View style={styles.infoContainer}>
                  <Text>
                    {item.stat.name.charAt(0).toUpperCase() +
                      item.stat.name.slice(1)}
                    :{item.base_stat}
                  </Text>
                </View>
              );
            }}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>

        <View style={styles.parentInfo}>
          <Text>
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
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#fff"
  },
  parentInfo: {
    flexDirection: "row"
  },
  types: {
    flexDirection: "row-reverse",
    alignItems: "center"
  },
  type: {
    paddingHorizontal: 5
  },
  avatarImage: {
    borderWidth: 1,
    borderColor: "#000",
    marginBottom: 20
  },
  dataName: {
    marginBottom: 20
  },
  dataInfo: {
    width: "80%",
    alignItems: "center",
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: "#000"
  },
  appContainer: {
    flex: 1,
    backgroundColor: "#424342",
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    marginBottom: 10,
    paddingTop: 15,
    paddingBottom: 15,
    paddingRight: 20,
    paddingLeft: 20,
    backgroundColor: "#88A2AA",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#000000"
  },
  buttonText: {
    fontWeight: "bold",
    color: "#fff"
  }
});
