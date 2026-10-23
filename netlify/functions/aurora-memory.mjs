
import { getStore } from "@netlify/blobs";
import { requireGuest } from "../lib/aurora-auth.mjs";

const ALLOWED = new Set(["image/jpeg","image/png","image/webp"]);
const MAX_PHOTO = 4_500_000;

export default async (req) => {
  const denied = requireGuest(req);
  if(denied) return denied;
  if(req.method !== "POST") return Response.json({error:"Método no permitido."},{status:405});

  try{
    const form = await req.formData();
    const name = String(form.get("name") || "").trim().slice(0,30);
    const message = String(form.get("message") || "").trim().slice(0,300);
    const photo = form.get("photo");

    if(!name || !message || !(photo instanceof File)){
      return Response.json({error:"Falta la selfie, el nombre o el mensaje."},{status:400});
    }
    if(!ALLOWED.has(photo.type)){
      return Response.json({error:"Formato de imagen no permitido."},{status:415});
    }
    if(photo.size > MAX_PHOTO){
      return Response.json({error:"La selfie es demasiado pesada."},{status:413});
    }

    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();

    const photos = getStore("aurora-memory-photos");
    const meta = getStore("aurora-memory-meta");

    await photos.set(id, photo, {
      metadata:{contentType:photo.type,createdAt}
    });
    await meta.setJSON(id,{
      id,name,message,createdAt
    });

    return Response.json({ok:true,id});
  }catch(err){
    console.error("Aurora memory error",err);
    return Response.json({error:"No se pudo guardar el recuerdo. Inténtalo nuevamente."},{status:500});
  }
};

export const config = {
  path:"/api/aurora-memory",
  rateLimit:{windowLimit:12,windowSize:60,aggregateBy:["ip"]}
};
