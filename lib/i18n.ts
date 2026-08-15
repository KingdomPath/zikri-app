export type Language = 'en' | 'am' | 'ti';
export const labels = {
  en: { today:'Today', calendar:'Calendar', notes:'Notes', settings:'Settings', hello:'Good morning', upcoming:'Coming up', empty:'Nothing else planned today', mic:'Tap and speak', listening:'I’m listening…', hint:'Try “Remind me tomorrow at 9 to call my mother”', confirm:'Review command', save:'Save', cancel:'Cancel', language:'Language', voice:'Voice replies', notifications:'Notifications' },
  am: { today:'ዛሬ', calendar:'የቀን መቁጠሪያ', notes:'ማስታወሻ', settings:'ቅንብሮች', hello:'እንደምን አደሩ', upcoming:'ቀጣይ', empty:'ዛሬ ሌላ የታቀደ ነገር የለም', mic:'ተጭነው ይናገሩ', listening:'እየሰማሁ ነው…', hint:'“ነገ በ9 ሰዓት እናቴን እንድደውል አስታውሰኝ” ይበሉ', confirm:'ትዕዛዙን ያረጋግጡ', save:'አስቀምጥ', cancel:'ሰርዝ', language:'ቋንቋ', voice:'የድምፅ ምላሽ', notifications:'ማሳወቂያዎች' },
  ti: { today:'ሎሚ', calendar:'ዓውደ ኣዋርሕ', notes:'መዘኻኸሪ', settings:'ቅንብራት', hello:'ከመይ ሓዲርኩም', upcoming:'ዝመጽእ', empty:'ሎሚ ካልእ ውጥን የለን', mic:'ጠዊቕኩም ተዛረቡ', listening:'ይሰምዕ ኣለኹ…', hint:'“ጽባሕ ሰዓት 9 ንኣደይ ክድውል ኣዘኻኽረኒ” በሉ', confirm:'ትእዛዝ ኣረጋግጽ', save:'ዓቅብ', cancel:'ሰርዝ', language:'ቋንቋ', voice:'ናይ ድምጺ መልሲ', notifications:'መፍለጢታት' },
} as const;
