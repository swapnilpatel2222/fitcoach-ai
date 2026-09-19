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
    page:{minHeight:"100vh",background:"#fafafa",color:"#111",fontFamily:"'Inter', system-ui, -apple-system"},
    nav:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"20px 24px",maxWidth:"1100px",margin:"0 auto",background:"white",borderBottom:"1px solid #eaeaea",position:"sticky",top:0,zIndex:10},
    btnPrimary:{background:"#111",color:"white",padding:"14px 24px",borderRadius:"12px",fontWeight:600,fontSize:"14px",border:"none",cursor:"pointer"},
    btnSec:{background:"white",color:"#111",padding:"14px 24px",borderRadius:"12px",fontWeight:600,fontSize:"14px",border:"1px solid #e5e5e5",cursor:"pointer"},
    card:{background:"white",border:"1px solid #eaeaea",borderRadius:"16px",padding:"24px"},
    label:{fontSize:"11px",fontWeight:700,letterSpacing:"0.8px",color:"#888",marginBottom:"8px",display:"block"},
  };

  const dietLines = (plan?.diet||"").split("\n").filter(l=>l.includes("AM")||l.includes("PM"));

  return (
    <div style={S.page}>
      <div style={S.nav}>
        <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
          <div style={{width:"28px",height:"28px",background:"#111",borderRadius:"8px",display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontWeight:900,fontSize:"12px"}}>F</div>
          <b style={{fontSize:"16px",letterSpacing:"-0.3px"}}>FitCoach<span style={{fontWeight:400,color:"#888"}}>.ai</span></b>
        </div>
        <button style={S.btnSec} onClick={()=>setScreen("form")}>Get Started</button>
      </div>

      {screen==="landing" && (
        <div style={{maxWidth:"1100px",margin:"0 auto",padding:"60px 24px",display:"grid",gridTemplateColumns:"1.1fr 0.9fr",gap:"60px",alignItems:"center"}}>
          <div>
            <div style={{display:"inline-block",background:"white",border:"1px solid #eaeaea",padding:"6px 12px",borderRadius:"20px",fontSize:"11px",fontWeight:600,color:"#555",marginBottom:"20px"}}>● Trusted by 12,000+ Indians</div>
            <h1 style={{fontSize:"48px",fontWeight:700,lineHeight:1.05,letterSpacing:"-1.5px"}}>Personalized fitness,<br/>designed by AI.</h1>
            <p style={{color:"#666",marginTop:"18px",fontSize:"17px",lineHeight:1.6}}>Workout and nutrition plans tailored to your body, goal and lifestyle. No ads. No noise. Just results.</p>
            <div style={{display:"flex",gap:"12px",marginTop:"28px"}}>
              <button style={S.btnPrimary} onClick={()=>setScreen("form")}>Generate Your Plan →</button>
              <button style={S.btnSec}>See Example</button>
            </div>
            <div style={{display:"flex",gap:"24px",marginTop:"40px"}}>
              <div><b style={{fontSize:"18px"}}>5,000+</b><div style={{fontSize:"12px",color:"#888"}}>Exercises</div></div>
              <div><b style={{fontSize:"18px"}}>3,000+</b><div style={{fontSize:"12px",color:"#888"}}>Meal Plans</div></div>
              <div><b style={{fontSize:"18px"}}>4.9/5</b><div style={{fontSize:"12px",color:"#888"}}>Rating</div></div>
            </div>
          </div>
          <div style={S.card}>
            <img src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600" style={{width:"100%",height:"280px",objectFit:"cover",borderRadius:"12px"}} alt="gym" />
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px",marginTop:"16px"}}>
              <div style={{background:"#f6f6f6",padding:"14px",borderRadius:"12px"}}><div style={{fontSize:"11px",color:"#888"}}>WORKOUT</div><b style={{fontSize:"13px"}}>5 Day Split • Muscle Gain</b></div>
              <div style={{background:"#f6f6f6",padding:"14px",borderRadius:"12px"}}><div style={{fontSize:"11px",color:"#888"}}>NUTRITION</div><b style={{fontSize:"13px"}}>2,275 KCAL • 143g Protein</b></div>
            </div>
          </div>
        </div>
      )}

      {screen==="form" && (
        <div style={{maxWidth:"440px",margin:"0 auto",padding:"40px 20px"}}>
          <button onClick={()=>setScreen("landing")} style={{background:"none",border:"none",color:"#888",cursor:"pointer",fontSize:"13px",marginBottom:"16px"}}>← Back</button>
          <h2 style={{fontSize:"28px",fontWeight:700,letterSpacing:"-0.8px"}}>Let's build your plan.</h2>
          <p style={{color:"#888",fontSize:"14px",marginTop:"6px"}}>Takes 15 seconds. No signup required.</p>
          <div style={{...S.card,marginTop:"24px"}}>
            <label style={S.label}>BASIC INFO</label>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px"}}>
              <input placeholder="Age" value={form.age} onChange={e=>setForm({...form,age:e.target.value})} style={{padding:"14px",borderRadius:"10px",background:"#fafafa",border:"1px solid #eaeaea",width:"100%",boxSizing:"border-box"}} />
              <input placeholder="Weight (kg)" value={form.weight} onChange={e=>setForm({...form,weight:e.target.value})} style={{padding:"14px",borderRadius:"10px",background:"#fafafa",border:"1px solid #eaeaea",width:"100%",boxSizing:"border-box"}} />
            </div>

            <label style={{...S.label,marginTop:"20px"}}>GOAL</label>
            <div style={{display:"flex",gap:"8px"}}>
              {["muscle gain","fat loss","strength"].map(g=><button key={g} onClick={()=>setForm({...form,goal:g})} style={{flex:1,padding:"11px",borderRadius:"10px",border:"1px solid #eaeaea",background:form.goal===g?"#111":"white",color:form.goal===g?"white":"#111",fontWeight:500,fontSize:"12px",cursor:"pointer"}}>{g}</button>)}
            </div>

            <label style={{...S.label,marginTop:"20px"}}>DIET PREFERENCE</label>
            <div style={{display:"flex",gap:"8px"}}>
              {["veg","non-veg"].map(t=><button key={t} onClick={()=>setForm({...form,type:t})} style={{flex:1,padding:"11px",borderRadius:"10px",border:"1px solid #eaeaea",background:form.type===t?"#111":"white",color:form.type===t?"white":"#111",fontWeight:500,fontSize:"12px",cursor:"pointer"}}>{t}</button>)}
            </div>

            <label style={{...S.label,marginTop:"20px"}}>WORKOUT DAYS</label>
            <div style={{display:"flex",gap:"8px"}}>
              {[3,4,5,6].map(d=><button key={d} onClick={()=>setForm({...form,days:d})} style={{flex:1,padding:"12px",borderRadius:"10px",border:"1px solid #eaeaea",background:form.days===d?"#111":"white",color:form.days===d?"white":"#111",fontWeight:600,cursor:"pointer"}}>{d}</button>)}
            </div>

            <button onClick={generate} style={{...S.btnPrimary,width:"100%",marginTop:"24px",padding:"16px"}}>{loading?"Generating...":"Continue →"}</button>
            <div style={{textAlign:"center",fontSize:"11px",color:"#aaa",marginTop:"10px"}}>Secure • Private • No spam</div>
          </div>
        </div>
      )}

      {screen==="plan" && plan && (
        <div style={{maxWidth:"640px",margin:"0 auto",padding:"32px 20px"}}>
          {!paid ? (
            <div style={{...S.card,textAlign:"center",padding:"48px 24px"}}>
              <div style={{width:"48px",height:"48px",background:"#f6f6f6",borderRadius:"12px",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto",fontSize:"20px"}}>✓</div>
              <h2 style={{fontSize:"22px",fontWeight:700,marginTop:"16px",letterSpacing:"-0.5px"}}>Your plan is ready</h2>
              <p style={{color:"#888",fontSize:"14px",marginTop:"8px"}}>Unlock to view workout, diet and grocery list.</p>
              <button onClick={()=>setPaid(true)} style={{...S.btnPrimary,width:"100%",marginTop:"20px",padding:"16px"}}>Unlock for ₹299</button>
              <button onClick={()=>setPaid(true)} style={{background:"none",border:"none",color:"#888",fontSize:"12px",textDecoration:"underline",marginTop:"12px",cursor:"pointer"}}>Demo preview</button>
            </div>
          ):(
            <>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <h2 style={{fontSize:"20px",fontWeight:700}}>Your Plan</h2>
                <span style={{fontSize:"11px",background:"#111",color:"white",padding:"5px 10px",borderRadius:"20px"}}>{form.days} DAY • {form.goal.toUpperCase()}</span>
              </div>
              
              <div style={{...S.card,marginTop:"16px"}}>
                <label style={S.label}>WORKOUT</label>
                {(plan.workout||[]).map((w,i)=>(
                  <div key={i} style={{display:"flex",gap:"12px",padding:"14px",borderBottom:i<(plan.workout.length-1)?"1px solid #f0f0f0":"none",fontSize:"13px",fontWeight:500}}>
                    <input type="checkbox" />
                    <span>{w}</span>
                  </div>
                ))}
              </div>

              <div style={{...S.card,marginTop:"16px"}}>
                <label style={S.label}>NUTRITION • {plan.diet.match(/\d+ KCAL/)?.[0]} • {plan.diet.match(/\d+g PROTEIN/)?.[0]}</label>
                {dietLines.map((line,idx)=>(
                  <div key={idx} style={{display:"flex",gap:"12px",padding:"12px 0",borderBottom:idx<dietLines.length-1?"1px solid #f0f0f0":"none"}}>
                    <div style={{fontSize:"11px",fontWeight:700,color:"#888",minWidth:"66px"}}>{line.split("-")[0]}</div>
                    <div style={{fontSize:"13px",lineHeight:1.5}}>{line.split("-").slice(1).join("-").trim()}</div>
                  </div>
                ))}
              </div>

              <div style={{...S.card,marginTop:"16px",background:"#111",color:"white",borderColor:"#111"}}>
                <label style={{...S.label,color:"#888"}}>GROCERY & SUPPLEMENTS</label>
                <div style={{fontSize:"13px",lineHeight:1.6,color:"#bbb",whiteSpace:"pre-wrap"}}>{(plan.diet.split("🛒")[1]||"Grocery list will appear here...").slice(0,500)}</div>
              </div>

              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px",marginTop:"16px"}}>
                <button onClick={()=>window.print()} style={S.btnSec}>Download PDF</button>
                <button onClick={()=>window.open(`https://wa.me/?text=My FitCoach plan: ${window.location.href}`)} style={S.btnPrimary}>Share</button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}