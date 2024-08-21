import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { PropsWithChildren } from 'react'

//Only accepted props to make sure that name is only string
type IconProps = PropsWithChildren<
{
  name:string
}>
// creating a function that will return Icon based on flatList Props
const Icons = ({name}:IconProps)=>{
switch(name){
  case 'circle':
    return <Icon name = 'circle' size={38}
    color={'#F7CD2E'}/>
    break;
  case 'cross':
    return <Icon name = 'times' size={38}
    color={'#38CC77'}/>
    break;
  default:
    return null
    break;
}
}
export default Icons