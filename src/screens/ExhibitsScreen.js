import { map } from 'lodash';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { getAllExhibitions } from '../api/exhibitions';
import Card from '../components/Card';
import Colors from '../constants/Colors';
import URL from '../constants/URL';

const ExhibitsScreen = ({ navigation }) => {
  const [exhibitions, setExhibitions] = useState(null);
  let swapColor = true;

  useEffect(() => {
    getAllExhibitions().then((response) => {
      setExhibitions(response);
    });
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.view}>
        {map(exhibitions, (exhibition, index) => {
          if (index % 2 === 0) {
            swapColor = !swapColor;
          }
          return (
            <Card
              key={exhibition._id}
              index={index}
              textBtn="Conócela"
              color={swapColor ? Colors.green : Colors.magenta}
              exhibition={exhibition}
              navigation={navigation}
            />
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  view: {
    flexDirection: 'column',
    alignItems: 'center',
  },
});

export default ExhibitsScreen;
