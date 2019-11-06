# Introduction

React.js - library for building User interfaces. Used for Web development. ReactDOM.render(...) adds the web support.

React Native - collection of "special" React components. Components compiled to Native Widgets. Acces to native platform APIs exposed to JS. Connect JS and Native Platform code.

React + React Native = React Native Mobile App (iOS, Android)

## How React Native works?

React + React Native App

```
const App = props => {
  return(
    <View>            //View Text - components
      <Text>Hello there!</Text>
    </View>
  )
}
```

This component compile (views) to React Native App

- React for the Web - <div>, <Input>
- Native Component (Android) - android.view, EditText
- Native Component (iOS) - UIView, UITextField
- React Native - <View>, <TextInput>

UI - React Native -> compiled to native views
Logic - JavaScript -> NOT compiled

Code(UI Views, Logic) compiled ->
Compilrd Views,
(JS Code -> (JS Code (Virtual Machine)) - "Bridge" -> Native Platform modules / API)

https://facebook.github.io/react-native/

Expo CLI or React Native CLI?

Expo CLI: (wrapper)

- Third-party service (FREE),
- "Managed App Development",
- Lots of Convenience & Utility Features: Simplifies Development
- BUT: you limited to the Expo Ecosystem

React Native CLI:

- bare-bone development
- by React Native community
- no convenience or utility features
- full flexibility: integrate with any native code

## How Expo works?

(Native Device / Simulator (Expo Client (App)) <- Loaded into Expo App (Your App Code)

- you can publish as Expo app
- you can also publish as standalone app

## Get started

- Node.js
- sudo npm install expo-cli --global

Create:

- expo init my-new-project
- cd my-new-project
- expo start

Download expo client app -> scan QRcode

```
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function App() {
	const [outputText, setOutputText] = useState('Open up App.js to start working on your app! ');

	return (
		<View style={styles.container}>
			<Text>{outputText}</Text>
			<Button title="Change Text" onPress={() => setOutputText('The text changet!')}></Button>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

```

## Android emulator

https://docs.expo.io/versions/v35.0.0/workflow/android-studio-emulator/

https://developer.android.com/studio

custom + Android SDK

Configure -> Appearence & Behaviour + Google Play Services

Configure -> AVD

## iOS emulator

You can run iOS simalator on linux or windows.

XCode -> Preferences

XCode -> Open developers tools

Hardware -> device (change)

https://docs.expo.io/versions/v35.0.0/workflow/ios-simulator/
