import { useState } from "react"
import axios from "axios"

const API = import.meta.env.VITE_API_URL || "https://fitcoach-ai-backend.onrender.com"

export default function App(){
const [screen,setScreen]=useState("home")
const [form,setForm]=useState({age:"23",weight:"65",goal:"muscle gain",type:"veg"})
const [plan,setPlan]=useState(null)
const [loading,setLoading]=useState(false)
const [myPhoto,setMyPhoto]=useState(localStorage.getItem("myPhoto")||"")
const [openFaq,setOpenFaq]=useState(null)

const handlePhoto=(e)=>{
  const f=e.target.files[0]; if(!f) return
  const r=new FileReader(); r.onload=(ev)=>{setMyPhoto(ev.target.result); localStorage.setItem("myPhoto",ev.target.result)}; r.readAsDataURL(f)
}
const gen=async()=>{
  setLoading(true)
  try{const res=await axios.post(`${API}/generate`,form); setPlan(res.data); setScreen("plan")}
  catch{alert("Backend waking up, wait 30 sec")}
  setLoading(false)
}

return(
<div style={{fontFamily:"Inter, sans-serif",background:"#fff",color:"#000",overflowX:"hidden",margin:0}}>
<style>{`*{margin:0;padding:0;box-sizing:border-box} html,body{overflow-x:hidden} button{cursor:pointer}`}</style>

{/* NAVBAR LIKE FITMUSK */}
<div style={{position:"sticky",top:0,zIndex:20,display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 4%",background:"#fff",borderBottom:"1px solid #eee"}}>
  <b style={{fontSize:16}}>⩔ FITCOACH.AI</b>
  <div style={{display:"flex",gap:20,fontSize:12,fontWeight:600,color:"#666",alignItems:"center"}}>
    <span className="hide-m">Home</span><span className="hide-m">About</span><span>Coaching Plans</span>
    <button onClick={()=>setScreen("form")} style={{background:"#000",color:"#fff",padding:"8px 18px",borderRadius:20,border:"none",fontWeight:800}}>Enroll Now</button>
  </div>
</div>

{screen==="home" && <>
{/* HERO - EXACT FITMUSK BLACK */}
<div style={{background:"#0a0a0a",color:"#fff",textAlign:"center",padding:"70px 4% 40px"}}>
  <h1 style={{fontSize:"clamp(28px,5vw,52px)",fontWeight:900,lineHeight:1}}>WELCOME TO FITCOACH.AI</h1>
  <p style={{color:"#FFC100",marginTop:12,fontWeight:700,fontSize:14}}>World's Most Affordable AI Fitness Coaching App - ₹299 Only</p>
  <button onClick={()=>setScreen("form")} style={{marginTop:18,background:"#fff",color:"#000",padding:"10px 24px",borderRadius:30,border:"none",fontWeight:800}}>Get Started →</button>

  <div style={{marginTop:40,display:"flex",justifyContent:"center",gap:14,flexWrap:"wrap",transform:"rotate(-2deg)"}}>
    {[1,2,3,4].map(i=>(
      <div key={i} style={{width:160,height:300,background:"#1a1a1a",borderRadius:16,border:"1px solid #2a2a2a",overflow:"hidden"}}>
        <img src={`https://images.unsplash.com/photo-${i===1?"1571019613454-1cb2f99b2d8b":i===2?"1583454110551-21f2fa2afe61":i===3?"1534438327276-14e5300c3a48":"1599058917212-d75039770074"}?w=300`} style={{width:"100%",height:"100%",objectFit:"cover",opacity:0.8}}/>
      </div>
    ))}
  </div>
</div>

{/* WELCOME SECTION - YOUR STORY */}
<div style={{display:"flex",flexWrap:"wrap",padding:"60px 5%",gap:30,alignItems:"center",background:"#fff"}}>
  <div style={{flex:1,minWidth:320}}>
    <h2 style={{fontSize:13,letterSpacing:2,fontWeight:900}}>WELCOME TO FITCOACH.AI</h2>
    <p style={{marginTop:16,color:"#555",fontSize:13,lineHeight:1.8}}>Hey, I'm Swapnil Kumar Patel from Sundargarh, Odisha. A student developer who saw friends paying ₹5000 for basic diet charts.<br/><br/>
    FITCOACH.AI is built for Indian students - Veg & Non-veg diet, home & gym workouts, Hindi & English support. Our AI generates your personalized workout, diet, and tracking in 15 seconds.<br/><br/>
    You have a personal AI coach in your pocket, building and transforming your physique along with your lifestyle. Affordable, honest, and made for Indians.</p>
    <button style={{marginTop:16,border:"none",background:"none",fontWeight:800,fontSize:12,textDecoration:"underline"}}>Read More</button>
  </div>
  <div style={{flex:1,minWidth:320,height:380,position:"relative",overflow:"hidden",borderRadius:12}}>
    {myPhoto? <img src={myPhoto} style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top"}}/> : <img src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800" style={{width:"100%",height:"100%",objectFit:"cover"}}/>}
    <label style={{position:"absolute",bottom:10,left:10,background:"#000",color:"#fff",padding:"6px 12px",borderRadius:20,fontSize:11,cursor:"pointer"}}>📷 Upload Your Photo<input type="file" onChange={handlePhoto} style={{display:"none"}} accept="image/*"/></label>
  </div>
</div>

{/* TRANSFORM YOURSELF */}
<div style={{textAlign:"center",padding:"50px 5%",background:"#fafafa"}}>
  <h2 style={{fontSize:22,fontWeight:900}}>Transform Yourself With FITCOACH.AI!</h2>
  <div style={{marginTop:30,display:"flex",gap:20,justifyContent:"center",flexWrap:"wrap"}}>
    <div style={{width:260,background:"#111",color:"#fff",borderRadius:16,overflow:"hidden"}}>
      <img src="https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400" style={{width:"100%",height:180,objectFit:"cover"}}/>
      <div style={{padding:14}}><b>Personalised Workout Plan!</b><p style={{fontSize:11,color:"#888",marginTop:6}}>AI workout based on your goal, weight & equipment.</p></div>
    </div>
    <div style={{flex:1,minWidth:300,textAlign:"left",maxWidth:400,paddingTop:20}}>
      <h3 style={{fontSize:16}}>Personalised Workout Plan!</h3>
      <p style={{fontSize:12,color:"#666",lineHeight:1.7,marginTop:10}}>Workout plan tailored for muscle gain, fat loss, body recomposition. Progressive overload, sets, reps designed for Indian body types. Adjusts as you grow.</p>
      <button onClick={()=>setScreen("form")} style={{marginTop:14,background:"#000",color:"#fff",padding:"8px 18px",borderRadius:20,border:"none",fontSize:12}}>Download Now</button>
    </div>
  </div>
</div>

{/* SUCCESS STORIES */}
<div style={{padding:"50px 5%"}}>
  <h2 style={{fontWeight:900}}>Our Success Stories</h2>
  <div style={{display:"flex",gap:14,marginTop:20,overflowX:"auto"}}>
    {[
      {n:"4.5kg",d:"Gain in 60 days"},
      {n:"6kg",d:"Fat Loss"},
      {n:"8kg",d:"Muscle Gain"},
      {n:"3kg",d:"Transformation"},
    ].map((s,i)=><div key={i} style={{minWidth:180,border:"1px solid #eee",borderRadius:12,overflow:"hidden"}}><div style={{height:220,background:"#f5f5f5",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:28}}>{s.n}</div><div style={{padding:8,fontSize:11}}>{s.d}<br/> - Student from Odisha</div></div>)}
  </div>
</div>

{/* PRO PLAN - FOUNDER */}
<div style={{display:"flex",flexWrap:"wrap",background:"#111",color:"#fff"}}>
  <div style={{flex:1,minWidth:320,padding:"50px 5%"}}>
    <h2 style={{fontWeight:900}}>Pro Plan</h2>
    <p style={{fontSize:12,color:"#888",lineHeight:1.7,marginTop:12}}>Personalized diet + workout + weekly check-ins + progress tracking + FitCoach AI chat support. Everything for ₹299, not ₹5000.</p>
    <p style={{fontSize:12,color:"#aaa",marginTop:20}}>✓ Personalized Indian Diet (Veg/Non-Veg)<br/>✓ Workout for Home/Gym<br/>✓ Weekly Progress Check<br/>✓ 24/7 AI Coach</p>
    <button onClick={()=>setScreen("form")} style={{marginTop:20,background:"#fff",color:"#000",padding:"10px 22px",borderRadius:30,border:"none",fontWeight:800}}>₹299 / month - Enroll Now</button>
  </div>
  <div style={{flex:1,minWidth:320,background:"#000",padding:"40px 5%",display:"flex",gap:20}}>
    <div style={{flex:1}}>
      <h3 style={{fontSize:12,letterSpacing:2}}>FITCOACH.AI</h3>
      <p style={{fontSize:10,color:"#FFC100",marginTop:4}}>Swapnil Kumar Patel - Founder (Sundargarh, Odisha)</p>
      <p style={{fontSize:11,color:"#888",marginTop:10,lineHeight:1.6}}>Student builder from Sundargarh. Built this to make fitness affordable for every student in India. No fake supplements, no 5000rs fees. Just honest AI coaching.</p>
    </div>
    <div style={{width:140,height:180,background:"#222",borderRadius:12,overflow:"hidden"}}>
      {myPhoto? <img src={myPhoto} style={{width:"100%",height:"100%",objectFit:"cover"}}/> : <div style={{padding:40,textAlign:"center",color:"#555"}}>Your Photo</div>}
    </div>
  </div>
</div>

{/* FEATURES */}
<div style={{padding:"50px 5%",background:"#fff"}}>
  <h2 style={{fontWeight:900,textAlign:"center"}}>Complete personalised fitness solution</h2>
  <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:20,marginTop:30}}>
    {[
      ["Personalised Nutrition","Get meal plan based on your goal, veg/non-veg, Indian food, calories & macros."],
      ["Personalised Workouts","Workout plan based on equipment, time, goal. Home or gym, both covered."],
      ["Progress Tracking","Track weight, photos, strength weekly. See real progress."],
      ["Weekly Check-ins","Weekly review of your progress & plan adjustments."],
      ["Wearable Integration","Connect steps, heart rate, calories automatically."],
      ["24/7 AI Coach","Ask anything anytime, your AI coach replies in seconds."],
    ].map(([t,d],i)=><div key={i} style={{border:"1px solid #eee",padding:18,borderRadius:12}}><h4 style={{fontSize:13}}>{t}</h4><p style={{fontSize:11,color:"#666",marginTop:8,lineHeight:1.6}}>{d}</p></div>)}
  </div>
</div>

{/* FAQ */}
<div style={{padding:"40px 5%",background:"#fafafa"}}>
  <h2 style={{fontWeight:900}}>Frequently Asked Questions</h2>
  {[
    ["1. How do I start my subscription and how do I make payment?","Click Enroll Now, pay ₹299 via UPI/Card. Instant access."],
    ["2. I made payment, but my plan didn't activate on app?","Wait 2 mins and refresh. If not, contact support on WhatsApp."],
    ["3. What diet type is provided? Veg & Non-Veg?","Both! We give Indian diet - roti, rice, dal, paneer, chicken, eggs."],
    ["4. Is it suitable for beginners?","Yes 100% beginner friendly, home workouts available."],
    ["5. How do I cancel my subscription?","You can cancel anytime, no lock-in."],
  ].map(([q,a],i)=>(
    <div key={i} style={{marginTop:12,background:"#fff",borderRadius:10,padding:"14px 16px",border:"1px solid #eee"}}>
      <div onClick={()=>setOpenFaq(openFaq===i?null:i)} style={{display:"flex",justifyContent:"space-between",cursor:"pointer",fontWeight:700,fontSize:13}}><span>{q}</span><span>{openFaq===i?"−":"+"}</span></div>
      {openFaq===i && <p style={{marginTop:10,fontSize:12,color:"#666"}}>{a}</p>}
    </div>
  ))}
</div>

{/* FINAL CTA BLACK */}
<div style={{background:"#000",color:"#fff",textAlign:"center",padding:"60px 5%"}}>
  <h2>Fitness Made Simple With FITCOACH.AI!</h2>
  <p style={{color:"#888",fontSize:12,marginTop:10}}>Experience the joy of training with AI that knows Indian food, Indian body, and Indian budget.</p>
  <button onClick={()=>setScreen("form")} style={{marginTop:20,background:"#fff",color:"#000",padding:"12px 26px",borderRadius:30,border:"none",fontWeight:900}}>Download Now - ₹299</button>
  <div style={{marginTop:30,color:"#444",fontSize:11}}>© 2026 All Rights Reserved By FITCOACH.AI • Made in Sundargarh, Odisha</div>
</div>
</>}

{screen==="form" && (
<div style={{maxWidth:420,margin:"0 auto",padding:"40px 16px",minHeight:"100vh",background:"#fff"}}>
  <button onClick={()=>setScreen("home")} style={{border:"1px solid #ddd",background:"none",padding:"6px 12px",borderRadius:20}}>← Back</button>
  <h2 style={{marginTop:20,fontWeight:900}}>Build Your AI Plan</h2>
  <div style={{background:"#f7f7f7",borderRadius:16,padding:20,marginTop:16,border:"1px solid #eee"}}>
    <input value={form.age} onChange={e=>setForm({...form,age:e.target.value})} placeholder="Age - 23" style={{width:"100%",padding:12,borderRadius:8,border:"1px solid #ddd",marginBottom:10}}/>
    <input value={form.weight} onChange={e=>setForm({...form,weight:e.target.value})} placeholder="Weight - 65" style={{width:"100%",padding:12,borderRadius:8,border:"1px solid #ddd"}}/>
    <button onClick={gen} style={{width:"100%",marginTop:14,padding:14,background:"#000",color:"#fff",borderRadius:10,fontWeight:800}}>{loading?"Creating...":"Continue →"}</button>
  </div>
</div>
)}

{screen==="plan" && plan && (
<div style={{maxWidth:600,margin:"20px auto",padding:16}}><pre style={{background:"#111",color:"#fff",padding:12,whiteSpace:"pre-wrap",fontSize:12,borderRadius:12}}>{JSON.stringify(plan,null,2).slice(0,6000)}</pre><button onClick={()=>setScreen("home")} style={{marginTop:20}}>Back Home</button></div>
)}
</div>
)
}