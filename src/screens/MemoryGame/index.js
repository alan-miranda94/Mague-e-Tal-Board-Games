import React, { useEffect, useState,useContext } from 'react';
import { StyleSheet, Text, View, Dimensions, ImageBackground, Image } from 'react-native';
import { FlatList, TouchableWithoutFeedback } from 'react-native-gesture-handler';
//import { COLORS } from '../utils/StyleConstants';
import { shuffle } from '../../utils/Utils';
import { GameContext } from '../../contexts'
import Card from '../../components/Card'
import IMAGE, {DECK} from '../../constants/images'
import {LEVELS} from '../../utils/Contants'
import Button from '../../components/Button';
import Pausado from './Pausado'
import GameEnd from './GameEnd'
//import { useNavigation } from '@react-navigation/core'
import AudioManager from '../../constants/AudioManager'


const Height = Dimensions.get('window').height
const Width = Dimensions.get('window').width


function GameScreen({ route }) {
  const {state:{memoryGame}, dispatch} = useContext(GameContext)
  const { level } = route.params
  const [showModal, setShowModal] = useState(false)
  const [showWin, setShowWin] = useState(false)
  const coupleCardsNumber = memoryGame.level[level-1].quantity
  const [cardRow, setCardRow] = useState([])
  const [selecteds, setSelecteds] = useState([])
  const [combinedCards, setCombinedCards] = useState([])
  const [par, setPar] = useState([])
  const [initTime, setInitTime] = useState(undefined)

 // const navigation = useNavigation();
  //sounds 
  useEffect(()=>{
    //bgMusic()

  },[])
  
 const hitSound = async () => await AudioManager.playAsync(AudioManager.sounds.effects.hit)
 const winSound = async () => {
  // await AudioManager.pauseAsync(AudioManager.sounds.gameplayMemory)
   await AudioManager.playAsync(AudioManager.sounds.effects.win)
  }
 const ErrorSound = async () =>   await AudioManager.playAsync(AudioManager.sounds.effects.error)
 const bgMusic = async () => await AudioManager.playAsync(AudioManager.sounds.gameplayMemory)

 //pega a quantidade de cartas e embaralha elas
  useEffect(() => {
   // navigation.setOptions({ title: `Nível ${level.level}` })
  
    let cardList = [];
    let id = 0;
    for (let i = 0; i < coupleCardsNumber; i++) {
      let randomCard = Math.floor(Math.random() * 11)
      const obj = () => {
        return { 
          id: id, 
          type: i + 1, 
          selected:false,
          img:randomCard,
          visible:true,
          fist:true
        
        };
      };
      cardList.push(obj());
      id++;
      cardList.push(obj());
      id++;
    }

    cardList = shuffle(cardList)
    const rowList = []

    for (let i = 0; i < cardList.length; i = i + coupleCardsNumber) {
      rowList.push(cardList.slice(i, i + coupleCardsNumber))
    }
    setCardRow(rowList)

    //desvira a carta que mostrava viranda no commeço
    setTimeout(() => {
      const fistCardList = rowList.map((list)=>{
        return list.map((card )=>{
          return {...card, fist:false}
        })
      })

      setCardRow(fistCardList)
    }, 1 * 1000)

  }, [])

  const add_points= (points) => {
    dispatch({
      type:'ADD_REMOVE_POINTS',
      payload:{
        type:'ADD',
        points:points,
        level:level
      }
    })
  }
  const remove_points= (points) => {
    dispatch({
      type:'ADD_REMOVE_POINTS',
      payload:{
        type:'REMOVE',
        points:points,
        level:level
      }
    })
  }
  
  //VERIFICA SE DEU PARES IGUAIS 
  useEffect(() => {
    if (selecteds.length == 2) {
      setTimeout(() => {        
        if (selecteds[0].type === selecteds[1].type) {         
          let newPar = [selecteds[0], selecteds[1]]       
          setPar([...par, ...newPar])
          setCombinedCards([...combinedCards, selecteds[0].type])
          removeCards(selecteds[0])
        }else{
          ErrorSound()
          remove_points(20)
        }
        


        setSelecteds([]);
      },1 * 1000);
    }
  }, [selecteds])

  /// verifica se finalizou o jogo e atribui as estrelas
  useEffect(()=>{
    if(combinedCards.length == coupleCardsNumber){
      dispatch({
        type:'SET_STARS',
        payload:{          
          level:level
        }
      })
      dispatch({
        type:'SAVE',
      })
      setShowWin(true)
      winSound()
      
    }
  },[combinedCards])

  function  removeCards (card){
    const newCardRow = cardRow.map((cards, index)=>{
      return cards.map((c)=> {
       if((card.type === c.type)){
         hitSound()
          return {...c, visible:false}
       }
      
       return c
      })
    })
    add_points(80)
    setCardRow(newCardRow)
  }

  function onPressCard(card) {
    if (
      selecteds.length < 2 &&
      !Boolean(selecteds.find((el) => el.id == card.id)) &&
      !Boolean(combinedCards.find((el) => el == card.type))
    ) {

      setSelecteds([...selecteds, card]);
    }

    if (initTime == null) {
      setInitTime(new Date());
    }
  }

  function calculateTime() {
    function format(milliseconds) {
      var ret = '';
      let secs = milliseconds / 1000;
      const mins = secs / 60;

      if (mins >= 1) {
        ret += mins.toFixed(0) + ' minuto(s) e ';
        secs = secs - 60 * parseInt(mins.toFixed(0));
      }
      ret += secs.toFixed(0) + ' segundos e ';

      ret +=
        parseFloat(secs.toString().split('.')[1]).toFixed(0) + ' milésimos';

      return ret;
    }

    return format(Math.abs(new Date().getTime() - initTime.getTime()));
  }

  return (
    <View style={styles.container}>
      { 
      <ImageBackground 
        style={styles.background}
        //imageStyle={{opacity:0.4}}
        source={IMAGE.Board}
        resizeMode="stretch"
      /> 
      }
        
        <View style={styles.cardsContainer}>
          {/*LISTA QUE COMTEM AS LINHAS DE CARTAS*/}          
          {cardRow.map((cardListRow, index) => (
            <View style={styles.cardRow} key={`cardrow_${index}`}>
              {/*LISTA QUE COMTEM UMA LINHA DE CARTAS*/}
              {cardListRow.map((card, index) => (
                <TouchableWithoutFeedback
                //style={[styles.cardContainer, ]}
                  style={{ 
                    height: 110,
                    width: 70, 
                    minHeight:110,
                    marginLeft:8, 
                    //backgroundColor:'pink'
                  }}
                  key={`card_${index}`}
                  onPressIn={async ()=>{
                    await AudioManager.playAsync(AudioManager.sounds.effects.flip)
                  }}
                  onPress={() => onPressCard(card)}
                >
                  <Card
                    friction={6}
                    fist={card.fist}
                    img={card.type}
                    cover ={memoryGame.level[level-1].cover}
                    perspective={1000}
                    flipHorizontal={true}
                    flipVertical={false}
                    visible={card.visible}
                    flip={Boolean(
                      selecteds.find((el) => el.id == card.id)
                    )}
                    clickable={false}
                    //style={[styles.cardContainer,]}
                  >
                  </Card>
                </TouchableWithoutFeedback>
              ))}
            </View>
            
          ))}
        </View>
        <View style={styles.pares}>
          <FlatList
            data={par}
            horizontal={true}
            keyExtractor={(k)=>k.id}
            renderItem={({ item, index }) => (
              <View style={[styles.cardImage,{marginLeft:index===0?2:-40}]}>
                <Image
                  style={{flex:1}}
                  source={DECK[item.type]}
                  resizeMode="contain"
                />
              </View>
            )}
          />
        </View>            
      <Button 
        style={styles.pauseBt} 
        onPressIn={async()=> await AudioManager.playAsync(AudioManager.sounds.effects.back)}
        onPress={()=> setShowModal(true)} 
        type='Btn_Pause'
      />
      <Pausado
       level={level}
       show={showModal}
       setShow={setShowModal}
      />
      <GameEnd
       level={level}
       show={showWin}
       setShow={setShowWin}
       star= {memoryGame.level[level-1].star}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center',
    paddingBottom:8,
    height:'80%',
  },
  cardsContainer: {
    flex:1,
   // margin:16,
    height:'80%',
    marginBottom:0,
    width: '85%',
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor:'#8C2300',
    //borderWidth:4, 
  },

  cardRow: {
    flexDirection: 'row',
    marginBottom:8,
  },

  pauseBt:{
    position: 'absolute', 
    right: '2%', 
    top: "2%", 
    height:'15%',

  },

  cardContainer: {
    //margin: 10,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
 
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    margin: 5,
    padding: 10,
  },

  background:{
    position: 'absolute', 
    left: 15, 
    top: 10, 
    height: Height - 20, 
    width: Width - 30,
    justifyContent:'center',
    //backgroundColor: COLORS.secondary,
    alignItems: 'center',
  },

  pares:{
    height:'20%', 
    width: '85%',
    justifyContent:"center",
    alignItems:"center",
    //backgroundColor:'#8C2300',
    //borderWidth:4,
    padding:8,
    borderTopWidth:2,
    top: -30
  },
  cardImage: {    
    //height: "100%",
    //width:40, 
    //backgroundColor:'rgba(0,0,0,.5)'
    
  },
});

export default GameScreen;

 {/* <ImageBackground 
        style={styles.background}
        imageStyle={{opacity:0.4}}
        source={IMAGE.BackGround}
        resizeMode="stretch"
      /> */}
 // background:{
  //   position: 'absolute', 
  //   left: 0, 
  //   top: 0, 
  //   height: Height, 
  //   width: Width,
  //   //backgroundColor: COLORS.secondary,
  //   alignItems: 'center',
  // },
//let randomCard = DECK[Math.floor(Math.random() * arr.length)]