import React from 'react';
import { StyleSheet, Text, View, StatusBar, Platform } from 'react-native';
import { Provider } from 'react-redux'
import storeConfig from './store'
import MainView from './components/MainView'
import {createBottomTabNavigator, createStackNavigator} from 'react-navigation'
import { Constants } from 'expo'
import { teal, white } from './utils/colors'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import Home from './components/Home'
import NewDeck from './components/NewDeck'
import Quiz from './components/Quiz'
import DeckDetail from './components/DeckDetail'
import NewCard from './components/NewCard'
import { setNotification } from './utils/helpers'

function StatusBarApp ({backgroundColor, ...props}) {
  return(
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

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


const MainNavigation = createStackNavigator({
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
  Quiz:{
    screen: Quiz,
    navigationOptions:{
      headerTintColor:white,
      headerStyle:{
        backgroundColor:teal
      }
    }
  },
  DeckDetail:{
    screen: DeckDetail,
    navigationOptions:{
      headerTintColor:white,
      headerStyle:{
        backgroundColor:teal
      }
    }
  },
  NewCard:{
    screen: NewCard,
    navigationOptions:{
      headerTintColor:white,
      headerStyle:{
        backgroundColor:teal
      }
    }
  }
})

export default class App extends React.Component {
  componentDidMount(){
    setNotification()
  }
  
  render() {
    return (
      <Provider store={storeConfig}>
        <View style={{flex:1}}>
        <StatusBarApp backgroundColor={teal} barStyle="light-content" />
        <MainNavigation/>
        </View>
      </Provider>

    )
  }
}
