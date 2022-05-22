import React, { useEffect } from 'react'
import { TouchableOpacity, StyleSheet, Text, Image, View, ImageBackground, Dimensions } from 'react-native'
import IMAGE, { BUTTONS } from '../constants/images'
import { MotiView, useAnimationState, MotiImage, AnimatePresence } from 'moti'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

const Height = Dimensions.get('window').height
const Width = Dimensions.get('window').width

const LevelButton = props => {
    return (

        <TouchableWithoutFeedback 
            key={Math.random()}
            onPress={props.onPress}
        >

            <View
                activeOpacity={0}           
                style={[styles.boxPlay, { alignItems: 'center', justifyContent: 'center' }]}
            >
                <AnimatePresence >
                    {
                        (<MotiImage
                            from={{ opacity: 1 }}
                            animate={{ opacity: 1 }}
                            delay={200}
                            exit={{
                                opacity: 0,
                            }}
                            key={'null'}
                            style={{ position: 'absolute', width: '100%', height: '100%' }}
                            source={IMAGE.Block_White}
                        />)
                    }

                    {props.player === 0 &&
                        (<MotiImage
                            key={'one'}
                            style={{ width: '100%', height: '100%' }}
                            source={IMAGE.Block_Blue}
                        />)
                    }
                    {props.player === 1 &&
                        (<MotiImage
                            key={'two'}
                            style={{ width: '100%', height: '100%' }}
                            source={IMAGE.Block_Red}
                        />)
                    }
                    {props.player !== null &&
                        (<MotiImage
                            from={{
                                scale: 0.3
                            }}
                            animate={{
                                scale: 1
                            }}
                            exit={{
                                scale: 0.3,
                                opacity: 0,
                            }}

                            key={'fruit'}
                            style={{ position: 'absolute', width: '80%', height: '80%' }}
                            source={props.fruits[props.player]}
                            resizeMode="cover"
                        />)
                    }
                </AnimatePresence>

            </View>
        </TouchableWithoutFeedback>
              

    )
};

const styles = StyleSheet.create({

    background: {
        flex: 1

    },
    boxPlay: {
        width: Height / 5 - 20,
        aspectRatio: 1 / 1,
        //backgroundColor: 'yellow',
        margin: 2.5
    },
});

export default LevelButton;
