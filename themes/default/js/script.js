// Coming Soon Notify Me
jQuery.ajaxSetup ({
    // Disable caching of AJAX responses */
    cache: false
});
jQuery(document).ready(function($){

    //jQuery('#csp4-email').css('height',(parseFloat(jQuery('#csp4-subscribe-btn').css('height'))+10) + 'px');

    // Submit Button
    $('#csp4-form').submit(function(event) {
        event.preventDefault();
        msg = '';
        url = $("#csp4-ajax-url").val();
        action = 'seed_csp4_subscribe_callback';
        email = $("#csp4-email").val();
        fname = $("#csp4-fname").val();
        lname = $("#csp4-lname").val();

        payload = '?action='+action+'&email='+email+'&fname='+fname+'&lname='+lname;

        $.get(url+payload, function(data,textStatus,xhr) {
          data = $.trim(data);
          //var obj = jQuery.parseJSON(data);
          after_form(data);
        });

    });

    // Ajax indicator
    $(document).ajaxStart(function(){ 
      $('#csp4-email').addClass('csp4-ajax-indicator'); 
    }).ajaxStop(function(){ 
      $('#csp4-email').removeClass('csp4-ajax-indicator');
    });

    // Placeholder Support
    $('input, textarea').placeholder();

    // Show ajax on click
    $('#csp4-subscribe-btn').click(function(event) {
      $('#csp4-email').addClass('csp4-ajax-indicator'); 
    });


    
});

function after_form(args){
          //console.log(args);
          args = jQuery.parseJSON(args);

          switch(args.status)
          {
          case '600':
            msg = seed_csp4_err_msg.msg600;
            jQuery(".alert").addClass('alert-info');
            jQuery("#csp4-email").val('');
            break;
          case '500':
            msg = seed_csp4_err_msg.msg500;
            jQuery(".alert").addClass('alert-error');
            break;
          case '400':
            msg = seed_csp4_err_msg.msg400;
            jQuery(".alert").addClass('alert-error');
            break;
          case '200':
            msg = seed_csp4_err_msg.msg200;
            // jQuery("#csp4-ref-out").append(args.ref);
            // jQuery("#share_twitter a").prop('data-url',jQuery("#share_twitter a").prop('data-url')+args.ref);
            // jQuery("#share_facebook iframe").prop('src',jQuery("#share_facebook iframe").prop('src')+args.ref);
            // jQuery("#share_googleplus div").prop('data-url',jQuery("#share_googleplus div").prop('data-url')+args.ref);
            // jQuery("#share_linkedin div").prop('data-url',jQuery("#share_linkedin div").prop('data-url')+args.ref);
            // jQuery("#share_pinterest div").prop('data-url',jQuery("#share_pinterest div").prop('data-url')+args.ref);
            // jQuery("#share_tumblr a").prop('href',jQuery("#share_tumblr a").prop('href')+args.ref);
            //jQuery("#csp4-afterform,#csp4-social-profiles,#csp4-sharebuttons,#csp4-ref").show();
            jQuery("#csp4-form,#csp4-headline,#csp4-description,#csp4-progressbar").hide();
            break;
          default:
            jQuery(".alert").addClass('alert');
            msg = args.status;
            jQuery(".alert").html(msg).fadeIn();

          }
   
         jQuery(".alert").html(msg).fadeIn();
}

/*! http://mths.be/placeholder v2.0.7 by @mathias */
;(function(f,h,$){var a='placeholder' in h.createElement('input'),d='placeholder' in h.createElement('textarea'),i=$.fn,c=$.valHooks,k,j;if(a&&d){j=i.placeholder=function(){return this};j.input=j.textarea=true}else{j=i.placeholder=function(){var l=this;l.filter((a?'textarea':':input')+'[placeholder]').not('.placeholder').bind({'focus.placeholder':b,'blur.placeholder':e}).data('placeholder-enabled',true).trigger('blur.placeholder');return l};j.input=a;j.textarea=d;k={get:function(m){var l=$(m);return l.data('placeholder-enabled')&&l.hasClass('placeholder')?'':m.value},set:function(m,n){var l=$(m);if(!l.data('placeholder-enabled')){return m.value=n}if(n==''){m.value=n;if(m!=h.activeElement){e.call(m)}}else{if(l.hasClass('placeholder')){b.call(m,true,n)||(m.value=n)}else{m.value=n}}return l}};a||(c.input=k);d||(c.textarea=k);$(function(){$(h).delegate('form','submit.placeholder',function(){var l=$('.placeholder',this).each(b);setTimeout(function(){l.each(e)},10)})});$(f).bind('beforeunload.placeholder',function(){$('.placeholder').each(function(){this.value=''})})}function g(m){var l={},n=/^jQuery\d+$/;$.each(m.attributes,function(p,o){if(o.specified&&!n.test(o.name)){l[o.name]=o.value}});return l}function b(m,n){var l=this,o=$(l);if(l.value==o.attr('placeholder')&&o.hasClass('placeholder')){if(o.data('placeholder-password')){o=o.hide().next().show().attr('id',o.removeAttr('id').data('placeholder-id'));if(m===true){return o[0].value=n}o.focus()}else{l.value='';o.removeClass('placeholder');l==h.activeElement&&l.select()}}}function e(){var q,l=this,p=$(l),m=p,o=this.id;if(l.value==''){if(l.type=='password'){if(!p.data('placeholder-textinput')){try{q=p.clone().attr({type:'text'})}catch(n){q=$('<input>').attr($.extend(g(this),{type:'text'}))}q.removeAttr('name').data({'placeholder-password':true,'placeholder-id':o}).bind('focus.placeholder',b);p.data({'placeholder-textinput':q,'placeholder-id':o}).before(q)}p=p.removeAttr('id').hide().prev().attr('id',o).show()}p.addClass('placeholder');p[0].value=p.attr('placeholder')}else{p.removeClass('placeholder')}}}(this,document,jQuery));

/* http://keith-wood.name/countdown.html
   Countdown for jQuery v1.6.3.
   Written by Keith Wood (kbwood{at}iinet.com.au) January 2008.
   Available under the MIT (https://github.com/jquery/jquery/blob/master/MIT-LICENSE.txt) license. 
   Please attribute the author if you use it. */
