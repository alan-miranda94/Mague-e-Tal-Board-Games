import React, { useEffect, useState, useContext, useRef } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image, ImageBackground, Animated } from 'react-native'
import { GameContext } from '../../contexts'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import AudioManager from '../../constants/AudioManager'
import IMAGE, { FRUIT } from '../../constants/images'
//import Lottie from '../../components/Lottie'
import Lottie from 'lottie-react-native'
import LightEffect from '../../assets/Animations/lightEffect.json'
import Dom from '../../assets/Animations/dom.json'
import ANIMATIONS from '../../constants/Animation'
import ShakeOne from '../../assets/Animations/shakeOne.json'
import ShakeTwo from '../../assets/Animations/shakeTwo.json'
const Height = Dimensions.get('window').height
const Width = Dimensions.get('window').width

//import { checkColumnMatch } from '../../utils/Utils'

export default function App() {
    const { state: { tictactoe }, dispatch } = useContext(GameContext)
    const navigation = useNavigation()
    const [board, setBoard] = useState(null)
    const [tempBoard, setTempBoard] = useState(null)
    const [currentPlayer, setCurrentPlayer] = useState(0)
    const [players, setPlayers] = useState([])
    const [fruits, setFruits] = useState([])
    const playOneAnimated = useRef(new Animated.Value(0)).current
    const playTwoAnimated = useRef(new Animated.Value(0)).current



    const moveToRightInX = (value) => {
        Animated.timing(playOneAnimated, {
            toValue: value,
            duration: 1000,
            useNativeDriver: true,
        }).start()
    }

    const rightValue = playOneAnimated.interpolate({
        inputRange: [0, 1],
        outputRange: [-(Width), - Width * 0.57]
    })

    const animStyleRigth = {
        transform: [
            {
                translateX: rightValue
            }
        ]
    }

    const moveToLeftInX = (value) => {
        Animated.timing(playTwoAnimated, {
            toValue: value,
            duration: 1000,
            useNativeDriver: true,
        }).start()
    }

    const leftValue = playTwoAnimated.interpolate({
        inputRange: [0, 1],
        outputRange: [(Width), Width * 0.48]
    })

    const animStyleLeft = {
        transform: [
            {
                translateX: leftValue
            }
        ]
    }


    useEffect(() => {
        console.log('==================================')
        console.log('TELA DO TABULEIRO ')
        console.log('==================================')
        setPlayers(tictactoe.players)
        setFruits(tictactoe.fruits)
        moveToLeftInX(1)
        moveToRightInX(1)
    }, [])


    useEffect(() => {

        setBoard(tictactoe.board)
    }, [tictactoe])

    useEffect(() => {
        console.log('ALTEROI ESSA BAGAÇA')

    }, [board])

    const createBoard = (row, column) => {
        let matriz = new Array(row)
        for (let i = 0; i < row; i++) {
            matriz[i] = new Array(column).fill(null)
        }
        setBoard(matriz)
        setTempBoard(matriz)
    }

    const play = (row, column) => {
        dispatch({
            type: 'PLAY',
            payload: {
                row: row,
                column: column,
            }
        })
        dispatch({
            type: 'MATCH',
            payload: {
                row: row,
                column: column,
            }
        })

    }


    const isMatch = (objOne, objTwo) => {
        if (objOne != null && objTwo != null) {
            if (objOne === objTwo) {
                return true
            }
            return false
        }
        return false
    }

    return (
        <View style={styles.container}>
            <ImageBackground
                style={styles.background}
                //imageStyle={{opacity:0.4}}
                source={IMAGE.Bg_Game_Tab}
                resizeMode="stretch"
            />
            {board && board.map((row, numberRow) => {
                return (
                    <View key={numberRow} style={styles.rowBoard}>
                        {
                            row.map((column, numberColumn) => {
                                return (
                                    <TouchableOpacity
                                        activeOpacity={.5}
                                        onPress={column ? null : () => play(numberRow, numberColumn)}
                                        key={numberColumn}
                                        style={styles.boxPlay}
                                    >
                                        <ImageBackground style={{ flex: 1 }} source={column === null?IMAGE.Block_White:column===0?IMAGE.Block_Blue:IMAGE.Block_Red}>
                                            {
                                                <Image
                                                    style={styles.card}
                                                    source={fruits[column]}
                                                    resizeMode="cover"
                                                />
                                            }
                                        </ImageBackground>

                                    </TouchableOpacity>)
                            })
                        }
                    </View>
                )
            })

            }
            <Animated.View style={[styles.bgBlueRed, animStyleRigth]} >
                {
                    <View style={{ zIndex: 5, position: 'absolute', left: Width * 0.35, top: 10, height: Height * 0.35 }}>
                        <Lottie //BLENDER
                            source={ShakeOne}
                            loop={false}
                            progress={0.5}
                            resizeMode={'cover'}
                            style={[{ width: '100%', height: "100%", }]} 
                        />
                        <Lottie //PERSONAGENS
                            source={ANIMATIONS[tictactoe.players[0]]}
                            autoPlay            
                            loop 
                            autoSize
                            //progress={0.5}
                            resizeMode={'cover'}
                            style={[{ height: Height / 2, aspectRatio: 1 }]} 
                        />
                        <Image resizeMode="contain" style={{ position: 'absolute', zIndex: 2, top: Height / 2, left: 0, width: (Height * 0.35) / 2 }} source={fruits[0]} />
                    </View>
                }

                <Image style={[styles.bgBlueRed,]} source={'IMAGE.Bg_Bar_Blue'} />
                <Text style={[styles.text, { left: 400, bottom: 10 }]}>P1</Text>
            </Animated.View>

            <Animated.View style={[styles.bgBlueRed, animStyleLeft]} >
                <View style={{ zIndex: 5, position: 'absolute', right: Width * 0.25, top: 10, height: Height * 0.35, transform: [{ rotateY: "-180deg" }] }}>
                    <Lottie
                        source={ShakeTwo}
                        loop={false}
                        progress={0.5}
                        resizeMode={'cover'}
                        style={[{ width: '100%', height: "100%", }]}
                    />
                    <Lottie //PERSONAGENS
                            source={ANIMATIONS[tictactoe.players[1]]}
                            loop={false}
                            progress={0.5}
                            resizeMode={'cover'}
                            style={[{ height: Height / 2, aspectRatio: 1 , }]} 
                        />
                     <Image resizeMode="contain" style={{  position: 'absolute', zIndex: 2, top: Height / 2, right: 0, width: (Height * 0.45) / 2 }} source={fruits[1]} />
                </View>
                {
                //<Image resizeMode="stretch" style={{ zIndex: 2, top: (150), right: 0, height: (Height / 2), aspectRatio: 1 }} source={players[1]} />
               

                }
                <Image style={[styles.bgBlueRed,]} source={'IMAGE.Bg_Bar_Red'} />
                <Text style={[styles.text, { right: 330, bottom: 10 }]}>P2</Text>
            </Animated.View>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'green',
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
