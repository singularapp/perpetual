const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-BBXGhg67.js","assets/vendor-Dspnf4t4.js"])))=>i.map(i=>d[i]);
import{_ as pe}from"./vendor-Dspnf4t4.js";const me=Symbol(),ee=Object.getPrototypeOf,J=new WeakMap,ge=e=>e&&(J.has(e)?J.get(e):ee(e)===Object.prototype||ee(e)===Array.prototype),he=e=>ge(e)&&e[me]||null,te=(e,t=!0)=>{J.set(e,t)},z={BASE_URL:"/",DEV:!1,MODE:"production",PROD:!0,SSR:!1,VITE_APP_FIREBASE_API_KEY:"AIzaSyAq9o7KiR0RmvsaIrl_DrBsxm5AMpf0_1I",VITE_APP_FIREBASE_APP_ID:"1:28932172976:web:d3d9f5c3f9794f01921f75",VITE_APP_TRANSAK_KEY:"bb27ce4d-067e-42e1-8e3f-088c2bc72e89",VITE_APP_UI_FEE_RECEIVER:"0xff00000000000000000000000000000000000001",VITE_APP_UNLIMIT_CRYPTO_PARTNER_ID:"5ae5ea1f-84d1-4f1c-8465-9dce622500ce",VITE_APP_VERSION:"8d9b7b5bb0946db85e1cf51584cad4bb820f7876"},Y=e=>typeof e=="object"&&e!==null,_=new WeakMap,x=new WeakSet,be=(e=Object.is,t=(n,h)=>new Proxy(n,h),s=n=>Y(n)&&!x.has(n)&&(Array.isArray(n)||!(Symbol.iterator in n))&&!(n instanceof WeakMap)&&!(n instanceof WeakSet)&&!(n instanceof Error)&&!(n instanceof Number)&&!(n instanceof Date)&&!(n instanceof String)&&!(n instanceof RegExp)&&!(n instanceof ArrayBuffer),r=n=>{switch(n.status){case"fulfilled":return n.value;case"rejected":throw n.reason;default:throw n}},l=new WeakMap,c=(n,h,w=r)=>{const y=l.get(n);if((y==null?void 0:y[0])===h)return y[1];const I=Array.isArray(n)?[]:Object.create(Object.getPrototypeOf(n));return te(I,!0),l.set(n,[h,I]),Reflect.ownKeys(n).forEach(U=>{if(Object.getOwnPropertyDescriptor(I,U))return;const L=Reflect.get(n,U),P={value:L,enumerable:!0,configurable:!0};if(x.has(L))te(L,!1);else if(L instanceof Promise)delete P.value,P.get=()=>w(L);else if(_.has(L)){const[b,F]=_.get(L);P.value=c(b,F(),w)}Object.defineProperty(I,U,P)}),Object.preventExtensions(I)},m=new WeakMap,p=[1,1],O=n=>{if(!Y(n))throw new Error("object required");const h=m.get(n);if(h)return h;let w=p[0];const y=new Set,I=(i,a=++p[0])=>{w!==a&&(w=a,y.forEach(o=>o(i,a)))};let U=p[1];const L=(i=++p[1])=>(U!==i&&!y.size&&(U=i,b.forEach(([a])=>{const o=a[1](i);o>w&&(w=o)})),w),P=i=>(a,o)=>{const g=[...a];g[1]=[i,...g[1]],I(g,o)},b=new Map,F=(i,a)=>{if((z?"production":void 0)!=="production"&&b.has(i))throw new Error("prop listener already exists");if(y.size){const o=a[3](P(i));b.set(i,[a,o])}else b.set(i,[a])},Z=i=>{var a;const o=b.get(i);o&&(b.delete(i),(a=o[1])==null||a.call(o))},ue=i=>(y.add(i),y.size===1&&b.forEach(([o,g],D)=>{if((z?"production":void 0)!=="production"&&g)throw new Error("remove already exists");const k=o[3](P(D));b.set(D,[o,k])}),()=>{y.delete(i),y.size===0&&b.forEach(([o,g],D)=>{g&&(g(),b.set(D,[o]))})}),H=Array.isArray(n)?[]:Object.create(Object.getPrototypeOf(n)),V=t(H,{deleteProperty(i,a){const o=Reflect.get(i,a);Z(a);const g=Reflect.deleteProperty(i,a);return g&&I(["delete",[a],o]),g},set(i,a,o,g){const D=Reflect.has(i,a),k=Reflect.get(i,a,g);if(D&&(e(k,o)||m.has(o)&&e(k,m.get(o))))return!0;Z(a),Y(o)&&(o=he(o)||o);let $=o;if(o instanceof Promise)o.then(W=>{o.status="fulfilled",o.value=W,I(["resolve",[a],W])}).catch(W=>{o.status="rejected",o.reason=W,I(["reject",[a],W])});else{!_.has(o)&&s(o)&&($=O(o));const W=!x.has($)&&_.get($);W&&F(a,W)}return Reflect.set(i,a,$,g),I(["set",[a],o,k]),!0}});m.set(n,V);const fe=[H,L,c,ue];return _.set(V,fe),Reflect.ownKeys(n).forEach(i=>{const a=Object.getOwnPropertyDescriptor(n,i);"value"in a&&(V[i]=n[i],delete a.value,delete a.writable),Object.defineProperty(H,i,a)}),V})=>[O,_,x,e,t,s,r,l,c,m,p],[ye]=be();function C(e={}){return ye(e)}function S(e,t,s){const r=_.get(e);(z?"production":void 0)!=="production"&&!r&&console.warn("Please use proxy object");let l;const c=[],m=r[3];let p=!1;const n=m(h=>{c.push(h),l||(l=Promise.resolve().then(()=>{l=void 0,p&&t(c.splice(0))}))});return p=!0,()=>{p=!1,n()}}function Ie(e,t){const s=_.get(e);(z?"production":void 0)!=="production"&&!s&&console.warn("Please use proxy object");const[r,l,c]=s;return c(r,l(),t)}const d=C({history:["ConnectWallet"],view:"ConnectWallet",data:void 0}),de={state:d,subscribe(e){return S(d,()=>e(d))},push(e,t){e!==d.view&&(d.view=e,t&&(d.data=t),d.history.push(e))},reset(e){d.view=e,d.history=[e]},replace(e){d.history.length>1&&(d.history[d.history.length-1]=e,d.view=e)},goBack(){if(d.history.length>1){d.history.pop();const[e]=d.history.slice(-1);d.view=e}},setData(e){d.data=e}},f={WALLETCONNECT_DEEPLINK_CHOICE:"WALLETCONNECT_DEEPLINK_CHOICE",WCM_VERSION:"WCM_VERSION",RECOMMENDED_WALLET_AMOUNT:9,isMobile(){return typeof window<"u"?!!(window.matchMedia("(pointer:coarse)").matches||/Android|webOS|iPhone|iPad|iPod|BlackBerry|Opera Mini/u.test(navigator.userAgent)):!1},isAndroid(){return f.isMobile()&&navigator.userAgent.toLowerCase().includes("android")},isIos(){const e=navigator.userAgent.toLowerCase();return f.isMobile()&&(e.includes("iphone")||e.includes("ipad"))},isHttpUrl(e){return e.startsWith("http://")||e.startsWith("https://")},isArray(e){return Array.isArray(e)&&e.length>0},formatNativeUrl(e,t,s){if(f.isHttpUrl(e))return this.formatUniversalUrl(e,t,s);let r=e;r.includes("://")||(r=e.replaceAll("/","").replaceAll(":",""),r=`${r}://`),r.endsWith("/")||(r=`${r}/`),this.setWalletConnectDeepLink(r,s);const l=encodeURIComponent(t);return`${r}wc?uri=${l}`},formatUniversalUrl(e,t,s){if(!f.isHttpUrl(e))return this.formatNativeUrl(e,t,s);let r=e;r.endsWith("/")||(r=`${r}/`),this.setWalletConnectDeepLink(r,s);const l=encodeURIComponent(t);return`${r}wc?uri=${l}`},async wait(e){return new Promise(t=>{setTimeout(t,e)})},openHref(e,t){window.open(e,t,"noreferrer noopener")},setWalletConnectDeepLink(e,t){try{localStorage.setItem(f.WALLETCONNECT_DEEPLINK_CHOICE,JSON.stringify({href:e,name:t}))}catch{console.info("Unable to set WalletConnect deep link")}},setWalletConnectAndroidDeepLink(e){try{const[t]=e.split("?");localStorage.setItem(f.WALLETCONNECT_DEEPLINK_CHOICE,JSON.stringify({href:t,name:"Android"}))}catch{console.info("Unable to set WalletConnect android deep link")}},removeWalletConnectDeepLink(){try{localStorage.removeItem(f.WALLETCONNECT_DEEPLINK_CHOICE)}catch{console.info("Unable to remove WalletConnect deep link")}},setModalVersionInStorage(){try{typeof localStorage<"u"&&localStorage.setItem(f.WCM_VERSION,"2.6.2")}catch{console.info("Unable to set Web3Modal version in storage")}},getWalletRouterData(){var e;const t=(e=de.state.data)==null?void 0:e.Wallet;if(!t)throw new Error('Missing "Wallet" view data');return t}},ve=typeof location<"u"&&(location.hostname.includes("localhost")||location.protocol.includes("https")),u=C({enabled:ve,userSessionId:"",events:[],connectedWalletId:void 0}),we={state:u,subscribe(e){return S(u.events,()=>e(Ie(u.events[u.events.length-1])))},initialize(){u.enabled&&typeof(crypto==null?void 0:crypto.randomUUID)<"u"&&(u.userSessionId=crypto.randomUUID())},setConnectedWalletId(e){u.connectedWalletId=e},click(e){if(u.enabled){const t={type:"CLICK",name:e.name,userSessionId:u.userSessionId,timestamp:Date.now(),data:e};u.events.push(t)}},track(e){if(u.enabled){const t={type:"TRACK",name:e.name,userSessionId:u.userSessionId,timestamp:Date.now(),data:e};u.events.push(t)}},view(e){if(u.enabled){const t={type:"VIEW",name:e.name,userSessionId:u.userSessionId,timestamp:Date.now(),data:e};u.events.push(t)}}},E=C({chains:void 0,walletConnectUri:void 0,isAuth:!1,isCustomDesktop:!1,isCustomMobile:!1,isDataLoaded:!1,isUiLoaded:!1}),v={state:E,subscribe(e){return S(E,()=>e(E))},setChains(e){E.chains=e},setWalletConnectUri(e){E.walletConnectUri=e},setIsCustomDesktop(e){E.isCustomDesktop=e},setIsCustomMobile(e){E.isCustomMobile=e},setIsDataLoaded(e){E.isDataLoaded=e},setIsUiLoaded(e){E.isUiLoaded=e},setIsAuth(e){E.isAuth=e}},B=C({projectId:"",mobileWallets:void 0,desktopWallets:void 0,walletImages:void 0,chains:void 0,enableAuthMode:!1,enableExplorer:!0,explorerExcludedWalletIds:void 0,explorerRecommendedWalletIds:void 0,termsOfServiceUrl:void 0,privacyPolicyUrl:void 0}),T={state:B,subscribe(e){return S(B,()=>e(B))},setConfig(e){var t,s;we.initialize(),v.setChains(e.chains),v.setIsAuth(!!e.enableAuthMode),v.setIsCustomMobile(!!((t=e.mobileWallets)!=null&&t.length)),v.setIsCustomDesktop(!!((s=e.desktopWallets)!=null&&s.length)),f.setModalVersionInStorage(),Object.assign(B,e)}};var Ee=Object.defineProperty,se=Object.getOwnPropertySymbols,Ae=Object.prototype.hasOwnProperty,Le=Object.prototype.propertyIsEnumerable,ne=(e,t,s)=>t in e?Ee(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s,Oe=(e,t)=>{for(var s in t||(t={}))Ae.call(t,s)&&ne(e,s,t[s]);if(se)for(var s of se(t))Le.call(t,s)&&ne(e,s,t[s]);return e};const G="https://explorer-api.walletconnect.com",Q="wcm",X="js-2.6.2";async function K(e,t){const s=Oe({sdkType:Q,sdkVersion:X},t),r=new URL(e,G);return r.searchParams.append("projectId",T.state.projectId),Object.entries(s).forEach(([l,c])=>{c&&r.searchParams.append(l,String(c))}),(await fetch(r)).json()}const j={async getDesktopListings(e){return K("/w3m/v1/getDesktopListings",e)},async getMobileListings(e){return K("/w3m/v1/getMobileListings",e)},async getInjectedListings(e){return K("/w3m/v1/getInjectedListings",e)},async getAllListings(e){return K("/w3m/v1/getAllListings",e)},getWalletImageUrl(e){return`${G}/w3m/v1/getWalletImage/${e}?projectId=${T.state.projectId}&sdkType=${Q}&sdkVersion=${X}`},getAssetImageUrl(e){return`${G}/w3m/v1/getAssetImage/${e}?projectId=${T.state.projectId}&sdkType=${Q}&sdkVersion=${X}`}};var We=Object.defineProperty,oe=Object.getOwnPropertySymbols,_e=Object.prototype.hasOwnProperty,Ce=Object.prototype.propertyIsEnumerable,re=(e,t,s)=>t in e?We(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s,Pe=(e,t)=>{for(var s in t||(t={}))_e.call(t,s)&&re(e,s,t[s]);if(oe)for(var s of oe(t))Ce.call(t,s)&&re(e,s,t[s]);return e};const ae=f.isMobile(),A=C({wallets:{listings:[],total:0,page:1},search:{listings:[],total:0,page:1},recomendedWallets:[]}),Ne={state:A,async getRecomendedWallets(){const{explorerRecommendedWalletIds:e,explorerExcludedWalletIds:t}=T.state;if(e==="NONE"||t==="ALL"&&!e)return A.recomendedWallets;if(f.isArray(e)){const s={recommendedIds:e.join(",")},{listings:r}=await j.getAllListings(s),l=Object.values(r);l.sort((c,m)=>{const p=e.indexOf(c.id),O=e.indexOf(m.id);return p-O}),A.recomendedWallets=l}else{const{chains:s,isAuth:r}=v.state,l=s==null?void 0:s.join(","),c=f.isArray(t),m={page:1,sdks:r?"auth_v1":void 0,entries:f.RECOMMENDED_WALLET_AMOUNT,chains:l,version:2,excludedIds:c?t.join(","):void 0},{listings:p}=ae?await j.getMobileListings(m):await j.getDesktopListings(m);A.recomendedWallets=Object.values(p)}return A.recomendedWallets},async getWallets(e){const t=Pe({},e),{explorerRecommendedWalletIds:s,explorerExcludedWalletIds:r}=T.state,{recomendedWallets:l}=A;if(r==="ALL")return A.wallets;l.length?t.excludedIds=l.map(w=>w.id).join(","):f.isArray(s)&&(t.excludedIds=s.join(",")),f.isArray(r)&&(t.excludedIds=[t.excludedIds,r].filter(Boolean).join(",")),v.state.isAuth&&(t.sdks="auth_v1");const{page:c,search:m}=e,{listings:p,total:O}=ae?await j.getMobileListings(t):await j.getDesktopListings(t),n=Object.values(p),h=m?"search":"wallets";return A[h]={listings:[...A[h].listings,...n],total:O,page:c??1},{listings:n,total:O}},getWalletImageUrl(e){return j.getWalletImageUrl(e)},getAssetImageUrl(e){return j.getAssetImageUrl(e)},resetSearch(){A.search={listings:[],total:0,page:1}}},R=C({open:!1}),q={state:R,subscribe(e){return S(R,()=>e(R))},async open(e){return new Promise(t=>{const{isUiLoaded:s,isDataLoaded:r}=v.state;if(f.removeWalletConnectDeepLink(),v.setWalletConnectUri(e==null?void 0:e.uri),v.setChains(e==null?void 0:e.chains),de.reset("ConnectWallet"),s&&r)R.open=!0,t();else{const l=setInterval(()=>{const c=v.state;c.isUiLoaded&&c.isDataLoaded&&(clearInterval(l),R.open=!0,t())},200)}})},close(){R.open=!1}};var je=Object.defineProperty,ie=Object.getOwnPropertySymbols,Me=Object.prototype.hasOwnProperty,Se=Object.prototype.propertyIsEnumerable,le=(e,t,s)=>t in e?je(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s,Ue=(e,t)=>{for(var s in t||(t={}))Me.call(t,s)&&le(e,s,t[s]);if(ie)for(var s of ie(t))Se.call(t,s)&&le(e,s,t[s]);return e};function De(){return typeof matchMedia<"u"&&matchMedia("(prefers-color-scheme: dark)").matches}const N=C({themeMode:De()?"dark":"light"}),ce={state:N,subscribe(e){return S(N,()=>e(N))},setThemeConfig(e){const{themeMode:t,themeVariables:s}=e;t&&(N.themeMode=t),s&&(N.themeVariables=Ue({},s))}},M=C({open:!1,message:"",variant:"success"}),Ve={state:M,subscribe(e){return S(M,()=>e(M))},openToast(e,t){M.open=!0,M.message=e,M.variant=t},closeToast(){M.open=!1}};class Re{constructor(t){this.openModal=q.open,this.closeModal=q.close,this.subscribeModal=q.subscribe,this.setTheme=ce.setThemeConfig,ce.setThemeConfig(t),T.setConfig(t),this.initUi()}async initUi(){if(typeof window<"u"){await pe(()=>import("./index-BBXGhg67.js"),__vite__mapDeps([0,1]));const t=document.createElement("wcm-modal");document.body.insertAdjacentElement("beforeend",t),v.setIsUiLoaded(!0)}}}const $e=Object.freeze(Object.defineProperty({__proto__:null,WalletConnectModal:Re},Symbol.toStringTag,{value:"Module"}));export{we as R,de as T,f as a,$e as i,ce as n,Ve as o,v as p,q as s,Ne as t,T as y};
//# sourceMappingURL=index-Dxt2e8sY.js.map
