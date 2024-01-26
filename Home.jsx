import React, { Component, useCallback, useEffect, useRef, useState  } from 'react'
import { Animated, Image, Text, View, PanResponder } from 'react-native'
import TinderCard from './TinderCard';

export default function Home () {
    const [data, setData] = useState([
        {image: require('./assets/img1.jpg'), id: 1, title: 'Hulk'},
        {image: require('./assets/img2.jpg'), id: 2, title: 'Ironman'},
        {image: require('./assets/img3.jpg'), id: 3, title: 'Thor'},
        {image: require('./assets/img4.jpg'), id: 4, title: 'Superman'},
        {image: require('./assets/img5.jpg'), id: 6, title: 'Batman'},
        {image: require('./assets/img6.jpg'), id: 7, title: 'Superwoman'},
      ]);
//for last image to reload in loop
useEffect(() => {
    if (!data.length) {
        setData([
            {image: require('./assets/img1.jpg'), id: 1, title: 'Hulk'},
            {image: require('./assets/img2.jpg'), id: 2, title: 'Ironman'},
            {image: require('./assets/img3.jpg'), id: 3, title: 'Thor'},
            {image: require('./assets/img4.jpg'), id: 5, title: 'Superman'},
            {image: require('./assets/img5.jpg'), id: 6, title: 'Batman'},
            {image: require('./assets/img6.jpg'), id: 7, title: 'Superwoman'},
          ])
    }
}, [data])
      const swipe = useRef( new Animated.ValueXY()).current
      const panResponser = PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (_, {dx, dy}) => {
          console.log('dx:' + dx + ' dy:' + dy);
          swipe.setValue({x: dx, y: dy});
        },

        onPanResponderRelease: (_, {dx, dy}) => {
            console.log('released:' + 'dx:' + dx + ' dy:' + dy);
            let direction = Math.sign(dx);
            let isActionActive = Math.abs(dx) > 150;
//removes the card
            if(isActionActive) {
                Animated.timing(swipe, {
                    toValue: {x: 500 * dx, y: dy},
                    useNativeDriver: true,
                    duration: 500,
                  }).start(removeCard);
            } else {
//brings the card to original position
                Animated.spring(swipe, {
                    toValue: {x: 0, y: 0},
                    useNativeDriver: true,
                    friction: 5,
                }).start()
            }
        },
    })
    const removeCard = useCallback(() => {
        setData(prepState => prepState.slice(1));
        swipe.setValue({x: 0, y: 0});
    }, [swipe])

return (
    <View styles={{flex:1}}>
{data.map((item, index, ) => {
  if (index < 3) {
    // Render only the first two cards
    let isFirst = index === 0;
    let dragHandler = isFirst ? panResponser.panHandlers : {};

    return (
      <TinderCard
        key={item.id.toString()}
        item={item}
        index={index}
        data={data}
        isFirst={isFirst}
        swipe={swipe}
        {...dragHandler}
      />
    );
  }
  return null; // Skip rendering for cards beyond the first two
}).reverse()}

    </View>
)
}




