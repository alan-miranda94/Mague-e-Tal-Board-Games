import React, { useEffect, useRef, useState, useContext } from 'react'
import {
    StyleSheet,
    Text,
    FlatList,
    View,
    TouchableOpacity,
    Dimensions,
    Image,
    ImageBackground,
    Animated
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { GameContext } from '../../contexts'
import { PrivateValueStore, useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import AudioManager from '../../constants/AudioManager'
import { MotiView, useAnimationState, MotiImage, } from 'moti'
import { CHARACTERS, FRUITS } from '../../utils/Contants'
import IMAGE, { BTN_FRUITS, DECK, TTT_Characters } from '../../constants/images'
import Button from '../../components/Button'
import Sprit from '../../components/Lottie'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

const Height = Dimensions.get('window').height
const Width = Dimensions.get('window').width

export default function App() {
    const { state: tictactoe, dispatch } = useContext(GameContext)
    const navigation = useNavigation()
    const [currentPlayer, setCurrentPlayer] = useState(0)
    const [playerOne, setPlayerOne] = useState(null)
    const [playerTwo, setPlayerTwo] = useState(null)
    const [fruitOne, setFruitOne] = useState(null)
    const [fruitTwo, setFruitTwo] = useState(null)
    const [selecteds, setSelecteds] = useState(false)
    const [showModal, setShowModal] = useState(false)

    const playGame = async () => {
        dispatch({
            type: 'START-TTT',
            payload: {
                row: 5,
                column: 5,
                players: [playerOne, playerTwo],
                fruits: [fruitOne, fruitTwo],
            }
        })
        navigation.navigate('TicTacToe')
        //navigation.reset({ index: 0, routes: [{ name: 'TicTacToe'}] })} 
    }

    const selectPlayer = (p) => {
        if (currentPlayer === 0) {
            setPlayerOne(p.name)
            return
        }
        setPlayerTwo(p.name)

    }

    const selectFruit = (f) => {
        if ((currentPlayer === 0) && playerOne) {
            setFruitOne(f.fruit)

            setCurrentPlayer(1)
            return
        }
        if (fruitOne) {
            setFruitTwo(f.fruit)
        }


    }
    useEffect(() => {
        if (fruitOne && fruitTwo && playerOne && playerTwo) {

            setSelecteds(true)

        }
        setShowModal()
    }, [fruitOne && fruitTwo && playerOne && playerTwo])

    const restartSelect = () => {
        setCurrentPlayer(0)
        setFruitOne(null)
        setFruitTwo(null)
        setPlayerOne(null)
        setPlayerTwo(null)
        setSelecteds(false)

    }

    return (
        <View style={styles.container}>
            <ImageBackground
                style={styles.background}
                //imageStyle={{opacity:0.4}}
                source={IMAGE.Bg_Game_End}
                resizeMode="stretch"
            />
            <View style={
                {
                    width: Width * 0.70,
                    alignItems: 'center',
                    justifyContent: "center",
                    opacity: fruitOne && fruitTwo && playerOne && playerTwo ? 0.3 : 1
                }
            }>
                <View style={{ flexDirection: 'row', justifyContent: "center", alignItems: 'center' }}>
                    {tictactoe.characters.map((item) => (
                        <MotiView key={Math.random()}
                        >
                            <TouchableWithoutFeedback
                                onPress={() => selectPlayer(item)}
                            >


                                <View
                                    disabled={fruitOne && fruitTwo && playerOne && playerTwo}

                                >
                                    {playerOne === item.name &&
                                        <Image
                                            resizeMode="contain"
                                            style={[{
                                                zIndex: 5,
                                                alignSelf: 'center',
                                                top: '40%',
                                                width: 80,
                                                aspectRatio: 1 / 1,
                                                position: 'absolute'
                                            }]}
                                            source={IMAGE.Marker_P1} />
                                    }
                                    {playerTwo === item.name &&
                                        <Image
                                            resizeMode="contain"
                                            style={[{
                                                zIndex: 5,
                                                alignSelf: 'center',
                                                top: '40%',
                                                width: 80,
                                                aspectRatio: 1 / 1,
                                                position: 'absolute',
                                            }]}
                                            source={IMAGE.Marker_P2} />
                                    }
                                    <Image
                                        resizeMode="contain"
                                        style={
                                            [
                                                {
                                                    height: (Height * 0.70),
                                                    width: (Width * 0.70) / 4,
                                                    opacity: playerOne === item.character || playerTwo === item.character ? 0.3 : 1
                                                }
                                            ]}
                                        source={item.card}
                                    />
                                </View>
                            </TouchableWithoutFeedback>
                        </MotiView>
                    ))
                    }
                </View>
                <View style={{ flexDirection: 'row' }}>
                    {FRUITS.map((item) => (
                        <MotiView key={Math.random()}
                        >
                            <TouchableOpacity
                                disabled={fruitOne && fruitTwo && playerOne && playerTwo}

                                onPress={() => selectFruit(item)}
                            >
                                {fruitOne === item.fruit &&
                                    <Image
                                        resizeMode="contain"
                                        style={[{
                                            zIndex: 5,
                                            alignSelf: 'center',
                                            //top: '40%', 
                                            aspectRatio: 1 / 1,
                                            position: 'absolute',
                                            width: Width * 0.05,
                                        }]}
                                        source={IMAGE.Marker_P1} />
                                }
                                {fruitTwo === item.fruit &&
                                    <Image
                                        resizeMode="contain"
                                        style={[{
                                            zIndex: 5,
                                            alignSelf: 'center',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            //top: 0, 
                                            width: Width * 0.05,
                                            position: 'absolute'
                                        }]}
                                        source={IMAGE.Marker_P2} />
                                }
                                <Image
                                    resizeMode="contain"
                                    style={
                                        [
                                            {
                                                //height: (Height * 0.30),
                                                width: (Width * 0.65) / 6,
                                                marginRight: 4, opacity: fruitOne === item.fruit || fruitTwo === item.fruit ? 0.3 : 1
                                            }]} source={item.card}
                                />
                            </TouchableOpacity>
                        </MotiView>
                    ))

                    }
                </View>
            </View>

            {!(fruitOne && fruitTwo && playerOne && playerTwo) &&
            <View style={styles.pauseBt}>
               
                <Button                    
                    // onPressIn={async()=> await AudioManager.playAsync(AudioManager.sounds.effects.back)}
                    onPress={() => navigation.goBack()}
                    type='Btn_Menu'
                />
                 <Button                    
                    // onPressIn={async()=> await AudioManager.playAsync(AudioManager.sounds.effects.back)}
                    onPress={restartSelect}
                    type='Btn_Restart'
                />
            </View>

            }
            {selecteds &&
                <View style={{ zIndex: 6, position: 'absolute', alignItems: 'center', }}>
                    <MotiView
                        from={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{ alignItems: 'center' }}>

                        <Button
                            style={{ height: Height / 4, aspectRatio: 1 / 1, }}
                            imageStyle={{ height: Height / 4, aspectRatio: 1 / 1, marginTop: -20 }}
                            // onPressIn={async()=> await AudioManager.playAsync(AudioManager.sounds.effects.back)}
                            onPress={playGame}
                            mode={'contain'}
                            type='Btn_Play'
                        />


                        <View 
                            style={{
                                flex:1,
                                height: Height / 8,
                                
                                flexDirection: 'row', 
                                alignItems:'center',
                                justifyContent: 'space-around', 
                            }}>
                            <Button
                               style={{ height:'90%', aspectRatio: 1 / 1, marginRight:10}}
                                // onPressIn={async()=> await AudioManager.playAsync(AudioManager.sounds.effects.back)}
                                onPress={restartSelect}
                                type='Btn_Restart'
                            />
                            <Button
                                style={{ height:'90%', aspectRatio: 1 / 1, }}
                                onPressIn={async () => await AudioManager.playAsync(AudioManager.sounds.effects.back)}
                                onPress={() => navigation.goBack()}
                                type='Btn_Menu'
                            />

                        </View>
                    </MotiView>



                    <MotiView
                        from={{ translateX: -Width, }}
                        animate={{ translateX: 0, }}
                        transition={{
                            type: 'spring',
                            translateX: {
                                duration: 1000,

                            },

                        }}
                        style={{ zIndex: 5, position: 'absolute', right: Width * 0.25, }}>
                        <Sprit //Lottie //PERSONAGENS
                            action={'IDLE'}
                            name={playerOne}
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
                            source={fruitOne}
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
                            source={IMAGE.P_Blue}
                        />
                    </MotiView>
                    <MotiView
                        from={{ translateX: Width, transform: [{ rotateY: "-180deg" }] }}
                        animate={{ translateX: 0, }}
                        transition={{
                            type: 'spring',
                            translateX: {
                                duration: 1000,
                                delay: 500
                            },

                        }}
                        style={{ zIndex: 5, position: 'absolute', left: Width * 0.25, }}>
                        <Sprit //Lottie //PERSONAGENS
                            action={'IDLE'}
                            name={playerTwo}
                            resizeMode={'cover'}
                            style={[{ height: Height / 2, aspectRatio: 1, transform: [{ rotateX: "180deg" }] }]}
                        />
                        <MotiImage
                            style={{ zIndex: 5, position: 'absolute', right: '0%', top: '10%', }}
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
                            source={fruitTwo}
                        />
                        <Image
                            style={{
                                zIndex: -4,
                                width: '90%',
                                height: '30%',
                                top: '-15%',

                            }}
                            resizeMode={'stretch'}
                            source={IMAGE.P_Red} />
                    </MotiView>

                </View>}

        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bgBlueRed: {
        position: 'absolute',
        height: Height,

    },
    boxPlay: {
        width: Height / 5 - 20,
        aspectRatio: 1 / 1,
        backgroundColor: 'yellow',
        margin: 2.5
    },
    background: {
        position: 'absolute',
        height: Height,
        width: Width,
        justifyContent: 'center',
        //backgroundColor: COLORS.secondary,
        alignItems: 'center',
    },
    pauseBt: {
        position: 'absolute',
        right: '2%',
        top: "2%",
        height: '15%',
        aspectRatio: 1 / 1

    },
    text: {
        position: 'absolute',
        fontSize: 32,
        color: 'white',
        fontFamily: 'RetroGaming',
    }

});