(function($){function Countdown(){this.regional=[];this.regional['']={labels:['Years','Months','Weeks','Days','Hours','Minutes','Seconds'],labels1:['Year','Month','Week','Day','Hour','Minute','Second'],compactLabels:['y','m','w','d'],whichLabels:null,digits:['0','1','2','3','4','5','6','7','8','9'],timeSeparator:':',isRTL:false};this._defaults={until:null,since:null,timezone:null,serverSync:null,format:'dHMS',layout:'',compact:false,significant:0,description:'',expiryUrl:'',expiryText:'',alwaysExpire:false,onExpiry:null,onTick:null,tickInterval:1};$.extend(this._defaults,this.regional['']);this._serverSyncs=[];var c=(typeof Date.now=='function'?Date.now:function(){return new Date().getTime()});var d=(window.performance&&typeof window.performance.now=='function');function timerCallBack(a){var b=(a<1e12?(d?(performance.now()+performance.timing.navigationStart):c()):a||c());if(b-f>=1000){x._updateTargets();f=b}e(timerCallBack)}var e=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||null;var f=0;if(!e||$.noRequestAnimationFrame){$.noRequestAnimationFrame=null;setInterval(function(){x._updateTargets()},980)}else{f=window.animationStartTime||window.webkitAnimationStartTime||window.mozAnimationStartTime||window.oAnimationStartTime||window.msAnimationStartTime||c();e(timerCallBack)}}var Y=0;var O=1;var W=2;var D=3;var H=4;var M=5;var S=6;$.extend(Countdown.prototype,{markerClassName:'hasCountdown',propertyName:'countdown',_rtlClass:'countdown_rtl',_sectionClass:'countdown_section',_amountClass:'countdown_amount',_rowClass:'countdown_row',_holdingClass:'countdown_holding',_showClass:'countdown_show',_descrClass:'countdown_descr',_timerTargets:[],setDefaults:function(a){this._resetExtraLabels(this._defaults,a);$.extend(this._defaults,a||{})},UTCDate:function(a,b,c,e,f,g,h,i){if(typeof b=='object'&&b.constructor==Date){i=b.getMilliseconds();h=b.getSeconds();g=b.getMinutes();f=b.getHours();e=b.getDate();c=b.getMonth();b=b.getFullYear()}var d=new Date();d.setUTCFullYear(b);d.setUTCDate(1);d.setUTCMonth(c||0);d.setUTCDate(e||1);d.setUTCHours(f||0);d.setUTCMinutes((g||0)-(Math.abs(a)<30?a*60:a));d.setUTCSeconds(h||0);d.setUTCMilliseconds(i||0);return d},periodsToSeconds:function(a){return a[0]*31557600+a[1]*2629800+a[2]*604800+a[3]*86400+a[4]*3600+a[5]*60+a[6]},_attachPlugin:function(a,b){a=$(a);if(a.hasClass(this.markerClassName)){return}var c={options:$.extend({},this._defaults),_periods:[0,0,0,0,0,0,0]};a.addClass(this.markerClassName).data(this.propertyName,c);this._optionPlugin(a,b)},_addTarget:function(a){if(!this._hasTarget(a)){this._timerTargets.push(a)}},_hasTarget:function(a){return($.inArray(a,this._timerTargets)>-1)},_removeTarget:function(b){this._timerTargets=$.map(this._timerTargets,function(a){return(a==b?null:a)})},_updateTargets:function(){for(var i=this._timerTargets.length-1;i>=0;i--){this._updateCountdown(this._timerTargets[i])}},_optionPlugin:function(a,b,c){a=$(a);var d=a.data(this.propertyName);if(!b||(typeof b=='string'&&c==null)){var e=b;b=(d||{}).options;return(b&&e?b[e]:b)}if(!a.hasClass(this.markerClassName)){return}b=b||{};if(typeof b=='string'){var e=b;b={};b[e]=c}if(b.layout){b.layout=b.layout.replace(/&lt;/g,'<').replace(/&gt;/g,'>')}this._resetExtraLabels(d.options,b);var f=(d.options.timezone!=b.timezone);$.extend(d.options,b);this._adjustSettings(a,d,b.until!=null||b.since!=null||f);var g=new Date();if((d._since&&d._since<g)||(d._until&&d._until>g)){this._addTarget(a[0])}this._updateCountdown(a,d)},_updateCountdown:function(a,b){var c=$(a);b=b||c.data(this.propertyName);if(!b){return}c.html(this._generateHTML(b)).toggleClass(this._rtlClass,b.options.isRTL);if($.isFunction(b.options.onTick)){var d=b._hold!='lap'?b._periods:this._calculatePeriods(b,b._show,b.options.significant,new Date());if(b.options.tickInterval==1||this.periodsToSeconds(d)%b.options.tickInterval==0){b.options.onTick.apply(a,[d])}}var e=b._hold!='pause'&&(b._since?b._now.getTime()<b._since.getTime():b._now.getTime()>=b._until.getTime());if(e&&!b._expiring){b._expiring=true;if(this._hasTarget(a)||b.options.alwaysExpire){this._removeTarget(a);if($.isFunction(b.options.onExpiry)){b.options.onExpiry.apply(a,[])}if(b.options.expiryText){var f=b.options.layout;b.options.layout=b.options.expiryText;this._updateCountdown(a,b);b.options.layout=f}if(b.options.expiryUrl){window.location=b.options.expiryUrl}}b._expiring=false}else if(b._hold=='pause'){this._removeTarget(a)}c.data(this.propertyName,b)},_resetExtraLabels:function(a,b){var c=false;for(var n in b){if(n!='whichLabels'&&n.match(/[Ll]abels/)){c=true;break}}if(c){for(var n in a){if(n.match(/[Ll]abels[02-9]|compactLabels1/)){a[n]=null}}}},_adjustSettings:function(a,b,c){var d;var e=0;var f=null;for(var i=0;i<this._serverSyncs.length;i++){if(this._serverSyncs[i][0]==b.options.serverSync){f=this._serverSyncs[i][1];break}}if(f!=null){e=(b.options.serverSync?f:0);d=new Date()}else{var g=($.isFunction(b.options.serverSync)?b.options.serverSync.apply(a,[]):null);d=new Date();e=(g?d.getTime()-g.getTime():0);this._serverSyncs.push([b.options.serverSync,e])}var h=b.options.timezone;h=(h==null?-d.getTimezoneOffset():h);if(c||(!c&&b._until==null&&b._since==null)){b._since=b.options.since;if(b._since!=null){b._since=this.UTCDate(h,this._determineTime(b._since,null));if(b._since&&e){b._since.setMilliseconds(b._since.getMilliseconds()+e)}}b._until=this.UTCDate(h,this._determineTime(b.options.until,d));if(e){b._until.setMilliseconds(b._until.getMilliseconds()+e)}}b._show=this._determineShow(b)},_destroyPlugin:function(a){a=$(a);if(!a.hasClass(this.markerClassName)){return}this._removeTarget(a[0]);a.removeClass(this.markerClassName).empty().removeData(this.propertyName)},_pausePlugin:function(a){this._hold(a,'pause')},_lapPlugin:function(a){this._hold(a,'lap')},_resumePlugin:function(a){this._hold(a,null)},_hold:function(a,b){var c=$.data(a,this.propertyName);if(c){if(c._hold=='pause'&&!b){c._periods=c._savePeriods;var d=(c._since?'-':'+');c[c._since?'_since':'_until']=this._determineTime(d+c._periods[0]+'y'+d+c._periods[1]+'o'+d+c._periods[2]+'w'+d+c._periods[3]+'d'+d+c._periods[4]+'h'+d+c._periods[5]+'m'+d+c._periods[6]+'s');this._addTarget(a)}c._hold=b;c._savePeriods=(b=='pause'?c._periods:null);$.data(a,this.propertyName,c);this._updateCountdown(a,c)}},_getTimesPlugin:function(a){var b=$.data(a,this.propertyName);return(!b?null:(b._hold=='pause'?b._savePeriods:(!b._hold?b._periods:this._calculatePeriods(b,b._show,b.options.significant,new Date()))))},_determineTime:function(k,l){var m=function(a){var b=new Date();b.setTime(b.getTime()+a*1000);return b};var n=function(a){a=a.toLowerCase();var b=new Date();var c=b.getFullYear();var d=b.getMonth();var e=b.getDate();var f=b.getHours();var g=b.getMinutes();var h=b.getSeconds();var i=/([+-]?[0-9]+)\s*(s|m|h|d|w|o|y)?/g;var j=i.exec(a);while(j){switch(j[2]||'s'){case's':h+=parseInt(j[1],10);break;case'm':g+=parseInt(j[1],10);break;case'h':f+=parseInt(j[1],10);break;case'd':e+=parseInt(j[1],10);break;case'w':e+=parseInt(j[1],10)*7;break;case'o':d+=parseInt(j[1],10);e=Math.min(e,x._getDaysInMonth(c,d));break;case'y':c+=parseInt(j[1],10);e=Math.min(e,x._getDaysInMonth(c,d));break}j=i.exec(a)}return new Date(c,d,e,f,g,h,0)};var o=(k==null?l:(typeof k=='string'?n(k):(typeof k=='number'?m(k):k)));if(o)o.setMilliseconds(0);return o},_getDaysInMonth:function(a,b){return 32-new Date(a,b,32).getDate()},_normalLabels:function(a){return a},_generateHTML:function(c){var d=this;c._periods=(c._hold?c._periods:this._calculatePeriods(c,c._show,c.options.significant,new Date()));var e=false;var f=0;var g=c.options.significant;var h=$.extend({},c._show);for(var i=Y;i<=S;i++){e|=(c._show[i]=='?'&&c._periods[i]>0);h[i]=(c._show[i]=='?'&&!e?null:c._show[i]);f+=(h[i]?1:0);g-=(c._periods[i]>0?1:0)}var j=[false,false,false,false,false,false,false];for(var i=S;i>=Y;i--){if(c._show[i]){if(c._periods[i]){j[i]=true}else{j[i]=g>0;g--}}}var k=(c.options.compact?c.options.compactLabels:c.options.labels);var l=c.options.whichLabels||this._normalLabels;var m=function(a){var b=c.options['compactLabels'+l(c._periods[a])];return(h[a]?d._translateDigits(c,c._periods[a])+(b?b[a]:k[a])+' ':'')};var n=function(a){var b=c.options['labels'+l(c._periods[a])];return((!c.options.significant&&h[a])||(c.options.significant&&j[a])?'<span class="'+x._sectionClass+'">'+'<span class="'+x._amountClass+'">'+d._translateDigits(c,c._periods[a])+'</span><br/>'+(b?b[a]:k[a])+'</span>':'')};return(c.options.layout?this._buildLayout(c,h,c.options.layout,c.options.compact,c.options.significant,j):((c.options.compact?'<span class="'+this._rowClass+' '+this._amountClass+(c._hold?' '+this._holdingClass:'')+'">'+m(Y)+m(O)+m(W)+m(D)+(h[H]?this._minDigits(c,c._periods[H],2):'')+(h[M]?(h[H]?c.options.timeSeparator:'')+this._minDigits(c,c._periods[M],2):'')+(h[S]?(h[H]||h[M]?c.options.timeSeparator:'')+this._minDigits(c,c._periods[S],2):''):'<span class="'+this._rowClass+' '+this._showClass+(c.options.significant||f)+(c._hold?' '+this._holdingClass:'')+'">'+n(Y)+n(O)+n(W)+n(D)+n(H)+n(M)+n(S))+'</span>'+(c.options.description?'<span class="'+this._rowClass+' '+this._descrClass+'">'+c.options.description+'</span>':'')))},_buildLayout:function(c,d,e,f,g,h){var j=c.options[f?'compactLabels':'labels'];var k=c.options.whichLabels||this._normalLabels;var l=function(a){return(c.options[(f?'compactLabels':'labels')+k(c._periods[a])]||j)[a]};var m=function(a,b){return c.options.digits[Math.floor(a/b)%10]};var o={desc:c.options.description,sep:c.options.timeSeparator,yl:l(Y),yn:this._minDigits(c,c._periods[Y],1),ynn:this._minDigits(c,c._periods[Y],2),ynnn:this._minDigits(c,c._periods[Y],3),y1:m(c._periods[Y],1),y10:m(c._periods[Y],10),y100:m(c._periods[Y],100),y1000:m(c._periods[Y],1000),ol:l(O),on:this._minDigits(c,c._periods[O],1),onn:this._minDigits(c,c._periods[O],2),onnn:this._minDigits(c,c._periods[O],3),o1:m(c._periods[O],1),o10:m(c._periods[O],10),o100:m(c._periods[O],100),o1000:m(c._periods[O],1000),wl:l(W),wn:this._minDigits(c,c._periods[W],1),wnn:this._minDigits(c,c._periods[W],2),wnnn:this._minDigits(c,c._periods[W],3),w1:m(c._periods[W],1),w10:m(c._periods[W],10),w100:m(c._periods[W],100),w1000:m(c._periods[W],1000),dl:l(D),dn:this._minDigits(c,c._periods[D],1),dnn:this._minDigits(c,c._periods[D],2),dnnn:this._minDigits(c,c._periods[D],3),d1:m(c._periods[D],1),d10:m(c._periods[D],10),d100:m(c._periods[D],100),d1000:m(c._periods[D],1000),hl:l(H),hn:this._minDigits(c,c._periods[H],1),hnn:this._minDigits(c,c._periods[H],2),hnnn:this._minDigits(c,c._periods[H],3),h1:m(c._periods[H],1),h10:m(c._periods[H],10),h100:m(c._periods[H],100),h1000:m(c._periods[H],1000),ml:l(M),mn:this._minDigits(c,c._periods[M],1),mnn:this._minDigits(c,c._periods[M],2),mnnn:this._minDigits(c,c._periods[M],3),m1:m(c._periods[M],1),m10:m(c._periods[M],10),m100:m(c._periods[M],100),m1000:m(c._periods[M],1000),sl:l(S),sn:this._minDigits(c,c._periods[S],1),snn:this._minDigits(c,c._periods[S],2),snnn:this._minDigits(c,c._periods[S],3),s1:m(c._periods[S],1),s10:m(c._periods[S],10),s100:m(c._periods[S],100),s1000:m(c._periods[S],1000)};var p=e;for(var i=Y;i<=S;i++){var q='yowdhms'.charAt(i);var r=new RegExp('\\{'+q+'<\\}([\\s\\S]*)\\{'+q+'>\\}','g');p=p.replace(r,((!g&&d[i])||(g&&h[i])?'$1':''))}$.each(o,function(n,v){var a=new RegExp('\\{'+n+'\\}','g');p=p.replace(a,v)});return p},_minDigits:function(a,b,c){b=''+b;if(b.length>=c){return this._translateDigits(a,b)}b='0000000000'+b;return this._translateDigits(a,b.substr(b.length-c))},_translateDigits:function(b,c){return(''+c).replace(/[0-9]/g,function(a){return b.options.digits[a]})},_determineShow:function(a){var b=a.options.format;var c=[];c[Y]=(b.match('y')?'?':(b.match('Y')?'!':null));c[O]=(b.match('o')?'?':(b.match('O')?'!':null));c[W]=(b.match('w')?'?':(b.match('W')?'!':null));c[D]=(b.match('d')?'?':(b.match('D')?'!':null));c[H]=(b.match('h')?'?':(b.match('H')?'!':null));c[M]=(b.match('m')?'?':(b.match('M')?'!':null));c[S]=(b.match('s')?'?':(b.match('S')?'!':null));return c},_calculatePeriods:function(c,d,e,f){c._now=f;c._now.setMilliseconds(0);var g=new Date(c._now.getTime());if(c._since){if(f.getTime()<c._since.getTime()){c._now=f=g}else{f=c._since}}else{g.setTime(c._until.getTime());if(f.getTime()>c._until.getTime()){c._now=f=g}}var h=[0,0,0,0,0,0,0];if(d[Y]||d[O]){var i=x._getDaysInMonth(f.getFullYear(),f.getMonth());var j=x._getDaysInMonth(g.getFullYear(),g.getMonth());var k=(g.getDate()==f.getDate()||(g.getDate()>=Math.min(i,j)&&f.getDate()>=Math.min(i,j)));var l=function(a){return(a.getHours()*60+a.getMinutes())*60+a.getSeconds()};var m=Math.max(0,(g.getFullYear()-f.getFullYear())*12+g.getMonth()-f.getMonth()+((g.getDate()<f.getDate()&&!k)||(k&&l(g)<l(f))?-1:0));h[Y]=(d[Y]?Math.floor(m/12):0);h[O]=(d[O]?m-h[Y]*12:0);f=new Date(f.getTime());var n=(f.getDate()==i);var o=x._getDaysInMonth(f.getFullYear()+h[Y],f.getMonth()+h[O]);if(f.getDate()>o){f.setDate(o)}f.setFullYear(f.getFullYear()+h[Y]);f.setMonth(f.getMonth()+h[O]);if(n){f.setDate(o)}}var p=Math.floor((g.getTime()-f.getTime())/1000);var q=function(a,b){h[a]=(d[a]?Math.floor(p/b):0);p-=h[a]*b};q(W,604800);q(D,86400);q(H,3600);q(M,60);q(S,1);if(p>0&&!c._since){var r=[1,12,4.3482,7,24,60,60];var s=S;var t=1;for(var u=S;u>=Y;u--){if(d[u]){if(h[s]>=t){h[s]=0;p=1}if(p>0){h[u]++;p=0;s=u;t=1}}t*=r[u]}}if(e){for(var u=Y;u<=S;u++){if(e&&h[u]){e--}else if(!e){h[u]=0}}}return h}});var w=['getTimes'];function isNotChained(a,b){if(a=='option'&&(b.length==0||(b.length==1&&typeof b[0]=='string'))){return true}return $.inArray(a,w)>-1}$.fn.countdown=function(a){var b=Array.prototype.slice.call(arguments,1);if(isNotChained(a,b)){return x['_'+a+'Plugin'].apply(x,[this[0]].concat(b))}return this.each(function(){if(typeof a=='string'){if(!x['_'+a+'Plugin']){throw'Unknown command: '+a;}x['_'+a+'Plugin'].apply(x,[this].concat(b))}else{x._attachPlugin(this,a||{})}})};var x=$.countdown=new Countdown()})(jQuery);

