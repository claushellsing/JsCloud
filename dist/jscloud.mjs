import h from"cash-dom";import _ from"lodash/delay";var u=function(l,t){return l.bind(t)},g={width:100,height:100,center:{x:.5,y:.5},steps:10,delay:null,shape:"elliptic",classPattern:"w{n}",encodeURI:!0,removeOverflowing:!0,afterCloudRender:null,autoResize:!1,colors:null,fontSize:null,template:null},w=class{constructor(t,i,s={}){this.$element=h(t),this.word_array=i||[],this.sizeGenerator=null,this.colorGenerator=null,this.data={placed_words:[],timeouts:{},namespace:null,step:null,angle:null,aspect_ratio:null,max_weight:null,min_weight:null,sizes:[],colors:[]},this.options=h.extend(!0,g,s),this.initialize()}initialize(){if(this.options.width?this.$element.width(this.options.width):this.options.width=this.$element.width(),this.options.height?this.$element.height(this.options.height):this.options.height=this.$element.height(),this.options=h.extend(!0,{},g,this.options),this.options.delay===null&&(this.options.delay=this.word_array.length>50?10:0),this.options.center.x>1&&(this.options.center.x=this.options.center.x/this.options.width,this.options.center.y=this.options.center.y/this.options.height),typeof this.options.colors=="function")this.colorGenerator=this.options.colors;else if(h.isArray(this.options.colors)){let i=this.options.colors.length;if(i>0){if(i<this.options.steps)for(let s=i;s<this.options.steps;s++)this.options.colors[s]=this.options.colors[i-1];this.colorGenerator=function(s){return this.options.colors[this.options.steps-s]}}}if(typeof this.options.fontSize=="function")this.sizeGenerator=this.options.fontSize;else if(h.isPlainObject(this.options.fontSize))this.sizeGenerator=function(i,s,n){let a=i*this.options.fontSize.from,r=i*this.options.fontSize.to;return Math.round(r+(a-r)*1/(this.options.steps-1)*(n-1))+"px"};else if(h.isArray(this.options.fontSize)){let i=this.options.fontSize.length;if(i>0){if(i<this.options.steps)for(var t=i;t<this.options.steps;t++)this.options.fontSize[t]=this.options.fontSize[i-1];this.sizeGenerator=function(s,n,a){return this.options.fontSize[this.options.steps-a]}}}this.data.angle=Math.random()*6.28,this.data.step=this.options.shape==="rectangular"?18:2,this.data.aspect_ratio=this.options.width/this.options.height,this.clearTimeouts(),this.data.namespace=(this.$element.attr("id")||Math.floor(Math.random()*1e6).toString(36))+"_word_",this.$element.addClass("jscloud"),this.$element.css("position")==="static"&&this.$element.css("position","relative"),this.createTimeout(u(this.drawWordCloud,this),10),this.options.autoResize&&h(window).on("resize."+this.data.namespace,y(this.resize,50,this))}createTimeout(t,i){let s=_(u(()=>{delete this.data.timeouts[s],t()},this),i);this.data.timeouts[s]=!0}clearTimeouts(){h.each(this.data.timeouts,function(t){clearTimeout(t)}),this.data.timeouts={}}overlapping(t,i){return Math.abs(2*t.left+t.width-2*i.left-i.width)<t.width+i.width&&Math.abs(2*t.top+t.height-2*i.top-i.height)<t.height+i.height}hitTest(t){for(let i=0,s=this.data.placed_words.length;i<s;i++)if(this.overlapping(t,this.data.placed_words[i]))return!0;return!1}drawWordCloud(){let t,i;if(this.$element.children('[id^="'+this.data.namespace+'"]').remove(),this.word_array.length!==0){for(t=0,i=this.word_array.length;t<i;t++)this.word_array[t].weight=parseFloat(this.word_array[t].weight);if(this.word_array.sort(function(s,n){return n.weight-s.weight}),this.data.max_weight=this.word_array[0].weight,this.data.min_weight=this.word_array[this.word_array.length-1].weight,this.data.colors=[],this.colorGenerator)for(t=0;t<this.options.steps;t++)this.data.colors.push(this.colorGenerator(t+1));if(this.data.sizes=[],this.sizeGenerator)for(t=0;t<this.options.steps;t++)this.data.sizes.push(this.sizeGenerator(this.options.width,this.options.height,t+1));if(this.options.delay>0)this.drawOneWordDelayed();else{for(t=0,i=this.word_array.length;t<i;t++)this.drawOneWord(t,this.word_array[t]);typeof this.options.afterCloudRender=="function"&&this.options.afterCloudRender.call(this.$element)}}}drawOneWord(t,i){let s=this.data.namespace+t,n="#"+s,a=this.data.angle,r=0,p=0,c=0,f=Math.floor(this.options.steps/2),o,e,d;if(i.attr=h.extend({},i.html,{id:s}),this.data.max_weight!=this.data.min_weight&&(f=Math.round((i.weight-this.data.min_weight)*1*(this.options.steps-1)/(this.data.max_weight-this.data.min_weight))+1),o=h("<span>").attr(i.attr),o.addClass("jscloud-word"),this.options.classPattern&&o.addClass(this.options.classPattern.replace("{n}",f)),this.data.colors.length&&o.css("color",this.data.colors[f-1]),i.color&&o.css("color",i.color),this.data.sizes.length&&o.css("font-size",this.data.sizes[f-1]),this.options.template)o.html(this.options.template(i));else if(i.link){typeof i.link=="string"&&(i.link={href:i.link}),this.options.encodeURI&&(i.link.href=encodeURI(i.link.href).replace(/'/g,"%27"));let m=h("<a>");m.attr(i.link),m.text(i.text),o.append(m)}else o.text(i.text);for(i.handlers&&o.on(i.handlers),this.$element.append(o),e={width:o.outerWidth(),height:o.outerHeight()},e.left=this.options.center.x*this.options.width-e.width/2,e.top=this.options.center.y*this.options.height-e.height/2,d=o[0].style,d.position="absolute",d.left=e.left+"px",d.top=e.top+"px";this.hitTest(e);){if(this.options.shape==="rectangular")switch(p++,p*this.data.step>(1+Math.floor(c/2))*this.data.step*(c%4%2===0?1:this.data.aspect_ratio)&&(p=0,c++),c%4){case 1:e.left+=this.data.step*this.data.aspect_ratio+Math.random()*2;break;case 2:e.top-=this.data.step+Math.random()*2;break;case 3:e.left-=this.data.step*this.data.aspect_ratio+Math.random()*2;break;case 0:e.top+=this.data.step+Math.random()*2;break}else r+=this.data.step,a+=(t%2===0?1:-1)*this.data.step,e.left=this.options.center.x*this.options.width-e.width/2+r*Math.cos(a)*this.data.aspect_ratio,e.top=this.options.center.y*this.options.height+r*Math.sin(a)-e.height/2;d.left=e.left+"px",d.top=e.top+"px"}if(this.options.removeOverflowing&&(e.left<0||e.top<0||e.left+e.width>this.options.width||e.top+e.height>this.options.height)){o.remove();return}this.data.placed_words.push(e),typeof i.afterWordRender=="function"&&i.afterWordRender.call(o)}drawOneWordDelayed(t=0){if(!this.$element.is(":visible")){this.createTimeout(u(function(){this.drawOneWordDelayed(t)},this),10);return}t<this.word_array.length?(this.drawOneWord(t,this.word_array[t]),this.createTimeout(u(function(){this.drawOneWordDelayed(t+1)},this),this.options.delay)):typeof this.options.afterCloudRender=="function"&&this.options.afterCloudRender.call(this.$element)}destroy(){this.options.autoResize&&h(window).off("resize."+this.data.namespace),this.clearTimeouts(),this.$element.removeClass("jscloud"),this.$element.removeData("jscloud"),this.$element.children('[id^="'+this.data.namespace+'"]').remove()}update(t){this.word_array=t,this.data.placed_words=[],this.clearTimeouts(),this.drawWordCloud()}resize(){let t={width:this.$element.width(),height:this.$element.height()};(t.width!=this.options.width||t.height!=this.options.height)&&(this.options.width=t.width,this.options.height=t.height,this.data.aspect_ratio=this.options.width/this.options.height,this.update(this.word_array))}};function y(l,t,i){let s={pid:null,last:0};return function(){let n=new Date().getTime()-s.last,a=arguments,r=this;function p(){return s.last=new Date().getTime(),l.apply(i||r,Array.prototype.slice.call(a))}if(n>t)return p();clearTimeout(s.pid),s.pid=setTimeout(p,t-n)}}function z(l,t,i={}){return new w(l,t,i)}var M=z;export{M as default};