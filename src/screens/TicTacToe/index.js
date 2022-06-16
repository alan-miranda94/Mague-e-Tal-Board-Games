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
import { createBoard, checkRowMatch, checkMatch, copyBoard } from '../../utils/Utils'

import ButtonFruit from '../../components/ButtonFruit'

const Height = Dimensions.get('window').height
const Width = Dimensions.get('window').width
//import { checkColumnMatch } from '../../utils/Utils'

export default function App() {
    const { state: tictactoe, dispatch } = useContext(GameContext)
    const navigation = useNavigation()
    const [board, setBoard] = useState(null)
    const [tempBoard, setTempBoard] = useState(null)
    const [currentPlayer, setCurrentPlayer] = useState(true)
    const [players, setPlayers] = useState([])
    const [fruits, setFruits] = useState([])

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
        setBoard(tictactoe.board)
    }, [])


    useEffect(() => {


    }, [tictactoe])

    useEffect(() => {
        //setBoard(tictactoe.board)
    }, [board])



    const play = (row, column) => {
        console.log('TTT INDEX')
        dispatch({
            type: 'PLAY',
            payload: {
                row: row,
                column: column,
            }
        })
        setCurrentPlayer(!currentPlayer)

        setTimeout(() => {
            dispatch({
                type: 'MATCH',
                payload: {
                    row: row,
                    column: column,
                }
            })
        }, 10)

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
                        action={tictactoe.currentPlayer ? 'WAITING':'IDLE'}
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
            {tictactoe.board && tictactoe.board.map((row, numberRow) => {
                return (
                    <View style={styles.rowBoard}>
                        {
                            row.map((column, numberColumn) => {
                                return (
                                    <ButtonFruit
                                        player={tictactoe.currentPlayer}
                                        //fruits = {fruits}
                                        fruit = {fruits[column]}
                                        onPress={column ? null : () => play(numberRow, numberColumn)}
                                    />
                                    // <TouchableWithoutFeedback key={Math.random()}
                                    //     onPress={column ? null : () => play(numberRow, numberColumn)}
                                    // >


                                    //     <View
                                    //         activeOpacity={0}
                                    //         key={Math.random()}
                                    //         style={[styles.boxPlay, { alignItems: 'center', justifyContent: 'center' }]}
                                    //     >
                                    //         <AnimatePresence >
                                    //             {
                                    //                 (<MotiImage
                                    //                     from={{ opacity: 1 }}
                                    //                     animate={{ opacity: 1 }}
                                    //                     delay={200}
                                    //                     exit={{
                                    //                         opacity: 0,
                                    //                     }}
                                    //                     key={'null'}
                                    //                     style={{ position: 'absolute', width: '100%', height: '100%' }}
                                    //                     source={IMAGE.Block_White}
                                    //                 />)
                                    //             }

                                    //             {column === 0 &&
                                    //                 (<MotiImage
                                    //                     key={'one'}
                                    //                     style={{ width: '100%', height: '100%' }}
                                    //                     source={IMAGE.Block_Blue}
                                    //                 />)
                                    //             }
                                    //             {column === 1 &&
                                    //                 (<MotiImage
                                    //                     key={'two'}
                                    //                     style={{ width: '100%', height: '100%' }}
                                    //                     source={IMAGE.Block_Red}
                                    //                 />)
                                    //             }
                                    //             {column !== null &&
                                    //                 (<MotiImage
                                    //                     // from={{
                                    //                     //     opacity: 0,
                                    //                     //     //scale: 0.3
                                    //                     // }}
                                    //                     // animate={{
                                    //                     //     //scale: 1,
                                    //                     //     opacity: 1,
                                    //                     // }}
                                    //                     // exit={{
                                    //                     //     scale: 0.3,
                                    //                     //     opacity: 0,
                                    //                     // }}

                                    //                     key={'fruit'}
                                    //                     style={{ position: 'absolute', width: '80%', height: '80%' }}
                                    //                     source={fruits[column]}
                                    //                     resizeMode="cover"
                                    //                 />)
                                    //             }
                                    //         </AnimatePresence>

                                    //     </View>
                                    // </TouchableWithoutFeedback>
                                    )
                            })
                        }
                    </View>
                )
            })

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
                        action={tictactoe.currentPlayer ?  'IDLE':'WAITING' }
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
                        <View style={{ flexDirection: 'row', }}>
                            <Lottie
                               // resizeMode={'contain'}
                                //autoSize
                                autoPlay
                                loop
                                source={LightEffect}
                                style={[{zIndex:-9, position: 'absolute', top:- Height*0.1, left:- Height*0.15, height: Height, }]}
                            />
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

                            <Lottie
                                source={tictactoe.progressOne >= 1 ? ShakeOne : ShakeTwo}
                                loop={false}
                                //autoPlay
                                progress={1}
                                resizeMode={'cover'}
                                style={[{ position: 'absolute', right: '-10%', height: Height / 4, }]}
                            />
                        </View>

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
                            style={{ height: Height * 0.1, aspectRatio: 1 / 1, }}
                            // onPressIn={async()=> await AudioManager.playAsync(AudioManager.sounds.effects.back)}
                            onPress={resetGame}
                            type='Btn_Restart'
                        />
                        <Button
                            style={{ height: Height * 0.1, aspectRatio: 1 / 1, }}
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
