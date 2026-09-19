import { useState, useRef } from "react"

function FullScreenMediaHero({ id, kicker, title, desc, btn, defaultMedia, objectPos, onBtn }) {
  const inputRef = useRef(null)
  const [pos, setPos] = useState(objectPos || "50% 35%")
  const [media, setMedia] = useState(() => {
    try {
      const s = localStorage.getItem(`fitcoach_fs_${id}`)
      return s ? JSON.parse(s) : { type: "image", src: defaultMedia }
    } catch { return { type: "image", src: defaultMedia } }
  })

  const upload = (e) => {
    const f = e.target.files[0]; if (!f) return
    const isVideo = f.type.startsWith("video/")
    const r = new FileReader()
    r.onload = (ev) => {
      const m = { type: isVideo ? "video" : "image", src: ev.target.result }
      setMedia(m); localStorage.setItem(`fitcoach_fs_${id}`, JSON.stringify(m))
    }
    r.readAsDataURL(f)
  }

  return (
    <section style={{
      position:"relative", width:"100vw", minHeight:"100svh", height:"100svh",
      overflow:"hidden", margin:0, padding:0, background:"#000"
    }}>
      {media.type === "video" ? (
        <video src={media.src} autoPlay muted loop playsInline
          style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", objectPosition:pos }} />
      ) : (
        <img src={media.src} alt={title}
          style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", objectPosition:pos }} />
      )}

      {/* CINEMATIC OVERLAY - NOT TOO DARK */}
      <div style={{
        position:"absolute", inset:0,
        background:`linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.15) 55%, rgba(0,0,0,0.35) 100%)`
      }} />

      {/* TEXT - BOTTOM LEFT LIKE PREMIUM FITNESS APP */}
      <div style={{
        position:"relative", zIndex:2, height:"100%", width:"100%",
        display:"flex", flexDirection:"column", justifyContent:"flex-end",
        padding:"clamp(20px,6vw,80px)", paddingBottom:"clamp(30px,8vh,80px)"
      }}>
        <p style={{ color:"#FFC100", fontSize:11, letterSpacing:3, fontWeight:900 }}>{kicker}</p>
        <h1 style={{
          color:"#fff", fontWeight:900, fontSize:"clamp(36px,6vw,72px)",
          lineHeight:0.9, letterSpacing:-2, marginTop:12, whiteSpace:"pre-line"
        }}>{title}</h1>
        <p style={{ color:"rgba(255,255,255,0.8)", fontSize:"clamp(13px,1.6vw,15px)", lineHeight:1.6, maxWidth:460, marginTop:16 }}>{desc}</p>

        <div style={{ display:"flex", gap:10, marginTop:28, flexWrap:"wrap", alignItems:"center" }}>
          <button onClick={onBtn} style={{
            background:"#fff", color:"#000", border:"none",
            padding:"16px 28px", borderRadius:100, fontWeight:900, fontSize:13
          }}>{btn} →</button>
          <button onClick={() => inputRef.current.click()} style={{
            background:"rgba(255,255,255,0.12)", backdropFilter:"blur(12px)",
            color:"#fff", border:"1px solid rgba(255,255,255,0.2)",
            padding:"14px 18px", borderRadius:100, fontWeight:700, fontSize:11
          }}>↻ CHANGE MEDIA</button>

          {/* OBJECT-POSITION CONTROL */}
          <select value={pos} onChange={e=>setPos(e.target.value)} style={{
            background:"rgba(0,0,0,0.5)", color:"#fff", border:"1px solid rgba(255,255,255,0.2)",
            padding:"12px 10px", borderRadius:100, fontSize:11
          }}>
            <option value="50% 20%">Face Top</option>
            <option value="50% 35%">Center Top</option>
            <option value="50% 50%">Center</option>
            <option value="50% 70%">Lower</option>
          </select>
        </div>
      </div>

      <input ref={inputRef} type="file" accept="image/*,video/mp4,video/webm" onChange={upload} style={{ display:"none" }} />
    </section>
  )
}

export default function App() {
  const [page, setPage] = useState("home")
  return (
    <>
      <style>{`
        html, body, #root { margin:0 !important; padding:0 !important; width:100% !important; min-height:100% !important; overflow-x:hidden !important; background:#000; }
        * { margin:0; padding:0; box-sizing:border-box; }
        body { -webkit-font-smoothing:antialiased; }
      `}</style>

      {/* TRANSPARENT NAVBAR - ON TOP OF HERO, NO GAP */}
      <nav style={{
        position:"fixed", top:0, left:0, right:0, zIndex:100,
        width:"100vw", display:"flex", justifyContent:"space-between", alignItems:"center",
        padding:"18px 4vw", background:"linear-gradient(to bottom, rgba(0,0,0,0.7), transparent)",
        backdropFilter:"blur(2px)"
      }}>
        <b style={{ color:"#fff", fontSize:14, letterSpacing:1 }}>⩔ FITCOACH.AI</b>
        <div style={{ display:"flex", gap:24, alignItems:"center", color:"rgba(255,255,255,0.8)", fontSize:11, fontWeight:700 }}>
          <span className="hide-mobile" style={{ display:"none" }}>Programs</span>
          <button onClick={() => setPage("home")} style={{ background:"#fff", color:"#000", border:"none", padding:"10px 20px", borderRadius:100, fontWeight:900, fontSize:12 }}>Enroll Now</button>
        </div>
      </nav>

      <div style={{ width:"100vw", margin:0, padding:0, overflowX:"hidden" }}>
        {/* 1 - MY STORY */}
        <FullScreenMediaHero
          id="my-story"
          kicker="FOUNDER • SUNDARGARH, ODISHA"
          title={"SWAPNIL KUMAR\nPATEL"}
          desc="From Sundargarh, Odisha. Student builder. Built FITCOACH.AI to make fitness affordable at ₹299. Upload your gym photo here - it will cover full screen edge-to-edge."
          btn="START YOUR JOURNEY"
          objectPos="50% 25%"
          onBtn={() => window.scrollTo({ top: window.innerHeight, behavior:"smooth" })}
          defaultMedia="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=1400"
        />

        {/* 2 - SUCCESS */}
        <FullScreenMediaHero
          id="success"
          kicker="REAL TRANSFORMATIONS"
          title={"SUCCESS\nSTORIES"}
          desc="Real people. Real progress. Upload client before/after here. Replaces old media automatically."
          btn="VIEW STORIES"
          objectPos="50% 35%"
          onBtn={() => window.scrollTo({ top: window.innerHeight*2, behavior:"smooth" })}
          defaultMedia="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1400"
        />

        {/* 3 - WORKOUT */}
        <FullScreenMediaHero
          id="workout"
          kicker="TRAIN WITH PURPOSE"
          title={"BUILD\nSTRONGER"}
          desc="Supports MP4 video. Upload workout video - it will autoplay muted loop as full-screen background."
          btn="START TRAINING"
          objectPos="50% 40%"
          onBtn={() => window.scrollTo({ top: window.innerHeight*3, behavior:"smooth" })}
          defaultMedia="https://images.unsplash.com/photo-1599058917212-d75039770074?w=1400"
        />

        <div style={{ width:"100vw", background:"#000", color:"#fff", textAlign:"center", padding:"40px 5vw", fontSize:11, color:"#666" }}>
          © 2026 FITCOACH.AI • 100vw Edge-to-Edge • No Gaps • Made in Sundargarh
        </div>
      </div>
    </>
  )
}