/*! bitgold-frontend 0.1.13 2014-11-19 */
var Webcam={version:"1.0.0",protocol:location.protocol.match(/https/i)?"https":"http",swfURL:"",loaded:!1,live:!1,userMedia:!0,params:{width:0,height:0,dest_width:0,dest_height:0,image_format:"jpeg",jpeg_quality:90,force_flash:!1},hooks:{load:null,live:null,uploadcomplete:null,uploadprogress:null,error:function(a){alert("Webcam.js Error: "+a)}},init:function(){navigator.getUserMedia=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia,window.URL=window.URL||window.webkitURL||window.mozURL||window.msURL,this.userMedia=this.userMedia&&!!navigator.getUserMedia&&!!window.URL,navigator.userAgent.match(/Firefox\D+(\d+)/)&&parseInt(RegExp.$1,10)<21&&(this.userMedia=null)},attach:function(a){if("string"==typeof a&&(a=document.getElementById(a)||document.querySelector(a)),!a)return this.dispatch("error","Could not locate DOM element to attach to.");this.container=a,a.innerHTML="";var b=document.createElement("div");a.appendChild(b),this.peg=b,this.params.width||(this.params.width=a.offsetWidth),this.params.height||(this.params.height=a.offsetHeight),this.params.dest_width||(this.params.dest_width=this.params.width),this.params.dest_height||(this.params.dest_height=this.params.height),this.params.force_flash&&(this.userMedia=null);var c=this.params.width/this.params.dest_width,d=this.params.height/this.params.dest_height;if(this.userMedia){var e=document.createElement("video");e.setAttribute("autoplay","autoplay"),e.style.width=""+this.params.dest_width+"px",e.style.height=""+this.params.dest_height+"px",(1!=c||1!=d)&&(a.style.overflow="hidden",e.style.webkitTransformOrigin="0px 0px",e.style.mozTransformOrigin="0px 0px",e.style.msTransformOrigin="0px 0px",e.style.oTransformOrigin="0px 0px",e.style.transformOrigin="0px 0px",e.style.webkitTransform="scaleX("+c+") scaleY("+d+")",e.style.mozTransform="scaleX("+c+") scaleY("+d+")",e.style.msTransform="scaleX("+c+") scaleY("+d+")",e.style.oTransform="scaleX("+c+") scaleY("+d+")",e.style.transform="scaleX("+c+") scaleY("+d+")"),a.appendChild(e),this.video=e;var f=this;navigator.getUserMedia({audio:!1,video:!0},function(a){e.src=window.URL.createObjectURL(a)||a,Webcam.stream=a,Webcam.loaded=!0,Webcam.live=!0,Webcam.dispatch("load"),Webcam.dispatch("live")},function(){return f.dispatch("error","Could not access webcam.")})}else{var g=document.createElement("div");g.innerHTML=this.getSWFHTML(),a.appendChild(g)}if(this.params.crop_width&&this.params.crop_height){var h=Math.floor(this.params.crop_width*c),i=Math.floor(this.params.crop_height*d);a.style.width=""+h+"px",a.style.height=""+i+"px",a.style.overflow="hidden",a.scrollLeft=Math.floor(this.params.width/2-h/2),a.scrollTop=Math.floor(this.params.height/2-i/2)}else a.style.width=""+this.params.width+"px",a.style.height=""+this.params.height+"px"},reset:function(){if(this.userMedia){try{this.stream.stop()}catch(a){}delete this.stream,delete this.video}this.container.innerHTML="",delete this.container,this.loaded=!1,this.live=!1},set:function(){if(1==arguments.length)for(var a in arguments[0])this.params[a]=arguments[0][a];else this.params[arguments[0]]=arguments[1]},on:function(a,b){if(a=a.replace(/^on/i,"").toLowerCase(),"undefined"==typeof this.hooks[a])throw"Event type not supported: "+a;this.hooks[a]=b},dispatch:function(){var a=arguments[0].replace(/^on/i,"").toLowerCase(),b=Array.prototype.slice.call(arguments,1);return this.hooks[a]?("function"==typeof this.hooks[a]?this.hooks[a].apply(this,b):"array"==typeof this.hooks[a]?this.hooks[a][0][this.hooks[a][1]].apply(this.hooks[a][0],b):window[this.hooks[a]]&&window[this.hooks[a]].apply(window,b),!0):!1},setSWFLocation:function(a){this.swfURL=a},getSWFHTML:function(){var a="";if(location.protocol.match(/file/))return'<h1 style="color:red">Sorry, the Webcam.js Flash fallback does not work from local disk.  Please upload it to a web server first.</h1>';if(!this.swfURL){for(var b="",c=document.getElementsByTagName("script"),d=0,e=c.length;e>d;d++){var f=c[d].getAttribute("src");f&&f.match(/\/webcam(\.min)?\.js/)&&(b=f.replace(/\/webcam(\.min)?\.js.*$/,""),d=e)}this.swfURL=b?b+"/webcam.swf":"webcam.swf"}window.localStorage&&!localStorage.getItem("visited")&&(this.params.new_user=1,localStorage.setItem("visited",1));var g="";for(var h in this.params)g&&(g+="&"),g+=h+"="+escape(this.params[h]);return a+='<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" type="application/x-shockwave-flash" codebase="'+this.protocol+'://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" width="'+this.params.width+'" height="'+this.params.height+'" id="webcam_movie_obj" align="middle"><param name="wmode" value="opaque" /><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="false" /><param name="movie" value="'+this.swfURL+'" /><param name="loop" value="false" /><param name="menu" value="false" /><param name="quality" value="best" /><param name="bgcolor" value="#ffffff" /><param name="flashvars" value="'+g+'"/><embed id="webcam_movie_embed" src="'+this.swfURL+'" wmode="opaque" loop="false" menu="false" quality="best" bgcolor="#ffffff" width="'+this.params.width+'" height="'+this.params.height+'" name="webcam_movie_embed" align="middle" allowScriptAccess="always" allowFullScreen="false" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" flashvars="'+g+'"></embed></object>'},getMovie:function(){if(!this.loaded)return this.dispatch("error","Flash Movie is not loaded yet");var a=document.getElementById("webcam_movie_obj");return a&&a._snap||(a=document.getElementById("webcam_movie_embed")),a||this.dispatch("error","Cannot locate Flash movie in DOM"),a},freeze:function(){var a=this,b=this.params;this.preview_active&&this.unfreeze();var c=this.params.width/this.params.dest_width,d=this.params.height/this.params.dest_height,e=b.crop_width||b.dest_width,f=b.crop_height||b.dest_height,g=document.createElement("canvas");g.width=e,g.height=f;var h=g.getContext("2d");this.preview_canvas=g,this.preview_context=h,(1!=c||1!=d)&&(g.style.webkitTransformOrigin="0px 0px",g.style.mozTransformOrigin="0px 0px",g.style.msTransformOrigin="0px 0px",g.style.oTransformOrigin="0px 0px",g.style.transformOrigin="0px 0px",g.style.webkitTransform="scaleX("+c+") scaleY("+d+")",g.style.mozTransform="scaleX("+c+") scaleY("+d+")",g.style.msTransform="scaleX("+c+") scaleY("+d+")",g.style.oTransform="scaleX("+c+") scaleY("+d+")",g.style.transform="scaleX("+c+") scaleY("+d+")"),this.snap(function(){g.style.position="relative",g.style.left=""+a.container.scrollLeft+"px",g.style.top=""+a.container.scrollTop+"px",a.container.insertBefore(g,a.peg),a.container.style.overflow="hidden",a.preview_active=!0},g)},unfreeze:function(){this.preview_active&&(this.container.removeChild(this.preview_canvas),delete this.preview_context,delete this.preview_canvas,this.preview_active=!1)},savePreview:function(a,b){var c=this.params,d=this.preview_canvas,e=this.preview_context;if(b){var f=b.getContext("2d");f.drawImage(d,0,0)}a(b?null:d.toDataURL("image/"+c.image_format,c.jpeg_quality/100),d,e),this.unfreeze()},snap:function(a,b){var c=this.params;if(!this.loaded)return this.dispatch("error","Webcam is not loaded yet");if(!this.live)return this.dispatch("error","Webcam is not live yet");if(!a)return this.dispatch("error","Please provide a callback function or canvas to snap()");if(this.preview_active)return this.savePreview(a,b),null;var d=document.createElement("canvas");d.width=this.params.dest_width,d.height=this.params.dest_height;var e=d.getContext("2d"),f=function(){if(this.src&&this.width&&this.height&&e.drawImage(this,0,0,c.dest_width,c.dest_height),c.crop_width&&c.crop_height){var f=document.createElement("canvas");f.width=c.crop_width,f.height=c.crop_height;var g=f.getContext("2d");g.drawImage(d,Math.floor(c.dest_width/2-c.crop_width/2),Math.floor(c.dest_height/2-c.crop_height/2),c.crop_width,c.crop_height,0,0,c.crop_width,c.crop_height),e=g,d=f}if(b){var h=b.getContext("2d");h.drawImage(d,0,0)}a(b?null:d.toDataURL("image/"+c.image_format,c.jpeg_quality/100),d,e)};if(this.userMedia)e.drawImage(this.video,0,0,this.params.dest_width,this.params.dest_height),f();else{var g=this.getMovie()._snap(),h=new Image;h.onload=f,h.src="data:image/"+this.params.image_format+";base64,"+g}return null},configure:function(a){a||(a="camera"),this.getMovie()._configure(a)},flashNotify:function(a,b){switch(a){case"flashLoadComplete":this.loaded=!0,this.dispatch("load");break;case"cameraLive":this.live=!0,this.dispatch("live");break;case"error":this.dispatch("error",b)}},b64ToUint6:function(a){return a>64&&91>a?a-65:a>96&&123>a?a-71:a>47&&58>a?a+4:43===a?62:47===a?63:0},base64DecToArr:function(a,b){for(var c,d,e=a.replace(/[^A-Za-z0-9\+\/]/g,""),f=e.length,g=b?Math.ceil((3*f+1>>2)/b)*b:3*f+1>>2,h=new Uint8Array(g),i=0,j=0,k=0;f>k;k++)if(d=3&k,i|=this.b64ToUint6(e.charCodeAt(k))<<18-6*d,3===d||f-k===1){for(c=0;3>c&&g>j;c++,j++)h[j]=i>>>(16>>>c&24)&255;i=0}return h},upload:function(a,b,c){c&&Webcam.on("uploadComplete",c);var d="webcam",e="";if(!a.match(/^data\:image\/(\w+)/))throw"Cannot locate image format in Data URI";e=RegExp.$1;var f=a.replace(/^data\:image\/\w+\;base64\,/,""),g=new XMLHttpRequest;g.open("POST",b,!0),g.upload&&g.upload.addEventListener&&g.upload.addEventListener("progress",function(a){if(a.lengthComputable){var b=a.loaded/a.total;Webcam.dispatch("uploadProgress",b,a)}},!1),g.onload=function(){Webcam.dispatch("uploadComplete",g.status,g.responseText,g.statusText)};var h=new Blob([this.base64DecToArr(f)],{type:"image/"+e}),i=new FormData;i.append(d,h,d+"."+e.replace(/e/,"")),g.send(i)}};Webcam.init();