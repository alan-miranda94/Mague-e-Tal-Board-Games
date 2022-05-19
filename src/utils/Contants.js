
import IMAGE,{BTN_FRUITS, FRUIT, TTT_Characters} from "../constants/images"
import ANIMATIONS from '../constants/Animation'


export const LEVELS = [
  {
    level: 1,
    quantity: 3,
    star: [false, false, false],
    points: 0,
    starOne: 80,
    starTwo: 140,
    starThree: 220,
    open: true,
    cover:0
  },
  {
    level: 2,
    quantity: 4,
    star: [false, false, false],
    open: false,
    points: 0,
    starOne: 100,
    starTwo: 180,
    starThree: 300,
    cover:1
  },
  {
    level: 3,
    quantity: 5,
    star: [false, false, false],
    points: 0,
    starOne: 120,
    starTwo: 200,
    starThree: 320,
    open: false,
    cover:2
  },
  {
    level: 4,
    quantity: 5,
    star: [false, false, false],
    points: 0,
    open: false,
    points: 0,
    starOne: 140,
    starTwo: 220,
    starThree: 340,
    cover:3

  },
  {
    level: 5,
    quantity: 6,
    star: [false, false, false],
    points: 0,
    open: false,
    points: 0,
    starOne: 160,
    starTwo: 240,
    starThree: 360,
    cover:3,
  },
  {
    level: 6,
    quantity: 6,
    star: [false, false, false],
    points: 0,
    open: false,
    points: 0,
    starOne: 180,
    starTwo: 260,
    starThree: 400,
    cover:4,
  },
  {
    level: 7,
    quantity: 7,
    star: [false, false, false],
    points: 0,
    starOne: 220,
    starTwo: 320,
    starThree: 440,
    open: false,
    cover:4
  },

  {
    level: 8,
    quantity: 7,
    star: [false, false, false],
    points: 0,
    starOne: 240,
    starTwo: 320,
    starThree: 440,
    open: false,
    cover:5
  },
  {
    level: 9,
    quantity: 8,
    star: [false, false, false],
    points: 0,
    starOne: 260,
    starTwo: 360,
    starThree: 460,
    open: false,
    cover:6
  },
  {
    level: 10,
    quantity: 8,
    star: [false, false, false],
    open: false,
    points: 0,
    starOne: 300,
    starTwo: 380,
    starThree: 500,
    cover:7
  },
]

export const CHARACTERS = [
  {
    name:'Dom',
    card:TTT_Characters.Btn_Dom,
    player: null,
    selected:false
    //character: ANIMATIONS.Dom
  },
  {
    name:'Otto',
    card:TTT_Characters.Btn_Otto,
    player: null,
    selected:false
    //character: ANIMATIONS.Otto
  },
  {
    name:'Jo',
    card:TTT_Characters.Btn_Jo,
    player: null,
    selected:false
    //character: ANIMATIONS.Jo
  },
  {
    name:'Riso',
    card:TTT_Characters.Btn_Riso,
    player: null,
    selected:false
    //character: ANIMATIONS.Riso
  }
]

export const FRUITS = [
  {
    name:'PINEAPPLE',
    card:BTN_FRUITS.Btn_Pineapple,
    fruit:FRUIT.Pineapple,
  },
  {
    name:'ACEROLA',
    card:BTN_FRUITS.Btn_Acerola,
    fruit:FRUIT.Acerola
  },
  {
    name:'CASHEW',
    card:BTN_FRUITS.Btn_Cashew,
    fruit:FRUIT.Cashew
  },
  {
    name:'GUAVA',
    card:BTN_FRUITS.Btn_Guava,
    fruit:FRUIT.Guava
  },
  {
    name:'ORANGE',
    card:BTN_FRUITS.Btn_Orange,
    fruit:FRUIT.Orange
  },
  {
    name:'MANGO',
    card:BTN_FRUITS.Btn_Mango,
    fruit:FRUIT.Mango
  },
]