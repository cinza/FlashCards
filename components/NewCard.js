import React,  {Component} from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform,TextInput, Alert } from 'react-native'
import { connect } from 'react-redux'
import { teal, white, lightBlue, crimson, grey } from '../utils/colors'
import {addCardToDeck} from '../utils/api'
import {addCard} from '../actions'

function SubmitButton ({ onPress }) {
  return (
    <TouchableOpacity
      style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
      onPress={onPress}>
        <Text style={styles.submitBtnText}>Add Deck</Text>
    </TouchableOpacity>
  )
}

class NewCard extends Component {
  state = {
    title:'',
    question:'',
    answer:''
  }
  componentDidMount(){
    if(this.props.navigation){
      this.setState({title:this.props.navigation.state.params['deckId']})
    }
  }
  showAlert = (title, errMessage) => {
    Alert.alert(
      title,
      errMessage,
      [
        {text: 'OK', onPress: () => this.setState({question:'',answer:''})},
      ],
      { cancelable: false }
    )
  }

  addQuestion = () => {
    const {title,question, answer} = this.state
    const {dispatch} = this.props

    if(question === '' && answer === '' ){
      return this.showAlert("Ups!", "Question field and answer can't be empty")

    }
    const card ={
      'question': question,
      'answer': answer
    }

    addCardToDeck(title , card)
    .then(() => {
      dispatch(addCard(title ,card))
    })
    .then(() => {
      this.props.navigation.navigate('DeckDetail',{deck:this.props.deckSelected})
    })


  }
  render(){
    return(
      <View style={styles.item}>
        <Text style={styles.text}>Write your question:</Text>
        <TextInput style={styles.input} value={this.state.question} onChangeText={(text) => this.setState({question:text})}></TextInput>
        <Text style={styles.text}>Write the answer:</Text>
        <TextInput style={styles.input} value={this.state.answer} onChangeText={(text) => this.setState({answer:text})}></TextInput>
        <SubmitButton onPress={this.addQuestion} />
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
    paddingBottom: 10,

  },
  input:{
    height: 25,
    borderColor: grey,
    borderWidth: 1,
    borderRadius: 3,
    marginBottom:20,
  }
})

function mapStateToProps (state, { navigation }) {
  const { deckId } = navigation.state.params
  return {
    deckSelected:state.decks[deckId]
  }
}

export default connect(
  mapStateToProps
)(NewCard)
