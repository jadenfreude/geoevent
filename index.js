(function(){function t(t,e){var n={}.hasOwnProperty;for(var r in e)n.call(e,r)&&(t[r]=e[r]);return t}var e;e=angular.module("0media.events",[]),e.controller("0media.events.main",["$scope","$interval","$timeout","$http","0media.events.map","0media.events.map-style"].concat(function(e,n,r,a,i,s){var o,u,p;return e.style="default",o=$("#zm-event .eventmap"),e.dim={width:0,height:0,wtype:"w-md",htype:"h-md",timelineHeight:300},u=function(){return e.$apply(function(){var t,n,r;return t=[o.width(),o.height()],n=t[0],r=t[1],t=e.dim,t.width=n,t.height=r,e.dim.wtype=480>=n?"w-mc":768>=n?"w-xs":991>=n?"w-sm":1199>=n?"w-md":"w-lg",e.dim.htype=240>=r?"h-mc":320>=r?"h-xs":480>=r?"h-sm":600>=r?"h-md":"h-lg",e.dim.timelineHeight={"h-mc":120,"h-xs":140,"h-sm":200,"h-md":300,"h-lg":300}[e.dim.htype]})},p={onAdd:function(t,e){var n;return n=$("#zm-event .bubbles")[0],n.parentNode.removeChild(n),e.appendChild(n)},draw:function(t,n){var r;return r=Math.pow(2,n.getZoom()-6),e.events.map(function(e){var n;return e.x=(n=t.ll2p(e.lat,e.lng)).x,e.y=n.y,e.rate=r})}},e.reset=function(t){return null==t&&(t=!1),e.events.top=5,e.stepCount=0,e.events.map(function(e,n){return e.fadeout=1,e.opacity=.8,e.size=0,e.circle_opacity=0,e.bubble={},e.first=!1,t||(e.top=50*n),e})},e.setStyle=function(t){return e.style=t,e.map.set("styles",s[t])},e.play=function(){return e.state=1,e.dir=1},e.pause=function(){return e.state=0},e.speeding=function(){return e.speed=e.speed%3+1},e.step=function(t){return t!==e.dir&&e.events.map(function(t){return t.bubble={state:0},t.size=0,t.circle_opacity=0,t}),e.dir=t,e.state=2},e.state=1,e.speed=3,e.dir=1,e.loaded="loading",e.initData=function(){var n;return n={src:"1yY4pqGqI3rLMf5bQqe5XMztnnJ78RMUrfh-XpJdhd_o",color:"default",ratio:1},((window.location.search||"").split("?").filter(function(t){return t})[0]||"").split("&").map(function(t){var e;return e=t.split("="),n[e[0]]=e[1]}),e.$parent.config&&t(n,e.$parent.config),a({url:"https://spreadsheets.google.com/feeds/list/"+n.src+"/1/public/values?alt=json",method:"GET"}).success(function(t){var a,s,l,c,d;return a=t.feed.entry.map(function(t){var e,n,r,a,i,s,o,u,p;return e=t.gsx$date.$t.replace(/[年月]/g,"/"),e=e.replace(/[日]/g,""),n=new Date(e),r=n.getMonth()+1,e=n.getYear()+1900+"/"+(10>r?"0":"")+r,a={die:parseInt(t.gsx$death.$t||0),hurt:parseInt(t.gsx$wounded.$t||0)},a.total=a.die+a.hurt,a.radius=3*parseInt(Math.sqrt(a.total))+10,i=parseFloat(t.gsx$latitude.$t||0),s=parseFloat(t.gsx$longitude.$t||0),o=(t.gsx$shortname.$t||t.gsx$event.$t).trim(),u=new google.maps.LatLng(i,s),p={name:o,dateFull:n,casualty:a,lat:i,lng:s,loc:u,date:e}}),a=a.filter(function(t){return t.lat&&t.lng&&t.casualty.total}),s=a.map(function(t){return parseFloat(t.lat)}).sort(function(t,e){return t-e}),l=a.map(function(t){return parseFloat(t.lng)}).sort(function(t,e){return t-e}),c=function(){var t,n,i,s,o;return t=0,n=!1,i=e.dim.timelineHeight,i=.9*$("#zm-event .timeline .line").height(),s=i/3,o=1.33*i,(a[a.length-1].top<=67&&1===e.dir||a[0].top>=65&&-1===e.dir)&&(e.state=0),a.map(function(r){var a,u;return 1===e.state&&(r.top=r.top-4*e.dir),r.top<=67&&r.top>=64&&(t=1),r.top<65&&(r.fadeout=1-(65-r.top)/20,r.fadeout<0&&(r.fadeout=0)),r.top>i&&(r.fadeout=1-(r.top-i)/s),r.opacity=(o-r.top)/o,(a=(u=r.opacity)<1?u:1)>0?a:0,(r.top<-200||r.top>i)&&(r.bubble.state=0,r.circle_opacity=0,r.size=0),1===r.bubble.state&&(r.bubble.state=2,r.circle_opacity=0,r.size=r.casualty.radius*r.rate),!n&&r.top>=64&&(e.current=r,r.first=!0,2!==r.bubble.state&&(r.bubble.state=1,r.circle_opacity=1,r.size=0),n=!0),r}),t?r(step,910-300*e.speed):r(step,40-10*e.speed)},e.stepCount=0,d=function(){var t,i,s,o;return e.state&&(t=a[e.stepCount+e.dir],t&&(t.circle_opacity=1,t.bubble.state=1,t.size=t.casualty.radius*t.rate*n.ratio),t&&(e.current=t),i=a[e.stepCount],i&&(i.bubble.state=2),s=a[e.stepCount-e.dir],s&&(s.circle_opacity=0),e.events.top=(e.events.top||5)-50*e.dir,e.events.top>5&&(e.events.top=5,e.state=0),e.events.top<5-50*(e.events.length-1)&&(e.events.top=5-50*(e.events.length-1),e.state=0),e.stepCount+=e.dir,e.stepCount>=0||(e.stepCount=0),e.stepCount<=(o=e.events.length-1)||(e.stepCount=o)),2===e.state&&(e.state=0),r(d,[1600,800,300][e.speed-1])},r(d,0),e.events=a,e.reset(),e.map=i.init(o[0],[s[0],s[s.length-1]],[l[0],l[l.length-1]],u,p,n),e.setStyle(n.color),e.loaded="",setTimeout(u,0)})},e.initData()}))}).call(this);(function(){var t;t=angular.module("main",["0media.events"]),t.controller("main",["$scope","$timeout"].concat(function(t,n){var r,l;return r="http://zbryikt.github.io/geoevent",t.initz="auto",t.autoll=!0,t.clat=null,t.clng=null,t.sid=null,t.style="default",t.ratio=20,t.zlvs=["auto"].concat(function(){var t,n=[];for(t=1;18>=t;++t)l=t,n.push(l);return n}()),t.setStyle=function(n){return t.style=n},t.setRatio=function(n){return t.ratio=n},t.updateWidget=function(){return n(function(){return t.sid&&t.style&&t.ratio&&(t.autoll||t.clat&&t.clng)?(t.outurl="/widget/?src="+t.sid+"&color="+t.style+"&ratio="+t.ratio,t.clat&&t.clng&&(t.outurl+="&clat="+t.clat+"&clng="+t.clng),t.zlvs.indexOf(t.initz)>=1&&(t.outurl+="&initz="+t.initz),t.outurlwithhost=r+t.outurl,t.embedcode="<iframe src='"+r+t.outurl+"'>",$("#result").attr("src",t.outurlwithhost)):void 0},1e3)},t.generate=function(){return t.updateWidget()},t.$watch("datasrc",function(){var n;return n=/\/d\/([^\/]+)/.exec(t.datasrc),t.sid=n?n[1]:null}),t.config={src:"1yY4pqGqI3rLMf5bQqe5XMztnnJ78RMUrfh-XpJdhd_o",color:"default",ratio:20,clat:12.573404,clng:-15.193685,initz:1}}))}).call(this);(function(){var e;e=angular.module("0media.events"),e.factory("0media.events.map-style",[].concat(function(){return{green:[{featureType:"water",stylers:[{color:"#18bca8"},{saturation:-35},{lightness:68}]},{featureType:"road",elementType:"geometry.stroke",stylers:[{color:"#18bc9c"},{saturation:-36},{lightness:10}]},{featureType:"road.highway",elementType:"geometry.fill",stylers:[{color:"#18bc9c"},{lightness:65},{saturation:-22}]},{}],gray:[{featureType:"water",stylers:[{color:"#dddddd"}]},{featureType:"landscape",stylers:[{color:"#bbbbbb"}]},{featureType:"road",stylers:[{color:"#999999"},{weight:.4},{visibility:"simplified"}]},{featureType:"road",elementType:"labels",stylers:[{visibility:"off"}]},{featureType:"poi",stylers:[{color:"#aaaaaa"}]},{featureType:"administrative",elementType:"geometry",stylers:[{visibility:"on"},{weight:1.3},{color:"#444444"}]},{featureType:"administrative",elementType:"labels.text.fill",stylers:[{color:"#222222"}]},{featureType:"administrative",elementType:"labels.text.stroke",stylers:[{color:"#ffffff"}]},{}],"default":[{featureType:"water",stylers:[{hue:"#1900ff"},{lightness:-86},{saturation:-80}]},{featureType:"landscape",stylers:[{lightness:-47},{hue:"#dd3d00"},{saturation:-80}]},{featureType:"poi",stylers:[{saturation:-100},{lightness:-30}]},{featureType:"road",stylers:[{weight:.3},{saturation:-48},{lightness:-0},{hue:"#dd4400"}]}]}}))}).call(this);(function(){function t(t,n){var o={}.hasOwnProperty;for(var e in n)o.call(n,e)&&(t[e]=n[e]);return t}var n;n=angular.module("0media.events"),n.factory("0media.events.map",[].concat(function(){return{init:function(n,o,e,a,r,g){var i,s,l,u,p,m;return i={center:new google.maps.LatLng(23.624146,120.320623),zoom:parseInt(g.initz||9),minZoom:1,maxZoom:18,mapTypeId:google.maps.MapTypeId.ROADMAP,panControl:!1,scaleControl:!1,mapTypeControl:!1,streetViewControl:!1,zoomControlOptions:{position:google.maps.ControlPosition.RIGHT_CENTER}},g.clat&&g.clng?i.center=new google.maps.LatLng(parseFloat(g.clat),parseFloat(g.clng)):(s=new google.maps.LatLngBounds,l=[[o[1],e[0]],[o[0],e[1]]],l.map(function(t){return new google.maps.LatLng(t[0],t[1])}).map(function(t){return s.extend(t)})),u=function(t){return t.getYear()+1900},p=new google.maps.Map(n,i),s&&p.fitBounds(s),google.maps.event.addDomListener(window,"resize",function(){var t,o,e,r,g,i,l,u;return s||(s=p.getBounds()),t=[$(n).width(),$(n).height()],o=t[0],e=t[1],p.fitBounds(s),r=p.getBounds(),t=[r.getNorthEast().lat(),r.getSouthWest().lng()],g=t[0],i=t[1],t=[r.getSouthWest().lat(),r.getNorthEast().lng()],l=t[0],u=t[1],a([g,u],[l,i])}),m=t(new google.maps.OverlayView,{ll2p:function(t,n){var o,e;return o=this.getProjection(),e=o.fromLatLngToDivPixel(new google.maps.LatLng(t,n))},onAdd:function(){return r.onAdd(this,this.getPanes().overlayLayer)},draw:function(){return r.draw(this,p)}}),m.setMap(p),p}}}))}).call(this);