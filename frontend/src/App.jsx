import { useState } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL || "https://fitcoach-ai-backend.onrender.com";

export default function App(){
  const [screen,setScreen]=useState("landing");
  const [form,setForm]=useState({age:"",weight:"",goal:"muscle gain",days:4});
  const [plan,setPlan]=useState(null);
  const [loading,setLoading]=useState(false);
  const [paid,setPaid]=useState(false);

  const generate=async()=>{
    if(!form.age||!form.weight) return alert("Enter age & weight");
    setLoading(true);
    try{
      const res=await axios.post(`${API_URL}/generate`,form);
      setPlan(res.data); setScreen("plan");
    }catch(e){ alert("Backend starting... wait 30 sec and try again!"); }
    setLoading(false);
  }

  const S = {
    page:{minHeight:"100vh",background:"#080808",color:"white",fontFamily:"system-ui",padding:"0"},
    nav:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"20px",maxWidth:"1100px",margin:"0 auto"},
    hero:{maxWidth:"1100px",margin:"0 auto",padding:"40px 20px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:"30px"},
    h1:{fontSize:"58px",fontWeight:900,lineHeight:0.9,letterSpacing:"-2px"},
    btn:{background:"#facc15",color:"black",padding:"18px 36px",borderRadius:"50px",fontWeight:900,fontSize:"18px",border:"none",cursor:"pointer"},
    card:{background:"#161616",border:"1px solid #2a2a2a",borderRadius:"28px",padding:"28px"},
    input:{width:"100%",padding:"16px",borderRadius:"14px",background:"black",border:"1px solid #333",color:"white",fontSize:"16px",marginTop:"8px",boxSizing:"border-box"},
  };

  return (
    <div style={S.page}>
      <div style={S.nav}>
        <div style={{fontWeight:900,fontSize:"22px"}}>FITCOACH<span style={{color:"#facc15"}}>.AI</span> <span style={{background:"#facc15",color:"black",fontSize:"10px",padding:"4px 8px",borderRadius:"20px",marginLeft:"6px"}}>PRO</span></div>
        <button style={{background:"white",color:"black",padding:"10px 22px",borderRadius:"30px",fontWeight:900,border:"none",cursor:"pointer"}} onClick={()=>setScreen("form")}>Get Plan</button>
      </div>

      {screen==="landing" && (
        <div style={S.hero}>
          <div>
            <div style={{background:"#1a1a1a",border:"1px solid #333",display:"inline-block",padding:"6px 14px",borderRadius:"20px",fontSize:"12px",marginBottom:"16px"}}>🟢 12,493+ Indians transformed</div>
            <h1 style={S.h1}>Build Your<br/><span style={{color:"#facc15"}}>Stronger Self</span><br/>In 60 Days</h1>
            <p style={{color:"#888",marginTop:"18px",fontSize:"17px",lineHeight:1.5}}>AI coach like ₹5000 trainer. Workout + diet + grocery list in 15 sec.</p>
            <button style={{...S.btn,marginTop:"28px"}} onClick={()=>setScreen("form")}>Get My AI Plan - FREE →</button>
            <p style={{marginTop:"18px",color:"#facc15"}}>★★★★★ <span style={{color:"#666",fontSize:"12px"}}>4.9/5 from 1,203 users</span></p>
          </div>
          <img src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600" style={{width:"100%",height:"480px",objectFit:"cover",borderRadius:"32px"}} />
        </div>
      )}

      {screen==="form" && (
        <div style={{maxWidth:"480px",margin:"20px auto",padding:"20px"}}>
          <button onClick={()=>setScreen("landing")} style={{background:"none",border:"none",color:"#888",cursor:"pointer"}}>← Back</button>
          <div style={{...S.card,marginTop:"16px"}}>
            <h2 style={{fontSize:"28px",fontWeight:900}}>Your Details</h2>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px",marginTop:"18px"}}>
              <div>Age<input style={S.input} value={form.age} onChange={e=>setForm({...form,age:e.target.value})} placeholder="23" /></div>
              <div>Weight<input style={S.input} value={form.weight} onChange={e=>setForm({...form,weight:e.target.value})} placeholder="67 kg" /></div>
            </div>
            <p style={{marginTop:"18px",fontSize:"11px",color:"#666",letterSpacing:"1px"}}>GOAL</p>
            <div style={{display:"flex",gap:"8px",marginTop:"8px"}}>
              {["muscle gain","fat loss","strength"].map(g=><button key={g} onClick={()=>setForm({...form,goal:g})} style={{flex:1,padding:"12px 4px",borderRadius:"12px",border:"1px solid #333",background:form.goal===g?"#facc15":"black",color:form.goal===g?"black":"#888",fontWeight:900,fontSize:"10px",textTransform:"uppercase"}}>{g}</button>)}
            </div>
            <p style={{marginTop:"14px",fontSize:"11px",color:"#666"}}>DAYS / WEEK</p>
            <div style={{display:"flex",gap:"8px",marginTop:"8px"}}>
              {[3,4,5,6].map(d=><button key={d} onClick={()=>setForm({...form,days:d})} style={{flex:1,padding:"14px",borderRadius:"14px",border:"1px solid #333",background:form.days===d?"white":"black",color:form.days===d?"black":"white",fontWeight:900}}>{d}</button>)}
            </div>
            <button onClick={generate} style={{...S.btn,width:"100%",marginTop:"22px"}}>{loading?"Generating Your PRO Plan...":"Generate My Plan →"}</button>
          </div>
        </div>
      )}

      {screen==="plan" && plan && (
        <div style={{maxWidth:"680px",margin:"20px auto",padding:"20px"}}>
          {!paid? (
            <div style={{...S.card,textAlign:"center",padding:"48px 28px"}}>
              <div style={{width:"80px",height:"80px",background:"#facc15",borderRadius:"50%",margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"36px"}}>🔒</div>
              <h2 style={{fontSize:"34px",fontWeight:900,marginTop:"18px"}}>Plan Ready!</h2>
              <p style={{color:"#888",marginTop:"10px"}}>Unlock full plan for <b style={{color:"white"}}>₹299</b> <span style={{textDecoration:"line-through"}}>₹1999</span> - 85% OFF</p>
              <button onClick={()=>setPaid(true)} style={{...S.btn,width:"100%",marginTop:"22px"}}>Unlock Now - Pay ₹299 →</button>
              <button onClick={()=>setPaid(true)} style={{background:"none",border:"none",color:"#555",textDecoration:"underline",marginTop:"14px",cursor:"pointer",fontSize:"12px"}}>Skip (Demo Unlock)</button>
            </div>
          ):(
            <div>
              <h2 style={{fontSize:"30px",fontWeight:900}}>🔥 Unlocked! Your PRO Plan</h2>
              <div style={{...S.card,background:"white",color:"black",marginTop:"18px"}}>
                <h3 style={{fontWeight:900,fontSize:"14px",letterSpacing:"1px"}}>💪 WORKOUT - {form.days} DAYS</h3>
                {(plan.workout||[]).map((w,i)=><div key={i} style={{background:"#f2f2f2",padding:"14px",borderRadius:"12px",marginTop:"10px",fontWeight:700,fontSize:"13px",lineHeight:1.4}}>{w}</div>)}
              </div>
              <div style={{...S.card,background:"#facc15",color:"black",marginTop:"18px",whiteSpace:"pre-wrap"}}>
                <h3 style={{fontWeight:900,fontSize:"14px"}}>🥗 DIET PLAN - CALCULATED FOR YOU</h3>
                <p style={{marginTop:"12px",fontWeight:500,fontSize:"13px",lineHeight:1.6}}>{plan.diet}</p>
              </div>
              <button onClick={()=>setScreen("landing")} style={{...S.btn,background:"white",width:"100%",marginTop:"18px"}}>← Create New Plan</button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}