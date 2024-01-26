import React, { Component, useCallback, useEffect } from 'react'
import { Animated, Dimensions, Image, Text, View } from 'react-native'
import Choice from './Choice'


const {height, width} = Dimensions.get('window')

export default function TinderCard ({item, isFirst, index, data, swipe, ...rest}) {
//Swipe Animations
    const rotate = swipe.x.interpolate({
        inputRange: [-100, 0, 100],
        outputRange: ['-8deg', '0deg', '8deg'],
      });
    const likeOpacity = swipe.x.interpolate({
        inputRange: [10, 100],
        outputRange: [0, 1],
        extrapolate: 'clamp',
      });
      const rejectOpacity = swipe.x.interpolate({
        inputRange: [-100, -10],
        outputRange: [1, 0],
        extrapolate: 'clamp',
      });

    const userSelection = useCallback(() => {
        return (
            <>
                <Animated.View style={{ position:'absolute',
                top: 20,
                left:20,
                opacity:likeOpacity,
                }}>
                    <Choice type={'checkcircle'} color={'lightgreen'} />
                </Animated.View>
                <Animated.View style={{ position:'absolute',
                top: 20,
                right:20,
                opacity:rejectOpacity,
                }}>
                    <Choice type={'closecircle'} color={'red'} />
                </Animated.View>
            </>
        )
    }, [swipe, isFirst])


      // Animation for subsequent cards using Animated.spring
      const springAnimation = Animated.spring(swipe, {
        toValue: { x: 0, y: 0 },
        useNativeDriver: true,
        friction: 5,
        tension: 40, // Adjust tension as needed
        delay: isFirst ? 0 : 100, // Add a delay for subsequent cards
      });

  useEffect(() => {
    if (!isFirst) {
      springAnimation.start();
    }
  }, [isFirst, springAnimation]);


return (
    <Animated.View style={[{
    position:'absolute',
    top: 20 + index * 10,
    zIndex: data.length - index, // Set higher zIndex for cards closer to the top
    flex: 1,
    alignSelf:'center',
     }, isFirst && {
          transform: [
            ...swipe.getTranslateTransform(),
            { rotate: rotate },
          ],
        },
     ]} {...rest}>
        <Image source={item.image}
        style={{
            width: 340,
            height: 640,
            borderRadius:20,
            }} />
            {isFirst && userSelection()}
    </Animated.View>
)
}

// const iconStyle = StyleSheet.create({
//     ico
// })