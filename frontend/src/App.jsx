import { useState, useEffect } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL || "https://fitcoach-ai-backend.onrender.com";

export default function App(){
  const [screen,setScreen]=useState("landing");
  const [form,setForm]=useState({age:"23",weight:"65",goal:"muscle gain",days:5,type:"veg"});
  const [plan,setPlan]=useState(null);
  const [loading,setLoading]=useState(false);
  const [myPhoto,setMyPhoto]=useState(localStorage.getItem("myPhoto") || null);

  // Photo upload function
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setMyPhoto(ev.target.result);
      localStorage.setItem("myPhoto", ev.target.result);
    };
    reader.readAsDataURL(file);
  };

  const generate=async()=>{
    if(!form.age||!form.weight) return alert("Enter age weight");
    setLoading(true);
    try{ const r=await axios.post(`${API_URL}/generate`,form); setPlan(r.data); setScreen("plan"); }catch{ alert("Backend waking... wait 30 sec"); }
    setLoading(false);
  }

  return (
    <div style={{background:"#0a0a0a",color:"white",fontFamily:"Inter, sans-serif",margin:0,padding:0,overflowX:"hidden"}}>
      <style>{`
        *{margin:0;padding:0;box-sizing:border-box}
        body{margin:0!important}
        @media(max-width:800px){.hero{flex-direction:column!important; height:auto!important}.hero-img{height:50vh!important}.owner{flex-direction:column!important}}
      `}</style>

      {/* NAV */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 5%",background:"white",color:"#111",position:"sticky",top:0,zIndex:30,width:"100vw"}}>
        <b style={{fontSize:18}}>⩔ FITCOACH.AI</b>
        <button onClick={()=>setScreen("form")} style={{background:"#111",color:"white",padding:"10px 20px",borderRadius:30,border:"none",fontWeight:800,cursor:"pointer"}}>Get Started</button>
      </div>

      {screen==="landing" && (
        <>
          {/* FULL SCREEN HERO - TRUE FULL SCREEN 100vw */}
          <div className="hero" style={{width:"100vw",height:"100vh",display:"flex",background:"#000",position:"relative"}}>
            {/* LEFT TEXT - FULL */}
            <div style={{flex:1,display:"flex",flexDirection:"column",justifyContent:"center",padding:"0 5%",zIndex:2,background:"#0a0a0a"}}>
              <div style={{color:"#ffb700",fontWeight:900,letterSpacing:2,fontSize:14,marginBottom:12}}>NEW LAUNCH • AI POWERED</div>
              <h1 style={{fontSize:"clamp(40px,6vw,80px)",fontWeight:900,lineHeight:0.9}}>ULTIMATE<br/>BULK SERIES</h1>
              <p style={{color:"#aaa",fontSize:17,marginTop:16,lineHeight:1.5,maxWidth:440}}>Complete Guide to Fast Weight & Muscle Gain - Built by AI for Indians. 100% Veg & Non-veg diet included.</p>
              <button onClick={()=>setScreen("form")} style={{marginTop:28,width:"fit-content",background:"white",color:"black",padding:"16px 36px",borderRadius:40,border:"none",fontWeight:900,fontSize:16,cursor:"pointer"}}>Enroll Now →</button>
              <div style={{display:"flex",gap:30,marginTop:36}}>
                <div><b style={{fontSize:24}}>5000+</b><div style={{fontSize:10,color:"#666"}}>EXERCISES</div></div>
                <div><b style={{fontSize:24}}>3000+</b><div style={{fontSize:10,color:"#666"}}>DIETS</div></div>
                <div><b style={{fontSize:24}}>₹299</b><div style={{fontSize:10,color:"#666"}}>ONLY</div></div>
              </div>
            </div>
            {/* RIGHT IMAGE - FULL SCREEN */}
            <div className="hero-img" style={{flex:1.3,height:"100vh",position:"relative"}}>
              <img src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=900" style={{width:"100%",height:"100%",objectFit:"cover"}} />
              <div style={{position:"absolute",inset:0,background:"linear-gradient(90deg,#0a0a0a 0%,transparent 60%)"}}></div>
            </div>
          </div>

          {/* FOUNDER SECTION - ONLY YOUR NAME, NO FITMUSK/ABHINAV */}
          <div className="owner" style={{width:"100vw",display:"flex",minHeight:"80vh",background:"#111"}}>
            <div style={{flex:1,padding:"60px 5%",display:"flex",flexDirection:"column",justifyContent:"center"}}>
              <div style={{border:"1px solid #333",display:"inline-block",padding:"6px 14px",borderRadius:6,fontSize:11,width:"fit-content"}}>FOUNDER</div>
              <h2 style={{fontSize:36,fontWeight:900,marginTop:18}}>FITCOACH.AI</h2>
              <h3 style={{fontSize:28,fontWeight:800,marginTop:8,color:"#ffb700"}}>Swapnil Kumar Patel</h3>
              <p style={{color:"#777",fontSize:11,letterSpacing:1.2,marginTop:6,fontWeight:700}}>FROM SUNDARGARH, ODISHA • STUDENT BUILDER</p>

              <p style={{color:"#aaa",fontSize:14,lineHeight:1.7,marginTop:22,maxWidth:500}}>
                Hey, I'm Swapnil Kumar Patel - a student and self-taught developer from Sundargarh, Odisha.<br/><br/>
                I built FitCoach.AI because gym trainers charge ₹3000-₹5000 for a basic diet chart that most students can't afford.
                This platform generates personalized workout and Indian diet plans in 15 seconds using AI.<br/><br/>
                My mission is to make fitness affordable for every student - clean UI, honest pricing at ₹299, no fake promises.
                This is V1, more features coming soon.
              </p>

              <div style={{marginTop:24,display:"flex",gap:10}}>
                <label style={{background:"white",color:"black",padding:"10px 20px",borderRadius:30,fontSize:13,fontWeight:800,cursor:"pointer"}}>
                  📷 Upload Your Photo
                  <input type="file" accept="image/*" onChange={handlePhotoUpload} style={{display:"none"}} />
                </label>
                <span style={{border:"1px solid #333",color:"white",padding:"10px 20px",borderRadius:30,fontSize:12}}>Built in Sundargarh</span>
              </div>
              <p style={{fontSize:10,color:"#555",marginTop:8}}>Click upload, select your photo from laptop - it will save automatically</p>
            </div>

            <div style={{flex:1,background:"#f0f0f0",position:"relative",minHeight:600,display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden"}}>
              {myPhoto? (
                <img src={myPhoto} style={{width:"100%",height:"100%",objectFit:"cover"}} alt="Swapnil" />
              ) : (
                <div style={{textAlign:"center",color:"#666"}}>
                  <div style={{width:140,height:140,background:"#ddd",borderRadius:"50%",margin:"0 auto 16px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:50}}>👤</div>
                  <b style={{color:"#111"}}>No Photo Yet</b><div style={{fontSize:12,marginTop:6}}>Click Upload button on left</div>
                </div>
              )}
              <div style={{position:"absolute",bottom:20,left:20,background:"white",color:"black",padding:"12px 18px",borderRadius:12}}>
                <b style={{fontSize:13}}>Swapnil Kumar Patel</b><div style={{fontSize:11,color:"#666"}}>Founder, FitCoach.AI • Sundargarh, Odisha</div>
              </div>
            </div>
          </div>

          <div style={{background:"white",color:"#111",padding:"60px 5%",textAlign:"center",width:"100vw"}}>
            <h2 style={{fontSize:28,fontWeight:900}}>Fitness Made Simple</h2>
            <button onClick={()=>setScreen("form")} style={{marginTop:20,background:"#111",color:"white",padding:"14px 32px",borderRadius:30,border:"none",fontWeight:800,cursor:"pointer"}}>Generate Your Plan Now - ₹299</button>
          </div>
        </>
      )}

      {screen==="form" && (
        <div style={{maxWidth:440,margin:"0 auto",padding:"30px 16px",minHeight:"90vh"}}>
          <button onClick={()=>setScreen("landing")} style={{background:"none",border:"1px solid #333",color:"#aaa",padding:"6px 14px",borderRadius:20,cursor:"pointer"}}>← Back</button>
          <h2 style={{fontSize:26,fontWeight:900,marginTop:20}}>Let's Build</h2>
          <div style={{background:"#151515",border:"1px solid #222",borderRadius:16,padding:20,marginTop:20}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              <input value={form.age} onChange={e=>setForm({...form,age:e.target.value})} placeholder="Age 23" style={{padding:14,background:"#0a0a0a",border:"1px solid #333",borderRadius:10,color:"white"}}/>
              <input value={form.weight} onChange={e=>setForm({...form,weight:e.target.value})} placeholder="Weight 65" style={{padding:14,background:"#0a0a0a",border:"1px solid #333",borderRadius:10,color:"white"}}/>
            </div>
            <button onClick={generate} style={{width:"100%",marginTop:16,padding:16,background:"white",color:"black",borderRadius:12,fontWeight:900,border:"none",cursor:"pointer"}}>{loading?"Generating...":"Continue →"}</button>
          </div>
        </div>
      )}

      {screen==="plan" && plan && (
        <div style={{maxWidth:600,margin:"0 auto",padding:20}}><pre style={{background:"#151515",padding:16,borderRadius:12,whiteSpace:"pre-wrap",fontSize:12}}>{JSON.stringify(plan,null,2).slice(0,4000)}</pre></div>
      )}
    </div>
  )
}