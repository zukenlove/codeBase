import { View, Text, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";
import User from "@/shared/User";


type UserRowProps = {
  user: User;
};

export default function UserRow({ user }: UserRowProps) {
  const router = useRouter();

  return (
      <View style={styles.container}>
        <Text>Name: {user.name}</Text>
        <Text>Age: {user.age}</Text>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    borderWidth: 2,
    padding: 12,
    borderRadius: 8,
  },
});


