

;(function(_){
	// Modal
	var templateCover = "<div class='cover'></div>"
	var template = 
	"<div class='m-modal'>\
		<form class='form' name='login' autocomplete='no' action='javascript:void(0)' >\
			<h1 class='titl'>登陆网易云课堂</h1><span class='close'>×</span>\
			<input class='input' type='text' name='userName' placeholder='账号' autofocus='on'  required='required' />\
			<input class='input' type='password' name='password' placeholder='密码' required='required' />\
			<button class='submit'>登陆</button>\
		</form>\
	</div>";

	function Modal(options){
		options = options || {};
		_.extend(this,options);
		this.login = this._layout.cloneNode(true);
		this.cover = this._cover.cloneNode(true);
		this.input = this.login.querySelectorAll(".m-modal .input");
		this.form = this.login.querySelector(".m-modal .form");
		this.close = this.login.querySelector(".m-modal .close");
		this.btn = this.login.querySelector(".m-modal .submit");
		this.container.appendChild(this.cover);
		this.container.appendChild(this.login);
	}

	_.extend(Modal.prototype, {
		_layout: _.html2node(template),
		_cover: _.html2node(templateCover),

		show: function(){
				this.login.style.display = "block";
				this.cover.style.display = "block";
				this.container.style.overflow = "hidden";
		},

		hidden: function(){
				this.login.style.display = "none";
				this.cover.style.display = "none";
				this.container.style.overflow = "auto";
		},
	})

	_.extend(Modal.prototype,_.emitter);

	window.Modal = Modal;
})(util);