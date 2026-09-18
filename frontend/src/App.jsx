import { useState } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL || "https://fitcoach-ai-backend.onrender.com";

export default function App(){
  const [screen,setScreen]=useState("landing");
  const [form,setForm]=useState({age:"",weight:"",goal:"muscle gain",days:5,type:"non-veg"});
  const [plan,setPlan]=useState(null);
  const [loading,setLoading]=useState(false);
  const [paid,setPaid]=useState(false);

  const generate=async()=>{
    if(!form.age||!form.weight) return alert("Enter age & weight");
    setLoading(true);
    try{
      const res=await axios.post(`${API_URL}/generate`,form);
      setPlan(res.data); setScreen("plan");
    }catch{ alert("Backend waking up... try again in 20 sec"); }
    setLoading(false);
  }

  const S = {
    page:{minHeight:"100vh",background:"#070707",color:"white",fontFamily:"system-ui"},
    nav:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"18px 20px",maxWidth:"1100px",margin:"0 auto"},
    btn:{background:"#facc15",color:"black",padding:"16px 28px",borderRadius:"40px",fontWeight:900,border:"none",cursor:"pointer"},
    card:{background:"#151515",border:"1px solid #262626",borderRadius:"20px",padding:"20px",marginTop:"14px"},
  };

  const dietCards = plan?.diet?.split("\n").filter(l=>l.includes("AM")||l.includes("PM")) || [];

  return (
    <div style={S.page}>
      <div style={S.nav}>
        <b>FITCOACH<span style={{color:"#facc15"}}>.AI</span> <span style={{background:"#facc15",color:"black",fontSize:"9px",padding:"3px 7px",borderRadius:"10px",marginLeft:"6px"}}>ULTRA</span></b>
        <button style={{background:"white",color:"black",padding:"8px 18px",borderRadius:"20px",fontWeight:900,border:"none"}} onClick={()=>setScreen("form")}>Get Plan</button>
      </div>

      {screen==="landing" && (
        <div style={{maxWidth:"1100px",margin:"0 auto",padding:"30px 20px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"}}>
          <div>
            <h1 style={{fontSize:"52px",fontWeight:900,lineHeight:0.9}}>Build Your<br/><span style={{color:"#facc15"}}>Stronger Self</span><br/>In 60 Days</h1>
            <p style={{color:"#777",marginTop:"14px"}}>AI like ₹5000 trainer + Diet + Grocery + Macros. Used by 12k+ Indians.</p>
            <button style={{...S.btn,marginTop:"20px"}} onClick={()=>setScreen("form")}>Get My AI Plan FREE →</button>
          </div>
          <img src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600" style={{width:"100%",height:"420px",objectFit:"cover",borderRadius:"24px"}} />
        </div>
      )}

      {screen==="form" && (
        <div style={{maxWidth:"460px",margin:"0 auto",padding:"20px"}}>
          <button onClick={()=>setScreen("landing")} style={{background:"none",border:"none",color:"#666"}}>← Back</button>
          <div style={S.card}>
            <h2 style={{fontSize:"24px",fontWeight:900}}>Your Details</h2>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px",marginTop:"14px"}}>
              <input placeholder="Age 23" value={form.age} onChange={e=>setForm({...form,age:e.target.value})} style={{padding:"14px",borderRadius:"12px",background:"black",border:"1px solid #333",color:"white"}} />
              <input placeholder="Weight 70kg" value={form.weight} onChange={e=>setForm({...form,weight:e.target.value})} style={{padding:"14px",borderRadius:"12px",background:"black",border:"1px solid #333",color:"white"}} />
            </div>
            <div style={{display:"flex",gap:"8px",marginTop:"12px"}}>
              {["muscle gain","fat loss","strength"].map(g=><button key={g} onClick={()=>setForm({...form,goal:g})} style={{flex:1,padding:"10px",borderRadius:"10px",border:"1px solid #333",background:form.goal===g?"#facc15":"black",color:form.goal===g?"black":"#888",fontWeight:800,fontSize:"11px"}}>{g}</button>)}
            </div>
            <div style={{display:"flex",gap:"8px",marginTop:"10px"}}>
              {["veg","non-veg"].map(t=><button key={t} onClick={()=>setForm({...form,type:t})} style={{flex:1,padding:"10px",borderRadius:"10px",border:"1px solid #333",background:form.type===t?"white":"black",color:form.type===t?"black":"white",fontWeight:800,fontSize:"11px"}}>{t.toUpperCase()}</button>)}
            </div>
            <div style={{display:"flex",gap:"8px",marginTop:"10px"}}>
              {[3,4,5,6].map(d=><button key={d} onClick={()=>setForm({...form,days:d})} style={{flex:1,padding:"12px",borderRadius:"12px",border:"1px solid #333",background:form.days===d?"white":"black",color:form.days===d?"black":"white",fontWeight:900}}>{d}D</button>)}
            </div>
            <button onClick={generate} style={{...S.btn,width:"100%",marginTop:"16px"}}>{loading?"Building Ultra Plan...":"Generate Ultra Plan →"}</button>
          </div>
        </div>
      )}

      {screen==="plan" && plan && (
        <div style={{maxWidth:"700px",margin:"0 auto",padding:"20px"}}>
          {!paid ? (
            <div style={{...S.card,textAlign:"center",padding:"40px"}}>
              <div style={{fontSize:"40px"}}>🔒</div>
              <h2 style={{fontSize:"28px",fontWeight:900,marginTop:"10px"}}>Your Ultra Plan Ready!</h2>
              <p style={{color:"#888"}}>5-day workout + full Indian diet + macros worth ₹1999</p>
              <button onClick={()=>setPaid(true)} style={{...S.btn,width:"100%",marginTop:"16px"}}>Unlock for ₹299 →</button>
              <button onClick={()=>setPaid(true)} style={{background:"none",border:"none",color:"#555",textDecoration:"underline",marginTop:"10px"}}>Demo Unlock</button>
            </div>
          ):(
            <>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <h2 style={{fontSize:"26px",fontWeight:900}}>🔥 Ultra PRO Plan</h2>
                <button onClick={()=>window.print()} style={{background:"white",color:"black",padding:"8px 14px",borderRadius:"20px",fontWeight:900,border:"none"}}>📄 PDF</button>
              </div>

              <div style={S.card}>
                <div style={{display:"flex",justifyContent:"space-between"}}>
                  <b style={{fontSize:"12px",letterSpacing:"1px"}}>CALORIE & MACROS</b>
                  <span style={{fontSize:"11px",color:"#facc15"}}>{form.weight}KG • {form.goal.toUpperCase()}</span>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"10px",marginTop:"12px"}}>
                  <div style={{background:"black",padding:"12px",borderRadius:"12px",textAlign:"center"}}><div style={{fontSize:"20px",fontWeight:900}}>{form.goal==="fat loss"?parseInt(form.weight)*28:parseInt(form.weight)*35}</div><div style={{fontSize:"10px",color:"#666"}}>KCAL</div></div>
                  <div style={{background:"black",padding:"12px",borderRadius:"12px",textAlign:"center"}}><div style={{fontSize:"20px",fontWeight:900}}>{Math.round(parseInt(form.weight)*2.2)}g</div><div style={{fontSize:"10px",color:"#666"}}>PROTEIN</div></div>
                  <div style={{background:"black",padding:"12px",borderRadius:"12px",textAlign:"center"}}><div style={{fontSize:"20px",fontWeight:900}}>60%</div><div style={{fontSize:"10px",color:"#666"}}>FOLLOW RATE</div></div>
                </div>
              </div>

              <div style={S.card}>
                <b style={{fontSize:"12px"}}>💪 WORKOUT - {form.days} DAYS (Tap to complete)</b>
                {(plan.workout||[]).map((w,i)=>(
                  <label key={i} style={{display:"flex",gap:"10px",background:"#0f0f0f",padding:"12px",borderRadius:"12px",marginTop:"10px",fontSize:"13px",fontWeight:600}}>
                    <input type="checkbox" /> {w}
                  </label>
                ))}
              </div>

              <div style={{...S.card,background:"#facc15",color:"black"}}>
                <b style={{fontSize:"12px"}}>🥗 DIET PLAN - {form.type.toUpperCase()}</b>
                <div style={{marginTop:"10px",display:"grid",gap:"8px"}}>
                  {(plan.diet||"").split("\n").slice(0,8).map((line,idx)=> line.trim() && (
                    <div key={idx} style={{background:"rgba(0,0,0,0.08)",padding:"10px 12px",borderRadius:"10px",fontSize:"12px",fontWeight:600}}>{line}</div>
                  ))}
                </div>
              </div>

              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px",marginTop:"14px"}}>
                <button onClick={()=>window.open(`https://wa.me/?text=My FitCoach AI Plan: ${window.location.href}`)} style={{background:"#25D366",color:"white",padding:"14px",borderRadius:"14px",border:"none",fontWeight:900}}>Share on WhatsApp</button>
                <button onClick={()=>setScreen("form")} style={{background:"white",color:"black",padding:"14px",borderRadius:"14px",border:"none",fontWeight:900}}>New Plan</button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}