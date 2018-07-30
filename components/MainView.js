import {React, Component} from 'react'
import { Platform, View } from 'react-native';
import {createBottomTabNavigator, createStackNavigator} from 'react-navigation'
import { connect } from 'react-redux'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import Home from './Home'
import NewDeck from './NewDeck'
import NewCard from './NewCard'
import Quiz from './Quiz'
import {teal,white} from '../utils/colors'

const Tabs = createBottomTabNavigator({
  Home:{
    screen: Home,
    navigationOptions:{
      tabBarLabel:'Home',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-home' size={30} color={tintColor} />
    }
  },
  NewDeck:{
    screen:NewDeck,
    navigationOptions:{
      tabBarLabel:'NewDeck',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-add-circle' size={30} color={tintColor} />
    }
  }
}, {
  navigationOptions:{
    header:null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? teal : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : teal,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})


const MainNavigator = createStackNavigator({
  Home: {
   screen: Tabs,
   navigationOptions: {
     header: null
   }
   },
   NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: teal,
      }
    }
  },
  NewCard: {
   screen: NewCard,
   navigationOptions: {
     headerTintColor: white,
     headerStyle: {
       backgroundColor: teal,
     }
   }
 },
 Quiz: {
  screen: Quiz,
  navigationOptions: {

    headerTintColor: white,
    headerStyle: {
      backgroundColor: teal,
    }
  }
}
})

export default function MainView (){
      return (
        <View>
          <MainNavigator />
        </View>
      )
}
