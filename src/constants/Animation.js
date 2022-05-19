import DomSprit from '../assets/Animations/Dom_all.json'
import RisoSprit from '../assets/Animations/Riso_all.json'
import JoSprit from '../assets/Animations/Jo_all.json'
import OttoSprit from '../assets/Animations/Otto_all.json'

const Dom = {
    name:'Dom',
    source:DomSprit,
    'IDLE':[290,400],
    'CELEBRATION':[0,110],
    'WAITING_START':[120,250],
    'WAITING_END':[200,250]
}
const Riso = {
    name:'Riso',
    source:RisoSprit,
    'IDLE':[190,400],
    'CELEBRATION':[0,90],
    'WAITING_START':[90,180],
    'WAITING_END':[140,180],
}

const Jo = {
    name:'Jo',
    source:JoSprit,
    'IDLE':[230,400],
    'CELEBRATION':[0,150],
    'WAITING_START':[150,230],
    'WAITING_END':[180,220],
}

const Otto = {
    name:'Otto',
    source:OttoSprit,
    'IDLE':[320,400],
    'CELEBRATION':[0,160],
    'WAITING_START':[200,400],
    'WAITING_END':[240,300]
}

const Animations = {
    Dom,
    Riso,
    Jo,
    Otto
}

export default Animations