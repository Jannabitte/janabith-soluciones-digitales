import { createHmac, timingSafeEqual } from "node:crypto";

const GUEST_COOKIE = "aurora_session";
const ADMIN_COOKIE = "aurora_admin_session";

function cookies(req){
  const raw = req.headers.get("cookie") || "";
  return Object.fromEntries(
    raw.split(";")
      .map(x=>x.trim())
      .filter(Boolean)
      .map(part=>{
        const i = part.indexOf("=");
        return i < 0
          ? [part,""]
          : [part.slice(0,i),decodeURIComponent(part.slice(i+1))];
      })
  );
}

function safeEqual(a,b){
  const aa = Buffer.from(String(a ?? ""));
  const bb = Buffer.from(String(b ?? ""));
  return aa.length === bb.length && timingSafeEqual(aa,bb);
}

function signature(value, secret){
  return createHmac("sha256",secret).update(value).digest("base64url");
}

export function isGuestSessionValid(req){
  const secret = process.env.AURORA_COOKIE_SECRET;
  if(!secret) return false;

  const token = cookies(req)[GUEST_COOKIE];
  if(!token) return false;

  const [exp,sig] = token.split(".");
  if(!exp || !sig || Number(exp) < Date.now()) return false;

  return safeEqual(sig, signature(exp,secret));
}

export function requireGuest(req){
  if(!isGuestSessionValid(req)){
    return Response.json(
      {error:"Sesión no válida. Vuelve a entrar con la clave del cumpleaños."},
      {status:401}
    );
  }
  return null;
}

export function verifyAdminPassword(provided){
  const expected = process.env.AURORA_ADMIN_KEY;

  if(!expected){
    return {
      ok:false,
      status:503,
      error:"AURORA_ADMIN_KEY no está disponible en este entorno. Revisa su valor para Local development (dev) y el scope Functions."
    };
  }

  if(!provided || !safeEqual(provided,expected)){
    return {
      ok:false,
      status:403,
      error:"Clave de administración incorrecta."
    };
  }

  return {ok:true};
}

export function createAdminSessionCookie(req, hours=8){
  const secret = process.env.AURORA_COOKIE_SECRET;
  if(!secret) throw new Error("AURORA_COOKIE_SECRET no está disponible.");

  const exp = String(Date.now() + hours*60*60*1000);
  const payload = `admin:${exp}`;
  const sig = signature(payload,secret);
  const value = encodeURIComponent(`${exp}.${sig}`);

  const secure = new URL(req.url).protocol === "https:" ? "; Secure" : "";
  return `${ADMIN_COOKIE}=${value}; Path=/; HttpOnly${secure}; SameSite=Strict; Max-Age=${hours*60*60}`;
}

export function clearAdminSessionCookie(req){
  const secure = new URL(req.url).protocol === "https:" ? "; Secure" : "";
  return `${ADMIN_COOKIE}=; Path=/; HttpOnly${secure}; SameSite=Strict; Max-Age=0`;
}

export function isAdminSessionValid(req){
  if(!isGuestSessionValid(req)) return false;

  const secret = process.env.AURORA_COOKIE_SECRET;
  if(!secret) return false;

  const token = cookies(req)[ADMIN_COOKIE];
  if(!token) return false;

  const [exp,sig] = token.split(".");
  if(!exp || !sig || Number(exp) < Date.now()) return false;

  const payload = `admin:${exp}`;
  return safeEqual(sig, signature(payload,secret));
}

export function requireAdmin(req){
  if(!isAdminSessionValid(req)){
    return Response.json(
      {error:"Sesión administrativa no válida."},
      {status:401}
    );
  }
  return null;
}
