import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View, ImageBackground, Image, Dimensions, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { MotiView, useAnimationState, MotiImage } from 'moti'
import IMAGE, { MARCAS } from '../../constants/images'
import Svg, { TextSvg } from "react-native-svg"
import { TextStroke } from '../../components/TextStroke'
import Button from '../../components/Button'

const Height = Dimensions.get('window').height
const Width = Dimensions.get('window').width

const contactDevs = [
    {
        name: 'Alan Miranda',
        contact: 'Bydavid16@gmail.com',
        function: 'Programador, Artista'
    },
    {
        name: 'Ackça Priscila',
        contact: 'ackcapriscila1@gmail.com',
        function: 'Artista'
    },
    {
        name: 'Daniel Nipo',
        contact: 'danielnipo@gmail.com',
        function: 'Game Designer, Gerente de Projeto, Artista, Design de Som'
    },
    {
        name: 'Laelson Silva',
        contact: 'losf.tec98@gmail.com',
        function: 'Programador, Artista'
    },
]

const references = () => {
    const texts = ['Mid-Air Machine - Stingray', 'HoliznaCCO -Lost In the City', 'Mid-Air Machine - Innumerous Winds']
    const t = texts.map(item => <View style={{ flexDirection: 'row', alingItems: "center", justifyContent: "center", }}>
        <TextStroke stroke={1} color={'#000000'} >
            <Text
                numberOfLines={1}
                adjustsFontSizeToFit
                style={styles.text}>{item}</Text>
        </TextStroke>
    </View>
    )
    return t
}

export default function App() {

    const navigation = useNavigation()
    useEffect(() => {

    }, [])

    return (
        <View style={styles.container}>
            <ImageBackground
                style={styles.background}
                //imageStyle={{opacity:0.4}}
                source={IMAGE.Bg_About}
                resizeMode="stretch"
            />

            <View style={{ flex: 1, flexDirection: "row", alignItems: "center", }}>
                <View style={{ width: '20%', height: "100%", justifyContent: 'center', alignItems: 'center' }}>
                    <MotiImage
                        from={{ opacity: 0, translateY: 0 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        style={styles.image}
                        source={MARCAS.PEA}
                        resizeMode="contain"
                        delay={1000}
                        transition={{
                            type: 'timing',
                            duration: 5 * 1000,
                        }}
                    />
                    <MotiImage
                        from={{ opacity: 0, translateY: 0 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        style={styles.image}
                        resizeMode={'contain'}
                        source={MARCAS.Recife}
                        delay={1000}
                        transition={{
                            type: 'timing',
                            duration: 5 * 1000,
                        }}
                    />
                </View>
                <View style={{ flex: 1, width: '60%', height: "100%", padding: 20, justifyContent: "center", alignItems: "center" }}>
                    <MotiImage
                        from={{ opacity: 0, }}
                        animate={{ opacity: 1, }}
                        style={{ height: '90%', width: '90%' }}
                        source={IMAGE.TextOne_About}
                        resizeMode="stretch"
                        delay={1000}
                        transition={{
                            type: 'timing',
                            duration: 5 * 1000,
                        }}
                    />

                </View>
                <View style={{ width: '20%', height: "100%", justifyContent: 'center', alignItems: 'center' }}>
                    <MotiImage
                        from={{ opacity: 0, translateY: 0 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        style={styles.image}
                        source={MARCAS.LEG}
                        resizeMode="contain"
                        delay={1000}
                        transition={{
                            type: 'timing',
                            duration: 5 * 1000,
                        }}
                    />
                    <MotiImage
                        from={{ opacity: 0, translateY: 0 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        style={styles.image}
                        resizeMode={'contain'}
                        source={MARCAS.UFPE}
                        delay={1000}
                        transition={{
                            type: 'timing',
                            duration: 5 * 1000,
                        }}
                    />
                </View>

            </View>
            <View
                style={
                    {
                        flex: 1 / 3,
                        width: '100%',
                        height: "15%",
                        flexDirection: "row",
                       
                        padding: 10,
                        alignItems: "center",
                        justifyContent: 'center'
                    }
                }
            >
                <MotiImage
                    from={{ opacity: 0, }}
                    animate={{ opacity: 1, }}
                    style={{ left: 0, height: '90%', width: '80%' }}
                    source={IMAGE.TextTwo_About}
                    resizeMode="stretch"
                    delay={1000}
                    transition={{
                        type: 'timing',
                        duration: 5 * 1000,
                    }}
                />
                <MotiView
                 from={{ opacity: 0, }}
                 animate={{ opacity: 1, }}
                 style={{marginLeft: '2%',}}
                 delay={1000}
                 transition={{
                     type: 'timing',
                     duration: 5 * 1000,
                 }}
                >
                    <Button
                        style={{  height: Height * 0.20, aspectRatio: 1 / 1 }}

                        // onPressIn={async()=> await AudioManager.playAsync(AudioManager.sounds.effects.back)}
                        onPress={() => navigation.goBack()} 
                        type='Btn_Menu'
                    />
                </MotiView>

            </View>


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // flexDirection: 'row',
        // alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        //width: '50%',
        margin: 10,
        height: '20%',
        aspectRatio: 1 / 1,


    },
    text: {
        alignSelf: 'center',
        fontSize: 12,
        color: 'white',
        fontFamily: 'RetroGaming',

    },
    game: {
        flex: 1,
        backgroundColor: 'orange',
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: 20,
        margin: 10
    },
    background: {
        position: 'absolute',
        height: Height,
        width: Width,
        justifyContent: 'center',
        //backgroundColor: COLORS.secondary,
        alignItems: 'center',
    },
    iconBt: {
        // position:'absolute',
        width: '10%',
        aspectRatio: 1 / 1

    },
})
