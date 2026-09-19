import { useState } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL || "https://fitcoach-ai-backend.onrender.com";

export default function App(){
  const [screen,setScreen]=useState("landing");
  const [form,setForm]=useState({age:"23",weight:"65",goal:"muscle gain",days:5,type:"veg"});
  const [plan,setPlan]=useState(null);
  const [loading,setLoading]=useState(false);

  const generate=async()=>{
    if(!form.age||!form.weight) return alert("Enter age & weight");
    setLoading(true);
    try{
      const r=await axios.post(`${API_URL}/generate`,form);
      setPlan(r.data); setScreen("plan");
    }catch{
      alert("Backend is waking up - wait 30 sec and try again");
    }
    setLoading(false);
  }

  return (
    <div style={{background:"#0a0a0a",color:"white",fontFamily:"'Inter', system-ui, sans-serif",minHeight:"100vh"}}>
      <style>{`@media(max-width:800px){.hero{flex-direction:column!important; height:auto!important; padding:30px 20px!important} .owner{flex-direction:column!important}}`}</style>

      {/* NAV - FULL WIDTH WHITE LIKE FITMUSK */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 5%",background:"white",color:"#111",position:"sticky",top:0,zIndex:30}}>
        <b style={{fontSize:18,letterSpacing:-0.5}}>⩔ FITCOACH.AI</b>
        <button onClick={()=>setScreen("form")} style={{background:"#111",color:"white",padding:"10px 20px",borderRadius:30,border:"none",fontWeight:800,fontSize:13,cursor:"pointer"}}>Get Started</button>
      </div>

      {screen==="landing" && (
        <>
          {/* FULL SCREEN HERO - EDGE TO EDGE */}
          <div className="hero" style={{width:"100%",height:"92vh",background:"#0a0a0a",display:"flex",alignItems:"center",overflow:"hidden"}}>
            <div style={{padding:"0 5%",flex:1,zIndex:2}}>
              <div style={{color:"#ffb700",fontWeight:900,letterSpacing:2,fontSize:15}}>NEW LAUNCH!</div>
              <h1 style={{fontSize:"clamp(38px,6vw,72px)",fontWeight:900,lineHeight:0.9,margin:"12px 0"}}>ULTIMATE<br/>BULK SERIES</h1>
              <p style={{color:"#aaa",fontSize:16,maxWidth:420,marginTop:12,lineHeight:1.5}}>Complete Guide to Fast Weight & Muscle Gain - AI Generated, Made for Indians. Veg & Non-veg support.</p>
              <button onClick={()=>setScreen("form")} style={{marginTop:24,background:"white",color:"black",padding:"16px 32px",borderRadius:40,border:"none",fontWeight:900,fontSize:15,cursor:"pointer"}}>Enroll Now →</button>
              <div style={{display:"flex",gap:24,marginTop:32}}>
                <div><b style={{fontSize:22}}>5,000+</b><div style={{fontSize:10,color:"#666",letterSpacing:1}}>EXERCISES</div></div>
                <div><b style={{fontSize:22}}>3,000+</b><div style={{fontSize:10,color:"#666",letterSpacing:1}}>DIET PLANS</div></div>
                <div><b style={{fontSize:22}}>₹299</b><div style={{fontSize:10,color:"#666",letterSpacing:1}}>ONLY</div></div>
              </div>
            </div>
            <div style={{flex:1.2,height:"100%",position:"relative"}}>
              <img src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800" style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"top center"}} alt="bulk" />
              <div style={{position:"absolute",inset:0,background:"linear-gradient(90deg,#0a0a0a 10%,transparent 50%)"}}></div>
            </div>
          </div>

          {/* OWNER SECTION - SWAPNIL KUMAR PATEL FROM SUNDARGARH */}
          <div className="owner" style={{width:"100%",display:"flex",minHeight:"72vh"}}>
            {/* LEFT - BIO */}
            <div style={{flex:1,background:"#111",padding:"50px 5%",display:"flex",flexDirection:"column",justifyContent:"center",minWidth:320}}>
              <div style={{border:"1px solid #333",display:"inline-block",padding:"6px 14px",borderRadius:6,fontSize:11,letterSpacing:1,width:"fit-content"}}>FOUNDER</div>
              <h2 style={{fontSize:36,fontWeight:900,marginTop:16,lineHeight:1}}>FITCOACH.AI</h2>
              <h3 style={{fontSize:24,fontWeight:800,marginTop:8,color:"#ffb700"}}>Swapnil Kumar Patel</h3>
              <p style={{color:"#888",fontSize:11,letterSpacing:1.2,marginTop:6,fontWeight:700}}>FROM SUNDARGARH, ODISHA • STUDENT BUILDER</p>
              
              <p style={{color:"#aaa",fontSize:13.5,lineHeight:1.7,marginTop:20,maxWidth:480}}>
                Hey, I'm Swapnil Kumar Patel - a student and self-taught developer from Sundargarh, Odisha. 
                I built FitCoach.AI because I saw gym trainers charging ₹3000-₹5000 for a basic diet chart, 
                while most students in Sundargarh can't afford it.<br/><br/>
                This is my learning project into AI + Fitness. I am not a pro bodybuilder like Abhinav Mahajan, 
                but I love tech. I used AI to build what FITMUSK does - personalized workout and Indian diet plans (veg/non-veg) 
                in 15 seconds for just ₹299.<br/><br/>
                My goal is simple: Make fitness coaching affordable for every student from Sundargarh to whole Bharat. 
                Clean UI, honest pricing, no fake promises. This is Version 1 - more features coming.
              </p>
              <div style={{display:"flex",gap:10,marginTop:22}}>
                <span style={{background:"white",color:"black",padding:"9px 18px",borderRadius:20,fontSize:12,fontWeight:700}}>Built in Sundargarh</span>
                <span style={{border:"1px solid #333",color:"white",padding:"9px 18px",borderRadius:20,fontSize:12,fontWeight:600}}>AI + Fitness</span>
              </div>
            </div>
            
            {/* RIGHT - PHOTO PLACEHOLDER */}
            <div style={{flex:1,minWidth:320,background:"#e8e8e8",position:"relative",minHeight:500,display:"flex",alignItems:"center",justifyContent:"center"}}>
              <div style={{textAlign:"center",color:"#777"}}>
                <div style={{width:130,height:130,background:"#ccc",borderRadius:"50%",margin:"0 auto 12px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:40}}>👤</div>
                <div style={{fontSize:13,fontWeight:700,color:"#333"}}>YOUR PHOTO HERE</div>
                <div style={{fontSize:11,marginTop:4}}>Upload to imgur.com → paste link in code</div>
              </div>
              <div style={{position:"absolute",bottom:20,left:20,background:"white",color:"black",padding:"12px 18px",borderRadius:12,boxShadow:"0 4px 20px rgba(0,0,0,0.2)"}}>
                <b style={{fontSize:13}}>Swapnil Kumar Patel</b><div style={{fontSize:11,color:"#666"}}>Founder, FitCoach.AI • Sundargarh, Odisha</div>
              </div>
            </div>
          </div>

          {/* WHITE FEATURES */}
          <div style={{background:"white",color:"#111",padding:"60px 5%",textAlign:"center"}}>
            <h2 style={{fontSize:28,fontWeight:900}}>Fitness Made Simple</h2>
            <p style={{color:"#666",fontSize:13,marginTop:6}}>AI workout + Indian diet • ₹299 • No subscription trap</p>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:14,marginTop:28,maxWidth:1000,marginLeft:"auto",marginRight:"auto",textAlign:"left"}}>
              <div style={{border:"1px solid #eee",borderRadius:14,padding:18}}><b style={{fontSize:13}}>Personalized Workout</b><p style={{fontSize:12,color:"#666",marginTop:6,lineHeight:1.5}}>5-day AI split based on your goal with checkboxes.</p></div>
              <div style={{border:"1px solid #eee",borderRadius:14,padding:18}}><b style={{fontSize:13}}>Indian Diet</b><p style={{fontSize:12,color:"#666",marginTop:6,lineHeight:1.5}}>Veg/Non-veg, 2275 KCAL, 143g protein + grocery list.</p></div>
              <div style={{border:"1px solid #eee",borderRadius:14,padding:18}}><b style={{fontSize:13}}>PDF + Share</b><p style={{fontSize:12,color:"#666",marginTop:6,lineHeight:1.5}}>Download plan and share on WhatsApp in 1 click.</p></div>
              <div style={{border:"1px solid #eee",borderRadius:14,padding:18}}><b style={{fontSize:13}}>Sundargarh Built</b><p style={{fontSize:12,color:"#666",marginTop:6,lineHeight:1.5}}>Made in Odisha for Bharat - affordable pricing.</p></div>
            </div>
            <button onClick={()=>setScreen("form")} style={{marginTop:28,background:"#111",color:"white",padding:"14px 32px",borderRadius:30,border:"none",fontWeight:800,cursor:"pointer"}}>Generate Your Plan Now</button>
          </div>
        </>
      )}

      {/* FORM SCREEN */}
      {screen==="form" && (
        <div style={{maxWidth:440,margin:"0 auto",padding:"30px 16px",minHeight:"90vh"}}>
          <button onClick={()=>setScreen("landing")} style={{background:"none",border:"1px solid #333",color:"#aaa",padding:"6px 14px",borderRadius:20,cursor:"pointer",fontSize:12}}>← Back</button>
          <h2 style={{fontSize:26,fontWeight:900,marginTop:20}}>Let's Build Your Plan</h2>
          <p style={{color:"#777",fontSize:12,marginTop:4}}>Takes 15 seconds • Made in Sundargarh</p>
          <div style={{background:"#151515",border:"1px solid #222",borderRadius:16,padding:20,marginTop:20}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              <input value={form.age} onChange={e=>setForm({...form,age:e.target.value})} placeholder="Age - 23" style={{padding:14,background:"#0a0a0a",border:"1px solid #333",borderRadius:10,color:"white",outline:"none"}}/>
              <input value={form.weight} onChange={e=>setForm({...form,weight:e.target.value})} placeholder="Weight - 65kg" style={{padding:14,background:"#0a0a0a",border:"1px solid #333",borderRadius:10,color:"white",outline:"none"}}/>
            </div>
            <div style={{display:"flex",gap:8,marginTop:14}}>
              {["muscle gain","fat loss","strength"].map(g=><button key={g} onClick={()=>setForm({...form,goal:g})} style={{flex:1,padding:12,borderRadius:10,border:"1px solid #333",background:form.goal===g?"white":"#0a0a0a",color:form.goal===g?"black":"white",fontWeight:700,fontSize:11,cursor:"pointer"}}>{g}</button>)}
            </div>
            <div style={{display:"flex",gap:8,marginTop:10}}>
              {["veg","non-veg"].map(t=><button key={t} onClick={()=>setForm({...form,type:t})} style={{flex:1,padding:12,borderRadius:10,border:"1px solid #333",background:form.type===t?"white":"#0a0a0a",color:form.type===t?"black":"white",fontWeight:700,cursor:"pointer"}}>{t}</button>)}
            </div>
            <div style={{display:"flex",gap:8,marginTop:10}}>
              {[3,4,5,6].map(d=><button key={d} onClick={()=>setForm({...form,days:d})} style={{flex:1,padding:12,borderRadius:10,border:"1px solid #333",background:form.days===d?"#ffb700":"#0a0a0a",color:form.days===d?"black":"white",fontWeight:800,cursor:"pointer"}}>{d}D</button>)}
            </div>
            <button onClick={generate} style={{width:"100%",marginTop:18,padding:16,background:"white",color:"black",borderRadius:12,fontWeight:900,border:"none",cursor:"pointer"}}>{loading?"Generating... Please Wait":"Continue →"}</button>
          </div>
        </div>
      )}

      {/* PLAN SCREEN */}
      {screen==="plan" && plan && (
        <div style={{maxWidth:620,margin:"0 auto",padding:"20px 16px"}}>
          <button onClick={()=>setScreen("landing")} style={{background:"white",color:"black",border:"none",padding:"8px 14px",borderRadius:20,fontWeight:700,cursor:"pointer",fontSize:12}}>← Home</button>
          <h2 style={{fontSize:20,fontWeight:800,marginTop:16}}>Your Plan Ready ✅</h2>
          <pre style={{background:"#151515",padding:16,borderRadius:12,whiteSpace:"pre-wrap",fontSize:12,marginTop:12,border:"1px solid #222",lineHeight:1.6}}>{JSON.stringify(plan,null,2).slice(0,5000)}</pre>
        </div>
      )}
    </div>
  )
}