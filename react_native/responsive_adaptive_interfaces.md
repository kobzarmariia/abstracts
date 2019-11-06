# Responsive and adaptive interfaces

## Flexible styling

```
	inputContainer: {
		width: '80%',
		minWidth: 300,
		maxWidth: '95%',
		alignItems: 'center',
	},
```

## Dimention

from 'react-native';

```
	width: Dimensions.get('window').width / 2,
	marginTop: Dimensions.get('window').height > 600 ? 20 : 10,

	width: Dimensions.get('window').width * 0.7,
	height: Dimensions.get('window').width * 0.7,
	borderRadius: (Dimensions.get('window').width * 0.7) / 2,

	marginVertical: Dimensions.get('window').height / 40,        // 2.5%

	let listContainerStyle = styles.listContainer;

	if(Dimentions.get('window').width < 350) {
		listContainerStyle = styles.listContainerBig;
	}
```

## Orienation

app.json -> "orientation": "portrait", ("landscape", "default"(can rotate))

- add ScrollView
- KeyboardAvoidingView //keyboar never overlays input

```
	<KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}> //position-iOS padding-Android
```

BUG - when rotate size do not change (style on start apply only one)

SHOLD recalculate when orientation changes
-> useState

RECALCULATE

```
	const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 3);

	const updateLayout = () => {
		setButtonWidth(Dimensions.get('window').width / 3);
	};

	Dimensions.addEventListener('change', updateLayout);
```

useEffect for events!

```
useEffect(() => {
	const updateLayout = () => {
		setButtonWidth(Dimensions.get('window').width / 3);
	};

	Dimensions.addEventListener('change', updateLayout);
	return () => {
		Dimensions.removeEventListener('change', updateLayout);
	};
});
```

Rendering different orientation

```
useEffect(() => {
	const updateLayout = () => {
		setDeviceHeight(Dimensions.get('window').height);
	};

	Dimensions.addEventListener('change', updateLayout);

	return () => {
		Dimensions.removeEventListener('change', updateLayout);
	};
});

if (deviceHeight < 500) { {
		return (<View>...</View>)}
return ();
```

import { ScreenOrientation } from 'expo';

LOCK orientation (Can`t changhe orientation in this page)

ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

## Platform API

Button - base on platform

{Platform} from 'react-native'

```
	backgroundColor: Platform.OS === 'android' ? Colors.primary : Colors.accent,
```

cleaner styles

-> headerBase
-> headerIOS (all for iOS)
-> headerAndroid

```
<View style={{...styles.headerBase, ...Platform.select({ios: styles.headerIOS, android: styles.headerAndroid})}}>
```

```
const MainButton = ({ onPress, title }) => {
	let ButtonComponent = TouchableOpacity;

	if (Platform.OS === 'android' && Platform.Version >= 21) {
		ButtonComponent = TouchableNativeFeedback;
	}
	return (
		<ButtonComponent onPress={onPress}>
			<View style={styles.button}>
				<Text style={styles.buttonText}>{title}</Text>
			</View>
		</ButtonComponent>
	);
};
```

Create MainButton.android.js
Create MainButton.ios.js
BUT import MainButton from '../component/MainButton'

Overlap content when change orientation.

SafeAreaView from 'react-native'

just wrap content in App.js (top component)
