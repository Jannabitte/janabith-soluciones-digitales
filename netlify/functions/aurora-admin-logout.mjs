import { clearAdminSessionCookie } from "../lib/aurora-auth.mjs";

export default async (req) => {
  if(req.method !== "POST"){
    return Response.json({error:"Método no permitido."},{status:405});
  }

  return Response.json(
    {ok:true},
    {
      headers:{
        "set-cookie":clearAdminSessionCookie(req),
        "cache-control":"no-store"
      }
    }
  );
};

export const config = {
  path:"/api/aurora-admin-logout"
};
