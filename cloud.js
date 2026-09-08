/* Play Now Cloud Adapter - Supabase */
(function(){
  let client=null;
  async function loadSDK(){
    if(window.supabase) return window.supabase;
    await new Promise((resolve,reject)=>{const s=document.createElement('script');s.src='https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';s.onload=resolve;s.onerror=reject;document.head.appendChild(s)});
    return window.supabase;
  }
  window.PNCloud={
    enabled:false,
    async init(){
      const c=window.PLAY_NOW_SUPABASE||{};
      if(!c.url||!c.anonKey) return false;
      try{const sdk=await loadSDK();client=sdk.createClient(c.url,c.anonKey);this.enabled=true;return true}catch(e){console.warn('Play Now Cloud disabled',e);return false}
    },
    async loadItems(){
      if(!this.enabled) return null;
      const {data,error}=await client.from('content').select('*').order('created_at',{ascending:false});
      if(error){console.warn(error);return null}
      return (data||[]).map(x=>({id:x.id,title:x.title,type:x.type,genre:x.genre||'',year:x.year||2026,rating:Number(x.rating||0),views:Number(x.views||0),duration:x.duration||'',desc:x.description||'',image:x.image_url||'',featured:!!x.featured,video:x.video_url||''}));
    },
    async upsert(item){
      if(!this.enabled)return null;
      const row={id:item.id,title:item.title,type:item.type,genre:item.genre,year:item.year,rating:item.rating,views:item.views,duration:item.duration,description:item.desc,image_url:item.image,video_url:item.video||'',featured:item.featured};
      const {data,error}=await client.from('content').upsert(row).select().single();
      if(error){console.error(error);throw error} return data;
    },
    async remove(id){if(!this.enabled)return;const {error}=await client.from('content').delete().eq('id',id);if(error)throw error},
    async feature(id){if(!this.enabled)return;await client.from('content').update({featured:false}).neq('id',id);const {error}=await client.from('content').update({featured:true}).eq('id',id);if(error)throw error},
    async login(email,password){if(!this.enabled)return null;return client.auth.signInWithPassword({email,password})},
    async logout(){if(this.enabled) await client.auth.signOut()}
  };
})();
