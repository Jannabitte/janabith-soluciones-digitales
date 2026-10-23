
import { requireGuest } from "../lib/aurora-auth.mjs";

export default async (req) => {
  const denied = requireGuest(req);
  if(denied) return denied;

  const url = new URL(req.url);
  const token = url.searchParams.get("token") || "";
  const qr1 = process.env.AURORA_QR1_TOKEN || "";
  const qr2 = process.env.AURORA_QR2_TOKEN || "";

  if(!qr1 || !qr2){
    return Response.json({error:"Los QR secretos todavía no han sido activados."},{status:503});
  }
  if(token === qr1) return Response.json({ok:true,slot:1,label:"Código Dulce",points:150});
  if(token === qr2) return Response.json({ok:true,slot:2,label:"Código Recuerdo",points:150});

  return Response.json({error:"Este código no pertenece a la cacería de Aurora."},{status:404});
};

export const config = {
  path:"/api/aurora-claim",
  rateLimit:{windowLimit:40,windowSize:60,aggregateBy:["ip"]}
};
