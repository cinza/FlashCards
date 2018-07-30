import React,  {Component} from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform, Animated } from 'react-native'
import { connect } from 'react-redux'
import SwipeCards from 'react-native-swipe-cards'
import { teal, white, lightBlue, crimson, steelblue } from '../utils/colors'
import {clearNotification, setNotification} from '../utils/helpers'

class Card extends Component {
  constructor(props){
    super(props)
    this.state = {fadeAnim: new Animated.Value(0), showAnswer:false,text:'Show Answer!'}

  }

  showAnswer = () => {
    const {showAnswer} = this.state

    if(!showAnswer){
      Animated.timing(
        this.state.fadeAnim,
        {
          toValue: 1,
          duration: 1000,
        }
      ).start();
      this.setState({showAnswer:true, text:'Hide Answer!'})

    }else{
      Animated.timing(
        this.state.fadeAnim,
        {
          toValue: 0,
          duration: 500,
        }
      ).start();
      this.setState({showAnswer:false, text:'Show Answer!'})

    }
  }
  render(){
    let { fadeAnim, text } = this.state;
    return(
      <View key={this.props.question} style={styles.card} >
        <Text style={styles.textTitle}>Question:</Text>
        <Text style={styles.text}>{this.props.question}</Text>
        <Animated.View
          style={{
            ...this.props.style,
            opacity:fadeAnim
          }}>
          <Text  style={styles.textAnswer} >{this.props.answer}</Text>
        </Animated.View>

        <TouchableOpacity
          style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
          onPress={this.showAnswer}>
          <Text style={styles.submitBtnText}>{text}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

class Result extends Component {
  state = {
    percent:0
  }

  gotToHome = () => {
    const {navigation} = this.props
    navigation.navigate("Home")
  }
  componentDidMount(){
    const {correct, total} = this.props
    let percent =  (correct/total)*100
    percent = Math.round(percent)
    this.setState({percent})

    clearNotification()
      .then(setNotification)
  }
  render(){
    const {percent} = this.state
    const {correct, total} = this.props
    return(
      <View style={[styles.card, styles.center]} >
        <Text style={[styles.textTitle,{paddingTop:50}]}>You answer:</Text>
        <Text style={styles.totalText}>{percent}% Correct</Text>
        <Text style={styles.smallText}>{correct}/{total}</Text>

        <TouchableOpacity
          style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
          onPress={this.gotToHome}>
          <Text style={styles.submitBtnText}>Go Home!</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

class Quiz extends Component {

  state = {
    showAnswer:false,
    counter:1,
    correctAnswerCount:0,

  }

  handleCorrect = () =>  {
    const {counter} = this.state
    const {total} = this.props
    this.addCount(counter, total)
    this.addAnswer()
  }
  handleIncorrect = () => {
    const {counter} = this.state
    const {total} = this.props
    this.addCount(counter, total)
  }
  addAnswer = () => {
    this.setState((prevState, props) => {
      return {correctAnswerCount: prevState.correctAnswerCount + 1}
    })
  }

  addCount = (counter, total) => {
    if(counter < total){
      this.setState((prevState, props) => {
        return {counter: prevState.counter + 1}
      })
    }
  }


  render(){
    const {counter, correctAnswerCount} = this.state
    const {title, total} = this.props
    let quizReady = false
    if(total !== 0){
      quizReady=true
    }
    return(
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}} >
        {quizReady ? (
          <View style={{flex:1, justifyContent:'center', alignItems:'center'}} >
            <Text style={styles.smallText}> Showing {counter}/{this.props.total}</Text>
            <SwipeCards
            cards={this.props.cards}
            loop={false}
            renderCard={(cardData) => <Card {...cardData} />}
            renderNoMoreCards={() => <Result correct={correctAnswerCount} total={total} navigation={this.props.navigation} />}
            showYup={true}
            showNope={true}
            yupText='Correct'
            nopeText='Incorrect'
            style={{flex:1}}
            handleYup={this.handleCorrect}
            handleNope={this.handleIncorrect}
          />
          <Text style={{fontWeight:'bold', paddingTop:20,paddingBottom:20 }}>Please swipe your friend's answer!</Text>
        </View>
        ):(
          <View style={{flex:1, justifyContent:'center', alignItems:'center'}} >
            <Text>Can't start a quiz without cards</Text>
          </View>
        )}

      </View>

    )
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 20,
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    },
    width: 300,
    height: 500,
  },
  text: {
    marginTop:10,
    fontSize: 16,
  },
  textTitle:{
    marginTop:10,
    fontSize: 16,
    fontWeight:'bold',

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
  textAnswer : {
    marginTop:10,
    fontSize: 16,
    color:steelblue,
    marginBottom:15,
  },
  center:{
    alignItems:'center'
  },
  smallText:{
    padding:10,
    fontSize:14,
    color:teal
  },
  totalText:{
    fontSize:25,
    fontWeight:'bold',
    color:crimson
  }
})

function mapStateToProps (state,  { navigation }) {
  const { cards, title } = navigation.state.params.deckSelected
  return {
    title:title,
    cards:cards,
    total: cards.length
  }
}



export default connect(
  mapStateToProps
)(Quiz)
