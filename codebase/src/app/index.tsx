import { data } from '@/components/data';
import { useState } from 'react';
import { View, Text, FlatList, TextInput } from 'react-native'; 
import UserRow from '@/components/UserRow';

export default function HomeScreen() {
  const [searchText, setSearchText] = useState("")
  const filteredData = data.filter((user) => (user.name.toLowerCase().startsWith(searchText.trim().toLowerCase())))
type Position = "President" | "Vice Minister" | "Mayor";

type Vote = {
  candidateName: string;
  position: Position;
};

type CandidateStats = {
  candidateName: string;
  position: Position;
  voteCount: number;
};

// Mock data: A list of votes cast by constituents
const rawVotes: Vote[] = [
  { candidateName: "Alice", position: "President" },
  { candidateName: "Bob", position: "President" },
  { candidateName: "Alice", position: "President" },
  { candidateName: "Charlie", position: "Mayor" },
  { candidateName: "Dana", position: "Vice Minister" },
  { candidateName: "Charlie", position: "Mayor" },
];

// Create a composite string key: "CandidateName-Position"
type VoteTracker = Record<string, CandidateStats>;

const aggregatedVotes = rawVotes.reduce<VoteTracker>((acc, currentVote) => {
  const { candidateName, position } = currentVote;
  const uniqueKey = `${candidateName}-${position}`;

  if (!acc[uniqueKey]) {
    // Initialize candidate record for this specific role
    acc[uniqueKey] = {
      candidateName,
      position,
      voteCount: 1,
    };
  } else {
    // Increment existing vote count
    acc[uniqueKey].voteCount += 1;
  }

  return acc;
}, {});

// Flatten the tracking object into an array of statistics
const candidatesList: CandidateStats[] = Object.values(aggregatedVotes);
 console.log(candidatesList)
  return (
    <View style={{ flex: 1, paddingTop: 50 }}>
      <View>
        <Text>Search</Text>
        <TextInput 
          value={searchText}
          onChangeText={setSearchText}
        />
        {filteredData.length === 0 && (
          <Text>No users found.</Text>
        )}
      </View>
      <FlatList 
        data={filteredData}
        keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
        renderItem={({ item }) => {
          return (
            <UserRow user = {item} />
          );
        }}
      />
    </View>
  );
}
