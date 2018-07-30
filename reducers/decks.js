import { RECEIVE_DECKS, ADD_DECK, ADD_CARD, } from '../actions'
import {initialState} from '../utils/helpers'

export default function decks(state = initialState, action){
  switch(action.type){

    case RECEIVE_DECKS :
      return {
        ...state,
        ...action.decks,
      }
    case ADD_DECK:
      return {
        ...state,
        ...action.deck
      }
    case ADD_CARD:
      const {deck, card} = action
      return{
        ...state,
        [deck]:{
          title:deck,
          cards:[...state[deck].cards, card]

        }
      }

    default:
      return state
  }
}
