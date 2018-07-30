import React,  {Component} from 'react'
import { View, TouchableOpacity, Text, StyleSheet, TextInput,Platform, Alert } from 'react-native'
import { connect } from 'react-redux'
import { teal, white, lightBlue, grey } from '../utils/colors'
import {addDeck} from '../actions'
import {saveDeckTitle} from '../utils/api'

function SubmitButton ({ onPress }) {
  return (
    <TouchableOpacity
      style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
      onPress={onPress}>
        <Text style={styles.submitBtnText}>Add Deck</Text>
    </TouchableOpacity>
  )
}
class NewDeck extends Component {
  state = {
    title:'',
    cards:[]
  }

  showAlert = (title, errMessage) => {
    Alert.alert(
      title,
      errMessage,
      [
        {text: 'OK', onPress: () => this.setState({title:''})},
      ],
      { cancelable: false }
    )
  }

  addDeck = () => {
    const {title, cards} = this.state
    const {dispatch} = this.props

    if(title.indexOf(' ') >= 0){
       return this.showAlert("Ups!", "Title card can't have spaces")

    }
    if(title === ''){
      return this.showAlert("Ups!", "Title can't be empty")

    }
    const deck = {
      [title]:{
        title:title,
        cards:cards
      }
    }

    saveDeckTitle(deck)
    .then(() => {
        dispatch(addDeck(deck))
    })
    .then(() => {
      this.setState({title:''})
      this.props.navigation.navigate('Home')
    })


  }




  render(){
    return(
      <View style={styles.item}>
        <Text style={styles.text}>Write the name of the new deck:</Text>
        <TextInput style={styles.input} value={this.state.title} onChangeText={(text) => this.setState({title:text})}></TextInput>
        <SubmitButton onPress={this.addDeck} />
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
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  iosSubmitBtn: {
    backgroundColor: lightBlue,
    padding: 5,
    borderRadius: 7,
    height: 30,
    marginLeft: 50,
    marginRight: 50,
  },
  AndroidSubmitBtn: {
    backgroundColor: lightBlue,
    padding: 5,
    paddingLeft: 30,
    paddingRight: 30,
    height: 30,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
    color: white,
    fontSize: 16,
    textAlign: 'center',
  },
  text: {
    fontSize: 14,
    paddingBottom:10,

  },
  input:{
    height: 25,
    borderColor: grey,
    borderWidth: 1,
    borderRadius: 3,
    marginBottom:20,
  }
})

function mapStateToProps (state) {
  return {
  }
}

export default connect(
  mapStateToProps,
)(NewDeck)
