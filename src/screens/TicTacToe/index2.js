import React, { useEffect, useState, useContext, useRef } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image, ImageBackground, Animated } from 'react-native'
import { GameContext } from '../../contexts'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import AudioManager from '../../constants/AudioManager'
import IMAGE, { FRUIT } from '../../constants/images'
//import Lottie from '../../components/Lottie'
import Lottie from 'lottie-react-native'
import Sprit from '../../components/Lottie'
import LightEffect from '../../assets/Animations/lightEffect.json'
import Dom from '../../assets/Animations/dom.json'
import ANIMATIONS from '../../constants/Animation'
import ShakeOne from '../../assets/Animations/shakeOne.json'
import ShakeTwo from '../../assets/Animations/shakeTwo.json'
import { MotiView, useAnimationState, MotiImage, AnimatePresence } from 'moti'
import Button from '../../components/Button'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import ButtonFruit from '../../components/ButtonFruit'

import { createBoard, checkRowMatch, checkMatch, copyBoard} from '../../utils/Utils'

const Height = Dimensions.get('window').height
const Width = Dimensions.get('window').width

//import { checkColumnMatch } from '../../utils/Utils'

export default function App() {
    const { state: { tictactoe }, dispatch } = useContext(GameContext)
    const navigation = useNavigation()
    const [board, setBoard] = useState(null)
    const [tempBoard, setTempBoard] = useState(null)
    const [currentPlayer, setCurrentPlayer] = useState(true)
    const [players, setPlayers] = useState([])
    const [fruits, setFruits] = useState([])
    const [actualPlayer, setActualPlayer] = useState(0)

    const resetGame = async () => {
        dispatch({
            type: 'START-TTT',
            payload: {
                row: 5,
                column: 5,
                players: [players[0], players[1]],
                fruits: [fruits[0], fruits[1]],
            }
        })

    }

    useEffect(() => {

        setPlayers(tictactoe.players)
        setFruits(tictactoe.fruits)

    }, [])


    useEffect(() => {
        setBoard(tictactoe.board)
    }, [board])



    const play = (row, column) => {
        let newBoard =[...board]
        newBoard[row][column] = actualPlayer
        console.log(newBoard)
        setBoard(newBoard)
        if(actualPlayer === 0) setActualPlayer(1)
        if(actualPlayer === 1) setActualPlayer(0)

        // dispatch({
        //     type: 'PLAY',
        //     payload: {
        //         row: row,
        //         column: column,
        //     }
        // })
        setCurrentPlayer(!currentPlayer)
        // dispatch({
        //     type: 'MATCH',
        //     payload: {
        //         row: row,
        //         column: column,
        //     }
        // })

    }
 

    return (
        <View style={styles.container}>
            <ImageBackground
                style={styles.background}
                //imageStyle={{opacity:0.4}}
                source={IMAGE.Bg_Game_Tab}
                resizeMode="stretch"
            />
            <MotiView
                from={{ translateX: -Width, }}
                animate={{ translateX: -Width / 2, }}
                transition={{
                    type: 'spring',
                    translateX: { duration: 1000, },
                }}
                style={{ zIndex: 5, position: 'absolute', right: Width * 0.25, alignItems: 'center', }}
            >
                <Lottie
                    source={ShakeOne}
                    loop={false}
                    progress={tictactoe.progressOne}
                    resizeMode={'cover'}
                    style={[{ height: Height / 3, aspectRatio: 1, }]}
                />
                <View>
                    <Sprit //Lottie //Play one
                        action={currentPlayer ? 'IDLE' : 'WAITING'}
                        name={tictactoe.players[0]}
                        resizeMode={'cover'}
                        style={[{ height: Height / 2, aspectRatio: 1, }]}
                    />
                    <Image
                        style={{ zIndex: 5, position: 'absolute', right: '0%', top: '10%' }}
                        source={fruits[0]}
                    />
                </View>
            </MotiView>
{board&&<>
            <View style={styles.rowBoard}>
                <ButtonFruit onPress={()=>play(0,0)} fruits={tictactoe.fruits} player={board[0][0]} />
                <ButtonFruit onPress={()=>play(0,1)} fruits={tictactoe.fruits} player={board[0][1]} />
                <ButtonFruit onPress={()=>play(0,2)} fruits={tictactoe.fruits} player={board[0][2]} />
                <ButtonFruit onPress={()=>play(0,3)} fruits={tictactoe.fruits} player={board[0][3]} />
                <ButtonFruit player={tictactoe.board[0][4]} />
            </View>
            <View style={styles.rowBoard}>
                <ButtonFruit player={tictactoe.board[1][0]} />
                <ButtonFruit player={tictactoe.board[1][1]} />
                <ButtonFruit player={tictactoe.board[1][2]} />
                <ButtonFruit player={tictactoe.board[1][3]} />
                <ButtonFruit player={tictactoe.board[1][4]} />
            </View>
            <View style={styles.rowBoard}>
                <ButtonFruit player={tictactoe.board[2][0]} />
                <ButtonFruit player={tictactoe.board[2][1]} />
                <ButtonFruit player={tictactoe.board[2][2]} />
                <ButtonFruit player={tictactoe.board[2][3]} />
                <ButtonFruit player={tictactoe.board[2][4]} />
            </View>
            <View style={styles.rowBoard}>
                <ButtonFruit player={tictactoe.board[3][0]} />
                <ButtonFruit player={tictactoe.board[3][1]} />
                <ButtonFruit player={tictactoe.board[3][2]} />
                <ButtonFruit player={tictactoe.board[3][3]} />
                <ButtonFruit player={tictactoe.board[3][4]} />
            </View>
            <View style={styles.rowBoard}>
                <ButtonFruit player={tictactoe.board[4][0]} />
                <ButtonFruit player={tictactoe.board[4][1]} />
                <ButtonFruit player={tictactoe.board[4][2]} />
                <ButtonFruit player={tictactoe.board[4][3]} />
                <ButtonFruit player={tictactoe.board[4][4]} />
            </View>
            </>

}


            <MotiView
                from={{ translateX: Width, transform: [{ rotateY: "-180deg" }] }}
                animate={{ translateX: Width / 3.5, }}
                transition={{
                    type: 'spring',
                    translateX: { duration: 1000, },
                }}
                style={{ zIndex: 5, position: 'absolute', right: Width * 0.25, alignItems: 'center', }}
            >
                <Lottie
                    source={ShakeTwo}
                    loop={false}
                    progress={tictactoe.progressTwo}
                    resizeMode={'cover'}
                    style={[{ height: Height / 3, aspectRatio: 1, }]}
                />
                <View>
                    <Sprit //Lottie //PERSONAGENS
                        action={currentPlayer ? 'WAITING' : 'IDLE'}
                        name={tictactoe.players[1]}
                        resizeMode={'cover'}
                        style={[{ height: Height / 2, aspectRatio: 1, }]}
                    />
                    <Image
                        style={{ zIndex: 5, position: 'absolute', right: '0%', top: '10%' }}
                        source={fruits[1]}
                    />
                </View>
            </MotiView>
            {(tictactoe.progressOne >= 1 || tictactoe.progressTwo >= 1) &&
                <View style={
                    {
                        zIndex: 6,
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        alignItems: 'center',
                        justifyContent: 'center',
                        //backgroundColor: 'red'
                    }}>
                    <ImageBackground
                        style={styles.background}
                        //imageStyle={{opacity:0.4}}
                        source={IMAGE.Bg_Game_End}
                        resizeMode="stretch"
                    />
                    <MotiView
                        from={{ translateX: -Width, }}
                        animate={{ translateX: 0, }}
                        transition={{
                            type: 'spring',
                            translateX: {
                                duration: 1000,
                            },
                        }}
                        style={{ zIndex: 5, position: 'absolute', }}
                    >
                        <Sprit //Lottie //PERSONAGENS
                            action={'CELEBRATION'}
                            name={tictactoe.progressOne >= 1 ? tictactoe.players[0] : tictactoe.players[1]}
                            resizeMode={'cover'}
                            style={[{ height: Height / 2, aspectRatio: 1, }]}
                        />
                        <MotiImage
                            style={{ zIndex: 5, position: 'absolute', right: '0%', top: '10%' }}
                            from={{ translateY: 0, rotateZ: '0deg' }}
                            animate={{ translateY: 5, rotateZ: '15deg' }}
                            transition={{
                                rotateZ: {
                                    loop: true,
                                },
                                translateY: {
                                    //type:'timing',
                                    loop: true,
                                    duration: 200,
                                    delay: 200,
                                }
                            }}
                            source={tictactoe.progressOne >= 1 ? fruits[0] : fruits[1]}
                        />
                        <Image
                            style={
                                {
                                    zIndex: -4,
                                    width: '90%',
                                    height: '30%',
                                    top: '-15%',

                                }}
                            resizeMode={'stretch'}
                            source={tictactoe.progressOne >= 1 ? IMAGE.P_Blue : IMAGE.P_Red}
                        />
                    </MotiView>

                    <View style={{ flexDirection: 'row', position: 'absolute', bottom: Height * 0.05, justifyContent: 'space-between', }}>
                        <Button
                            style={{ marginRight: 10 }}
                            // onPressIn={async()=> await AudioManager.playAsync(AudioManager.sounds.effects.back)}
                            onPress={resetGame}
                            type='Btn_Restart'
                        />
                        <Button
                            onPressIn={async () => await AudioManager.playAsync(AudioManager.sounds.effects.back)}
                            onPress={() => navigation.navigate('Home')}
                            type='Btn_Menu'
                        />
                    </View>
                </View>}
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',

    },
    boxPlay: {
        width: Height / 5 - 20,
        aspectRatio: 1 / 1,
        //backgroundColor: 'yellow',
        margin: 2.5
    },
    rowBoard: {
        flexDirection: 'row'
    },
    card: {
        width: '100%',
        height: '100%'
    },
    background: {
        position: 'absolute',
        height: Height,
        width: Width,
        justifyContent: 'center',
        //backgroundColor: COLORS.secondary,
        alignItems: 'center',
    },
    bgBlueRed: {
        position: 'absolute',
        height: Height,
        aspectRatio: 1
    },
    text: {
        position: 'absolute',
        fontSize: 32,
        color: 'white',
        fontFamily: 'RetroGaming',
    }
});
