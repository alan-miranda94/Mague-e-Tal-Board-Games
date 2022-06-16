import React, { useEffect, useState, useRef } from 'react'
import { TouchableOpacity, StyleSheet, Text, Image, View, ImageBackground, Dimensions } from 'react-native'
import IMAGE, { BUTTONS } from '../constants/images'
import { MotiView, useAnimationState, MotiImage, AnimatePresence } from 'moti'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { Component } from 'react/cjs/react.production.min'
//import { GameContext } from '../../contexts'

const Height = Dimensions.get('window').height
const Width = Dimensions.get('window').width

export default class LevelButton extends Component {
   
    constructor() {
        super();
        this.state = {
            fruit: null,
            player: null,
            block: false
        };
    }

    handlePlay = (player, func)=>{
        if(this.state.block === true) return
        this.setState({
            fruit:this.props.fruit,
            player:this.props.player,
            block: true
        })
        setTimeout(()=>{
            func()
        },500)
        
    }
    

    componentDidMount(){
        console.log('atualizou')
        this.setState({
            fruit:this.props.fruit,
            player:this.props.player
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // If we have a snapshot value, we've just added new items.
        // Adjust scroll so these new items don't push the old ones out of view.
        // (snapshot here is the value returned from getSnapshotBeforeUpdate)
        console.log('atualizou')
        
      }
      
    render() {
        return (
            <TouchableWithoutFeedback
                key={Math.random()}
                onPress={() => this.handlePlay(this.props.player, this.props.onPress)}
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

                        {this.state.player === 0 &&
                            (<MotiImage
                                key={'one'}
                                style={{ width: '100%', height: '100%' }}
                                source={IMAGE.Block_Blue}
                            />)
                        }
                        {this.state.player === 1 &&
                            (<MotiImage
                                key={'two'}
                                style={{ width: '100%', height: '100%' }}
                                source={IMAGE.Block_Red}
                            />)
                        }
                        {this.state.player !== null &&
                            (<MotiImage
                                // from={{
                                //     scale: 0.3
                                // }}
                                // animate={{
                                //     scale: 1
                                // }}
                                // exit={{
                                //     scale: 0.3,
                                //     opacity: 0,
                                // }}

                                key={'fruit'}
                                style={{ position: 'absolute', width: '80%', height: '80%' }}
                                source={this.state.fruit}
                                resizeMode="cover"
                            />)
                        }
                    </AnimatePresence>

                </View>
            </TouchableWithoutFeedback >


        )
    }
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


