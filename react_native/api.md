# Device API

## Animation

https://github.com/StephenGrider/AdvancedReactNative

https://facebook.github.io/react-native/docs/animations#docsNav

```
import { Animated, Text, View } from 'react-native';
```

Animated.Value() for single values
Animated.ValueXY() for vectors

Animated.decay() starts with an initial velocity and gradually slows to a stop.
Animated.spring() provides a basic spring physics model.

```
Animated.spring(position, {
    toValue: { x: 200, y: 500 }
}).start();

<Animated.View style={this.position.getLayout()}>...</Animated.View>
```

Animated.timing() animates a value over time using easing functions.

```
import React, { useState, useEffect } from 'react';
import { Animated, Text, View } from 'react-native';

const FadeInView = (props) => {
  const [fadeAnim] = useState(new Animated.Value(0))  // Initial value for opacity: 0

  React.useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 10000,
      }
    ).start();
  }, [])

  return (
    <Animated.View                 // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim,         // Bind opacity to animated value
      }}
    >
      {props.children}
    </Animated.View>
  );
}

// You can then use your `FadeInView` in place of a `View` in your components:
export default () => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <FadeInView style={{width: 250, height: 50, backgroundColor: 'powderblue'}}>
        <Text style={{fontSize: 28, textAlign: 'center', margin: 10}}>Fading in</Text>
      </FadeInView>
    </View>
  )
}
```

WRAPPERS sent style

Animated.Image
Animated.ScrollView
Animated.Text
Animated.View
Animated.FlatList
Animated.SectionList

Get initial state -> Render component -> Update state -> Component rerenders

## Gestures

(user presses on screen -> user drags finger) by Gesture (-> card moves) by Animation

A gestureState object has the following:

stateID - ID of the gestureState- persisted as long as there at least one touch on screen
moveX - the latest screen coordinates of the recently-moved touch
moveY - the latest screen coordinates of the recently-moved touch
x0 - the screen coordinates of the responder grant
y0 - the screen coordinates of the responder grant
dx - accumulated distance of the gesture since the touch started
dy - accumulated distance of the gesture since the touch started
vx - current velocity of the gesture
vy - current velocity of the gesture
numberActiveTouches - Number of touches currently on screen

```
import { PanResponder } from 'react-native';

constructor(props) {
    super(props);

    const position = new Animated.ValueXY();
    this._panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (event, gesture) => {
            position.setValue({ x: gesture.dx, y: gesture.dy })
            //ADD ROTATE
        },
        onPanResponderRelease: (event, gesture)  => {

            if(gesture.dx > SWIPE_THRESHOLD){
                this.forceSwipe('right');
            } else if (gesture.dx < -SWIPE_THRESHOLD){
                this.forceSwipe('left');
            } else {
                forceSwipe();
            }
        }   //finalize
    })

    //this.state = { panResponder, position, index: 0 }   OR {...this.state.panresponder.panHandlers}
    //OR this.position = position;
}

resetPosition() {
    Animated.spring(this.position, {   //animation with bounce
        toValue: { x: 0, y: 0}
    })
}

  forceSwipe(direction) {
    const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;
    Animated.timing(this.state.position, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION
    }).start(() => this.onSwipeComplete(direction));
  }

    onSwipeComplete(direction) {
        const { onSwipeLeft, onSwipeRight, data } = this.props;
        const item = data[this.state.index];

        direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item);
        this.state.position.setValue({ x: 0, y: 0 });
        this.setState({ index: this.state.index + 1 });
    }

render() {
    return <Animated.View style={this.state.position.getLayout()}  {...this._panResponder.panHandlers}>...<Animated.View/>;
}

```

ADD ROTATE style interpolation -> limiting Dimensions

```
import { ... Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.24 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

class ...

getCardStyle() {
    const { position } = this.state;
    const rotate = position.x.intrepolate({
        inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5]  //[-500, 0, 500],
        outputRange: ['-120deg', '0deg', '120deg']
    });

    return {
        ...this.state.position.getLayouut(),
        transform: [{rotate}]
    }
}


render() {
    return <Animated.View style={this.getcardStyle()} {...this._panResponder.panHandlers}>...<Animated.View/>;
}
```

### EXPO

https://docs.expo.io/versions/v35.0.0/sdk/overview/

PanResponder

https://facebook.github.io/react-native/docs/panresponder

## Permissions

https://docs.expo.io/versions/v35.0.0/sdk/permissions/

## Camera

https://docs.expo.io/versions/v35.0.0/sdk/camera/

## Location

https://docs.expo.io/versions/v35.0.0/sdk/location/

## MapView

https://docs.expo.io/versions/v35.0.0/sdk/map-view/

## SQLite

https://docs.expo.io/versions/v35.0.0/sdk/sqlite/
