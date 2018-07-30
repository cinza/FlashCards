import React,  {Component} from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native'
import { connect } from 'react-redux'
import { teal, white, lightBlue, crimson } from '../utils/colors'



class DeckDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    return{
      title: `${navigation.state.params.deck.title}'s deck`
    }
  }
    addCard = () => {
      const id = this.props.deckSelected['title']
      this.props.navigation.navigate('NewCard',{deckId:id})
    }
    goToQuiz = () => {
      const deck = this.props.deckSelected
      this.props.navigation.navigate("Quiz", {deckSelected:deck})
    }
    render(){
      const {deckSelected} = this.props
      return(
        <View  style={styles.item}>
          <Text style={styles.textTitle}>{deckSelected.title}</Text>
          <Text style={styles.text}>Questions: {deckSelected.cards.length}</Text>
          <TouchableOpacity
            style={Platform.OS === 'ios' ? [styles.iosBtn] : [styles.androidBtn]}
            onPress={this.addCard}>
              <Text style={styles.submitBtnText}>Add a question</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.iosBtn, styles.quizBtn]}
            onPress={this.goToQuiz}>
              <Text style={styles.submitBtnText}>Take a Quiz!</Text>
          </TouchableOpacity>
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
  iosBtn: {
    backgroundColor: lightBlue,
    padding: 5,
    borderRadius: 7,
    height: 30,
    marginLeft: 40,
    marginRight: 40,
    marginBottom:15,
  },
  androidBtn: {
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
  quizBtn:{
    backgroundColor:crimson
  },
  submitBtnText: {
    color: white,
    fontSize: 16,
    textAlign: 'center',
  },
  textTitle: {
    fontSize: 20,
    fontWeight:'bold',
    paddingBottom: 15
  },
  text:{
    paddingBottom:15,
    fontSize:14,
  }
})


function mapStateToProps (state, { navigation } ) {
  const { deck } = navigation.state.params

  return {
    deckSelected:deck
  }
}

export default connect(
  mapStateToProps,
)(DeckDetail)
