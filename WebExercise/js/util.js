var util = (function(){

  return {
    extend: function(o1, o2){
      for(var i in o2) if (o1[i] == undefined ) {
        o1[i] = o2[i]
      }
    },
    addClass: function (node, className){
      var current = node.className || "";
      if ((" " + current + " ").indexOf(" " + className + " ") === -1) {
        node.className = current? ( current + " " + className ) : className;
      }
    },
    delClass: function (node, className){
      var current = node.className || "";
      node.className = (" " + current + " ").replace(" " + className + " ", " ").trim();
    },
    emitter: {
      // 注册事件
      on: function(event, fn) {
        var handles = this._handles || (this._handles = {}),
          calls = handles[event] || (handles[event] = []);

        // 找到对应名字的栈
        calls.push(fn);

        return this;
      },
      // 解绑事件
      off: function(event, fn) {
        if(!event || !this._handles) this._handles = {};
        if(!this._handles) return;

        var handles = this._handles , calls;

        if (calls = handles[event]) {
          if (!fn) {
            handles[event] = [];
            return this;
          }
          // 找到栈内对应listener 并移除
          for (var i = 0, len = calls.length; i < len; i++) {
            if (fn === calls[i]) {
              calls.splice(i, 1);
              return this;
            }
          }
        }
        return this;
      },
      // 触发事件
      emit: function(event){
        var args = [].slice.call(arguments, 1),
          handles = this._handles, calls;

        if (!handles || !(calls = handles[event])) return this;
        // 触发所有对应名字的listeners
        for (var i = 0, len = calls.length; i < len; i++) {
          calls[i].apply(this, args)
        }
        return this;
      }
    },
    html2node: function(str){
      var container = document.createElement("div");
      container.innerHTML = str;
      return container.children[0];
    }
  }
})();


var cookieUtil = (function(){
	return {
    	// 获取cookie
    	get: function(name){
    		var cookieName = encodeURIComponent(name) + "=",
    		    cookieStart = document.cookie.indexOf(cookieName),
    		    cookieValue = null;

    		if (cookieStart > -1){
    			var cookieEnd = document.cookie.indexOf(";",cookieStart);
    			if (cookieEnd == -1) {
    				cookieEnd = document.cookie.length;
    			}
    			cookieValue = decodeURIComponent(document.cookie.substring(cookieStart+cookieName.length,cookieEnd));
    		}

    		return cookieValue;
    	},

    	//设置cookie
    	set: function(name, value, expires, path, domain, secure){
    		var cookieText = encodeURIComponent(name) + "=" + encodeURIComponent(value);

    		if (expires instanceof Date){
    			cookieText += "; expires=" + expires.toGMTString();
    		}

    		if(path){
    			cookieText += "; path=" + path;
    		}

    		if(domain){
    			cookieText += "; domain=" + domain;
    		}

    		if(secure){
    			cookieText += "; secure";
    		}

    		document.cookie = cookieText;
    	},

    	// 删除cookie
    	unset: function(name, path, domain, secure){
    		this.set(name, "", new Date(0), path, domain, secure);
    	},
	}
})();
