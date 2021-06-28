import {makeAutoObservable} from 'mobx';
import bigPrime from '../../../bigprime';
import * as bigInt from 'big-integer'

export default class CryptoStore{
  prKey = '';
  publicKey = '';
  constructor(){
    makeAutoObservable(this);
    this.initKeys();
  }
  initKeys = () =>{
    this.generatePrivateKey();
    this.generatePublicKey();
  }
  generatePrivateKey = () =>{
    const rnd = (Math.random() * 1000 + 1);
    const rndInt = Math.floor(rnd);
    this.prKey = rndInt;
  }
  generatePublicKey = () =>{
    const _prKey = bigInt(this.prKey);
    const generator = bigInt(2);
    const prime = bigInt('0x' + bigPrime);
    const pubKey = generator.modPow(_prKey, prime);
    this.publicKey = pubKey;
  }
  getSharedSecret = (bobsPublicKey) =>{
    const prKey = bigInt(this.prKey);
    const bpk = bigInt(bobsPublicKey);
    const prime = bigInt('0x' + bigPrime);
    const secret = bpk.modPow(prKey, prime)
    return secret;
  }
}