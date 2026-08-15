import * as Crypto from 'expo-crypto';
import * as SecureStore from 'expo-secure-store';
import { ReactNode, useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const PIN_KEY='zikri.device_pin.v1';
type Mode='loading'|'create'|'confirm'|'unlock'|'open';

async function digest(pin:string,salt:string){
 return Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256,`${salt}:${pin}`);
}

export function PinGate({children}:{children:ReactNode}){
 const [mode,setMode]=useState<Mode>('loading');
 const [pin,setPin]=useState('');
 const [firstPin,setFirstPin]=useState('');
 const [message,setMessage]=useState('');
 const [attempts,setAttempts]=useState(0);
 const [lockedUntil,setLockedUntil]=useState(0);

 useEffect(()=>{SecureStore.getItemAsync(PIN_KEY).then(value=>setMode(value?'unlock':'create'))},[]);
 const reset=(text='')=>{setPin('');setMessage(text)};
 const submit=async(value:string)=>{
  if(mode==='create'){setFirstPin(value);setMode('confirm');reset();return;}
  if(mode==='confirm'){
   if(value!==firstPin){setMode('create');setFirstPin('');reset('PINs did not match. Create a new PIN.');return;}
   const salt=Crypto.randomUUID();
   await SecureStore.setItemAsync(PIN_KEY,`${salt}:${await digest(value,salt)}`,{keychainAccessible:SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY});
   setMode('open');return;
  }
  if(mode==='unlock'){
   if(Date.now()<lockedUntil){reset('Too many attempts. Please wait 30 seconds.');return;}
   const saved=await SecureStore.getItemAsync(PIN_KEY);
   const [salt,hash]=saved?.split(':')??[];
   if(salt&&hash&&await digest(value,salt)===hash){setAttempts(0);setMode('open');return;}
   const next=attempts+1;setAttempts(next);
   if(next>=5){setAttempts(0);setLockedUntil(Date.now()+30000);reset('Too many attempts. Please wait 30 seconds.')}else reset(`Incorrect PIN. ${5-next} attempts remaining.`);
  }
 };
 const press=(digit:string)=>{if(Date.now()<lockedUntil)return;const next=(pin+digit).slice(0,4);setPin(next);setMessage('');if(next.length===4)setTimeout(()=>submit(next),100)};
 if(mode==='open')return <>{children}</>;
 if(mode==='loading')return <View style={s.screen}><Text style={s.brand}>ZIKRI</Text></View>;
 const title=mode==='create'?'Create your PIN':mode==='confirm'?'Confirm your PIN':'Welcome back';
 const subtitle=mode==='create'?'Choose four digits to protect Zikri on this device.':mode==='confirm'?'Enter the same four digits again.':'Enter your four-digit PIN.';
 return <View style={s.screen}><View style={s.lock}><Text style={s.lockText}>Z</Text></View><Text style={s.brand}>ZIKRI</Text><Text style={s.title}>{title}</Text><Text style={s.subtitle}>{subtitle}</Text>
  <View style={s.dots}>{Array.from({length:4},(_,i)=><View key={i} style={[s.dot,i<pin.length&&s.dotFilled]}/>)}</View>
  {!!message&&<Text style={s.message}>{message}</Text>}
  <View style={s.keypad}>{[1,2,3,4,5,6,7,8,9].map(n=><Pressable key={n} onPress={()=>press(String(n))} style={s.key}><Text style={s.keyText}>{n}</Text></Pressable>)}<View style={s.key}/><Pressable onPress={()=>press('0')} style={s.key}><Text style={s.keyText}>0</Text></Pressable><Pressable onPress={()=>setPin(v=>v.slice(0,-1))} style={s.key}><Text style={s.delete}>⌫</Text></Pressable></View>
 </View>
}
const s=StyleSheet.create({screen:{flex:1,backgroundColor:'#FAF9FF',alignItems:'center',justifyContent:'center',padding:28},lock:{width:74,height:74,borderRadius:25,backgroundColor:'#6246EA',alignItems:'center',justifyContent:'center'},lockText:{color:'#fff',fontSize:34,fontWeight:'900'},brand:{color:'#6246EA',fontSize:13,fontWeight:'900',letterSpacing:3,marginTop:16},title:{fontSize:27,fontWeight:'900',color:'#29223D',marginTop:24},subtitle:{fontSize:15,color:'#817A91',textAlign:'center',lineHeight:21,marginTop:8},dots:{flexDirection:'row',gap:16,marginVertical:28},dot:{width:15,height:15,borderRadius:8,borderWidth:2,borderColor:'#B9B0DA'},dotFilled:{backgroundColor:'#6246EA',borderColor:'#6246EA'},message:{color:'#C24949',fontWeight:'600',marginBottom:12,textAlign:'center'},keypad:{width:270,flexDirection:'row',flexWrap:'wrap'},key:{width:90,height:68,alignItems:'center',justifyContent:'center'},keyText:{fontSize:25,fontWeight:'700',color:'#302943'},delete:{fontSize:24,color:'#6F6780'}});
