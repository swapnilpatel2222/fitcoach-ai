import { useState } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL || "https://fitcoach-ai-backend.onrender.com";

export default function App(){
  const [screen,setScreen]=useState("landing");
  const [form,setForm]=useState({age:"23",weight:"65",goal:"muscle gain",days:5,type:"veg"});
  const [plan,setPlan]=useState(null);
  const [loading,setLoading]=useState(false);
  const [showExample,setShowExample]=useState(false);

  const generate=async()=>{
    if(!form.age||!form.weight) return alert("Enter age & weight");
    setLoading(true);
    try{
      const res=await axios.post(`${API_URL}/generate`,form);
      setPlan(res.data); setScreen("plan");
    }catch{ alert("Backend waking... wait 20 sec then try again"); }
    setLoading(false);
  }

  return (
    <div style={{minHeight:"100vh",background:"#ffffff",color:"#111",fontFamily:"Inter, system-ui, sans-serif"}}>
      <style>{`@media(max-width:800px){.hero{grid-template-columns:1fr!important} input{font-size:16px!important}}`}</style>
      
      {/* NAV */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"16px 20px",maxWidth:"1100px",margin:"0 auto",borderBottom:"1px solid #eee",position:"sticky",top:0,background:"white",zIndex:20}}>
        <div style={{display:"flex",alignItems:"center",gap:"8px"}}><div style={{width:26,height:26,background:"#111",borderRadius:7,color:"white",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:12}}>F</div><b>FitCoach.ai</b></div>
        <button onClick={()=>setScreen("form")} style={{background:"#111",color:"white",padding:"10px 18px",borderRadius:10,border:"none",fontWeight:600,cursor:"pointer"}}>Get Started</button>
      </div>

      {/* LANDING */}
      {screen==="landing" && (
        <div className="hero" style={{maxWidth:"1100px",margin:"0 auto",padding:"40px 20px",display:"grid",gridTemplateColumns:"1.1fr 0.9fr",gap:32}}>
          <div>
            <div style={{display:"inline-block",border:"1px solid #e5e5e5",padding:"6px 12px",borderRadius:20,fontSize:11,fontWeight:600,marginBottom:16}}>● Trusted by 12,000+ Indians</div>
            <h1 style={{fontSize:"clamp(32px,5vw,48px)",fontWeight:800,lineHeight:1.05,letterSpacing:"-1.2px",margin:0}}>Personalized fitness,<br/>designed by AI.</h1>
            <p style={{color:"#666",marginTop:16,fontSize:16,lineHeight:1.6}}>Workout and nutrition plans tailored to your body, goal and lifestyle. No ads. Just results.</p>
            <div style={{display:"flex",gap:10,marginTop:24,flexWrap:"wrap"}}>
              <button onClick={()=>setScreen("form")} style={{background:"#111",color:"white",padding:"14px 22px",borderRadius:12,border:"none",fontWeight:700,cursor:"pointer"}}>Generate Your Plan →</button>
              <button onClick={()=>setShowExample(true)} style={{background:"white",color:"#111",padding:"14px 22px",borderRadius:12,border:"1px solid #ddd",fontWeight:600,cursor:"pointer"}}>See Example</button>
            </div>
            {showExample && (
              <div style={{marginTop:20,background:"#fafafa",border:"1px solid #eee",borderRadius:14,padding:16}}>
                <b style={{fontSize:13}}>EXAMPLE PLAN:</b><div style={{fontSize:12,color:"#666",marginTop:6,lineHeight:1.5}}>Day 1: Chest 4x12, Triceps 3x15<br/>Day 2: Back 4x12, Biceps 3x12<br/>Diet: 2200 KCAL, 140g Protein (Veg)</div>
                <button onClick={()=>setShowExample(false)} style={{marginTop:10,fontSize:12,border:"none",background:"none",textDecoration:"underline",cursor:"pointer"}}>Close</button>
              </div>
            )}
          </div>
          <div style={{background:"white",border:"1px solid #eee",borderRadius:16,padding:12}}>
            <img src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600" style={{width:"100%",height:280,objectFit:"cover",borderRadius:12}} />
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginTop:12}}>
              <div style={{background:"#f6f6f6",padding:12,borderRadius:10}}><div style={{fontSize:10,color:"#888"}}>WORKOUT</div><b style={{fontSize:12}}>5 Day • Muscle Gain</b></div>
              <div style={{background:"#f6f6f6",padding:12,borderRadius:10}}><div style={{fontSize:10,color:"#888"}}>NUTRITION</div><b style={{fontSize:12}}>2,275 KCAL • 143g P</b></div>
            </div>
          </div>
        </div>
      )}

      {/* FORM - FIXED VISIBILITY */}
      {screen==="form" && (
        <div style={{maxWidth:440,margin:"0 auto",padding:"30px 16px"}}>
          <button onClick={()=>setScreen("landing")} style={{background:"none",border:"none",color:"#666",cursor:"pointer",fontSize:13,marginBottom:12}}>← Back</button>
          <h2 style={{fontSize:26,fontWeight:800,margin:0}}>Let's build your plan</h2>
          <p style={{color:"#888",fontSize:13,marginTop:4}}>Takes 15 seconds. No signup.</p>
          
          <div style={{background:"white",border:"2px solid #111",borderRadius:16,padding:20,marginTop:20}}>
            <label style={{fontSize:11,fontWeight:800,color:"#111",letterSpacing:1}}>BASIC INFO</label>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginTop:10}}>
              <input placeholder="Age (e.g. 23)" value={form.age} onChange={e=>setForm({...form,age:e.target.value})} style={{padding:14,borderRadius:10,background:"white",border:"2px solid #ddd",color:"#111",fontWeight:600,outline:"none"}} />
              <input placeholder="Weight kg (65)" value={form.weight} onChange={e=>setForm({...form,weight:e.target.value})} style={{padding:14,borderRadius:10,background:"white",border:"2px solid #ddd",color:"#111",fontWeight:600,outline:"none"}} />
            </div>

            <label style={{fontSize:11,fontWeight:800,color:"#111",letterSpacing:1,marginTop:20,display:"block"}}>GOAL</label>
            <div style={{display:"flex",gap:8,marginTop:8}}>
              {["muscle gain","fat loss","strength"].map(g=><button key={g} onClick={()=>setForm({...form,goal:g})} style={{flex:1,padding:12,borderRadius:10,border:"2px solid #111",background:form.goal===g?"#111":"white",color:form.goal===g?"white":"#111",fontWeight:600,fontSize:11,cursor:"pointer"}}>{g}</button>)}
            </div>

            <label style={{fontSize:11,fontWeight:800,color:"#111",letterSpacing:1,marginTop:20,display:"block"}}>DIET</label>
            <div style={{display:"flex",gap:8,marginTop:8}}>
              {["veg","non-veg"].map(t=><button key={t} onClick={()=>setForm({...form,type:t})} style={{flex:1,padding:12,borderRadius:10,border:"2px solid #111",background:form.type===t?"#111":"white",color:form.type===t?"white":"#111",fontWeight:600,fontSize:12,cursor:"pointer"}}>{t}</button>)}
            </div>

            <label style={{fontSize:11,fontWeight:800,color:"#111",letterSpacing:1,marginTop:20,display:"block"}}>DAYS</label>
            <div style={{display:"flex",gap:8,marginTop:8}}>
              {[3,4,5,6].map(d=><button key={d} onClick={()=>setForm({...form,days:d})} style={{flex:1,padding:12,borderRadius:10,border:"2px solid #111",background:form.days===d?"#111":"white",color:form.days===d?"white":"#111",fontWeight:700,cursor:"pointer"}}>{d}</button>)}
            </div>

            <button onClick={generate} style={{background:"#111",color:"white",width:"100%",marginTop:24,padding:16,borderRadius:12,fontWeight:800,border:"none",cursor:"pointer"}}>{loading?"Generating... Please wait":"Continue →"}</button>
          </div>
        </div>
      )}

      {/* PLAN */}
      {screen==="plan" && plan && (
        <div style={{maxWidth:600,margin:"0 auto",padding:"20px 16px"}}>
          <h2 style={{fontSize:20,fontWeight:800}}>Your Plan Ready ✅</h2>
          <div style={{background:"white",border:"1px solid #eee",borderRadius:14,padding:16,marginTop:12,whiteSpace:"pre-wrap",fontSize:13,lineHeight:1.6}}>{JSON.stringify(plan,null,2).slice(0,2000)}</div>
          <button onClick={()=>setScreen("landing")} style={{marginTop:12,background:"white",border:"1px solid #ddd",padding:"10px 16px",borderRadius:10,cursor:"pointer"}}>← Home</button>
        </div>
      )}
    </div>
  )
}