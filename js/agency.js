
;(function(_){
	// Agency
	var templateCover = "<div class='cover'></div>";
	var template = 
	"<div class='m-agency'>\
		<h1>请观看下面的视频</h1>\
		<video  width=830 height=520  controls='controls' src='http://mov.bn.netease.com/open-movie/nos/mp4/2014/12/30/SADQ86F5S_shd.mp4' type='video/mp4'>\
			<source >\
		</video>\
		<span>×</span>\
	</div>";

	function Agency(options){
		options = options || {};
		_.extend(this,options);
		this.login = this._layout.cloneNode(true);
		this.cover = this._cover.cloneNode(true);
		this.span = this.login.querySelector(".m-agency span");
		this.video = this.login.querySelector(".m-agency video");
		this.container.appendChild(this.cover);
		this.container.appendChild(this.login);
	}

	_.extend(Agency.prototype, {
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

	window.Agency = Agency;


})(util);