/*

  Supersized - Fullscreen Slideshow jQuery Plugin
  Version : 3.2.7
  Site  : www.buildinternet.com/project/supersized
  
  Author  : Sam Dunn
  Company : One Mighty Roar (www.onemightyroar.com)
  License : MIT License / GPL License
  
*/(function(e){e(document).ready(function(){e("body").append('<div id="supersized-loader"></div><ul id="supersized"></ul>')});e.supersized=function(t){var n="#supersized",r=this;r.$el=e(n);r.el=n;vars=e.supersized.vars;r.$el.data("supersized",r);api=r.$el.data("supersized");r.init=function(){e.supersized.vars=e.extend(e.supersized.vars,e.supersized.themeVars);e.supersized.vars.options=e.extend({},e.supersized.defaultOptions,e.supersized.themeOptions,t);r.options=e.supersized.vars.options;r._build()};r._build=function(){var t=0,n="",i="",s,o="",u;while(t<=r.options.slides.length-1){switch(r.options.slide_links){case"num":s=t;break;case"name":s=r.options.slides[t].title;break;case"blank":s=""}n=n+'<li class="slide-'+t+'"></li>';if(t==r.options.start_slide-1){r.options.slide_links&&(i=i+'<li class="slide-link-'+t+' current-slide"><a>'+s+"</a></li>");if(r.options.thumb_links){r.options.slides[t].thumb?u=r.options.slides[t].thumb:u=r.options.slides[t].image;o=o+'<li class="thumb'+t+' current-thumb"><img src="'+u+'"/></li>'}}else{r.options.slide_links&&(i=i+'<li class="slide-link-'+t+'" ><a>'+s+"</a></li>");if(r.options.thumb_links){r.options.slides[t].thumb?u=r.options.slides[t].thumb:u=r.options.slides[t].image;o=o+'<li class="thumb'+t+'"><img src="'+u+'"/></li>'}}t++}r.options.slide_links&&e(vars.slide_list).html(i);r.options.thumb_links&&vars.thumb_tray.length&&e(vars.thumb_tray).append('<ul id="'+vars.thumb_list.replace("#","")+'">'+o+"</ul>");e(r.el).append(n);if(r.options.thumbnail_navigation){vars.current_slide-1<0?prevThumb=r.options.slides.length-1:prevThumb=vars.current_slide-1;e(vars.prev_thumb).show().html(e("<img/>").attr("src",r.options.slides[prevThumb].image));vars.current_slide==r.options.slides.length-1?nextThumb=0:nextThumb=vars.current_slide+1;e(vars.next_thumb).show().html(e("<img/>").attr("src",r.options.slides[nextThumb].image))}r._start()};r._start=function(){r.options.start_slide?vars.current_slide=r.options.start_slide-1:vars.current_slide=Math.floor(Math.random()*r.options.slides.length);var t=r.options.new_window?' target="_blank"':"";r.options.performance==3?r.$el.addClass("speed"):(r.options.performance==1||r.options.performance==2)&&r.$el.addClass("quality");if(r.options.random){arr=r.options.slides;for(var n,i,s=arr.length;s;n=parseInt(Math.random()*s),i=arr[--s],arr[s]=arr[n],arr[n]=i);r.options.slides=arr}if(r.options.slides.length>1){if(r.options.slides.length>2){vars.current_slide-1<0?loadPrev=r.options.slides.length-1:loadPrev=vars.current_slide-1;var o=r.options.slides[loadPrev].url?"href='"+r.options.slides[loadPrev].url+"'":"",u=e('<img src="'+r.options.slides[loadPrev].image+'"/>'),a=r.el+" li:eq("+loadPrev+")";u.appendTo(a).wrap("<a "+o+t+"></a>").parent().parent().addClass("image-loading prevslide");u.load(function(){e(this).data("origWidth",e(this).width()).data("origHeight",e(this).height());r.resizeNow()})}}else r.options.slideshow=0;o=api.getField("url")?"href='"+api.getField("url")+"'":"";var f=e('<img src="'+api.getField("image")+'"/>'),l=r.el+" li:eq("+vars.current_slide+")";f.appendTo(l).wrap("<a "+o+t+"></a>").parent().parent().addClass("image-loading activeslide");f.load(function(){r._origDim(e(this));r.resizeNow();r.launch();typeof theme!="undefined"&&typeof theme._init=="function"&&theme._init()});if(r.options.slides.length>1){vars.current_slide==r.options.slides.length-1?loadNext=0:loadNext=vars.current_slide+1;o=r.options.slides[loadNext].url?"href='"+r.options.slides[loadNext].url+"'":"";var c=e('<img src="'+r.options.slides[loadNext].image+'"/>'),h=r.el+" li:eq("+loadNext+")";c.appendTo(h).wrap("<a "+o+t+"></a>").parent().parent().addClass("image-loading");c.load(function(){e(this).data("origWidth",e(this).width()).data("origHeight",e(this).height());r.resizeNow()})}r.$el.css("visibility","hidden");e(".load-item").hide()};r.launch=function(){r.$el.css("visibility","visible");e("#supersized-loader").remove();typeof theme!="undefined"&&typeof theme.beforeAnimation=="function"&&theme.beforeAnimation("next");e(".load-item").show();r.options.keyboard_nav&&e(document.documentElement).keyup(function(e){if(vars.in_animation)return!1;if(e.keyCode==37||e.keyCode==40){clearInterval(vars.slideshow_interval);r.prevSlide()}else if(e.keyCode==39||e.keyCode==38){clearInterval(vars.slideshow_interval);r.nextSlide()}else if(e.keyCode==32&&!vars.hover_pause){clearInterval(vars.slideshow_interval);r.playToggle()}});r.options.slideshow&&r.options.pause_hover&&e(r.el).hover(function(){if(vars.in_animation)return!1;vars.hover_pause=!0;if(!vars.is_paused){vars.hover_pause="resume";r.playToggle()}},function(){if(vars.hover_pause=="resume"){r.playToggle();vars.hover_pause=!1}});r.options.slide_links&&e(vars.slide_list+"> li").click(function(){index=e(vars.slide_list+"> li").index(this);targetSlide=index+1;r.goTo(targetSlide);return!1});r.options.thumb_links&&e(vars.thumb_list+"> li").click(function(){index=e(vars.thumb_list+"> li").index(this);targetSlide=index+1;api.goTo(targetSlide);return!1});if(r.options.slideshow&&r.options.slides.length>1){r.options.autoplay&&r.options.slides.length>1?vars.slideshow_interval=setInterval(r.nextSlide,r.options.slide_interval):vars.is_paused=!0;e(".load-item img").bind("contextmenu mousedown",function(){return!1})}e(window).resize(function(){r.resizeNow()})};r.resizeNow=function(){return r.$el.each(function(){e("img",r.el).each(function(){function o(e){if(e){if(thisSlide.width()<n||thisSlide.width()<r.options.min_width)if(thisSlide.width()*t>=r.options.min_height){thisSlide.width(r.options.min_width);thisSlide.height(thisSlide.width()*t)}else u()}else if(r.options.min_height>=i&&!r.options.fit_landscape){if(n*t>=r.options.min_height||n*t>=r.options.min_height&&t<=1){thisSlide.width(n);thisSlide.height(n*t)}else if(t>1){thisSlide.height(r.options.min_height);thisSlide.width(thisSlide.height()/t)}else if(thisSlide.width()<n){thisSlide.width(n);thisSlide.height(thisSlide.width()*t)}}else{thisSlide.width(n);thisSlide.height(n*t)}}function u(e){if(e){if(thisSlide.height()<i)if(thisSlide.height()/t>=r.options.min_width){thisSlide.height(r.options.min_height);thisSlide.width(thisSlide.height()/t)}else o(!0)}else if(r.options.min_width>=n){if(i/t>=r.options.min_width||t>1){thisSlide.height(i);thisSlide.width(i/t)}else if(t<=1){thisSlide.width(r.options.min_width);thisSlide.height(thisSlide.width()*t)}}else{thisSlide.height(i);thisSlide.width(i/t)}}thisSlide=e(this);var t=(thisSlide.data("origHeight")/thisSlide.data("origWidth")).toFixed(2),n=r.$el.width(),i=r.$el.height(),s;r.options.fit_always?i/n>t?o():u():i<=r.options.min_height&&n<=r.options.min_width?i/n>t?r.options.fit_landscape&&t<1?o(!0):u(!0):r.options.fit_portrait&&t>=1?u(!0):o(!0):n<=r.options.min_width?i/n>t?r.options.fit_landscape&&t<1?o(!0):u():r.options.fit_portrait&&t>=1?u():o(!0):i<=r.options.min_height?i/n>t?r.options.fit_landscape&&t<1?o():u(!0):r.options.fit_portrait&&t>=1?u(!0):o():i/n>t?r.options.fit_landscape&&t<1?o():u():r.options.fit_portrait&&t>=1?u():o();thisSlide.parents("li").hasClass("image-loading")&&e(".image-loading").removeClass("image-loading");r.options.horizontal_center&&e(this).css("left",(n-e(this).width())/2);r.options.vertical_center&&e(this).css("top",(i-e(this).height())/2)});r.options.image_protect&&e("img",r.el).bind("contextmenu mousedown",function(){return!1});return!1})};r.nextSlide=function(){if(vars.in_animation||!api.options.slideshow)return!1;vars.in_animation=!0;clearInterval(vars.slideshow_interval);var t=r.options.slides,n=r.$el.find(".activeslide");e(".prevslide").removeClass("prevslide");n.removeClass("activeslide").addClass("prevslide");vars.current_slide+1==r.options.slides.length?vars.current_slide=0:vars.current_slide++;var i=e(r.el+" li:eq("+vars.current_slide+")"),s=r.$el.find(".prevslide");r.options.performance==1&&r.$el.removeClass("quality").addClass("speed");loadSlide=!1;vars.current_slide==r.options.slides.length-1?loadSlide=0:loadSlide=vars.current_slide+1;var o=r.el+" li:eq("+loadSlide+")";if(!e(o).html()){var u=r.options.new_window?' target="_blank"':"";imageLink=r.options.slides[loadSlide].url?"href='"+r.options.slides[loadSlide].url+"'":"";var a=e('<img src="'+r.options.slides[loadSlide].image+'"/>');a.appendTo(o).wrap("<a "+imageLink+u+"></a>").parent().parent().addClass("image-loading").css("visibility","hidden");a.load(function(){r._origDim(e(this));r.resizeNow()})}if(r.options.thumbnail_navigation==1){vars.current_slide-1<0?prevThumb=r.options.slides.length-1:prevThumb=vars.current_slide-1;e(vars.prev_thumb).html(e("<img/>").attr("src",r.options.slides[prevThumb].image));nextThumb=loadSlide;e(vars.next_thumb).html(e("<img/>").attr("src",r.options.slides[nextThumb].image))}typeof theme!="undefined"&&typeof theme.beforeAnimation=="function"&&theme.beforeAnimation("next");if(r.options.slide_links){e(".current-slide").removeClass("current-slide");e(vars.slide_list+"> li").eq(vars.current_slide).addClass("current-slide")}i.css("visibility","hidden").addClass("activeslide");switch(r.options.transition){case 0:case"none":i.css("visibility","visible");vars.in_animation=!1;r.afterAnimation();break;case 1:case"fade":i.css({opacity:0,visibility:"visible"}).animate({opacity:1,avoidTransforms:!1},r.options.transition_speed,function(){r.afterAnimation()});break;case 2:case"slideTop":i.css({top:-r.$el.height(),visibility:"visible"}).animate({top:0,avoidTransforms:!1},r.options.transition_speed,function(){r.afterAnimation()});break;case 3:case"slideRight":i.css({left:r.$el.width(),visibility:"visible"}).animate({left:0,avoidTransforms:!1},r.options.transition_speed,function(){r.afterAnimation()});break;case 4:case"slideBottom":i.css({top:r.$el.height(),visibility:"visible"}).animate({top:0,avoidTransforms:!1},r.options.transition_speed,function(){r.afterAnimation()});break;case 5:case"slideLeft":i.css({left:-r.$el.width(),visibility:"visible"}).animate({left:0,avoidTransforms:!1},r.options.transition_speed,function(){r.afterAnimation()});break;case 6:case"carouselRight":i.css({left:r.$el.width(),visibility:"visible"}).animate({left:0,avoidTransforms:!1},r.options.transition_speed,function(){r.afterAnimation()});n.animate({left:-r.$el.width(),avoidTransforms:!1},r.options.transition_speed);break;case 7:case"carouselLeft":i.css({left:-r.$el.width(),visibility:"visible"}).animate({left:0,avoidTransforms:!1},r.options.transition_speed,function(){r.afterAnimation()});n.animate({left:r.$el.width(),avoidTransforms:!1},r.options.transition_speed)}return!1};r.prevSlide=function(){if(vars.in_animation||!api.options.slideshow)return!1;vars.in_animation=!0;clearInterval(vars.slideshow_interval);var t=r.options.slides,n=r.$el.find(".activeslide");e(".prevslide").removeClass("prevslide");n.removeClass("activeslide").addClass("prevslide");vars.current_slide==0?vars.current_slide=r.options.slides.length-1:vars.current_slide--;var i=e(r.el+" li:eq("+vars.current_slide+")"),s=r.$el.find(".prevslide");r.options.performance==1&&r.$el.removeClass("quality").addClass("speed");loadSlide=vars.current_slide;var o=r.el+" li:eq("+loadSlide+")";if(!e(o).html()){var u=r.options.new_window?' target="_blank"':"";imageLink=r.options.slides[loadSlide].url?"href='"+r.options.slides[loadSlide].url+"'":"";var a=e('<img src="'+r.options.slides[loadSlide].image+'"/>');a.appendTo(o).wrap("<a "+imageLink+u+"></a>").parent().parent().addClass("image-loading").css("visibility","hidden");a.load(function(){r._origDim(e(this));r.resizeNow()})}if(r.options.thumbnail_navigation==1){loadSlide==0?prevThumb=r.options.slides.length-1:prevThumb=loadSlide-1;e(vars.prev_thumb).html(e("<img/>").attr("src",r.options.slides[prevThumb].image));vars.current_slide==r.options.slides.length-1?nextThumb=0:nextThumb=vars.current_slide+1;e(vars.next_thumb).html(e("<img/>").attr("src",r.options.slides[nextThumb].image))}typeof theme!="undefined"&&typeof theme.beforeAnimation=="function"&&theme.beforeAnimation("prev");if(r.options.slide_links){e(".current-slide").removeClass("current-slide");e(vars.slide_list+"> li").eq(vars.current_slide).addClass("current-slide")}i.css("visibility","hidden").addClass("activeslide");switch(r.options.transition){case 0:case"none":i.css("visibility","visible");vars.in_animation=!1;r.afterAnimation();break;case 1:case"fade":i.css({opacity:0,visibility:"visible"}).animate({opacity:1,avoidTransforms:!1},r.options.transition_speed,function(){r.afterAnimation()});break;case 2:case"slideTop":i.css({top:r.$el.height(),visibility:"visible"}).animate({top:0,avoidTransforms:!1},r.options.transition_speed,function(){r.afterAnimation()});break;case 3:case"slideRight":i.css({left:-r.$el.width(),visibility:"visible"}).animate({left:0,avoidTransforms:!1},r.options.transition_speed,function(){r.afterAnimation()});break;case 4:case"slideBottom":i.css({top:-r.$el.height(),visibility:"visible"}).animate({top:0,avoidTransforms:!1},r.options.transition_speed,function(){r.afterAnimation()});break;case 5:case"slideLeft":i.css({left:r.$el.width(),visibility:"visible"}).animate({left:0,avoidTransforms:!1},r.options.transition_speed,function(){r.afterAnimation()});break;case 6:case"carouselRight":i.css({left:-r.$el.width(),visibility:"visible"}).animate({left:0,avoidTransforms:!1},r.options.transition_speed,function(){r.afterAnimation()});n.css({left:0}).animate({left:r.$el.width(),avoidTransforms:!1},r.options.transition_speed);break;case 7:case"carouselLeft":i.css({left:r.$el.width(),visibility:"visible"}).animate({left:0,avoidTransforms:!1},r.options.transition_speed,function(){r.afterAnimation()});n.css({left:0}).animate({left:-r.$el.width(),avoidTransforms:!1},r.options.transition_speed)}return!1};r.playToggle=function(){if(vars.in_animation||!api.options.slideshow)return!1;if(vars.is_paused){vars.is_paused=!1;typeof theme!="undefined"&&typeof theme.playToggle=="function"&&theme.playToggle("play");vars.slideshow_interval=setInterval(r.nextSlide,r.options.slide_interval)}else{vars.is_paused=!0;typeof theme!="undefined"&&typeof theme.playToggle=="function"&&theme.playToggle("pause");clearInterval(vars.slideshow_interval)}return!1};r.goTo=function(t){if(vars.in_animation||!api.options.slideshow)return!1;var n=r.options.slides.length;t<0?t=n:t>n&&(t=1);t=n-t+1;clearInterval(vars.slideshow_interval);typeof theme!="undefined"&&typeof theme.goTo=="function"&&theme.goTo();if(vars.current_slide==n-t){vars.is_paused||(vars.slideshow_interval=setInterval(r.nextSlide,r.options.slide_interval));return!1}if(n-t>vars.current_slide){vars.current_slide=n-t-1;vars.update_images="next";r._placeSlide(vars.update_images)}else if(n-t<vars.current_slide){vars.current_slide=n-t+1;vars.update_images="prev";r._placeSlide(vars.update_images)}if(r.options.slide_links){e(vars.slide_list+"> .current-slide").removeClass("current-slide");e(vars.slide_list+"> li").eq(n-t).addClass("current-slide")}if(r.options.thumb_links){e(vars.thumb_list+"> .current-thumb").removeClass("current-thumb");e(vars.thumb_list+"> li").eq(n-t).addClass("current-thumb")}};r._placeSlide=function(t){var n=r.options.new_window?' target="_blank"':"";loadSlide=!1;if(t=="next"){vars.current_slide==r.options.slides.length-1?loadSlide=0:loadSlide=vars.current_slide+1;var i=r.el+" li:eq("+loadSlide+")";if(!e(i).html()){var n=r.options.new_window?' target="_blank"':"";imageLink=r.options.slides[loadSlide].url?"href='"+r.options.slides[loadSlide].url+"'":"";var s=e('<img src="'+r.options.slides[loadSlide].image+'"/>');s.appendTo(i).wrap("<a "+imageLink+n+"></a>").parent().parent().addClass("image-loading").css("visibility","hidden");s.load(function(){r._origDim(e(this));r.resizeNow()})}r.nextSlide()}else if(t=="prev"){vars.current_slide-1<0?loadSlide=r.options.slides.length-1:loadSlide=vars.current_slide-1;var i=r.el+" li:eq("+loadSlide+")";if(!e(i).html()){var n=r.options.new_window?' target="_blank"':"";imageLink=r.options.slides[loadSlide].url?"href='"+r.options.slides[loadSlide].url+"'":"";var s=e('<img src="'+r.options.slides[loadSlide].image+'"/>');s.appendTo(i).wrap("<a "+imageLink+n+"></a>").parent().parent().addClass("image-loading").css("visibility","hidden");s.load(function(){r._origDim(e(this));r.resizeNow()})}r.prevSlide()}};r._origDim=function(e){e.data("origWidth",e.width()).data("origHeight",e.height())};r.afterAnimation=function(){r.options.performance==1&&r.$el.removeClass("speed").addClass("quality");if(vars.update_images){vars.current_slide-1<0?setPrev=r.options.slides.length-1:setPrev=vars.current_slide-1;vars.update_images=!1;e(".prevslide").removeClass("prevslide");e(r.el+" li:eq("+setPrev+")").addClass("prevslide")}vars.in_animation=!1;if(!vars.is_paused&&r.options.slideshow){vars.slideshow_interval=setInterval(r.nextSlide,r.options.slide_interval);r.options.stop_loop&&vars.current_slide==r.options.slides.length-1&&r.playToggle()}typeof theme!="undefined"&&typeof theme.afterAnimation=="function"&&theme.afterAnimation();return!1};r.getField=function(e){return r.options.slides[vars.current_slide][e]};r.init()};e.supersized.vars={thumb_tray:"#thumb-tray",thumb_list:"#thumb-list",slide_list:"#slide-list",current_slide:0,in_animation:!1,is_paused:!1,hover_pause:!1,slideshow_interval:!1,update_images:!1,options:{}};e.supersized.defaultOptions={slideshow:1,autoplay:1,start_slide:1,stop_loop:0,random:0,slide_interval:5e3,transition:1,transition_speed:750,new_window:1,pause_hover:0,keyboard_nav:1,performance:1,image_protect:1,fit_always:0,fit_landscape:0,fit_portrait:1,min_width:0,min_height:0,horizontal_center:1,vertical_center:1,slide_links:1,thumb_links:1,thumbnail_navigation:0};e.fn.supersized=function(t){return this.each(function(){new e.supersized(t)})}})(jQuery);


