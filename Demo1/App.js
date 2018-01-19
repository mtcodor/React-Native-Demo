import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableHighlight
} from 'react-native';

export default class App extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      opacity: new Animated.Value(0.1),
      rotate: new Animated.Value(0),
      movedValue: new Animated.ValueXY({x:0, y:0}),
    };
    this.onPressRotateAnimated = this.onPressRotateAnimated.bind(this);
    this.onPressMoveAnimated = this.onPressMoveAnimated.bind(this);
  }
  
  onPressButton() {
    console.log('哎呀，别按了！');
  }
  
  onLongPressButton() {
    console.log('哎呀，别不松手呀!');
  }
  
  onPressRotateAnimated() {
    this.state.opacity.setValue(0.1);
    this.state.rotate.setValue(0);
    Animated.parallel([            
      Animated.timing(
        this.state.opacity,
        {
          toValue: 1,
          duration: 5000,
        }
      ),
      Animated.timing(
        this.state.rotate,
        {
          toValue: 1,
          duration: 5000,
        }
      ),
    ]).start();
  }
  
  onPressMoveAnimated() {
    Animated.sequence([
      Animated.timing( 
  			this.state.movedValue,
  			{
  				toValue: {
            x: 200, y: 0,
          },
          duration: 5000,
  			}
  		),
      Animated.timing( 
  			this.state.movedValue,
  			{
  				toValue: {
            x: 0, y: 0,
          },
          duration: 5000,
          useNativeDriver: true,
  			}
  		)
    ]).start();
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          React-Native-Demo1 动画
        </Text>
        <TouchableHighlight 
          style={styles.touchAbleHight} 
          onPress={this.onPressRotateAnimated}>
          <Text>点这个会旋转吆！</Text>
        </TouchableHighlight>
        <Animated.View style={{
          width: 100,
          height: 100,
          marginTop: 10,
          marginLeft: 20,
          backgroundColor: 'red',
          opacity: this.state.opacity,
          transform: [
            { rotate: this.state.rotate.interpolate(
              {
		            inputRange: [0, 1],
		            outputRange: ['0deg', '360deg'],
		          })
            }],
        }}
        />
        <TouchableHighlight
          style={styles.touchAbleHight}
          onPress={this.onPressMoveAnimated}>
          <Text>点这个会移动吆！</Text>
        </TouchableHighlight>
        <Animated.View style={{
          width: 100,
          height: 100,
          marginTop: 10,
          marginLeft: 20,
          backgroundColor: 'red',
          transform: [
            {translateX: this.state.movedValue.x}, // x轴移动
		        {translateY: this.state.movedValue.y}, // y轴移动
          ],
        }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
  },
  touchAbleHight: {
    marginLeft: 20,
    width: 100,
    height: 30,
    fontSize: 30,
    marginTop: 10,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
