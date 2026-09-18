import { useState } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL || "https://fitcoach-ai-backend.onrender.com";

export default function App(){
  const [screen,setScreen]=useState("landing");
  const [form,setForm]=useState({age:"23",weight:"65",goal:"muscle gain",days:5,type:"veg"});
  const [plan,setPlan]=useState(null);
  const [loading,setLoading]=useState(false);
  const [paid,setPaid]=useState(false);

  const generate=async()=>{
    if(!form.age||!form.weight) return alert("Enter age & weight");
    setLoading(true);
    try{
      const res=await axios.post(`${API_URL}/generate`,form);
      setPlan(res.data); setScreen("plan");
    }catch{ alert("Backend waking... wait 20 sec"); }
    setLoading(false);
  }

  const S = {
    page:{minHeight:"100vh",background:"#070707",color:"white",fontFamily:"Inter, system-ui"},
    nav:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"18px 20px",maxWidth:"1100px",margin:"0 auto"},
    btn:{background:"#facc15",color:"black",padding:"16px 28px",borderRadius:"40px",fontWeight:900,border:"none",cursor:"pointer"},
    card:{background:"#151515",border:"1px solid #262626",borderRadius:"20px",padding:"20px",marginTop:"14px"},
  };

  const dietLines = (plan?.diet||"").split("\n").filter(l=>l.includes("AM")||l.includes("PM"));

  return (
    <div style={S.page}>
      <div style={S.nav}>
        <b>FITCOACH<span style={{color:"#facc15"}}>.AI</span> <span style={{background:"#facc15",color:"black",fontSize:"9px",padding:"3px 7px",borderRadius:"10px",marginLeft:"6px"}}>ULTRA</span></b>
        <button style={{background:"white",color:"black",padding:"8px 18px",borderRadius:"20px",fontWeight:900,border:"none",cursor:"pointer"}} onClick={()=>setScreen("form")}>Get Plan</button>
      </div>

      {screen==="landing" && (
        <div style={{maxWidth:"1100px",margin:"0 auto",padding:"30px 20px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"}}>
          <div>
            <h1 style={{fontSize:"52px",fontWeight:900,lineHeight:0.9}}>Build Your<br/><span style={{color:"#facc15"}}>Stronger Self</span><br/>In 60 Days</h1>
            <p style={{color:"#777",marginTop:"14px"}}>AI like ₹5000 trainer + Diet + Grocery + Macros. Used by 12k+ Indians.</p>
            <button style={{...S.btn,marginTop:"20px"}} onClick={()=>setScreen("form")}>Get My AI Plan FREE →</button>
          </div>
          <img src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600" style={{width:"100%",height:"420px",objectFit:"cover",borderRadius:"24px"}} alt="gym" />
        </div>
      )}

      {screen==="form" && (
        <div style={{maxWidth:"460px",margin:"0 auto",padding:"20px"}}>
          <button onClick={()=>setScreen("landing")} style={{background:"none",border:"none",color:"#666",cursor:"pointer"}}>← Back</button>
          <div style={S.card}>
            <h2 style={{fontSize:"24px",fontWeight:900}}>Your Details</h2>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px",marginTop:"14px"}}>
              <input placeholder="Age 23" value={form.age} onChange={e=>setForm({...form,age:e.target.value})} style={{padding:"14px",borderRadius:"12px",background:"black",border:"1px solid #333",color:"white",width:"100%",boxSizing:"border-box"}} />
              <input placeholder="Weight 70kg" value={form.weight} onChange={e=>setForm({...form,weight:e.target.value})} style={{padding:"14px",borderRadius:"12px",background:"black",border:"1px solid #333",color:"white",width:"100%",boxSizing:"border-box"}} />
            </div>
            <div style={{display:"flex",gap:"8px",marginTop:"12px"}}>
              {["muscle gain","fat loss","strength"].map(g=><button key={g} onClick={()=>setForm({...form,goal:g})} style={{flex:1,padding:"10px",borderRadius:"10px",border:"1px solid #333",background:form.goal===g?"#facc15":"black",color:form.goal===g?"black":"#888",fontWeight:800,fontSize:"11px",cursor:"pointer"}}>{g}</button>)}
            </div>
            <div style={{display:"flex",gap:"8px",marginTop:"10px"}}>
              {["veg","non-veg"].map(t=><button key={t} onClick={()=>setForm({...form,type:t})} style={{flex:1,padding:"10px",borderRadius:"10px",border:"1px solid #333",background:form.type===t?"white":"black",color:form.type===t?"black":"white",fontWeight:800,fontSize:"11px",cursor:"pointer"}}>{t.toUpperCase()}</button>)}
            </div>
            <div style={{display:"flex",gap:"8px",marginTop:"10px"}}>
              {[3,4,5,6].map(d=><button key={d} onClick={()=>setForm({...form,days:d})} style={{flex:1,padding:"12px",borderRadius:"12px",border:"1px solid #333",background:form.days===d?"white":"black",color:form.days===d?"black":"white",fontWeight:900,cursor:"pointer"}}>{d}D</button>)}
            </div>
            <button onClick={generate} style={{...S.btn,width:"100%",marginTop:"16px"}}>{loading?"Building Ultra Plan...":"Generate Ultra Plan →"}</button>
          </div>
        </div>
      )}

      {screen==="plan" && plan && (
        <div style={{maxWidth:"680px",margin:"0 auto",padding:"20px"}}>
          {!paid ? (
            <div style={{...S.card,textAlign:"center",padding:"40px"}}>
              <div style={{fontSize:"40px"}}>🔒</div>
              <h2 style={{fontSize:"28px",fontWeight:900,marginTop:"10px"}}>Your Ultra Plan Ready!</h2>
              <p style={{color:"#888"}}>Unlock to see full polished diet cards</p>
              <button onClick={()=>setPaid(true)} style={{...S.btn,width:"100%",marginTop:"16px"}}>Unlock for ₹299 →</button>
              <button onClick={()=>setPaid(true)} style={{background:"none",border:"none",color:"#555",textDecoration:"underline",marginTop:"10px",cursor:"pointer"}}>Demo Unlock</button>
            </div>
          ):(
            <>
              <h2 style={{fontSize:"26px",fontWeight:900}}>🔥 Your Pro Plan Unlocked</h2>
              
              {/* WORKOUT - NOW WHITE CARDS FIXED */}
              <div style={{...S.card,background:"#facc15",borderRadius:"20px",padding:"18px"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"12px"}}>
                  <b style={{fontSize:"13px",letterSpacing:"1px",color:"black"}}>💪 WORKOUT - {form.days} DAYS</b>
                  <span style={{background:"black",color:"#facc15",fontSize:"10px",padding:"5px 10px",borderRadius:"20px",fontWeight:900}}>{form.goal.toUpperCase()}</span>
                </div>
                {(plan.workout||[]).map((w,i)=>(
                  <label key={i} style={{display:"flex",gap:"12px",background:"white",color:"black",padding:"14px 16px",borderRadius:"14px",marginTop:"10px",fontSize:"13px",fontWeight:800,lineHeight:1.4,boxShadow:"0 2px 10px rgba(0,0,0,0.12)",cursor:"pointer"}}>
                    <input type="checkbox" style={{width:"18px",height:"18px",marginTop:"2px"}} />
                    <span>🏋️ {w}</span>
                  </label>
                ))}
              </div>

              {/* DIET - POLISHED CARDS */}
              <div style={{background:"#facc15",borderRadius:"20px",padding:"18px",marginTop:"14px",color:"black"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"12px"}}>
                  <b style={{fontSize:"13px",letterSpacing:"1px"}}>🥗 DIET PLAN - {form.type.toUpperCase()}</b>
                  <span style={{background:"black",color:"#facc15",fontSize:"10px",padding:"5px 10px",borderRadius:"20px",fontWeight:900}}>{plan.diet.match(/\d+ KCAL/)?.[0]} | {plan.diet.match(/\d+g PROTEIN/)?.[0]}</span>
                </div>

                {dietLines.map((line,idx)=>{
                  const icon = line.includes("7:30") ? "🌅" : line.includes("9:00") ? "🍳" : line.includes("1:30") ? "🍛" : line.includes("5:00") ? "⚡" : line.includes("8:30") ? "🍲" : "🥛";
                  return (
                    <div key={idx} style={{background:"white",borderRadius:"14px",padding:"14px",marginTop:"10px",display:"flex",gap:"10px",alignItems:"flex-start",boxShadow:"0 2px 8px rgba(0,0,0,0.08)"}}>
                      <div style={{fontSize:"18px"}}>{icon}</div>
                      <div>
                        <div style={{fontSize:"11px",fontWeight:900,opacity:0.6}}>{line.split("-")[0]}</div>
                        <div style={{fontSize:"13px",fontWeight:700,marginTop:"2px",lineHeight:1.4}}>{line.split("-").slice(1).join("-").trim()}</div>
                      </div>
                    </div>
                  )
                })}

                <div style={{background:"black",color:"white",borderRadius:"14px",padding:"14px",marginTop:"12px"}}>
                  <div style={{fontSize:"11px",fontWeight:900,color:"#facc15"}}>🛒 GROCERY + TIPS</div>
                  <div style={{fontSize:"12px",marginTop:"6px",lineHeight:1.5,whiteSpace:"pre-wrap"}}>{(plan.diet.split("🛒")[1]||"").slice(0,400)}</div>
                </div>
              </div>

              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px",marginTop:"14px"}}>
                <button onClick={()=>window.open(`https://wa.me/?text=Check my FitCoach AI Plan: ${window.location.href}`)} style={{background:"#25D366",color:"white",padding:"14px",borderRadius:"14px",border:"none",fontWeight:900,cursor:"pointer"}}>Share on WhatsApp</button>
                <button onClick={()=>window.print()} style={{background:"white",color:"black",padding:"14px",borderRadius:"14px",border:"none",fontWeight:900,cursor:"pointer"}}>📄 Save PDF</button>
              </div>
              <button onClick={()=>setScreen("form")} style={{background:"none",border:"1px solid #333",color:"#666",padding:"12px",borderRadius:"14px",width:"100%",marginTop:"10px",cursor:"pointer"}}>Create New Plan</button>
            </>
          )}
        </div>
      )}
    </div>
  )
}