/*
 * OKVideo by OKFocus v2.2.1
 * http://okfoc.us
 *
 * Copyright 2012, OKFocus
 * Licensed under the MIT license.
 *
 */

var player, OKEvents, options;

(function ($) {

  "use strict";

  var BLANK_GIF = "data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw%3D%3D";
  $.okvideo = function (options) {

    // if the option var was just a string, turn it into an object
    if (typeof options !== 'object') options = { 'video' : options };

    var base = this;

    // kick things off
    base.init = function () {
      base.options = $.extend({}, $.okvideo.options, options);

      // support older versions of okvideo
      if (base.options.video === null) base.options.video = base.options.source; 

      if (OKEvents.utils.isMobile()) {
        $('body').append('<div id="okplayer" style="position:fixed;left:0;top:0;overflow:hidden;z-index:-999;height:100%;width:100%;"></div>');
      } else if (base.options.adproof) {
        $('body').append('<div style="position:fixed;left:0;top:0;overflow:hidden;z-index:-998;height:100%;width:100%;" id="okplayer-mask"></div><div id="okplayer" style="position:fixed;left:0;top:0;overflow:hidden;z-index:-999;height:110%;width:110%;"></div>');
      } else {
        $('body').append('<div style="position:fixed;left:0;top:0;overflow:hidden;z-index:-998;height:100%;width:100%;" id="okplayer-mask"></div><div id="okplayer" style="position:fixed;left:0;top:0;overflow:hidden;z-index:-999;height:100%;width:100%;"></div>');
      }

      $("#okplayer-mask").css("background-image", "url(" + BLANK_GIF + ")");

      base.setOptions();


      if (base.options.playlist.list === null) { 
        if (base.options.video.provider === 'youtube') {
          base.loadYouTubeAPI();
        } else if (base.options.video.provider === 'vimeo') {
          base.options.volume /= 100;
          base.loadVimeoAPI();
        }
      } else {
        base.loadYouTubeAPI();
      }
    };

    // clean the options
    base.setOptions = function () {
      // exchange 'true' for '1' and 'false' for 3
      for (var key in this.options){
        if (this.options[key] == true) this.options[key] = 1;
        if (this.options[key] == false) this.options[key] = 3;
      }

      if (base.options.playlist.list === null) { 
        base.options.video = base.determineProvider();
      }

      // pass options to the window
      $(window).data('okoptions', base.options);
    };

    // load the youtube api
    base.loadYouTubeAPI = function (callback) {      
      base.insertJS('http://www.youtube.com/player_api');
    };

    base.loadYouTubePlaylist = function() {
      player.loadPlaylist(base.options.playlist.list, base.options.playlist.index, base.options.playlist.startSeconds, base.options.playlist.suggestedQuality);
    };

    // load the vimeo api by replacing the div with an iframe and loading js
    base.loadVimeoAPI = function() {
      $('#okplayer').replaceWith(function() {
        return '<iframe src="http://player.vimeo.com/video/' + base.options.video.id + '?api=1&js_api=1&title=0&byline=0&portrait=0&playbar=0&loop=' + base.options.loop + '&autoplay=1&player_id=okplayer" frameborder="0" style="' + $(this).attr('style') + 'visibility:hidden;background-color:black;" id="' + $(this).attr('id') + '"></iframe>';
      });

      base.insertJS('http://a.vimeocdn.com/js/froogaloop2.min.js', function(){
        vimeoPlayerReady();
      });
    };

    // insert js into the head and exectue a callback function
    base.insertJS = function(src, callback){
      var tag = document.createElement('script');

      if (callback){
        if (tag.readyState){  //IE
          tag.onreadystatechange = function(){
            if (tag.readyState === "loaded" ||
                tag.readyState === "complete"){
              tag.onreadystatechange = null;
              callback();
            }
          };
        } else {
          tag.onload = function() {
            callback();
          };
        }
      }
      tag.src = src;
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    };

    // is it from youtube or vimeo?
    base.determineProvider = function () {
      var a = document.createElement('a');
      a.href = base.options.video;

      if (/youtube.com/.test(base.options.video)){
        return { "provider" : "youtube", "id" : a.href.slice(a.href.indexOf('v=') + 2).toString() };
      } else if (/vimeo.com/.test(base.options.video)) {
        return { "provider" : "vimeo", "id" : a.href.split('/')[3].toString() };
      } else if (/[A-Za-z0-9_]+/.test(base.options.video)) {
        var id = new String(base.options.video.match(/[A-Za-z0-9_]+/));
        if (id.length == 11) {
          return { "provider" : "youtube", "id" : id.toString() };
        } else {
          for (var i = 0; i < base.options.video.length; i++) {
            if (typeof parseInt(base.options.video[i]) !== "number") {
              throw 'not vimeo but thought it was for a sec';
            }
          }
          return { "provider" : "vimeo", "id" : base.options.video };
        }
      } else {
        throw "OKVideo: Invalid video source";
      }
    };

    base.init();
  };

  $.okvideo.options = {
    source: null, // Deprecate dis l8r
    video: null,
    playlist: { // eat ur heart out @brokyo
      list: null,
      index: 0,
      startSeconds: 0,
      suggestedQuality: "default" // options: small, medium, large, hd720, hd1080, highres, default
    },
    disableKeyControl: 1,
    captions: 0,
    loop: 1,
    hd: 1,
    volume: 0,
    adproof: false,
    unstarted: null,
    onFinished: null,
    onReady: null,
    onPlay: null,
    onPause: null,
    buffering: null,
    annotations: true,
    cued: null
  };

  $.fn.okvideo = function (options) {
    return this.each(function () {
      (new $.okvideo(options));
    });
  };

})(jQuery);

