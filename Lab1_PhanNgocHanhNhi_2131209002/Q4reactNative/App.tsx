/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { Button, Alert, ScrollView } from "react-native";
import data from './Data'
import Square from './Square'
import styles from "./style";

const App=()=> {
  return (
    <ScrollView style={styles.container}>
      {data.map((item, index) => (
        <Square key={item} text={`Square ${index + 1}`} />
      ))}
    </ScrollView>

  );
};



export default App;
