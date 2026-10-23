import {
  requireGuest,
  verifyAdminPassword,
  createAdminSessionCookie
} from "../lib/aurora-auth.mjs";

export default async (req) => {
  if(req.method !== "POST"){
    return Response.json({error:"Método no permitido."},{status:405});
  }

  const guestDenied = requireGuest(req);
  if(guestDenied) return guestDenied;

  let body;
  try{
    body = await req.json();
  }catch{
    return Response.json({error:"Solicitud no válida."},{status:400});
  }

  const result = verifyAdminPassword(String(body?.key ?? ""));
  if(!result.ok){
    return Response.json({error:result.error},{status:result.status});
  }

  try{
    const cookie = createAdminSessionCookie(req);
    return Response.json(
      {ok:true},
      {
        headers:{
          "set-cookie":cookie,
          "cache-control":"no-store"
        }
      }
    );
  }catch(err){
    console.error("Admin login cookie error",err);
    return Response.json(
      {error:"No se pudo crear la sesión administrativa."},
      {status:500}
    );
  }
};

export const config = {
  path:"/api/aurora-admin-login",
  rateLimit:{windowLimit:12,windowSize:60,aggregateBy:["ip"]}
};
