(()=>{function i(t){return t instanceof Date}function D(t){return Object.prototype.toString.call(t)==="[object Number]"}var f={ms:1,s:1e3,m:6e4,h:36e5,d:864e5};function u(t){return t instanceof Date?t.valueOf():t}function b(t){if(typeof t=="undefined")return console.error("date-chunk: options are required in chunkDate function"),[];let{start:r,end:s}=t,e=i(r)||D(r);return!(i(s)||D(s))||!e?(console.error("date-chunk: start or end must be either Date object or number (timestamp) in chunkDate function"),[]):"chunks"in t?k(t):"maxLimitPerChunk"in t?d(t):[]}function k(t){let r=[],e=(u(t.end)-u(t.start))/t.chunks;t.strictSizedChunks&&(e=Number(e.toFixed()));let a=u(t.start);for(let m=0;m<t.chunks;m++){let n=a+e;r.push({start:i(t.start)?new Date(a):a,end:i(t.end)?new Date(n):n}),a=n}return r}function d(t){let r=t.maxLimitPerChunk[0],s=f[t.maxLimitPerChunk[1]],e=[],a=u(t.end)-u(t.start),m=r*s,n=a/m,c=u(t.start);for(;n>0;){let h=n>=1?1:n,o=c+m*h;e.push({start:i(t.start)?new Date(c):c,end:i(t.end)?new Date(o):o}),c=o,n--}return e}})();