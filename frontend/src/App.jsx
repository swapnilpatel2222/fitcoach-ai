import { useState } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL || "https://fitcoach-ai-backend.onrender.com";

export default function App(){
  const [screen,setScreen]=useState("landing");
  const [form,setForm]=useState({age:"23",weight:"65",goal:"muscle gain",days:5,type:"veg"});
  const [plan,setPlan]=useState(null);
  const [loading,setLoading]=useState(false);

  const generate=async()=>{
    if(!form.age||!form.weight) return alert("Enter age weight");
    setLoading(true);
    try{ const r=await axios.post(`${API_URL}/generate`,form); setPlan(r.data); setScreen("plan"); }catch{ alert("Backend starting... wait 30 sec"); }
    setLoading(false);
  }

  return (
    <div style={{background:"#0a0a0a",color:"white",fontFamily:"Inter, sans-serif",minHeight:"100vh"}}>
      <style>{`@media(max-width:800px){.hero{flex-direction:column!important} .hero h1{font-size:32px!important}}`}</style>

      {/* NAV LIKE FITMUSK */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 20px",background:"white",color:"#111",position:"sticky",top:0,zIndex:20}}>
        <b style={{display:"flex",alignItems:"center",gap:6}}><span style={{fontSize:20}}>⩔</span> FITCOACH.AI</b>
        <div style={{display:"flex",gap:20,fontSize:12,fontWeight:600,alignItems:"center"}}>
          <span style={{display:"none"}} className="hide-m">Home</span>
          <button onClick={()=>setScreen("form")} style={{background:"#111",color:"white",padding:"8px 16px",borderRadius:20,border:"none",fontWeight:700,cursor:"pointer"}}>Get Started</button>
        </div>
      </div>

      {screen==="landing" && (
        <>
          {/* HERO 1 - BULK SERIES LIKE FITMUSK */}
          <div className="hero" style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"50px 20px",maxWidth:1100,margin:"0 auto",gap:20,background:"#0a0a0a"}}>
            <div style={{flex:1}}>
              <div style={{background:"#111",border:"1px solid #333",display:"inline-block",padding:"6px 12px",borderRadius:6,fontSize:10,marginBottom:12}}>ULTIMATE BULK SERIES • NEW</div>
              <div style={{color:"#ffb700",fontWeight:900,fontSize:14,letterSpacing:1}}>NEW LAUNCH!</div>
              <h1 style={{fontSize:48,fontWeight:900,lineHeight:0.95,margin:"8px 0",letterSpacing:-1}}>ULTIMATE<br/>BULK SERIES</h1>
              <p style={{color:"#999",fontSize:13,marginTop:10}}>Complete Guide to Fast Weight & Muscle Gain</p>
              <button onClick={()=>setScreen("form")} style={{marginTop:18,background:"white",color:"black",padding:"12px 24px",borderRadius:25,border:"none",fontWeight:800,cursor:"pointer"}}>Enroll Now →</button>
            </div>
            <img src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=500" style={{width:380,height:420,objectFit:"cover",borderRadius:12,flexShrink:0}} />
          </div>

          {/* HERO 2 - SHRED */}
          <div className="hero" style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"50px 20px",maxWidth:1100,margin:"0 auto",gap:20,borderTop:"1px solid #1a1a1a"}}>
            <div style={{flex:1}}>
              <div style={{color:"#ffb700",fontWeight:900,fontSize:14}}>NEW LAUNCH!</div>
              <h1 style={{fontSize:44,fontWeight:900,lineHeight:0.95,margin:"8px 0"}}>ULTIMATE<br/>SHRED SERIES</h1>
              <p style={{color:"#999",fontSize:13}}>Complete Guide to Fat Loss & Muscle Definition</p>
              <button onClick={()=>setScreen("form")} style={{marginTop:18,background:"white",color:"black",padding:"12px 24px",borderRadius:25,border:"none",fontWeight:800,cursor:"pointer"}}>Enroll Now →</button>
            </div>
            <img src="https://images.unsplash.com/photo-1594381898411-846e7d193883?w=500" style={{width:380,height:420,objectFit:"cover",borderRadius:12}} />
          </div>

          {/* WELCOME */}
          <div style={{background:"white",color:"#111",padding:"50px 20px",textAlign:"center"}}>
            <div style={{maxWidth:1100,margin:"0 auto"}}>
              <h2 style={{fontSize:28,fontWeight:900}}>WELCOME TO FITCOACH.AI</h2>
              <p style={{color:"#666",fontSize:13,marginTop:8}}>World's Most Affordable AI Fitness Coaching App</p>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",gap:12,marginTop:24}}>
                {[1,2,3,4].map(i=><div key={i} style={{background:"#f5f5f5",height:200,borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,color:"#999"}}>App Screen {i}</div>)}
              </div>
            </div>
          </div>

          {/* TRANSFORM */}
          <div style={{background:"#fafafa",color:"#111",padding:"40px 20px",textAlign:"center"}}>
            <h2 style={{fontSize:24,fontWeight:900}}>Transform Yourself With FITCOACH.AI !</h2>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12,marginTop:20,maxWidth:900,marginLeft:"auto",marginRight:"auto"}}>
              <div style={{background:"white",border:"1px solid #eee",borderRadius:12,padding:16}}><b style={{fontSize:13}}>Personalized Workout</b><p style={{fontSize:11,color:"#666",marginTop:6}}>AI creates 5-day split based on goal</p></div>
              <div style={{background:"white",border:"1px solid #eee",borderRadius:12,padding:16}}><b style={{fontSize:13}}>Personalized Nutrition</b><p style={{fontSize:11,color:"#666",marginTop:6}}>Veg/Non-veg auto 2275 KCAL plan</p></div>
              <div style={{background:"white",border:"1px solid #eee",borderRadius:12,padding:16}}><b style={{fontSize:13}}>Progress Tracking</b><p style={{fontSize:11,color:"#666",marginTop:6}}>Checkbox + WhatsApp share + PDF</p></div>
            </div>
            <button onClick={()=>setScreen("form")} style={{marginTop:20,background:"#111",color:"white",padding:"14px 28px",borderRadius:25,border:"none",fontWeight:800,cursor:"pointer"}}>Generate Your Plan Now</button>
          </div>

          {/* FOOTER CTA */}
          <div style={{background:"#0a0a0a",padding:"50px 20px",textAlign:"center",borderTop:"1px solid #1a1a1a"}}>
            <h2 style={{fontSize:22,fontWeight:800}}>Fitness Made Simple With FITCOACH.AI!</h2>
            <p style={{color:"#777",fontSize:12,marginTop:6}}>Experience the joy of getting with personalized workouts and diet plans</p>
            <button onClick={()=>setScreen("form")} style={{marginTop:16,background:"white",color:"black",padding:"12px 28px",borderRadius:25,border:"none",fontWeight:800,cursor:"pointer"}}>Get Started - ₹299</button>
          </div>
        </>
      )}

      {/* FORM - DARK PRO LIKE FITMUSK */}
      {screen==="form" && (
        <div style={{maxWidth:440,margin:"0 auto",padding:"30px 16px",background:"#0a0a0a",minHeight:"90vh"}}>
          <button onClick={()=>setScreen("landing")} style={{background:"none",border:"1px solid #333",color:"#aaa",padding:"6px 12px",borderRadius:20,cursor:"pointer",fontSize:12}}>← Back</button>
          <h2 style={{fontSize:26,fontWeight:900,marginTop:20}}>Let's Build Your Plan</h2>
          <p style={{color:"#777",fontSize:12}}>Takes 15 seconds. Trusted by 12,000+</p>
          <div style={{background:"#151515",border:"1px solid #222",borderRadius:16,padding:20,marginTop:20}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              <input value={form.age} onChange={e=>setForm({...form,age:e.target.value})} placeholder="Age - 23" style={{padding:14,background:"#0a0a0a",border:"1px solid #333",borderRadius:10,color:"white"}}/>
              <input value={form.weight} onChange={e=>setForm({...form,weight:e.target.value})} placeholder="Weight 65" style={{padding:14,background:"#0a0a0a",border:"1px solid #333",borderRadius:10,color:"white"}}/>
            </div>
            <div style={{display:"flex",gap:8,marginTop:16}}>
              {["muscle gain","fat loss","strength"].map(g=><button key={g} onClick={()=>setForm({...form,goal:g})} style={{flex:1,padding:12,borderRadius:10,border:"1px solid #333",background:form.goal===g?"white":"#0a0a0a",color:form.goal===g?"black":"white",fontWeight:700,fontSize:11,cursor:"pointer"}}>{g}</button>)}
            </div>
            <div style={{display:"flex",gap:8,marginTop:12}}>
              {["veg","non-veg"].map(t=><button key={t} onClick={()=>setForm({...form,type:t})} style={{flex:1,padding:12,borderRadius:10,border:"1px solid #333",background:form.type===t?"white":"#0a0a0a",color:form.type===t?"black":"white",fontWeight:700,cursor:"pointer"}}>{t}</button>)}
            </div>
            <div style={{display:"flex",gap:8,marginTop:12}}>
              {[3,4,5,6].map(d=><button key={d} onClick={()=>setForm({...form,days:d})} style={{flex:1,padding:12,borderRadius:10,border:"1px solid #333",background:form.days===d?"#ffb700":"#0a0a0a",color:form.days===d?"black":"white",fontWeight:800,cursor:"pointer"}}>{d}D</button>)}
            </div>
            <button onClick={generate} style={{width:"100%",marginTop:20,padding:16,background:"white",color:"black",borderRadius:12,fontWeight:900,border:"none",cursor:"pointer"}}>{loading?"Generating...":"Continue →"}</button>
          </div>
        </div>
      )}

      {screen==="plan" && plan && (
        <div style={{maxWidth:600,margin:"0 auto",padding:"20px",background:"#0a0a0a",minHeight:"100vh"}}>
          <h2>Your Plan ✅</h2>
          <pre style={{background:"#151515",padding:16,borderRadius:12,fontSize:12,whiteSpace:"pre-wrap",border:"1px solid #222"}}>{JSON.stringify(plan,null,2).slice(0,3000)}</pre>
          <button onClick={()=>setScreen("landing")} style={{marginTop:12,background:"white",color:"black",padding:"10px 16px",borderRadius:20,border:"none",cursor:"pointer"}}>Home</button>
        </div>
      )}
    </div>
  )
}