# Navigation

```
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CategoriesScreen = props => {
	return (
		<View style={styles.screen}>
			<Text>The categories screen!</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default CategoriesScreen;
```

Add font

```
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

const fetchFonts = () => {
	Font.loadAsync({
		'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
		'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
	});
};

//in App.js

const [fontLoaded, setFontLoaded] = useState(false);

if (!fontLoaded) {
  return <AppLoading startAsync={fetchFonts} onfinish={() => setFontLoaded(true)} />;
}
```

## RN navigation

WEB - url

RN - tabs, stack

npm i react-navigation

https://reactnavigation.org/docs/en/getting-started.html

expo install react-navigation react-native-gesture-handler react-native-reanimated react-native-screens

- navigation (folder)
  MealsNavigator.js

Steck navigator

```
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';

const MealsNavigator = createStackNavigator({
	Categories: CategoriesScreen,
	CategoryMeals: {
		screen: CategoryMealsScreen,
	},
	MealDetail: MealDetailScreen,
});

export default createAppContainer(MealsNavigator);
```

In App.js

```
import MealsNavigator from './navigation/MealsNavigator';

return <MealsNavigator />
```

IN props

'navigation': {pop, push, replace, reset, navigate} - func

```
<Button
  title="Go to Meals!"
  onPress={() => {
    navigation.navigate({ routeName: 'CategoryMeals' });     //navigation.navigate('CategoryMeals');
  }}
/>
```

Pushing, popping, replacing

```
navigation.push('CategoryMeals');  //can add same screen but with diffrent content
navigation.goBack();  //Save and go back
navigation.pop();  //only in stack navigator  (or popToTop)
navigation.replace('CategoryMeals'); //change screen (tab)
```

FlatList (grid)

```
const renderGridItem = itemData => {
	return (
		<View>
			<Text>{itemData.item.title}</Text>
		</View>
	);
};

<FlatList
  keyExtractor={(item, index) => item.id}
  data={CATEGORIES}
  renderItem={renderGridItem}
  numColumns={2}
/>
```

Navigation Header

```
CategoriesScreen.navigationOptions = {
	headerTitle: 'Meal Categories',
	headerStyle: {
		backgroundColor: Colors.primaryColor,
	},
	headerTintColor: 'white',
};
```

Sent params

```
<TouchableOpacity
				style={styles.gridItem}
				onPress={() => {
					navigation.navigate('CategoryMeals', {
						categoryId: itemData.item.id,
					});
				}}
			>


const categoryId = navigation.getParam('categoryId');

const selectedCategory = CATEGORIES.find(category => category.id === categoryId);
```

Dynamycly navigation

```
CategoryMealsScreen.navigationOptions = navigationData => {
	const categoryId = navigationData.navigation.getParam('categoryId');

	const selectedCategory = CATEGORIES.find(category => category.id === categoryId);

	return {
		headerTitle: selectedCategory.title,
		headerStyle: {
			backgroundColor: Colors.primaryColor,
		},
		headerTintColor: 'white',
	};
};
```

Default style option

```
const MealsNavigator = createStackNavigator(
	{
		Categories: {
			screen: CategoriesScreen,
			navigationOptions: {
				headerTitle: 'Meal Categories',
			},
		},
		CategoryMeals: {
			screen: CategoryMealsScreen,
		},
		MealDetail: MealDetailScreen,
	},
	{
		defaultNavigationOptions: {
			headerStyle: {
				backgroundColor: Colors.primaryColor,
			},
			headerTintColor: 'white',
		},
	}
);
```

in App.js

import { useScreens } from 'react-native-screens';
useScreens();

HEADER BUTTON

npm i react-navigation-header-buttons

```
MealDetailScreen.navigationOptions = navigationData => {
	const mealId = navigationData.navigation.getParam('mealId');
	const selectedMeal = MEALS.find(meal => meal.id === mealId);
	return {
		headerTitle: selectedMeal.title,
		headerRight: (
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item
					title="Favorite"
					iconName="ios-star"
					onPress={() => {
						console.log('Mark as favorite!');
					}}
				/>
			</HeaderButtons>
		),
	};
};
```

HeaderButton.js

```
import React from 'react';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';

const CustomHeaderButton = props => {
	return <HeaderButton {...props} IconComponent={Ionicons} iconSize={23} color={'white'} />;
};

export default CustomHeaderButton;
```

## TABS

npm i react-navigation-tabs

import { createStackNavigator, createBottomTabNavigator } from 'react-navigation-stack';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

npm i react-navigation-material-bottom-tabs //for android
npm i react-native-paper

npm i react-navigation-drawer

```
const FilterNavigator = createStackNavigator({
	Filters: FiltersScreen,
});

const MainNavigator = createDrawerNavigator({
	MealsFavs: MealsFavTabNavigator,
	Filters: FilterNavigator,
});
```

```
CategoriesScreen.navigationOptions = navData => {
	return {
		headerTitle: 'Meal categories',
		headerLeft: (
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item
					title="Menu"
					iconName="ios-menu"
					onPress={() => {
						navData.navigation.toggleDrawer();
					}}
				/>
			</HeaderButtons>
		),
	};
};
```

Switch

```
const [isGlutenFree, setIsGlutenFree] = useState(false);
const [isLactoseFree, setIsLactoseFree] = useState(false);
const [isVegan, setIsVegan] = useState(false);
const [isVegetarian, setIsVegetarian] = useState(false);

<FilterSwitch label="Vegan" state={isVegan} onChange={newValue => setIsVegan(newValue)} />

const FilterSwitch = ({ label, state, onChange }) => {
	return (
		<View style={styles.filterContainer}>
			<Text>{label}</Text>
			<Switch
				trackColor={{ true: Colors.primaryColor }}
				thumbColor={Platform.OS === 'android' ? Colors.primaryColor : ''}
				value={state}
				onValueChange={onChange}
			/>
		</View>
	);
};
```
