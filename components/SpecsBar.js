import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const SpecsBar = props => {
  return (
    <View style={styles.barContainer}>
      <View style={styles.barBox}>
        <View
          style={[
            styles.barFill,
            { width: `${(props.num / props.of) * 100}%` }
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  barcontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  barBox: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 50,
    borderColor: '#B4383C',
    height: 26,
    overflow: 'hidden',
    backgroundColor: '#D6484C'
  },
  barFill: {
    backgroundColor: '#fff',
    height: 26
  }
});

export default SpecsBar;
