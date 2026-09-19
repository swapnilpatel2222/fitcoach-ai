import { useState, useRef } from "react"
import axios from "axios"
const API = import.meta.env.VITE_API_URL || "https://fitcoach-ai-backend.onrender.com"

// ============ REUSABLE MEDIA COMPONENT - DO NOT HARDCODE ============
function MediaHero({ id, title, subtitle, desc, buttonText, onAction, defaultImg }){
  const fileRef = useRef(null)
  const [media, setMedia] = useState(()=>{
    const saved = localStorage.getItem(`fitcoach_media_${id}`)
    if(saved) return JSON.parse(saved)
    return { type:"image", src: defaultImg }
  })

  const handleUpload = (e)=>{
    const file = e.target.files[0]; if(!file) return
    const isVideo = file.type.startsWith("video/")
    const reader = new FileReader()
    reader.onload = (ev)=>{
      const newMedia = { type: isVideo ? "video" : "image", src: ev.target.result }
      setMedia(newMedia)
      localStorage.setItem(`fitcoach_media_${id}`, JSON.stringify(newMedia))
    }
    reader.readAsDataURL(file)
  }

  return(
    <div style={{position:"relative",width:"100%",height:"100vh",minHeight:"650px",overflow:"hidden",background:"#070708"}}>
      {/* MEDIA - FULL COVER, NO WHITE BOX */}
      {media.type==="video" ? (
        <video src={media.src} autoPlay muted loop playsInline style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"center"}}/>
      ) : (
        <img src={media.src} alt={title} style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"center"}}/>
      )}

      {/* GRADIENT FOR TEXT READABLE */}
      <div style={{position:"absolute",inset:0,background:"linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.15) 100%), linear-gradient(0deg, rgba(0,0,0,0.6) 0%, transparent 60%)"}}/>

      {/* CONTENT OVERLAY */}
      <div style={{position:"relative",zIndex:2,height:"100%",display:"flex",flexDirection:"column",justifyContent:"center",padding:"0 6%",maxWidth:600}}>
        <p style={{color:"#FFC100",fontSize:11,letterSpacing:2.5,fontWeight:800}}>{subtitle}</p>
        <h2 style={{color:"#fff",fontSize:"clamp(32px,5vw,56px)",fontWeight:900,lineHeight:0.9,marginTop:12,letterSpacing:-1}}>{title}</h2>
        <p style={{color:"#c7c7c7",fontSize:14,lineHeight:1.6,marginTop:18,maxWidth:420}}>{desc}</p>
        <div style={{display:"flex",gap:12,marginTop:26,flexWrap:"wrap"}}>
          <button onClick={onAction} style={{background:"#fff",color:"#000",padding:"14px 26px",borderRadius:100,border:"none",fontWeight:900,fontSize:13}}>{buttonText} →</button>
          <button onClick={()=>fileRef.current.click()} style={{background:"rgba(255,255,255,0.1)",backdropFilter:"blur(10px)",color:"#fff",padding:"14px 20px",borderRadius:100,border:"1px solid rgba(255,255,255,0.2)",fontWeight:700,fontSize:12}}>↻ Change Media</button>
        </div>
        <p style={{color:"#666",fontSize:10,marginTop:10}}>Supports JPG, PNG, WEBP, MP4 - Replaces old media</p>
      </div>

      {/* HIDDEN INPUT - ALWAYS ACTIVE */}
      <input ref={fileRef} type="file" accept="image/*,video/mp4,video/webm" onChange={handleUpload} style={{display:"none"}}/>
      
      {/* TOP BADGE */}
      <div style={{position:"absolute",top:20,right:20,zIndex:3,background:"rgba(0,0,0,0.6)",backdropFilter:"blur(8px)",color:"#fff",padding:"6px 12px",borderRadius:20,fontSize:10,border:"1px solid rgba(255,255,255,0.15)"}}>
        {media.type==="video" ? "▶ VIDEO ACTIVE" : "◉ IMAGE ACTIVE"} • {id.toUpperCase()}
      </div>
    </div>
  )
}

