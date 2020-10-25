var radpack=function(){"use strict";var e=e=>e.load?e.load:e.load=e.url?new Promise((r,t)=>{e.resolve=r,e.reject=t;const s=document,n=s.createElement("script");n.crossOrigin="Anonymous",n.addEventListener("error",t),n.src=e.url,s.head.appendChild(n)}):Promise.resolve(),r=e=>{const[r,t=0,s=0,n=""]=e,o=`${r}.${t}.${s}${n}`;return{major:r,minor:t,patch:s,release:n,version:o,array:e,short:n?o:e.join("."),tilde:`~${e.slice(0,2).join(".")}`,caret:`^${r}`}},t=({major:e,minor:r,patch:t,release:s})=>{if(s)return[e,r,t,s];const n=[e];return t?(n.push(r),n.push(t)):r&&n.push(r),n};const s=/^([~^]|)(\d+)(?:\.(\d+))?(?:\.(\d+))?([^+]+|)/;var n=({exp:e,tmp:n},o)=>{let a=e.get(o);if(!a){const{id:i,name:c,path:l,version:d}=((e,r)=>{const t="$e:"+e;let s=r&&r.get(t);if(!s){const n=e.split("/"),o=n[0].startsWith("@")?n.shift()+"/":"",[a,i]=(n.shift()||"").split("@"),c=o+a,l=n.join("/")||"index",d="index"===l?"":`/${l}`;s={id:c+d,version:i,name:c,entry:l,path:d},r&&r.set(t,s)}return s})(o,n);if(d)try{let h=[];const{prefix:u,release:f,short:p,tilde:m,caret:v}=((e,n)=>{const o="$v:"+e;let a=n&&n.get(o);if(!a){const[,i,c,l=0,d=0,h]=e.match(s);a={prefix:i,...r(t({major:+c,minor:+l,patch:+d,release:h}))},n&&n.set(o,a)}return a})(d,n),g=e=>`${c}@${e}${l}`,y=g(p);if(f)h=[y];else{const e=g(m),r=g(v);u?"~"===u?h=[e,y,r,i]:"^"===u&&(h=[r,e,y,i]):h=[y,e,r,i]}let w;for(w of h)if(a=e.get(w))break;a&&console.warn(`resolve called with '${o}', change to '${w}'`)}catch{}else a=e.get(i),a&&console.warn(`resolve called with '${o}', change to '${i}'`)}return a},o=({cache:e},r,t=!0)=>{const{id:s,url:n}=r,o=n||s;let a=e.get(o);return t&&!a&&(a={url:n},e.set(o,a)),a};function a(e,r){if(Array.isArray(r))return Promise.all(r.map(r=>a(e,r)));const t=n(e,r);if(!t)return Promise.reject(new Error(`Unable to resolve ${r}`));const s=o(e,t);return(s.load?s.load:e.loader(e,t,s)).then(()=>s.result||{})}var i=(e,r)=>{const t=n(e,r);if(!t)throw new Error(`Unknown export ${r}`);return(o(e,t,!1)||{}).result},c=(e,r,t)=>{const s=n(e,r);if(!s)throw new Error(`Unknown export ${r}`);const a=o(e,s);a.result=t,a.load||(a.load=Promise.resolve())};const l=(e,r,t)=>{const s=n(e,r);if(!s)throw new Error(`Unable to resolve ${r}`);const{id:o=r,url:a=!1,data:{statics:i=[]}}=s;t.has(o)||(t.set(o,a),i.forEach(r=>{l(e,r,t)}))};var d=(e,r)=>{const t=new Map;return[].concat(r||Array.from(e.exp.keys())).forEach(r=>l(e,r,t)),Array.from(t.values()).filter(Boolean)};function h(e,r=[],t,s){const n={},o=this(r.filter(e=>"require"!==e&&"exports"!==e&&"radpack"!==e));t&&o.then(()=>{t(...r.map(e=>{switch(e){case"require":return this.require;case"exports":return n;case"radpack":return this;default:return this.static(e)}}))}),s&&o.catch(s)}function u(e,r,t=[],s,a){const i=n(e,r);if(!i)return void(a&&a(new Error(`Unable to resolve ${r}`)));const c=o(e,i,!1)||{},l=e.define=Promise.all([e.define,new Promise((e,n)=>{this.require(["exports"].concat(t),(t,...n)=>{s&&s(...n),this.set(r,t),e(),c.resolve&&c.resolve()},e=>{a&&a(e),n(e),c.reject&&c.reject(e)})})]).then(()=>{l===e.define&&(e.define=Promise.resolve())})}const f=({fetch:e,loader:r,register:t,hydrate:s,dehydrate:n,exp:o=new Map,cache:l=new Map,tmp:p=new Map,registers:m=[]})=>{const v={fetch:e,loader:r,exp:o,cache:l,tmp:p,registers:m,register:Promise.resolve(),define:Promise.resolve()},g=e=>g.register().then(()=>a(v,e));return v.loader=r.bind(g),g.create=o=>f({fetch:e,loader:r,register:t,hydrate:s,dehydrate:n,...o}),g.clone=()=>g.register().then(()=>g.create({exp:new Map(o),cache:new Map(l),tmp:new Map(p),registers:[...m]})),g.register=t.bind(g,v),g.hydrate=s&&s.bind(g,v),g.dehydrate=n&&(e=>g.register().then(()=>n.call(g,v,e))),g.require=h.bind(g,v),g.define=u.bind(g,v),g.static=i.bind(g,v),g.set=c.bind(g,v),g.getDepsSync=d.bind(g,v),g.getDeps=e=>g.register().then(()=>g.getDepsSync(e)),g};var p=(e,r,t=!1)=>{const{exp:s,cache:n}=e,a={},i={};t&&Object.keys(t).forEach(e=>{const r=s.get(e);r&&(r.url&&(a[r.url]=a[r.url]||[]).push(e),i[e]=!0)}),Object.keys(r).forEach(e=>{const t=s.get(e);t&&t.url&&(t.url in a||(a[t.url]=[]),a[t.url]&&a[t.url].push(e));const n=r[e];n.url&&(a[n.url]=!1),i[e]=!1,s.set(e,n)});const c=new Set;if(Object.keys(a).forEach(e=>{a[e]&&(n.delete(e),a[e].forEach(e=>{const r=s.get(e);r&&c.add(r.id)}))}),c.size){const r=new Set;e.exp.forEach(({id:e})=>{e&&r.add(e)}),function e(r,t,s){const n=new Set;t.forEach(e=>{const{data:{statics:t=[]}={}}=e;if(t.some(e=>{const t=r.exp.get(e);return t&&s.has(t.id)})){const t=o(r,e,!1);t&&delete t.load,e.id&&!s.has(e.id)&&n.add(e.id)}}),n.size&&e(r,t,n)}(e,Array.from(r).map(r=>e.exp.get(r)),c)}Object.keys(i).forEach(e=>{i[e]&&s.delete(e)})},m=(e,r)=>"index"===r?e:`${e}/${r}`,v={url:"${baseUrl}/${file}"},g=(e,{resolveEntry:r,resolveVersion:t})=>Object.keys(e.exports).reduce((s,n)=>{const o=e.exports[n],a=o.v.map(e=>t(e)),i=o.d.slice(0),c=i.findIndex(e=>!Array.isArray(e)),l=i.slice(0,~c?c:void 0),d={vars:{...v,...e.vars},name:n};return l.forEach(([e],t)=>{i[t]=r(e,d)}),l.forEach(([e,r])=>{const t=((e,r,{name:t,vars:s})=>({id:m(t,e),vars:s,name:t,entry:e,versions:r}))(e,r.reduce((e,{v:r,u:t=null,f:s=null,s:n=[],d:o=[]})=>{const c=n.map(e=>i[e]),l=o.map(e=>i[e]);return[].concat(r).forEach(r=>{e.push(((e,{version:r})=>({version:r,statics:[],dynamics:[],...e}))({url:t,file:s,statics:c,dynamics:l},{version:a[r]}))}),e},[]),d);s.push(t)}),s},[]);const y=/\${\s*(\w+)\s*}/g;const w=(e,{name:r})=>m(r,e),$=e=>{const{version:t,release:s,short:n,caret:o,tilde:a}=r(e);return{version:t,versions:s?[n]:[n,o,a]}};function x(e){const{register:r=!0}=e;return g(e,{resolveEntry:w,resolveVersion:$}).reduce((e,{vars:t,name:s,entry:n,versions:o})=>{const a={...t,name:s,entry:n},i=m("",n);return o.forEach(n=>{const{version:o,file:c}=n;let l=n.url||c&&t.url;l=!!l&&((e,r={})=>e.replace(y,(e,t)=>r[t]||""))(l,{...a,file:c});const d={url:l,data:n,internal:!r};let h=!1;c&&(h=!0,e[d.id=`${s}/${c}`]=d),[s+i].concat(o.versions.map(e=>`${s}@${e}${i}`)).forEach(r=>{r in e||(e[r]=h?d:{id:r,...d})})}),e},{})}const E=["register","_index"],b=["vars","exports"];var j="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:Function("return this")();const P=f({fetch:j.fetch,loader:(r,t,s)=>{const{data:{statics:n=[]}}=t;return Promise.all([e(s),a(r,n)])},register:(e,r)=>{if((r=[].concat(r||[])).length){const t=Promise.all(r.map(r=>{const t="string"==typeof r?{url:r}:r,{url:s}=t;if(s){const r=s.slice(0,s.lastIndexOf("/"));return((e,r,t=!1)=>{const{fetch:s}=e,n=o(e,{url:r}),a=t?"json":"text";return n.fetch?n.fetch:n.fetch=s(r).then(e=>{if(!e.ok)throw new Error(`${r} returned ${e.status}`);return e[a]()}).then(e=>n[a]=e)})(e,s,!0).then(e=>((e,r)=>[].concat(r).map(r=>(e=e||{},r=r||{},E.forEach(t=>{const s=null!=e[t]?e[t]:r[t];null!=s&&(r[t]=s)}),b.forEach(t=>{r[t]=Object.assign(r[t]||{},e[t])}),r)))(t,e).map(e=>(e.vars.baseUrl=e.vars.baseUrl||r,e))).catch(e=>(console.error("radpack.register.error:",e.message),!1))}return Promise.resolve(t).then(e=>[].concat(e))}));e.register=e.register.then(()=>Promise.all([t,Promise.all(Array.from(e.cache.values()).map(e=>e.load))]).then(([r])=>{r.forEach(r=>[].concat(r||[]).forEach(r=>((e,r)=>{if(!r||!r.exports)return;let t;if(null!=r._index){const s=e.registers[r._index];s&&(t=x(s)),e.registers[r._index]=r}p(e,x(r),t)})(e,r)))}))}const t=e.register;return Promise.resolve(t).then(()=>{e.register===t&&(e.register=Promise.resolve())})},hydrate:function(e,r){return this.register(r||[])}});return j.define=P.define,P}();
