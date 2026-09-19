import { useState } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL || "https://fitcoach-ai-backend.onrender.com";

export default function App(){
  const [screen,setScreen]=useState("landing");
  const [form,setForm]=useState({age:"23",weight:"65",goal:"muscle gain",days:5,type:"veg"});
  const [plan,setPlan]=useState(null);
  const [loading,setLoading]=useState(false);
  const [myPhoto,setMyPhoto]=useState(localStorage.getItem("myPhoto") || null);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => { setMyPhoto(ev.target.result); localStorage.setItem("myPhoto", ev.target.result); };
    reader.readAsDataURL(file);
  };

  const generate=async()=>{
    setLoading(true);
    try{ const r=await axios.post(`${API_URL}/generate`,form); setPlan(r.data); setScreen("plan"); }catch{ alert("Backend waking, wait 30s"); }
    setLoading(false);
  }

  return (
    <div style={{background:"#0a0a0a",color:"white",fontFamily:"Inter, sans-serif",overflowX:"hidden"}}>
      <style>{`
        *{box-sizing:border-box} html,body{margin:0;padding:0;overflow-x:hidden}
        img{display:block}
      `}</style>

      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 5%",background:"white",color:"#111",position:"sticky",top:0,zIndex:30,width:"100%"}}>
        <b style={{fontSize:18}}>⩔ FITCOACH.AI</b>
        <button onClick={()=>setScreen("form")} style={{background:"#111",color:"white",padding:"10px 20px",borderRadius:30,border:"none",fontWeight:800,cursor:"pointer"}}>Get Started</button>
      </div>

      {screen==="landing" && (
        <>
          {/* HERO - FIXED: NO CUT, TRUE FULL SCREEN */}
          <div style={{position:"relative",width:"100%",height:"92vh",minHeight:500,background:"#000",overflow:"hidden",display:"flex",alignItems:"center"}}>
            {/* Background Image - Covers FULL */}
            <div style={{position:"absolute",inset:0}}>
              <img src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=1200" style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top"}} />
              {/* Black gradient so text visible */}
              <div style={{position:"absolute",inset:0,background:"linear-gradient(90deg, #000 0%, #000 35%, rgba(0,0,0,0.3) 70%, transparent 100%)"}}></div>
            </div>

            {/* Text Content - On top */}
            <div style={{position:"relative",zIndex:2,padding:"0 5%",maxWidth:600}}>
              <div style={{color:"#ffb700",fontWeight:900,letterSpacing:2,fontSize:14,marginBottom:12}}>NEW LAUNCH • AI POWERED</div>
              <h1 style={{fontSize:"clamp(36px,6vw,72px)",fontWeight:900,lineHeight:0.9}}>ULTIMATE<br/>BULK SERIES</h1>
              <p style={{color:"#ccc",fontSize:16,marginTop:16,lineHeight:1.5}}>Complete Guide to Fast Weight & Muscle Gain - Built by AI for Indians. 100% Veg & Non-veg diet included.</p>
              <button onClick={()=>setScreen("form")} style={{marginTop:28,background:"white",color:"black",padding:"16px 36px",borderRadius:40,border:"none",fontWeight:900,fontSize:16,cursor:"pointer"}}>Enroll Now →</button>
              <div style={{display:"flex",gap:30,marginTop:32}}>
                <div><b style={{fontSize:22}}>5000+</b><div style={{fontSize:10,color:"#888"}}>EXERCISES</div></div>
                <div><b style={{fontSize:22}}>3000+</b><div style={{fontSize:10,color:"#888"}}>DIETS</div></div>
                <div><b style={{fontSize:22}}>₹299</b><div style={{fontSize:10,color:"#888"}}>ONLY</div></div>
              </div>
            </div>
          </div>

          {/* FOUNDER - FIXED: NO CUT, PHOTO FULL VISIBLE */}
          <div style={{display:"flex",width:"100%",flexWrap:"wrap",minHeight:"75vh",background:"#111"}}>
            <div style={{flex:1,minWidth:320,padding:"60px 5%",display:"flex",flexDirection:"column",justifyContent:"center"}}>
              <div style={{border:"1px solid #333",display:"inline-block",padding:"6px 14px",borderRadius:6,fontSize:11,width:"fit-content"}}>FOUNDER</div>
              <h2 style={{fontSize:34,fontWeight:900,marginTop:18}}>FITCOACH.AI</h2>
              <h3 style={{fontSize:26,fontWeight:800,marginTop:8,color:"#ffb700"}}>Swapnil Kumar Patel</h3>
              <p style={{color:"#777",fontSize:11,letterSpacing:1.2,marginTop:6,fontWeight:700}}>FROM SUNDARGARH, ODISHA</p>
              <p style={{color:"#aaa",fontSize:14,lineHeight:1.7,marginTop:22,maxWidth:500}}>
                Hey, I'm Swapnil Kumar Patel - student and self-taught developer from Sundargarh, Odisha.<br/><br/>
                I built FitCoach.AI because gym trainers charge ₹3000-₹5000 for a basic diet chart. This AI generates personalized workout + Indian diet in 15 seconds for just ₹299.<br/><br/>
                Mission: Affordable fitness for every student - clean UI, honest pricing, no fake promises.
              </p>
              <label style={{marginTop:24,background:"white",color:"black",padding:"12px 22px",borderRadius:30,fontSize:13,fontWeight:800,cursor:"pointer",width:"fit-content"}}>
                📷 Change Your Photo
                <input type="file" accept="image/*" onChange={handlePhotoUpload} style={{display:"none"}} />
              </label>
            </div>

            {/* Photo - FIXED: objectFit contain, no cut */}
            <div style={{flex:1,minWidth:320,background:"white",display:"flex",alignItems:"center",justifyContent:"center",padding:0,overflow:"hidden"}}>
              {myPhoto? (
                <img src={myPhoto} style={{width:"100%",height:"auto",maxHeight:"80vh",objectFit:"contain",objectPosition:"center top"}} alt="Swapnil" />
              ) : (
                <div style={{padding:40,textAlign:"center",color:"#666"}}>
                  <div style={{width:120,height:120,background:"#eee",borderRadius:"50%",margin:"0 auto 12px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:40}}>👤</div>
                  <div>Upload your photo</div>
                </div>
              )}
            </div>
          </div>

          <div style={{background:"white",color:"#111",padding:"60px 5%",textAlign:"center",width:"100%"}}>
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
        <div style={{maxWidth:600,margin:"0 auto",padding:20}}><pre style={{background:"#151515",padding:16,borderRadius:12,whiteSpace:"pre-wrap",fontSize:12}}>{JSON.stringify(plan,null,2).slice(0,5000)}</pre></div>
      )}
    </div>
  )
}