import { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function App(){
  const [screen,setScreen]=useState("landing");
  const [form,setForm]=useState({age:"",weight:"",goal:"muscle gain",days:5});
  const [plan,setPlan]=useState(null);
  const [loading,setLoading]=useState(false);
  const [paid,setPaid]=useState(false);

  const generate=async()=>{
    if(!form.age||!form.weight)return alert("Enter age & weight");
    setLoading(true);
    try{
      const res=await axios.post(`${API_URL}/generate`,form);
      setPlan(res.data); setScreen("plan");
    }catch(e){alert(e.message)}
    setLoading(false);
  }

  const S = {
    page:{minHeight:"100vh",background:"#050505",color:"white",fontFamily:"system-ui",padding:"20px"},
    nav:{display:"flex",justifyContent:"space-between",alignItems:"center",maxWidth:"1100px",margin:"0 auto"},
    logo:{fontWeight:900,fontSize:"24px"},
    yellow:{color:"#facc15"},
    hero:{maxWidth:"1100px",margin:"60px auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:"40px",alignItems:"center"},
    h1:{fontSize:"64px",fontWeight:900,lineHeight:0.9},
    btn:{background:"#facc15",color:"black",padding:"18px 32px",borderRadius:"50px",fontWeight:900,fontSize:"18px",border:"none",cursor:"pointer",marginTop:"20px"},
    card:{background:"#171717",border:"1px solid #333",borderRadius:"24px",padding:"32px",marginTop:"20px"},
    input:{width:"100%",padding:"16px",borderRadius:"12px",background:"black",border:"1px solid #444",color:"white",fontSize:"18px",marginTop:"8px"},
  };

  return (
    <div style={S.page}>
      <div style={S.nav}>
        <div style={S.logo}>FITCOACH<span style={S.yellow}>.AI</span> <span style={{background:"#facc15",color:"black",fontSize:"10px",padding:"4px 8px",borderRadius:"20px",marginLeft:"8px"}}>PRO</span></div>
        <button style={{background:"white",color:"black",padding:"10px 20px",borderRadius:"20px",fontWeight:900,border:"none"}} onClick={()=>setScreen("form")}>Get Plan</button>
      </div>

      {screen==="landing" && (
        <div style={S.hero}>
          <div>
            <h1 style={S.h1}>Build Your<br/><span style={S.yellow}>Stronger Self</span></h1>
            <p style={{color:"#888",marginTop:"20px",fontSize:"18px"}}>AI coach like ₹5000 trainer. Workout + diet in 15 sec.</p>
            <button style={S.btn} onClick={()=>setScreen("form")}>Get My AI Plan FREE →</button>
            <p style={{marginTop:"20px",color:"#facc15"}}>★★★★★ <span style={{color:"#666",fontSize:"12px"}}>4.9/5 from 1200+ users</span></p>
          </div>
          <img src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600" style={{width:"100%",height:"500px",objectFit:"cover",borderRadius:"30px"}} />
        </div>
      )}

      {screen==="form" && (
        <div style={{maxWidth:"500px",margin:"40px auto"}}>
          <button onClick={()=>setScreen("landing")} style={{background:"none",border:"none",color:"#888",cursor:"pointer"}}>← Back</button>
          <div style={S.card}>
            <h2 style={{fontSize:"28px",fontWeight:900}}>Your Details</h2>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px",marginTop:"20px"}}>
              <div>Age<input style={S.input} value={form.age} onChange={e=>setForm({...form,age:e.target.value})} placeholder="23" /></div>
              <div>Weight<input style={S.input} value={form.weight} onChange={e=>setForm({...form,weight:e.target.value})} placeholder="67 kg" /></div>
            </div>
            <div style={{marginTop:"20px"}}>
              <p style={{fontSize:"12px",color:"#888"}}>GOAL</p>
              <div style={{display:"flex",gap:"8px",marginTop:"8px"}}>
                {["muscle gain","fat loss","strength"].map(g=><button key={g} onClick={()=>setForm({...form,goal:g})} style={{flex:1,padding:"12px",borderRadius:"12px",border:"1px solid #444",background:form.goal===g?"#facc15":"black",color:form.goal===g?"black":"#888",fontWeight:900,textTransform:"uppercase",fontSize:"12px"}}>{g}</button>)}
              </div>
            </div>
            <button onClick={generate} style={{...S.btn,width:"100%",marginTop:"24px"}}>{loading?"Building Your Plan...":"Generate My Plan →"}</button>
          </div>
        </div>
      )}

      {screen==="plan" && plan && (
        <div style={{maxWidth:"700px",margin:"40px auto"}}>
          {!paid? (
            <div style={{...S.card,textAlign:"center",padding:"50px"}}>
              <div style={{width:"80px",height:"80px",background:"#facc15",borderRadius:"50%",margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"36px"}}>🔒</div>
              <h2 style={{fontSize:"32px",fontWeight:900,marginTop:"20px"}}>Plan Ready!</h2>
              <p style={{color:"#888",marginTop:"10px"}}>Unlock full plan for <b style={{color:"white"}}>₹299</b> <span style={{textDecoration:"line-through"}}>₹1999</span></p>
              <button onClick={()=>setPaid(true)} style={{...S.btn,width:"100%",marginTop:"20px"}}>Unlock Now - Pay ₹299 →</button>
              <button onClick={()=>setPaid(true)} style={{background:"none",border:"none",color:"#555",textDecoration:"underline",marginTop:"12px",cursor:"pointer"}}>Skip - Demo Unlock</button>
            </div>
          ):(
            <div>
              <h2 style={{fontSize:"32px",fontWeight:900}}>🔥 Unlocked!</h2>
              <div style={{...S.card,background:"white",color:"black",marginTop:"20px"}}>
                <h3 style={{fontWeight:900}}>WORKOUT - {form.days} DAYS</h3>
                {(plan.workout||[]).map((w,i)=><div key={i} style={{background:"#f3f3f3",padding:"14px",borderRadius:"12px",marginTop:"10px",fontWeight:700}}>{String(w)}</div>)}
              </div>
              <div style={{...S.card,background:"#facc15",color:"black",marginTop:"20px"}}>
                <h3 style={{fontWeight:900}}>DIET PLAN</h3>
                <p style={{marginTop:"10px",fontWeight:500}}>{plan.diet}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}