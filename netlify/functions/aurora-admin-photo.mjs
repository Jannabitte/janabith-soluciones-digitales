import { getStore } from "@netlify/blobs";
import { requireAdmin } from "../lib/aurora-auth.mjs";

export default async (req) => {
  const denied = requireAdmin(req);
  if(denied) return denied;

  const id = new URL(req.url).searchParams.get("id") || "";
  if(!/^[0-9a-f-]{36}$/i.test(id)){
    return Response.json({error:"Identificador no válido."},{status:400});
  }

  try{
    const store = getStore("aurora-memory-photos");
    const entry = await store.getWithMetadata(id,{type:"blob"});

    if(!entry){
      return Response.json({error:"Foto no encontrada."},{status:404});
    }

    return new Response(entry.data,{
      headers:{
        "content-type":entry.metadata?.contentType || "image/jpeg",
        "cache-control":"private, no-store",
        "x-content-type-options":"nosniff"
      }
    });
  }catch(err){
    console.error("Aurora admin photo error",err);
    return Response.json(
      {error:"No se pudo cargar la fotografía."},
      {status:500}
    );
  }
};

export const config = {
  path:"/api/aurora-admin-photo",
  rateLimit:{windowLimit:100,windowSize:60,aggregateBy:["ip"]}
};