// vimeo player ready
function vimeoPlayerReady() {
  options = $(window).data('okoptions');

  var iframe = $('#okplayer')[0];
  player = $f(iframe);

  // hide player until Vimeo hides controls...
  window.setTimeout(function(){
    $('#okplayer').css('visibility', 'visible');
  }, 2000);

  player.addEvent('ready', function () {
    OKEvents.v.onReady();
    player.api('play');
    if (OKEvents.utils.isMobile()) {
      // mobile devices cannot listen for play event
      OKEvents.v.onPlay();
    } else {
      player.addEvent('play', OKEvents.v.onPlay);
      player.addEvent('pause', OKEvents.v.onPause);
      player.addEvent('finish', OKEvents.v.onFinish);
    }
  });
}

// youtube player ready
function onYouTubePlayerAPIReady() {
  options = jQuery(window).data('okoptions');
  player = new YT.Player('okplayer', {
    videoId: options.video ? options.video.id : null,
    playerVars: {
      'autohide': 1,
      'autoplay': 1,
      'disablekb': options.keyControls,
      'cc_load_policy': options.captions,
      'controls': 0,
      'enablejsapi': 1,
      'fs': 0,
      'modestbranding': 1,
      'iv_load_policy': options.annotations,
      'loop': options.loop,
      'showinfo': 0,
      'rel': 0,
      'wmode': 'opaque',
      'hd': options.hd
    },
    events: {
      'onReady': OKEvents.yt.ready,
      'onStateChange': OKEvents.yt.onStateChange,
      'onError': OKEvents.yt.error
    }
  });

}

