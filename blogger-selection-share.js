!function(e){var t=function(t){var o=this;t=t||{},"string"==typeof t&&(t={elements:t}),this.sel=null,this.textSelection="",this.htmlSelection="",this.url2share=e('meta[property="og:url"]').attr("content")||e('meta[property="og:url"]').attr("value")||window.location.href,this.getSelectionText=function(e){var t="",n="";if(e=e||window.getSelection(),e.rangeCount){for(var i=document.createElement("div"),r=0,a=e.rangeCount;a>r;++r)i.appendChild(e.getRangeAt(r).cloneContents());n=i.textContent,t=i.innerHTML}return o.textSelection=n,o.htmlSelection=t||n,n},this.selectionDirection=function(e){var t=e||window.getSelection(),o=document.createRange();if(!t.anchorNode)return 0;o.setStart(t.anchorNode,t.anchorOffset),o.setEnd(t.focusNode,t.focusOffset);var n=o.collapsed?"backward":"forward";return o.detach(),n},this.showPopunder=function(){o.popunder=o.popunder||document.getElementById("selectionSharerPopunder");var e=window.getSelection(),t=o.getSelectionText(e);if(e.isCollapsed||t.length<10||!t.match(/ /))return o.hidePopunder();if(o.popunder.classList.contains("fixed"))return o.popunder.style.bottom=0,o.popunder.style.bottom;var n=e.getRangeAt(0),i=n.endContainer.parentNode;if(o.popunder.classList.contains("show")){if(Math.ceil(o.popunder.getBoundingClientRect().top)==Math.ceil(i.getBoundingClientRect().bottom))return;return o.hidePopunder(o.showPopunder)}if(i.nextElementSibling)o.pushSiblings(i);else{o.placeholder||(o.placeholder=document.createElement("div"),o.placeholder.className="selectionSharerPlaceholder");var r=window.getComputedStyle(i).marginBottom;o.placeholder.style.height=r,o.placeholder.style.marginBottom=-2*parseInt(r,10)+"px",i.parentNode.insertBefore(o.placeholder)}var a=window.pageYOffset+i.getBoundingClientRect().bottom;o.popunder.style.top=Math.ceil(a)+"px",setTimeout(function(){o.placeholder&&o.placeholder.classList.add("show"),o.popunder.classList.add("show")},0)},this.pushSiblings=function(e){for(;e=e.nextElementSibling;)e.classList.add("selectionSharer"),e.classList.add("moveDown")},this.hidePopunder=function(e){if(e=e||function(){},"fixed"==o.popunder)return o.popunder.style.bottom="-50px",e();o.popunder.classList.remove("show"),o.placeholder&&o.placeholder.classList.remove("show");for(var t=document.getElementsByClassName("moveDown");el=t[0];)el.classList.remove("moveDown");setTimeout(function(){o.placeholder&&document.body.insertBefore(o.placeholder),e()},600)},this.show=function(e){setTimeout(function(){var t=window.getSelection(),n=o.getSelectionText(t);if(!t.isCollapsed&&n&&n.length>10&&n.match(/ /)){var i=t.getRangeAt(0),r=i.getBoundingClientRect().top-5,a=r+o.getPosition().y-o.$popover.height(),s=0;if(e)s=e.pageX;else{var l=t.anchorNode.parentNode;s+=l.offsetWidth/2;do s+=l.offsetLeft;while(l=l.offsetParent)}switch(o.selectionDirection(t)){case"forward":s-=o.$popover.width();break;case"backward":s+=o.$popover.width();break;default:return}o.$popover.removeClass("anim").css("top",a+10).css("left",s).show(),setTimeout(function(){o.$popover.addClass("anim").css("top",a)},0)}},10)},this.hide=function(){o.$popover.hide()},this.smart_truncate=function(e,t){if(!e||!e.length)return e;var o=e.length>t,n=o?e.substr(0,t-1):e;return n=o?n.substr(0,n.lastIndexOf(" ")):n,o?n+"...":n},this.getRelatedTwitterAccounts=function(){var t=[],o=e('meta[name="twitter:creator"]').attr("content")||e('meta[name="twitter:creator"]').attr("value");o&&t.push(o);for(var n=document.getElementsByTagName("a"),i=0,r=n.length;r>i;i++)if(n[i].attributes.href&&"string"==typeof n[i].attributes.href.value){var a=n[i].attributes.href.value.match(/^https?:\/\/twitter\.com\/([a-z0-9_]{1,20})/i);a&&a.length>1&&-1==["widgets","intent"].indexOf(a[1])&&t.push(a[1])}return t.length>0?t.join(","):""},this.shareTwitter=function(e){e.preventDefault();var t="�"+o.smart_truncate(o.textSelection.trim(),114)+"�",n="http://twitter.com/intent/tweet?text="+encodeURIComponent(t)+"&related="+o.relatedTwitterAccounts+"&url="+encodeURIComponent(window.location.href);o.viaTwitterAccount&&t.length<114-o.viaTwitterAccount.length&&(n+="&via="+o.viaTwitterAccount);var i=640,r=440,a=screen.width/2-i/2,s=screen.height/2-r/2-100;return window.open(n,"share_twitter","toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width="+i+", height="+r+", top="+s+", left="+a),o.hide(),!1},this.shareFacebook=function(e){e.preventDefault();var t=o.htmlSelection.replace(/<p[^>]*>/gi,"\n").replace(/<\/p>|  /gi,"").trim(),n="https://www.facebook.com/sharer.php?u="+encodeURIComponent(o.url2share)+"&quote="+encodeURIComponent(t),i=640,r=440,a=screen.width/2-i/2,s=screen.height/2-r/2-100;window.open(n,"share_facebook","toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width="+i+", height="+r+", top="+s+", left="+a)},this.shareGoogleplus=function(e){e.preventDefault();var t=(o.htmlSelection.replace(/<p[^>]*>/gi,"\n").replace(/<\/p>|  /gi,"").trim(),"https://plus.google.com/share?url="+encodeURIComponent(o.url2share)),n=640,i=440,r=screen.width/2-n/2,a=screen.height/2-i/2-100;window.open(t,"share_googleplus","toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width="+n+", height="+i+", top="+a+", left="+r)},this.render=function(){var t='<div class="selectionSharer" id="selectionSharerPopover" style="position:absolute;">  <div id="selectionSharerPopover-inner">    <ul>      <li><a class="action tweet" href="" title="Share this selection on Twitter" target="_blank">Tweet</a></li>      <li><a class="action facebook" href="" title="Share this selection on Facebook" target="_blank">Facebook</a></li>      <li><a class="action googleplus" href="" title="Share this selection by email" target="_blank">Google+</a></li>    </ul>  </div>  <div class="selectionSharerPopover-clip"><span class="selectionSharerPopover-arrow"></span></div></div>',n='<div id="selectionSharerPopunder" class="selectionSharer">  <div id="selectionSharerPopunder-inner">    <label>Share this selection</label>    <ul>      <li><a class="action tweet" href="" title="Share this selection on Twitter" target="_blank">Tweet</a></li>      <li><a class="action facebook" href="" title="Share this selection on Facebook" target="_blank">Facebook</a></li>      <li><a class="action googleplus" href="" title="Share this selection by email" target="_blank">Google+</a></li>    </ul>  </div></div>';o.$popover=e(t),o.$popover.find("a.tweet").click(o.shareTwitter),o.$popover.find("a.facebook").click(o.shareFacebook),o.$popover.find("a.googleplus").click(o.shareGoogleplus),e("body").append(o.$popover),o.$popunder=e(n),o.$popunder.find("a.tweet").click(o.shareTwitter),o.$popunder.find("a.facebook").click(o.shareFacebook),o.$popunder.find("a.googleplus").click(o.shareGoogleplus),e("body").append(o.$popunder),o.url2share&&e(".selectionSharer a.facebook").css("display","inline-block")},this.setElements=function(t){"string"==typeof t&&(t=e(t)),o.$elements=t instanceof e?t:e(t),o.$elements.mouseup(o.show).mousedown(o.hide).addClass("selectionShareable"),o.$elements.bind("touchstart",function(){o.isMobile=!0}),document.onselectionchange=o.selectionChanged},this.selectionChanged=function(e){o.isMobile&&(o.lastSelectionChanged&&clearTimeout(o.lastSelectionChanged),o.lastSelectionChanged=setTimeout(function(){o.showPopunder(e)},300))},this.getPosition=function(){var e=void 0!==window.pageXOffset,t="CSS1Compat"===(document.compatMode||""),o=e?window.pageXOffset:t?document.documentElement.scrollLeft:document.body.scrollLeft,n=e?window.pageYOffset:t?document.documentElement.scrollTop:document.body.scrollTop;return{x:o,y:n}},this.render(),t.elements&&this.setElements(t.elements)};e.fn.selectionSharer=function(){var e=new t;return e.setElements(this),this},"function"==typeof define?define(function(){return t.load=function(e,o,n){var i=new t;i.setElements("p"),n()},t}):window.SelectionSharer=t}(jQuery);
$('.post-body').selectionSharer();