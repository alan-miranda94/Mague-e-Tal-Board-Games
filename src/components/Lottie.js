import React, { useRef, useEffect } from 'react'
import { SafeAreaView } from 'react-native'
import Lottie from 'lottie-react-native'
import Animation from '../constants/Animation'



export default props => {
    const lottieRef = useRef()

    useEffect(() => {
        if (props.action === 'WAITING') {
            lottieRef
                .current
                .play(
                    Animation[props.name]['WAITING_START'][0],
                    Animation[props.name]['WAITING_START'][1]
                )
            setTimeout(()=>{
                lottieRef
                .current
                .play(
                    Animation[props.name]['WAITING_END'][0],
                    Animation[props.name]['WAITING_END'][1]
                )
            },2000)
            
        } else {
            lottieRef
                .current
                .play(
                    Animation[props.name][props.action][0],
                    Animation[props.name][props.action][1]
                )
        }

    }, [props.action])

    return (
        <Lottie
            ref={lottieRef}
            resizeMode={props.resizeMode ? props.resizeMode : 'contain'}
            autoSize
            source={Animation[props.name].source}
            autoPlay
            loop
            style={props.style}//{[{ width: '100%',height: "100%",}]}
        />
    )
}