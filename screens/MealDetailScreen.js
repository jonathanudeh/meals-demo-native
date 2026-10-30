import { StyleSheet, Text, View } from "react-native";

function MealDetailScreen({ route }) {
  const { mealId } = route.params;

  return (
    <View style={styles.rootContainer}>
      <Text>THis is the details page - {mealId}</Text>
    </View>
  );
}

export default MealDetailScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
});
