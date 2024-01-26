import React, { Component } from 'react'
import { Text, View } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function Choice ({type, color}) {
return (
    <View style={{elevation:10 }}>
        <AntDesign name={type} color={color} size={70} />
    </View>
)
}
