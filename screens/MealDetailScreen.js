import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { MEALS } from "../data/dummy-data";
import MealDetails from "../components/MealsDetails";
import { useLayoutEffect } from "react";

import Subtitle from "../components/MealDetail/Subtitle";
import List from "../components/MealDetail/List";
import IconButton from "../components/IconButton";
// import { FavoritesContext } from "../store/context/favoritesContext";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../store/redux/favorites";

function MealDetailScreen({ route, navigation }) {
  // const favoriteMetalsContext = useContext(FavoritesContext);

  // hook used to get data out of redux store
  const favoriteMealIds = useSelector((state) => state.favoriteMeals.ids);

  // used to dispatch funtions from our slice
  const dispatch = useDispatch();

  const { mealId } = route.params;

  const {
    imageUrl,
    title,
    duration,
    complexity,
    affordability,
    ingredients,
    steps,
  } = MEALS.find((meal) => meal.id === mealId);

  // const isMealFavorite = favoriteMetalsContext.ids.includes(mealId);
  const isMealFavorite = favoriteMealIds.includes(mealId);

  function changeFavoriteStatusHandler() {
    if (isMealFavorite) {
      // favoriteMetalsContext.removeFavorite(mealId);
      dispatch(removeFavorite({ id: mealId }));
    } else {
      // favoriteMetalsContext.addFavorite(mealId);
      dispatch(addFavorite({ id: mealId }));
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title,
      headerRight: () => {
        return (
          <IconButton
            icon={isMealFavorite ? "star" : "star-outline"}
            color="white"
            onPress={changeFavoriteStatusHandler}
          />
        );
      },
    });
  }, [navigation, changeFavoriteStatusHandler]);

  return (
    <ScrollView style={styles.rootContainer}>
      <Image style={styles.image} source={{ uri: imageUrl }} />
      <Text style={styles.title}>{title}</Text>

      <MealDetails
        duration={duration}
        complexity={complexity}
        affordability={affordability}
        textStyle={styles.detailText}
      />

      <View style={styles.listOuterCOntainer}>
        <View style={styles.listContainer}>
          <Subtitle>ingredients</Subtitle>
          <List data={ingredients} />

          <Subtitle>Steps</Subtitle>

          <List data={steps} />
        </View>
      </View>
    </ScrollView>
  );
}

export default MealDetailScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    marginBottom: 32,
  },
  image: {
    width: "100%",
    height: 350,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    margin: 8,
    textAlign: "center",
    color: "white",
  },
  detailText: {
    color: "white",
  },
  listOuterCOntainer: {
    alignItems: "center",
  },
  listContainer: {
    width: "80%",
  },
});
