import { useState } from "react"
import axios from "axios"

const API = import.meta.env.VITE_API_URL || "https://fitcoach-ai-backend.onrender.com"

export default function App(){
  const [screen,setScreen]=useState("landing")
  const [form,setForm]=useState({age:"23",weight:"65",goal:"muscle gain",type:"veg"})
  const [plan,setPlan]=useState(null)
  const [loading,setLoading]=useState(false)
  const [myPhoto,setMyPhoto]=useState(localStorage.getItem("myPhoto") || null)

  const handlePhoto = (e) => {
    const file = e.target.files[0]
    if(!file) return
    const r = new FileReader()
    r.onload = (ev)=>{
      setMyPhoto(ev.target.result)
      localStorage.setItem("myPhoto", ev.target.result)
    }
    r.readAsDataURL(file)
  }

  const generate = async ()=>{
    setLoading(true)
    try{
      const res = await axios.post(`${API}/generate`, form)
      setPlan(res.data)
      setScreen("plan")
    }catch{
      alert("Backend waking up, wait 30 seconds and try again")
    }
    setLoading(false)
  }

  return (
    <div className="fitcoach-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;800;900&display=swap');
        *{margin:0;padding:0;box-sizing:border-box}
        html,body,#root{width:100%;overflow-x:hidden;background:#070708}
       .fitcoach-root{font-family:'Inter',sans-serif;background:#070708;color:#fff;overflow-x:hidden}

        /* NAVBAR - INTEGRATED, NO GAP */
       .navbar{
          position:absolute;top:0;left:0;right:0;z-index:10;
          display:flex;justify-content:space-between;align-items:center;
          padding:18px 4%;background:transparent;
        }
       .nav-logo{font-weight:900;letter-spacing:0.5px;font-size:15px}
       .nav-cta{background:#fff;color:#000;padding:10px 22px;border-radius:100px;border:none;font-weight:800;font-size:13px;cursor:pointer}

        /* HERO - 100vh PREMIUM SPLIT */
       .hero{
          width:100%;
          min-height:100vh;
          display:flex;
          background:#070708;
        }
       .hero-left{
          width:50%;
          min-height:100vh;
          padding:110px 5% 60px 5%;
          display:flex;
          flex-direction:column;
          justify-content:center;
          background:#070708;
          position:relative;
          z-index:2;
        }
       .badge{
          display:inline-flex;
          border:1px solid #2a2a2a;
          padding:6px 12px;
          border-radius:6px;
          font-size:10px;
          letter-spacing:1.5px;
          font-weight:700;
          color:#9a9a9a;
          width:fit-content;
        }
       .hero-title{
          margin-top:22px;
          font-size:14px;
          letter-spacing:2px;
          font-weight:800;
          color:#6f6f6f;
        }
       .hero-name{
          margin-top:8px;
          font-size:clamp(34px, 4vw, 52px);
          font-weight:900;
          line-height:0.95;
          letter-spacing:-1px;
        }
       .hero-name span{color:#FFC100}
       .hero-loc{
          margin-top:10px;
          font-size:11px;
          letter-spacing:1.6px;
          font-weight:700;
          color:#5a5a5a;
        }
       .hero-desc{
          margin-top:28px;
          color:#9a9a9a;
          font-size:14.5px;
          line-height:1.75;
          max-width:480px;
        }
       .hero-desc strong{color:#d0d0d0;font-weight:700}
       .hero-actions{
          margin-top:30px;
          display:flex;
          gap:12px;
          align-items:center;
          flex-wrap:wrap;
        }
       .btn-primary{
          background:#fff;color:#000;
          padding:14px 28px;border-radius:100px;
          border:none;font-weight:900;font-size:13px;cursor:pointer;
        }
       .btn-ghost{
          background:transparent;color:#fff;
          padding:12px 20px;border-radius:100px;
          border:1px solid #2a2a2a;font-weight:700;font-size:12px;cursor:pointer;
        }
       .upload-hint{margin-top:10px;font-size:10px;color:#444}

        /* RIGHT SIDE - IMAGE IS THE SURFACE ITSELF */
       .hero-right{
          width:50%;
          min-height:100vh;
          position:relative;
          background:#0f0f0f;
          overflow:hidden;
        }
       .hero-image{
          position:absolute;
          inset:0;
          width:100%;
          height:100%;
          object-fit:cover;
          object-position:center top;
          display:block;
        }
       .hero-image-placeholder{
          width:100%;height:100%;
          display:flex;align-items:center;justify-content:center;
          background:linear-gradient(180deg,#151515,#0a0a0a);
          color:#555;font-size:14px;
        }

        /* MOBILE - STACK, CONTENT FIRST, PHOTO PROMINENT */
        @media(max-width:900px){
         .navbar{position:relative;background:#070708;padding:14px 5%}
         .hero{flex-direction:column;min-height:auto}
         .hero-left{width:100%;min-height:auto;padding:40px 6% 36px}
         .hero-right{width:100%;min-height:68vh;height:68vh}
         .hero-image{object-position:center top}
         .hero-name{font-size:38px}
        }
      `}</style>

      <div className="navbar">
        <div className="nav-logo">⩔ FITCOACH.AI</div>
        <button className="nav-cta" onClick={()=>setScreen("form")}>Get Started</button>
      </div>

      {screen==="landing" && (
        <div className="hero">
          <div className="hero-left">
            <div className="badge">FOUNDER</div>
            <div className="hero-title">FITCOACH.AI</div>
            <div className="hero-name">Swapnil Kumar <br/><span>Patel</span></div>
            <div className="hero-loc">FROM SUNDARGARH, ODISHA • STUDENT BUILDER</div>

            <p className="hero-desc">
              Hey, I'm <strong>Swapnil Kumar Patel</strong> - a student and self-taught developer from Sundargarh, Odisha.<br/><br/>
              I built <strong>FitCoach.AI</strong> because gym trainers charge ₹3000-₹5000 for a basic diet chart that most students can't afford.
              This platform generates personalized workout and Indian diet plans in 15 seconds using AI.<br/><br/>
              My mission is simple: make fitness affordable for every student. Clean UI, honest pricing at <strong style={{color:"#FFC100"}}>₹299</strong>, no fake promises.
            </p>

            <div className="hero-actions">
              <button className="btn-primary" onClick={()=>setScreen("form")}>Enroll Now →</button>
              <label className="btn-ghost" style={{cursor:"pointer"}}>
                📷 Upload Photo
                <input type="file" accept="image/*" onChange={handlePhoto} style={{display:"none"}} />
              </label>
            </div>
            <div className="upload-hint">Your uploaded photo will fill the entire right side automatically and saves forever</div>
          </div>

          <div className="hero-right">
            {myPhoto? (
              <img src={myPhoto} alt="Swapnil Kumar Patel" className="hero-image" />
            ) : (
              <div className="hero-image-placeholder">
                <div style={{textAlign:"center"}}>
                  <div style={{fontSize:40,marginBottom:10}}>👤</div>
                  <div>Upload your fitness photo</div>
                  <div style={{fontSize:11,marginTop:6,color:"#666"}}>It will cover this full side</div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {screen==="form" && (
        <div style={{maxWidth:420,margin:"0 auto",padding:"100px 16px 40px",minHeight:"100vh"}}>
          <button onClick={()=>setScreen("landing")} style={{background:"none",border:"1px solid #2a2a2a",color:"#888",padding:"8px 14px",borderRadius:100,cursor:"pointer"}}>← Back</button>
          <h2 style={{fontSize:28,fontWeight:900,marginTop:24}}>Let's build your plan</h2>
          <div style={{background:"#111",border:"1px solid #222",borderRadius:16,padding:20,marginTop:20}}>
            <input value={form.age} onChange={e=>setForm({...form,age:e.target.value})} placeholder="Age - 23" style={{width:"100%",padding:14,background:"#070708",border:"1px solid #2a2a2a",borderRadius:10,color:"#fff",marginBottom:12}}/>
            <input value={form.weight} onChange={e=>setForm({...form,weight:e.target.value})} placeholder="Weight - 65" style={{width:"100%",padding:14,background:"#070708",border:"1px solid #2a2a2a",borderRadius:10,color:"#fff"}}/>
            <button onClick={generate} style={{width:"100%",marginTop:16,padding:14,background:"#fff",color:"#000",borderRadius:12,fontWeight:900,border:"none"}}>{loading?"Generating...":"Continue →"}</button>
          </div>
        </div>
      )}

      {screen==="plan" && plan && (
        <div style={{maxWidth:600,margin:"80px auto",padding:20}}>
          <pre style={{background:"#111",padding:16,borderRadius:12,whiteSpace:"pre-wrap",fontSize:12}}>{JSON.stringify(plan,null,2).slice(0,5000)}</pre>
          <button onClick={()=>setScreen("landing")} style={{marginTop:20,background:"#fff",color:"#000",padding:"10px 20px",borderRadius:20,border:"none"}}>Back to Home</button>
        </div>
      )}
    </div>
  )
}