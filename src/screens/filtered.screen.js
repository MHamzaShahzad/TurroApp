import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';

export default function FilteredItemScreen({ navigation }) {

  const DATA = [
    { id: '1', title: 'First Item', modal: 'Base Modal 1.0', Year: '2020', Rent: 'Rs.2500/day', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBmF_e1xY6DycQm7r3EGNZHt2ZXea8V6aMVg&usqp=CAU' },
    { id: '2', title: 'Second Item', modal: 'Base Modal 1.0', Year: '2021', Rent: 'Rs.4500/day', url: 'https://media.wired.com/photos/5d09594a62bcb0c9752779d9/1:1/w_1500,h_1500,c_limit/Transpo_G70_TA-518126.jpg' },
    { id: '3', title: 'Third Item', modal: 'Base Modal 1.0', Year: '2020', Rent: 'Rs.3500/day', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfrlwq3yMmXJCAR-L3qpo0ELZH6w846q1V-sIdSLBJ4UGbuIGXEIEUA5XIunKF4B2AaAs&usqp=CAU' },
    { id: '4', title: 'First Item', modal: 'Base Modal 1.0', Year: '2020', Rent: 'Rs.2500/day', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5XuWw-f-x3ZTs7hoU2ApiLhYN4mf9MOvprVaOVxFAY8luBCjiV5PhZ4-GhR4HAmZ3eDY&usqp=CAU' },
    { id: '5', title: 'Second Item', modal: 'Base Modal 1.0', Year: '2021', Rent: 'Rs.4500/day', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdLRiWQD3DoTNwkgA5XsJfaKFSb3na5PLqHMLbVVgk7lYclbfubRAQ_ZjYLnk9vTnGCCo&usqp=CAU' },
    { id: '6', title: 'Third Item', modal: 'Base Modal 1.0', Year: '2020', Rent: 'Rs.3500/day', url: 'data:image/jpeg;base64,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' },
    { id: '7', title: 'First Item', modal: 'Base Modal 1.0', Year: '2020', Rent: 'Rs.2500/day', url: 'data:image/jpeg;base64,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' },
    { id: '8', title: 'Second Item', modal: 'Base Modal 1.0', Year: '2021', Rent: 'Rs.4500/day', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBmF_e1xY6DycQm7r3EGNZHt2ZXea8V6aMVg&usqp=CAU' },
    { id: '9', title: 'Third Item', modal: 'Base Modal 1.0', Year: '2020', Rent: 'Rs.3500/day', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTorG71GV65AGF2Q74LnOM-OaqE4W_dqoTQcQ&usqp=CAU' },
  ];

  const Item = ({ item }) => (
    <View style={styles.item}>
      <Image style={styles.img} source={{ uri: item.url }} resizeMode={'cover'} />
      <View style={styles.viewcontainer}>
        <View style={styles.textview}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.title}>{item.modal}</Text>
          <Text style={styles.title}>{item.Year}</Text>
          <View style={styles.Rentview}>
            <Text style={styles.rentitem}>{item.Rent}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderItem = ({ item }) => <Item item={item} />;
  return (
    <View style={styles.container}>
      <FlatList data={DATA} renderItem={renderItem} keyExtractor={item => item.id} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 35
  },
  viewcontainer: {
    flex: 1,
    flexDirection: "row",
    paddingLeft: 5,
    paddingRight: 5
  },
  textview: {
    flex: 1
  },
  item: {
    flexDirection: "row",
    borderRadius: 10,
    alignSelf: "center",
    width: "95%",
    marginVertical: 4,
    elevation: 5,
    backgroundColor: "white"
  },
  rentitem: {
    fontSize: 16
  },
  title: {
    fontSize: 16,
  },
  img: {
    width: "30%",
    height: 100,
    borderRadius: 10
  },
  Rentview: {
    alignItems: "flex-end"
  },
});