OKEvents = {
  yt: {
    ready: function(event){
      event.target.setVolume(options.volume);
      if (options.playlist.list) {
        player.loadPlaylist(options.playlist.list, options.playlist.index, options.playlist.startSeconds, options.playlist.suggestedQuality);
      } else {
        event.target.playVideo();
      }
      OKEvents.utils.isFunction(options.onReady) && options.onReady();
    },
    onStateChange: function(event){
      switch(event.data){
      case -1:
        OKEvents.utils.isFunction(options.unstarted) && options.unstarted();
        break;
      case 0:
        OKEvents.utils.isFunction(options.onFinished) && options.onFinished();
        options.loop && event.target.playVideo();
        break;
      case 1:
        OKEvents.utils.isFunction(options.onPlay) && options.onPlay();
        break;
      case 2:
        OKEvents.utils.isFunction(options.onPause) && options.onPause();
        break;
      case 3:
        OKEvents.utils.isFunction(options.buffering) && options.buffering();
        break;
      case 5:
        OKEvents.utils.isFunction(options.cued) && options.cued();
        break;
      default:
        throw "OKVideo: received invalid data from YT player.";
      }
    },
    error: function(event){
      throw event;
    }
  },
  v: {
    onReady: function(){
      OKEvents.utils.isFunction(options.onReady) && options.onReady();
    },
    onPlay: function(){
      if (!OKEvents.utils.isMobile()) player.api('api_setVolume', options.volume);
      OKEvents.utils.isFunction(options.onPlay) && options.onPlay();
    },
    onPause: function(){
      OKEvents.utils.isFunction(options.onPause) && options.onPause();
    },
    onFinish: function(){
      OKEvents.utils.isFunction(options.onFinish) && options.onFinish();
    }
  },
  utils: {
    isFunction: function(func){
      if (typeof func === 'function'){
        return true;
      } else {
        return false;
      }
    },
    isMobile: function() {
      if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
        return true;
      } else {
        return false;
      }
    }
  }
};
