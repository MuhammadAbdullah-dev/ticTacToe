import { FlatList, Pressable, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Snackbar from 'react-native-snackbar'
import Icons from './component/button'

export default function App() {
  // creating states
  //isCrossed state to check for turn
  const [isCrossed,setIsCrossed] = useState<Boolean>(true)
  //winner state to check if the game is over
  const [winner,setIsWinner] = useState<string>('')
  //gameState creating an array and we know that ticTacToe has 9 boxes
  //using the fill method to create empty array
  const [gameState,setGameState] = useState(new Array(9).fill('empty',0,9))

  //This method is used for reloading the game and we simply reset all states
  const reloadGame = ()=>{
    setIsCrossed(true)
    setIsWinner('')
    setGameState(new Array(9).fill('empty',0,9))
  }
  //This method is for checking the winner
  const checkWinner = ()=>{
    //There are different gameStates we are checking like in rows or columns or diagonals
    let nameOne = 'player One'
    if(
      gameState[0] === gameState[1] &&
      gameState[0] === gameState[2] &&
      gameState[0] !== 'empty'
    ) {
      setIsWinner(isCrossed ? `${nameOne} is the winner of the game`: 'Player Two is the winner of the game')
    }
    else if(
      gameState[3] === gameState[4] &&
      gameState[3] === gameState[5] &&
      gameState[3] !== 'empty'
    ) {
      setIsWinner(isCrossed ? `${nameOne} is the winner of the game`: 'Player Two is the winner of the game')
    }
    else if(
      gameState[0] === gameState[3] &&
      gameState[0] === gameState[6] &&
      gameState[0] !== 'empty'
    ) {
      setIsWinner(isCrossed ? `${nameOne} is the winner of the game`: 'Player Two is the winner of the game')
    }
    else if(
      gameState[6] === gameState[7] &&
      gameState[6] === gameState[8] &&
      gameState[6] !== 'empty'
    ) {
      setIsWinner(isCrossed ? `${nameOne} is the winner of the game`: 'Player Two is the winner of the game')
    }
    else if(
      gameState[1] === gameState[4] &&
      gameState[1] === gameState[7] &&
      gameState[1] !== 'empty'
    ) {
      setIsWinner(isCrossed ? `${nameOne} is the winner of the game`: 'Player Two is the winner of the game')
    }
    else if(
      gameState[2] === gameState[5] &&
      gameState[2] === gameState[8] &&
      gameState[2] !== 'empty'
    ) {
      setIsWinner(isCrossed ? `${nameOne} is the winner of the game`: 'Player Two is the winner of the game')
    }
    else if(
      gameState[0] === gameState[4] &&
      gameState[0] === gameState[8] &&
      gameState[0] !== 'empty'
    ) {
      setIsWinner(isCrossed ? `${nameOne} is the winner of the game`: 'Player Two is the winner of the game')
    }
    else if(
      gameState[2] === gameState[4] &&
      gameState[2] === gameState[6] &&
      gameState[2] !== 'empty'
    ) {
      setIsWinner(isCrossed ? `${nameOne} is the winner of the game`: 'Player Two is the winner of the game')
    }
    else if(!gameState.includes('empty',0)){
      setIsWinner('Game Draw')
    }
  }
  //this is onChange method whenever a box is changed and it will accept itemNumber as a input which is basically array index
  const onChange =(itemNumber:number)=>{
    //if the game is akready over then show this using snackbar
    if(winner){
      return Snackbar.show({
        text:'Game is Already over please start a new game',
        backgroundColor:'#000000',
        textColor:'#FFFFFF'
      })
    }
    //only changing if the box is empty
    if(gameState[itemNumber]==='empty'){
      gameState[itemNumber] = isCrossed ? 'cross':'circle'
      setIsCrossed(!isCrossed)
    }
    //if box is already filled
    else{
      return Snackbar.show({
        text:'position is already filled',
        backgroundColor:'#000',
        textColor:'#FFF'
      })
    }
    checkWinner()

  }
  return (
    <View>
      <StatusBar />
      {/* Checking if winner is True to change top text */}
    {winner ? (
      <View style={[styles.playerInfo,styles.winnerInfo]}>
        <Text style={styles.winnerTxt}>{winner}</Text>
      </View>
      ) 
      // Else condition
      : 
      (
      <View 
      style={[styles.playerInfo,
      isCrossed? styles.playerX: styles.playerO]}>
        {/* Checking for whose turn is this */}
        <Text style={styles.gameTurnTxt}>
          Player {isCrossed ? 'One' : 'Two'} 's turn
        </Text>
      </View>)}
      {/* Implemeting grid numColumns is three because tictactoe has 3 grids */}
        <FlatList 
        numColumns={3}
        data={gameState}
        style={styles.grid}
        renderItem={({item,index})=>(
          <Pressable
          key={index}
          onPress={()=> onChange(index)}
          style={[styles.card, 
          index == 2 || index == 5 || index == 8 ? styles.cardlast:null,
          index == 6 || index == 7 || index == 8 ? styles.cardBottom:null]}>
            <Icons name={item} />
          </Pressable>
        )}
        />
        <Pressable
        style={styles.gameBtn}
        onPress={reloadGame}>
          <Text style={styles.gameBtnText}>
             {winner ? 'Start New Game' : 'Reload Game'}
          </Text>
        </Pressable>
      </View>
  )
}

const styles = StyleSheet.create({
  playerInfo: {
    height: 56,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 4,
    paddingVertical: 8,
    marginVertical: 12,
    marginHorizontal: 14,

    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  gameTurnTxt: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  playerX: {
    backgroundColor: '#38CC77',
  },
  playerO: {
    backgroundColor: '#F7CD2E',
  },
  grid: {
    margin: 12,
  },
  card: {
    height: 100,
    width: '33.33%',

    alignItems: 'center',
    justifyContent: 'center',

    borderRightWidth:1,
    borderBottomWidth:1,
    borderColor: '#333',
  },
  cardlast: {
    borderRightWidth:0
  },
  cardBottom:{
    borderBottomWidth:0
  },
  winnerInfo: {
    borderRadius: 8,
    backgroundColor: '#38CC77',

    shadowOpacity: 0.1,
  },
  winnerTxt: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  gameBtn: {
    alignItems: 'center',

    padding: 10,
    borderRadius: 8,
    marginHorizontal: 36,
    backgroundColor: '#8D3DAF',
  },
  gameBtnText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '500',
  },
});
