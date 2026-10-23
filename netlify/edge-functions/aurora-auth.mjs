
const COOKIE_NAME = "aurora_session";
const SESSION_HOURS = 12;

function base64url(bytes){
  let binary = "";
  for(const b of new Uint8Array(bytes)) binary += String.fromCharCode(b);
  return btoa(binary).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"");
}
async function sign(value, secret){
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw", enc.encode(secret), {name:"HMAC",hash:"SHA-256"}, false, ["sign"]
  );
  return base64url(await crypto.subtle.sign("HMAC", key, enc.encode(value)));
}
function parseCookies(req){
  const raw = req.headers.get("cookie") || "";
  return Object.fromEntries(raw.split(";").map(x=>x.trim()).filter(Boolean).map(part=>{
    const i = part.indexOf("=");
    return i < 0 ? [part,""] : [part.slice(0,i),decodeURIComponent(part.slice(i+1))];
  }));
}
async function validSession(req, secret){
  const token = parseCookies(req)[COOKIE_NAME];
  if(!token) return false;
  const [exp,sig] = token.split(".");
  if(!exp || !sig || Number(exp) < Date.now()) return false;
  const expected = await sign(exp, secret);
  if(expected.length !== sig.length) return false;
  let diff = 0;
  for(let i=0;i<expected.length;i++) diff |= expected.charCodeAt(i) ^ sig.charCodeAt(i);
  return diff === 0;
}
function loginPage(error=""){
  return `<!doctype html><html lang="es"><head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="robots" content="noindex,nofollow,noarchive"><meta name="theme-color" content="#ef91b6">
  <title>Acceso secreto · Aurora</title>
  <style>
    *{box-sizing:border-box}body{margin:0;min-height:100vh;display:grid;place-items:center;padding:20px;font-family:Inter,"Segoe UI",system-ui,sans-serif;color:#43263a;background:radial-gradient(circle at 20% 15%,#d8effb,transparent 22rem),radial-gradient(circle at 80% 15%,#ffd9e8,transparent 22rem),linear-gradient(145deg,#fff8fb,#fff0f6)}
    .box{width:min(520px,100%);padding:34px 25px;border-radius:28px;background:rgba(255,255,255,.93);box-shadow:0 25px 60px rgba(87,44,72,.18);text-align:center}
    .tag{font-size:.72rem;letter-spacing:.14em;font-weight:900;color:#bb477a}.lock{font-size:3rem}.box h1{font-family:Georgia,serif;color:#963962;margin:8px 0 10px;font-size:2.3rem}.box p{color:#78616f;line-height:1.5}
    input{width:100%;margin:14px 0 10px;padding:15px 16px;border:1px solid #e4c4d2;border-radius:16px;font:inherit;outline:none;text-align:center}input:focus{border-color:#df78a3;box-shadow:0 0 0 4px #fde7f0}
    button{width:100%;border:0;border-radius:16px;padding:14px 16px;font:inherit;font-weight:900;color:white;background:linear-gradient(135deg,#df6fa0,#b94375);cursor:pointer}
    .error{background:#fff0f4;color:#a52f59;border-radius:13px;padding:10px;margin:10px 0;font-size:.9rem}
    small{display:block;margin-top:15px;color:#9a8290}
  </style></head><body><main class="box">
  <div class="lock">🔐</div><span class="tag">EXPERIENCIA PRIVADA</span>
  <h1>Experiencia Aurora</h1>
  <p>Esta sorpresa es solo para las personas invitadas al cumpleaños. Ingresa la clave secreta para continuar. 💗</p>
  ${error ? `<div class="error">${error}</div>`:""}
  <form method="post">
    <input name="aurora_password" type="password" autocomplete="current-password" placeholder="Clave del cumpleaños" required autofocus>
    <button type="submit">Desbloquear experiencia ✨</button>
  </form>
  <small>Team Aurora · 9 años</small>
  </main></body></html>`;
}

export default async (request, context) => {
  const password = Netlify.env.get("AURORA_PASSWORD");
  const cookieSecret = Netlify.env.get("AURORA_COOKIE_SECRET");

  if(!password || !cookieSecret){
    return new Response(loginPage("La experiencia todavía no ha sido activada por el administrador."),{
      status:503,headers:{"content-type":"text/html; charset=utf-8","cache-control":"no-store"}
    });
  }

  if(await validSession(request,cookieSecret)){
    return context.next();
  }

  if(request.method === "POST"){
    const form = await request.formData();
    const provided = String(form.get("aurora_password") || "");
    if(provided === password){
      const exp = String(Date.now() + SESSION_HOURS*60*60*1000);
      const sig = await sign(exp,cookieSecret);
      const url = new URL(request.url);
      return new Response(null,{
        status:303,
        headers:{
          "location":url.pathname + url.search,
          "set-cookie":`${COOKIE_NAME}=${encodeURIComponent(`${exp}.${sig}`)}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${SESSION_HOURS*60*60}`,
          "cache-control":"no-store",
          "x-robots-tag":"noindex, nofollow, noarchive"
        }
      });
    }
    return new Response(loginPage("Esa no es la clave. Inténtalo nuevamente 💗"),{
      status:401,headers:{"content-type":"text/html; charset=utf-8","cache-control":"no-store","x-robots-tag":"noindex, nofollow, noarchive"}
    });
  }

  return new Response(loginPage(),{
    status:401,
    headers:{"content-type":"text/html; charset=utf-8","cache-control":"no-store","x-robots-tag":"noindex, nofollow, noarchive"}
  });
};

export const config = {
  path: ["/cumple-aurora", "/cumple-aurora/*"]
};
