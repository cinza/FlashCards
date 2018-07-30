import React, { Component} from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform, FlatList } from 'react-native'
import { connect } from 'react-redux'
import {getAllDecks, saveDecks} from '../utils/api'
import {receiveDecks} from '../actions'
import { teal, white } from '../utils/colors'
import {initialState} from '../utils/helpers'
import { AppLoading} from 'expo'

class Home extends Component {
  state = {
    ready:false
  }

  componentDidMount(){
    const {dispatch} = this.props
    getAllDecks()
    .then(data => {
        if(data === null){
          saveDecks(initialState)
          .then(response =>  dispatch(receiveDecks(response)))
        }else{
          console.log("DATA to receive,", data)
          return dispatch(receiveDecks(data))
        }
    })
    .then(() => this.setState(() => ({ready: true})))

  }

  render() {
    const {decks} = this.props
    const deckIds = Object.keys(decks)
    const {ready} = this.state
    if(ready === false){
      return <AppLoading />
    }

    return (
      <View>
        {decks ? (
          <FlatList
            data={deckIds}
            showsVerticalScrollIndicator={true}
            renderItem={({item}) =>
            <View key={`${decks[item].title}`} style={styles.item}>
              <TouchableOpacity  key={`${decks[item].title}`}  onPress={() => this.props.navigation.navigate(
                'DeckDetail',
                {deck:decks[item]}
              )}>
                <Text style={styles.textTitle}>{ `${decks[item].title}`} </Text>
                <Text>Cards: {`${decks[item].cards.length}`}</Text>
              </TouchableOpacity>
            </View>}
            keyExtractor={(item, index) => {

                return item}
            } />
        ):(
          <Text>No decks to show</Text>
        )}

      </View>

    )
  }
}


const styles = StyleSheet.create({
  item: {
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    },
  },
  textTitle: {
    fontSize: 20,
    fontWeight:'bold',
    paddingBottom: 20
  }
})

function mapStateToProps (state) {
  return {
    decks: state.decks
  }
}

export default connect(
  mapStateToProps,
)(Home)
