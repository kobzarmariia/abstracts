# Basics

## Core components

Build into RN:
<View style>
<Text>
NOT flex
Dont want text wrap set numberOfLines prop, combine with ellipsizeMode (to trancate instead of wrap)
textAlign
<Button title onPress color>
<TextInput placeholder onChangeText value style>
<Image source resizeMode>

Your UIs/ Custom components - compose core component

<ScrollView horizontal contentContainerStyle={styles.list}> //or for small window
<FlatList data keyExtractor renderItem>

```
  <FlatList
    data={courseGoals}
    keyExtractor={(item, index) => item.id}
    renderItem={itemData => (
      <GoalItem
        itemData={itemData.item.value}
        removeGoalHandler={removeGoalHandler}
        id={itemData.item.id}
        cancelGoalAdditionHandler={cancelGoalAdditionHandler}
      />
    )}
  />
```

<Modal visible={visible} animationType="slide">

<Touchable>
<TouchableOpacity onPress activeOpacity={0.8}>
<TouchableHighlight>
<TouchableNativeFeedback>

## Stying

There is no CSS!

StyleSheet object or inlite styles - written in JS (based on CSS)

margin
marginTop
marginBottom
marginVertical
marginHorizontal

```
	inputContainer: {
		width: 300,
		maxWidth: '80%',  //if device too small
	},
```

shadowColor
shadowOffset
shadowOpacity
shadowRadius

(work only on iOS)

```
		shadowColor: 'black',
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 6,
		shadowOpacity: 0.26,
		backgroundColor: 'white', //not transparent
    elevation: 5 //for android
```

borderBottomLeftRadius,
textAlign: 'center',

```
import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const Input = props => {
	return <TextInput {...props} style={{ ...styles.input, ...props.style }} />;
};

const styles = StyleSheet.create({
	input: {
		height: 30,
		borderBottomColor: 'grey',
		borderBottomWidth: 1,
		marginVertical: 10,
	},
});

export default Input;
```

TextInput

```
<Input
    style={styles.input}
    blurOnSubmit
    autoCapitalize="none"
    autoCorect={false}
    keyboardType="numeric"
    maxLength={2}
  />
```

CAN`T entered NOT number

```
	const numberInputHandler = inputText => {
		setEnteredValue(inputText.replace(/[^0-9]/g, ''));
	};

  onChangeText={numberInputHandler}
  value={enteredValue}
```

CLOSE keyboard

```
//keyboardType="number-pad"

		<TouchableWithoutFeedback
			onPress={() => {
				Keyboard.dismiss();
			}}
		>
```

Input text doesn't show keyboard on iOS simulator
Hardware > Keyboard > Connect Hardware Keyboard

Validation

```
	const confirmInputHandler = () => {
		const chosenNumber = parseInt(enteredValue);
		if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {     //NOT chosenNumber === NaN
			Alert.alert('Invalid number!', 'Number has to be a number between 1 and 99', [
				{ text: 'Okay', style: 'destructive', onPress: resetInputHandler },
			]);
			return;
		}
		setConfirmed(true);
		setSelectedNumber(chosenNumber);
		setEnteredValue('');
	};
```

Random

```
const generatRandomBetween = (min, max, exclude) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	const randomNumber = Math.floor(Math.random * (max - min)) + min;
	if (randomNumber === exclude) {
		return generatRandomBetween(min, max, exclude);
	} else {
		return randomNumber;
	}
};
```

### Flex

```
	const addGoalHandler = enteredGoal => {
		setCourseGoals(currentGoals => [
			...currentGoals,
			{ id: Math.random().toString(), value: enteredGoal },
		]);
	};
```

## Debug

Error Message - Syntax error, bugs (undefined values, wrong types), "unavoidable errors" (failing network request)

Logical Errors - Undesired or unexpected app behavior, unhandled user behavior, sequence of steps leads to errors

Styling, Layout, UX - Unexpected/ "wrong" styling of layout, inconsistent result on diferent devices, layout doesn`t work on certain devices or orientations

- read the error message
- console.log()
- chrome debugger (+ breackpoints)

without check (add null or undefined)

```
		if (enteredGoal.trim().length === 0) {
			return;
		}
```

iOS - CMD + D (Connection - LAN or LOCAL) (+ LIVE RELOADING)
Reload - CMD + R
A - CMD + N - debug JS
Reload - R + R

Show performance monitor
Toggle element inspector

RN debuger (dmg):
https://github.com/jhen0409/react-native-debugger/releases

CMD+T -> 19001 -> in mobile (start remote debugging)

FONTS

npm i expo-font
import \* as Font from 'expo-font';

```
import * as Font from 'expo-font';
import { AppLoading } from 'expo';


const fetchFonts = () => {
	Font.loadAsync({
		'open-sans-regular': require('./assets/fonts/OpenSans-Regular.ttf'),
		'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
	});
};


	const [dataLoaded, setDataLoaded] = useState(false);
	if (!dataLoaded) {
		return <AppLoading
				startAsync={fetchFonts}
				onFinish={() => setDataLoaded(true)}
				onError={err => console.log(err)}
			/>
	}
```

Image

```
	<View style={styles.imageContainer}>
		<Image source={require('../assets/success.png')} style={styles.image} resizeMode="cover" />
	</View>
	// source: {{uri: 'https://link'}}

	imageContainer: {
		marginVertical: 10,
		width: 300,
		height: 300,
		borderRadius: 150,
		overflow: 'hidden',
		borderWidth: 10,
		borderColor: Color.accent,
	},
	image: {
		width: '100%',
		height: '100%',
	},
```

Custom button

```
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import Colors from '../constants/colors';

const MainButton = ({ onPress, title }) => {
	return (
		<TouchableOpacity onPress={onPress}>
			<View style={styles.button}>
				<Text style={styles.buttonText}>{title}</Text>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		backgroundColor: Colors.accent,
		paddingVertical: 10,
		paddingHorizontal: 18,
		borderRadius: 25,
	},
	buttonText: {
		color: 'white',
		fontFamily: 'open-sans-regular',
		fontSize: 18,
		textAlign: 'center',
	},
});

export default MainButton;

```

ICON

import { Ionicons } from '@expo/vector-icons';
https://docs.expo.io/versions/latest/guides/icons/

<Ionicons name="md-add" size={24} color="white" />

LIBRARIES UI

https://docs.expo.io/versions/latest/guides/userinterface/
