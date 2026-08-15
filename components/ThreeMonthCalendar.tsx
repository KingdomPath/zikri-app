import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';

type Props={selected:string;onSelect:(date:string)=>void;language:'en'|'am'|'ti'};
const key=(d:Date)=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;

export function YearCalendar({selected,onSelect,language}:Props){
 const [year,setYear]=useState(new Date().getFullYear());
 const locale=language==='am'?'am-ET':language==='ti'?'ti-ET':'en-US';
 const months=Array.from({length:12},(_,month)=>new Date(year,month,1));
 return <><View style={s.yearNav}><Pressable onPress={()=>setYear(y=>y-1)} style={s.yearButton}><Text style={s.yearButtonText}>‹</Text></Pressable><Text style={s.year}>{year}</Text><Pressable onPress={()=>setYear(y=>y+1)} style={s.yearButton}><Text style={s.yearButtonText}>›</Text></Pressable></View><ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} style={s.scroller}>
  {months.map(month=>{const leading=month.getDay();const total=new Date(month.getFullYear(),month.getMonth()+1,0).getDate();return <View key={month.toISOString()} style={s.month}>
   <Text style={s.title}>{month.toLocaleDateString(locale,{month:'long',year:'numeric'})}</Text>
   <View style={s.grid}>{['S','M','T','W','T','F','S'].map((d,i)=><Text key={i} style={s.weekday}>{d}</Text>)}
   {Array.from({length:leading},(_,i)=><View key={`blank-${i}`} style={s.cell}/>)}
   {Array.from({length:total},(_,i)=>{const date=new Date(month.getFullYear(),month.getMonth(),i+1);const value=key(date);const active=value===selected;return <Pressable key={value} onPress={()=>onSelect(value)} style={[s.cell,active&&s.active]}><Text style={[s.day,active&&s.activeText]}>{i+1}</Text></Pressable>})}</View>
  </View>})}
 </ScrollView></>
}
const s=StyleSheet.create({yearNav:{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginBottom:12},year:{fontSize:24,fontWeight:'900',color:'#2D2740'},yearButton:{width:44,height:40,borderRadius:14,backgroundColor:'#ECE9F7',alignItems:'center',justifyContent:'center'},yearButtonText:{fontSize:29,color:'#6246EA'},scroller:{marginBottom:22},month:{width:335,backgroundColor:'#fff',borderRadius:24,padding:18,marginRight:12},title:{fontSize:20,fontWeight:'800',color:'#2D2740',marginBottom:14},grid:{flexDirection:'row',flexWrap:'wrap'},weekday:{width:'14.285%',textAlign:'center',fontSize:11,fontWeight:'800',color:'#918AA1',paddingVertical:7},cell:{width:'14.285%',height:39,alignItems:'center',justifyContent:'center',borderRadius:12},day:{fontSize:14,fontWeight:'700',color:'#3C354D'},active:{backgroundColor:'#6246EA'},activeText:{color:'#fff'}});
