(window["webpackJsonpapi-explorer"]=window["webpackJsonpapi-explorer"]||[]).push([[0],{13:function(e,t,n){e.exports=n(22)},18:function(e,t,n){},20:function(e,t,n){},21:function(e,t,n){},22:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(5),s=n.n(o),l=(n(18),n(1)),i=n(11),c=n(3),u=n.n(c),d=n(2),p=n(6),m=n(7),h=n(8),f=n(10),y=n(9),E=n(12);n(20);n(21);function v(e){var t=e.response,n=e.onDrillDown,a=r.a.useState("plain"),o=Object(l.a)(a,2),s=o[0],i=o[1];if(r.a.useEffect(function(){if(t){var e=g(t.headers,"Content-Type");i("application/json"===e?"json":"plain")}},[t]),!t)return null;var c=["plain"];return"application/json"===g(t.headers,"Content-Type")&&c.unshift("json"),r.a.createElement("div",null,c.map(function(e){return r.a.createElement("button",{key:e,className:"ResponseBody-mode",style:e===s?{outline:"1px solid blue"}:null,onClick:function(){return i(e)}},e)}),"plain"===s&&r.a.createElement("code",null,t.body),"json"===s&&r.a.createElement(b,{onDrillDown:n},t.body))}function b(e){var t=e.children,n=e.onDrillDown;if(!t)return null;try{return function e(t,n){var a=n.key,o=void 0===a?null:a,s=n.onDrillDown,i=void 0===s?null:s;if(Array.isArray(t))return r.a.createElement("div",{key:o,className:"JSONBody-array"},r.a.createElement("p",null,"Array of ".concat(t.length," items")),t.map(function(t,n){return e(t,{key:n,onDrillDown:i})}));if("object"===typeof t)return r.a.createElement("dl",{key:o,className:"JSONBody-object"},Object.entries(t).map(function(t,n){var a=Object(l.a)(t,2),s=a[0],c=a[1],u="id"===s&&"number"===typeof c&&null!==o&&null!==i,d=u?function(){return i(c)}:function(){};return r.a.createElement(N,{key:n},r.a.createElement("dt",null,s),r.a.createElement("dd",{onClick:d,style:u?{cursor:"pointer"}:null},e(c,i)))}));if("boolean"===typeof t)return r.a.createElement("div",{key:o,className:"JSONBody-boolean"},t?"true":"false");return r.a.createElement("div",{key:o,className:"JSONBody-".concat(typeof t)},t)}(JSON.parse(t),{onDrillDown:n})}catch(a){return console.log(a),null}}function g(e,t){var n=e.find(function(e){return e[0].toLowerCase()===t.toLowerCase()});return n?n[1]:null}function N(e){return e.children}var k="api-explorer-saved-state",O=function(e){function t(e){var n;return Object(m.a)(this,t),(n=Object(f.a)(this,Object(y.a)(t).call(this,e))).state=function(e,t){var n=localStorage.getItem(e);if(null===n)return t;try{return JSON.parse(n)}catch(a){return t}}(k,{apiRoot:"",endpoint:"",method:"GET",history:[],loading:!1,selectedIndex:-1}),n}return Object(E.a)(t,e),Object(h.a)(t,[{key:"sendQuery",value:function(){var e=Object(p.a)(u.a.mark(function e(){var t,n,a,r,o,s,l;return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=this.state,n=t.endpoint,a=t.method,r=this.state.apiRoot+n,o=Date.now(),e.prev=3,this.setState({loading:!0}),e.next=7,fetch(r,{method:a});case 7:return s=e.sent,e.next=10,s.text();case 10:l=e.sent,this.setState({loading:!1,history:[{endpoint:n,method:a,status:s.status,headers:Object(d.a)(s.headers),body:l,duration:Date.now()-o}].concat(Object(d.a)(this.state.history)),selectedIndex:0}),e.next=17;break;case 14:e.prev=14,e.t0=e.catch(3),this.setState({loading:!1,history:[{endpoint:n,method:a,status:"error",headers:[],body:null}].concat(Object(d.a)(this.state.history)),selectedIndex:0});case 17:case"end":return e.stop()}},e,this,[[3,14]])}));return function(){return e.apply(this,arguments)}}()},{key:"setSelected",value:function(e){e=Math.max(0,Math.min(e,this.state.history.length-1));var t=this.state.history[e];this.setState({selectedIndex:e,endpoint:t.endpoint,method:t.method})}},{key:"removeHistoryItem",value:function(e){var t=this,n=this.state.history.filter(function(t,n){return n!==e}),a=Math.max(0,Math.min(this.state.selectedIndex,this.state.history.length-1));this.setState({history:n,selectedIndex:a},function(){return t.setSelected(t.state.selectedIndex)})}},{key:"componentDidUpdate",value:function(){var e,t,n=this.state,a=(n.loading,Object(i.a)(n,["loading"]));e=k,t=a,localStorage.setItem(e,JSON.stringify(t))}},{key:"render",value:function(){var e=this,t=this.state,n=t.history,a=t.selectedIndex,o=a>=0&&a<n.length?n[a]:null;return r.a.createElement("div",{className:"App"},r.a.createElement("label",null,"API Root "," ",r.a.createElement("input",{className:"App-apiroot",value:this.state.apiRoot,onChange:function(t){return e.setState({apiRoot:t.target.value})},placeholder:"http://"})),r.a.createElement("div",{className:"App-panels"},r.a.createElement("div",{className:"App-History"},r.a.createElement("h2",null,"History"),r.a.createElement("ul",{className:"App-HistoryList"},this.state.history.map(function(t,n){return r.a.createElement("li",{key:n,className:"".concat(a===n?"selected":""," status-").concat(t.status),onClick:function(){return e.setSelected(n)}},r.a.createElement("div",{className:"App-HistoryList-title"},r.a.createElement("span",{className:"badge badge-".concat(t.method.toLowerCase())},t.method),r.a.createElement("span",{className:"App-HistoryList-endpoint"},"/",t.endpoint),r.a.createElement("span",{className:"App-HistoryList-status",style:/[45]\d\d/.test(t.status)?{color:"red"}:null},t.status)),a===n&&r.a.createElement("div",null,r.a.createElement("a",{href:"".concat(e.state.apiRoot).concat(t.endpoint),target:"_blank"},"link"),r.a.createElement("a",{href:"#",onClick:function(){return navigator.clipboard.writeText("curl".concat("GET"!==t.method?" -X ".concat(t.method):""," ").concat(e.state.apiRoot).concat(t.endpoint))}},"curl"),r.a.createElement("a",{href:"#",onClick:function(){return e.removeHistoryItem(n)}},"remove"),r.a.createElement("a",{href:"#",onClick:function(){return e.removeHistoryItem(n),e.sendQuery()}},"refresh")))}))),r.a.createElement("div",{className:"App-Request"},r.a.createElement("h2",null,"Request"),r.a.createElement("form",{className:"App-Request-url",onSubmit:function(t){e.sendQuery(),t.preventDefault()}},r.a.createElement("select",{disabled:this.state.loading,value:this.state.method,onChange:function(t){return e.setState({method:t.target.value})}},r.a.createElement("option",null,"GET"),r.a.createElement("option",null,"POST"),r.a.createElement("option",null,"PUT"),r.a.createElement("option",null,"DELETE"),r.a.createElement("option",null,"OPTION")),r.a.createElement("input",{disabled:this.state.loading,value:this.state.endpoint,onChange:function(t){return e.setState({endpoint:t.target.value})},placeholder:"endpoint"}),r.a.createElement("button",{disabled:this.state.loading},"Send"))),r.a.createElement("div",{className:"App-Response"},r.a.createElement("h2",null,"Response"),o&&r.a.createElement("div",null,"Response Time: ",o.duration,"ms"),o&&r.a.createElement("code",{className:"App-Response-Headers"},Object(d.a)(o.headers).map(function(e){var t=Object(l.a)(e,2),n=t[0],a=t[1];return"".concat(n,": ").concat(a)}).join("\n")),r.a.createElement("div",{className:"App-Response-body",style:{backgroundColor:this.state.loading?"#CCC":""}},r.a.createElement(v,{response:o,onDrillDown:function(t){return e.setState({endpoint:"".concat(e.state.endpoint,"/").concat(t)},function(){return e.sendQuery()})}})))))}}]),t}(r.a.Component);s.a.render(r.a.createElement(O,null),document.getElementById("root"))}},[[13,1,2]]]);
//# sourceMappingURL=main.00f3cfd9.chunk.js.map