import { data } from '@/components/data';
import { useState } from 'react';
// 1. Import FlatList directly from 'react-native'
import { View, Text, FlatList, TextInput } from 'react-native'; 

export default function HomeScreen() {
  const [name, setName] = useState("")
  const filteredData = data.filter((user) => (user.name.toLowerCase().startsWith(name.trim().toLowerCase())))
  console.log(filteredData)
  return (
    <View style={{ flex: 1, paddingTop: 50 }}>
      <View>
        <Text>Search</Text>
        <TextInput 
          value={name}
          onChangeText={setName}
        />
      </View>
      <FlatList 
        data={filteredData}
        keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
        renderItem={({ item }) => {
          return (
            <Text style={{ fontSize: 18, marginVertical: 8, paddingHorizontal: 16 }}>
              {item.name}
            </Text>
          );
        }}
      />
    </View>
  );
}
