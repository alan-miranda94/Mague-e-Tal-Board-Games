import { Audio } from "expo-av"
import AudioFiles from "./Audio"
import { Platform } from "react-native"

// Web just can't seem to handle audio
const MUTED = Platform.OS === "web"

class AudioManager {
  sounds = AudioFiles

  audioFileMoveIndex = 0

  _soundCache = {}

  getIdleSoundAsync = async (resourceId) => {
    if (this._soundCache[resourceId]) {
      for (const sound of this._soundCache[resourceId]) {
        const status = await sound.getStatusAsync()
        if (!status.isPlaying) {         
          return sound
        }
      }
    }
    return null
  }

  getPlayingSoundAsync = async (resourceId) => {
    if (this._soundCache[resourceId]) {
      for (const sound of this._soundCache[resourceId]) {
        const status = await sound.getStatusAsync()
        if (status.isPlaying) {         
          return sound
        }
      }
    }
    return null
  }
  createIdleSoundAsync = async (resourceId) => {
    if (!this._soundCache[resourceId]) {
      this._soundCache[resourceId] = []
    }
    const tag = "loaded-sound-" + resourceId
   // console.time(tag)
    const { sound } = await Audio.Sound.createAsync(resourceId)
   // console.timeEnd(tag)
    this._soundCache[resourceId].push(sound)
    return sound
  }

  playAsync = async (soundObject, isLooping, startOver = true) => {
    if (MUTED) return
    // if (store.getState().muted) {
    //   return
    // }
    let sound = await this.getIdleSoundAsync(soundObject)
    if (!sound) {
      sound = await this.createIdleSoundAsync(soundObject)      
    } else {      
      await sound.setPositionAsync(0)
    }
    if(isLooping){
      await sound.setIsLoopingAsync(true)
    }
    await sound.setVolumeAsync(0.3)
    return  await sound.playAsync()

  }

  stopAsync = async (name) => {
    if (name in this._soundCache) {
      const soundObject = await  this.getPlayingSoundAsync(name)
     // await soundObject.setPositionAsync(0)
      //let status = await soundObject.getStatusAsync()
      
      try {
        await soundObject.stopAsync()
      } catch (error) {
        console.warn("Error stopping audio", { error })
      }
    } else {
      console.warn("Audio doesn't exist", name)
    }
  }
  
  volumeAsync = async (name, volume) => {
    if (name in this.sounds) {
      const soundObject = this.sounds[name]
      
      try {
         
          await soundObject.setVolumeAsync(volume)
        
      } catch (error) {
        console.warn("Error setting volume of audio", { error })
      }
    } else {
      console.warn("Audio doesn't exist", name)
    }
  }

  pauseAsync = async (name) => {
    if (name in this._soundCache) {//name in this.sounds
       
      const soundObject = await  this.getPlayingSoundAsync(name)
     // await soundObject.setPositionAsync(0)
     // let status = await soundObject.getStatusAsync()
      try {
        await soundObject.pauseAsync()
      } catch (error) {
        console.warn("Error pausing audio", { error })
      }
    } else {
      console.warn("Audio doesn't exist", name)
    }
  }

  get assets() {
    return AudioFiles
  }

  setupAsync = async () => {
    // noop -- maybe preload some common sounds upfront
    return true
  }
}

export default new AudioManager()