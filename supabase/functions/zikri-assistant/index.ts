const cors={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Headers":"authorization, x-client-info, apikey, content-type"};
Deno.serve(async(req)=>{
 if(req.method==='OPTIONS')return new Response('ok',{headers:cors});
 try{
  const key=Deno.env.get('OPENAI_API_KEY');
  if(!key)return Response.json({error:'Assistant is not configured yet.'},{status:503,headers:cors});
  const {message,language='en',history=[]}=await req.json();
  const languageName=language==='am'?'Amharic':language==='ti'?'Tigrinya':'English';
  const input=[...history.slice(-10),{role:'user',content:message}];
  const response=await fetch('https://api.openai.com/v1/responses',{method:'POST',headers:{Authorization:`Bearer ${key}`,'Content-Type':'application/json'},body:JSON.stringify({model:Deno.env.get('OPENAI_MODEL')||'gpt-5.6',tools:[{type:'web_search'}],instructions:`You are Zikri, a warm, patient AI teacher and daily assistant. Always answer in ${languageName}. Explain clearly, ask helpful follow-up questions, and never pretend to be human. Use web search for weather, news, exchange rates, closures, schedules, and anything current. Cite sources when you search. Keep spoken answers concise unless the learner requests detail. Never replace emergency, medical, legal, or financial professionals.`,input})});
  const data=await response.json();
  if(!response.ok)throw new Error(data?.error?.message||'Assistant request failed');
  const reply=data.output?.flatMap((item:{content?:Array<{type:string;text?:string}>})=>item.content??[]).find((part:{type:string})=>part.type==='output_text')?.text;
  return Response.json({reply:reply||'I could not create an answer.'},{headers:{...cors,'Content-Type':'application/json'}});
 }catch(error){return Response.json({error:error instanceof Error?error.message:'Unknown error'},{status:400,headers:{...cors,'Content-Type':'application/json'}})}
});
