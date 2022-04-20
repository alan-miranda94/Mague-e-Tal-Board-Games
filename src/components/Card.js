import React, { useState, useEffect } from 'react'
import FlipCard from 'react-native-flip-card'
import IMAGE, { DECK , BACK} from '../constants/images'
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableWithoutFeedback,
    TouchableOpacity
} from 'react-native';


export default props => {
    const [flip, setFlip] = useState(false)
  

    return (
        <>{props.visible ?
            <View  style={styles.card}>
                <FlipCard                    
                    friction={6}                   
                    perspective={1000}
                    flipHorizontal={true}
                    flipVertical={false}
                    flip={props.fist?true:props.flip}
                    clickable={props.clickable}
                
                >
                    {/* Face Side */}
                    <Image
                        style={styles.card}
                        source={BACK[props.cover]}
                        resizeMode="stretch"
                    />
                    {/* Back Side */}
                    <Image
                        style={styles.card}
                        imageStyle={{ opacity: 0.4 }}
                        source={DECK[props.img]}
                        resizeMode="stretch"
                    />

                </FlipCard>
            </View>
            : <View style={props.style} />
        }
        </>

    )
}


const styles = StyleSheet.create({
    card: {

        flex: 1,
        width:'100%'
        //alignItems: 'center',
        //justifyContent: 'center',
    },
    face: {
        backgroundColor: 'red',
    },
    back: {
        backgroundColor: 'green'
    },
    cardContainer: {
        flex: 1,
        backgroundColor: "blue",
        margin: 4,
        height: '40%',
        //minHeight: 70,
        width: '30%',
        //minWidth:50,
        //display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

});
