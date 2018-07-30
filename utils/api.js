import { AsyncStorage } from 'react-native'
export const DECK_STORAGE_KEY = 'FlashCards:decks'

export function getAllDecks(){
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
  .then(response =>  JSON.parse(response))
}

export function getDeck(id){
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
  .then( response => JSON.parse(response))
  .then( data => data[id])
}

export function saveDeckTitle (deck){
  return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify(deck))
  .then(response => JSON.parse(response))
}

export function saveDecks (decks){
  return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify(decks))
  .then(response => JSON.parse(response))
}

export function addCardToDeck (id, card){
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
  .then (response => JSON.parse(response))
  .then(data => {
    data[id].cards.push(card)
    AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data))
  })
}
