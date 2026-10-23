import { getStore } from "@netlify/blobs";
import { requireAdmin } from "../lib/aurora-auth.mjs";

export default async (req) => {
  const denied = requireAdmin(req);
  if(denied) return denied;

  try{
    const store = getStore("aurora-memory-meta");
    const {blobs} = await store.list();
    const memories = [];

    for(const entry of blobs){
      const data = await store.get(entry.key,{type:"json"});
      if(data) memories.push(data);
    }

    memories.sort((a,b)=>String(b.createdAt).localeCompare(String(a.createdAt)));
    return Response.json(
      {memories},
      {headers:{"cache-control":"private, no-store"}}
    );
  }catch(err){
    console.error("Aurora admin list error",err);
    return Response.json(
      {error:"No se pudieron cargar los recuerdos."},
      {status:500}
    );
  }
};

export const config = {
  path:"/api/aurora-admin-list",
  rateLimit:{windowLimit:40,windowSize:60,aggregateBy:["ip"]}
};
