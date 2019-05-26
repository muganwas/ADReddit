/**
 * @format
 */

import {AppRegistry, Easing, Animated} from 'react-native';
import {name as appName} from './app.json';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import BasicComponent from './Components/BasicComponent/BasicComponent';

const screenConfig = {
    duration: 200,
    easing: Easing.out(Easing.poly(4)),
    timing: Animated.timing,
};

const MainNavigator = createStackNavigator({
    First: { screen: BasicComponent }
},  
{
    initialRouteName: 'First',
    headerBackTitleVisible: true,
    headerMode: 'float',
    mode: 'modal',
    transitionConfig: sceneProps => ({
      transitionSpec: screenConfig,
      screenInterpolator: (sceneProps) => {
        if (sceneProps.scene.route.routeName === 'Second') {
          const { layout, position, scene } = sceneProps;
          const { index } = scene;
  
          const width = layout.initWidth;
          const translateX = position.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [width, 0, 0],
          });
  
          const opacity = position.interpolate({
            inputRange: [index - 1, index - 0.99, index],
            outputRange: [0, 1, 1],
          });
  
          return { opacity, transform: [{ translateX }] };
        }
      },
    })
});

const App = createAppContainer(MainNavigator);

AppRegistry.registerComponent(appName, () => App);
