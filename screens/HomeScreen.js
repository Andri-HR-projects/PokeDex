import React from "react";
import {
  ScrollView,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator
} from "react-native";
import { Constants } from "expo";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  state = {
    dataAPI: null
  };
  componentDidMount = () => {
    fetch("https://pokeapi.co/api/v2/pokemon/", {
      method: "GET"
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          dataAPI: responseJson.results
        });
        // console.log(this.state.dataAPI);
      })
      .catch(error => {
        console.error(error);
      });
  };

  onPress = item => {
    this.props.navigation.navigate("Detail", item.url);
  };

  renderPokemon(pokemon) {
    return (
      <TouchableOpacity onPress={() => this.onPress(pokemon)}>
        <Image
          style={[styles.avatarImage, { width: 80, height: 30 }]}
          source={{
            uri: "https://img.pokemondb.net/artwork/" + pokemon.name + ".jpg"
          }}
        />
        <Text style={styles.selectionListText}>
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        </Text>
      </TouchableOpacity>
    );
  }

  render() {
    if (this.state.dataAPI != null) {
      return (
        <View style={styles.container}>
          <View style={styles.topBox}>
            <Text style={styles.topBoxText}>Pokémon BITCHES!!</Text>
          </View>
          <ScrollView style={styles.scroll}>
            <FlatList
              data={this.state.dataAPI}
              renderItem={({ item }) => (
                <View style={styles.infoContainer}>
                  {this.renderPokemon(item)}
                </View>
              )}
            />
          </ScrollView>
        </View>
      );
    } else {
      return <ActivityIndicator size="large" color="#CC5500" />;
    }
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );
      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use
          useful development tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
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
  concertContainer: {
    flex: 1,
    flexDirection: "row",
    paddingBottom: 16
  },
  infoContainer: {
    paddingLeft: 8,
    flex: 1,
    flexDirection: "row"
  },
  topBox: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "10%",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5
  },
  topBoxText: {
    fontSize: 30,
    fontWeight: "bold"
  },
  alphabetLetter: {
    paddingLeft: "2%"
  },
  alphabetLetterText: {
    fontSize: 30
  },
  scroll: {
    marginTop: 5,
    flexGrow: 0,
    width: "90%",
    height: "100%",
    backgroundColor: "#fff"
  },
  selectionListText: {
    fontSize: 30,
    paddingLeft: "5%"
  }
});