export default function App(){
const [screen,setScreen]=useState("home")
const [form,setForm]=useState({age:"23",weight:"65",goal:"muscle gain",type:"veg"})
const [plan,setPlan]=useState(null)
const [loading,setLoading]=useState(false)

const gen=async()=>{setLoading(true); try{const r=await axios.post(`${API}/generate`,form); setPlan(r.data); setScreen("plan")}catch{alert("Backend waking, wait 30s")} setLoading(false)}

return(
<div style={{margin:0,background:"#fff",fontFamily:"Inter,sans-serif",overflowX:"hidden"}}>
<style>{`* {margin:0;padding:0;box-sizing:border-box} html,body{overflow-x:hidden} @import url('https://fonts.googleapis.com/css2?family=Inter:wght@700;800;900&display=swap')`}</style>

<div style={{position:"sticky",top:0,zIndex:50,display:"flex",justifyContent:"space-between",padding:"14px 4%",background:"#fff",borderBottom:"1px solid #eee"}}><b>⩔ FITCOACH.AI</b><button onClick={()=>setScreen("form")} style={{background:"#000",color:"#fff",padding:"8px 18px",borderRadius:20,border:"none",fontWeight:800}}>Enroll Now</button></div>

{screen==="home" && <>
{/* 1. MY STORY - UPLOAD YOUR PHOTO */}
<MediaHero 
  id="my-story"
  subtitle="FOUNDER • SUNDARGARH, ODISHA"
  title={`Swapnil Kumar\nPatel`}
  desc="Student builder from Sundargarh. Built FITCOACH.AI to make fitness affordable at ₹299. Upload your photo here - this is your personal story section."
  buttonText="Build My Plan"
  onAction={()=>setScreen("form")}
  defaultImg="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=1200"
/>

{/* 2. SUCCESS STORIES */}
<MediaHero 
  id="success-stories"
  subtitle="REAL RESULTS"
  title={`Success\nStories`}
  desc="Real people. Real progress. Upload client transformations, before/after photos here. Only latest upload will show."
  buttonText="View Stories"
  onAction={()=>setScreen("form")}
  defaultImg="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200"
/>

{/* 3. WORKOUT */}
<MediaHero 
  id="workout"
  subtitle="TRAIN WITH PURPOSE"
  title={`Workout\nPlans`}
  desc="Build strength. Build discipline. Upload workout videos or gym photos. Supports MP4 video as background with autoplay."
  buttonText="Start Training"
  onAction={()=>setScreen("form")}
  defaultImg="https://images.unsplash.com/photo-1599058917212-d75039770074?w=1200"
/>

{/* 4. NUTRITION */}
<MediaHero 
  id="nutrition"
  subtitle="INDIAN DIET"
  title={`Personalised\nNutrition`}
  desc="Veg & Non-veg Indian meals. Roti, rice, dal, paneer, chicken. Upload diet photos, meal prep images here."
  buttonText="Get Diet Plan"
  onAction={()=>setScreen("form")}
  defaultImg="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200"
/>

{/* FOOTER */}
<div style={{background:"#000",color:"#fff",textAlign:"center",padding:"50px 5%"}}>
  <h2 style={{fontWeight:900}}>Fitness Made Simple With FITCOACH.AI</h2>
  <button onClick={()=>setScreen("form")} style={{marginTop:20,background:"#fff",color:"#000",padding:"12px 26px",borderRadius:30,border:"none",fontWeight:900}}>Get Started ₹299</button>
  <p style={{color:"#555",fontSize:11,marginTop:20}}>© 2026 FITCOACH.AI • Made in Sundargarh • Each section media is reusable & replaceable</p>
</div>
</>}

{screen==="form" && <div style={{maxWidth:420,margin:"40px auto",padding:16}}><button onClick={()=>setScreen("home")} style={{border:"1px solid #ddd",padding:"6px 12px",borderRadius:20,background:"none"}}>← Back</button><h2 style={{marginTop:20,fontWeight:900}}>Build Your Plan</h2><div style={{background:"#f7f7f7",padding:20,borderRadius:16,marginTop:16}}><input value={form.age} onChange={e=>setForm({...form,age:e.target.value})} placeholder="Age" style={{width:"100%",padding:12,borderRadius:8,border:"1px solid #ddd",marginBottom:10}}/><input value={form.weight} onChange={e=>setForm({...form,weight:e.target.value})} placeholder="Weight" style={{width:"100%",padding:12,borderRadius:8,border:"1px solid #ddd"}}/><button onClick={gen} style={{width:"100%",marginTop:14,padding:14,background:"#000",color:"#fff",borderRadius:10,fontWeight:800}}>{loading?"Creating...":"Continue →"}</button></div></div>}

{screen==="plan" && plan && <div style={{maxWidth:600,margin:"20px auto",padding:16}}><pre style={{background:"#111",color:"#fff",padding:12,whiteSpace:"pre-wrap",fontSize:12,borderRadius:12}}>{JSON.stringify(plan,null,2).slice(0,5000)}</pre></div>}
</div>
)
}