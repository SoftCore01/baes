import"./output-CXwjMTNO.js";function i(t,r){r.innerHTML=t.map(e=>`
    <tr class="hover:bg-gray-50">
      <td class="px-4 py-3">${e.fullName}</td>
      <td class="px-4 py-3">${e.matricNo}</td>
      <td class="px-4 py-3">${e.level}</td>
      <td class="px-4 py-3">${e.department}</td>
      <td class="px-4 py-3">${e.email}</td>
      <td class="px-4 py-3">${e.phoneNo}</td>
      <td class="px-4 py-3 text-blue-600 underline"><a href="${e.receiptLink}" target="_blank">View</a></td>
    </tr>
  `).join("")}function p(t,r,e,c,l){r===t?e=e==="asc"?"desc":"asc":(r=t,e="asc");const s=[...c].sort((a,d)=>{const o=a[t],n=d[t];return typeof o=="number"&&typeof n=="number"?e==="asc"?o-n:n-o:e==="asc"?String(o).localeCompare(String(n)):String(n).localeCompare(String(o))});return i(s,l),{sortColumn:r,sortDirection:e}}(async()=>{try{const t=sessionStorage.getItem("token");if(!t){document.location.href="/adminLogin";return}let r=await fetch("/api/allPayerInfo",{headers:{Authorization:`Bear ${t}`}}).then(a=>{if(!a.ok)throw new Error(`HTTP error! Status: ${a.status}`);return a.json()}).catch(a=>{console.error("Fetch error:",a),document.location.href="/adminLogin"});if(!r.success){document.location.href="/adminLogin",console.log(r.message);return}const e=r.data,c=document.getElementById("tableBody");let l=null,s="asc";i(e,c),document.querySelectorAll("th[data-column]").forEach(a=>{a.addEventListener("click",()=>{const d=a.dataset.column;let o=p(d,l,s,e,c);l=o.sortColumn,s=o.sortDirection})})}catch(t){console.log(t)}})();
