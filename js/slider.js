
;(function(_){
	

	// template
	var template = 
	"<div class='m-slider'>\
		<div class='slider'></div>\
		<div class='slider'></div>\
		<div class='slider'></div>\
	</div>";

	function Slider(opt){
		_.extend(this,opt);

		this.container = this.container || document.body;
		this.time = this.time || 5000;
		this.container.style.overflow = "hidden";
		
		this.slider = this._layout.cloneNode(true);
		this.sliders = [].slice.call(this.slider.querySelectorAll(".slider"));

		// 内部数据结构
		this.slideIndex = 1;
		this.pageIndex = this.pageIndex || 0;
		this.offSetIndex = this.pageIndex;

		// this.pagNum必须传入
		this.pagNum = this.img.length;
		this.id = null;
		this.container.appendChild(this.slider);

		if(this.auto) this._autoMove();
		if(this.over) this._overStop();
		
	};


	_.extend(Slider.prototype,_.emitter);

	_.extend(Slider.prototype,{

		_layout: _.html2node(template),


		// 跳转到指定页
		nav: function(pageIndex){
			this.pageIndex = pageIndex;
			this.slideIndex = typeof this.slideIndex === "number"? this.slideIndex: (pageIndex+1)%3;
			this.offSetIndex = pageIndex;
			this.slider.style.transitionDuration = '0s';
			this._calcSlide();
		},

		// 下一页
		next: function(){
			this._step(1);
		},
		// 上一页
		pre: function(){
			this._step(-1);
		},

		//单步移动
		_step: function(offset){
			this.pageIndex += offset;
			this.offSetIndex += offset;
			this.slideIndex += offset;
			this.slider.style.transitionDuration = ".5s";

			this._calcSlide();
		},

		//标准化数据结构
		_normIndex: function(Index,len){
			return (Index+len)%len;
		},

		// 计算Slider
		// 每个slider的left = (offSetIndex + offSet(1,-1)) *  100%;
		// 外层容器（.m-slider）的偏移 = offSetIndex * 视口宽度;
		_calcSlide: function(){
			var slideIndex = this.slideIndex= this._normIndex(this.slideIndex,3);
			var pageIndex = this.pageIndex= this._normIndex(this.pageIndex,this.pagNum);
			var offSetIndex = this.offSetIndex;

			var preSlideIndex = this._normIndex(slideIndex-1, 3);
			var nextSlideIndex = this._normIndex(slideIndex+1, 3); 

			var slides = this.sliders;

			// 三个slide的偏移
			slides[slideIndex].style.left = (offSetIndex) * 100 + '%';
			slides[preSlideIndex].style.left = (offSetIndex-1) * 100 + '%';
			slides[nextSlideIndex].style.left = (offSetIndex+1) * 100 + '%';
			// 容器的移动
			this.slider.style.transform = "translateX(" + (-offSetIndex * 100) + "%)  translateZ(0)";

			//当前slide添加'z-active'的classNmae
			slides.forEach(function(node){_.delClass(node,'z-active')});
			_.addClass(slides[slideIndex],'z-active');


			this._onNav(this.pageIndex,this.slideIndex);
		},

		// 跳转时完成的逻辑
		_onNav: function(pageIndex,slideIndex){
			var slides = this.sliders;
			for (var i = -1; i <= 1; i++) {
				var index = (slideIndex + i +3)%3;
				var img = slides[index].querySelector('img');
				if(!img){
					img = document.createElement('img');
					slides[index].appendChild(img);
				}
				img.src = 'images/banner' + (this._normIndex(pageIndex + i,this.pagNum)+1) +'.jpg';
			}			
			this.emit('nav',{
				pageIndex: pageIndex,
				slideIndex: slideIndex
			})
		},
		// 自动轮播
		_autoMove: function(){
			var id = setInterval(this.next.bind(this),5000);
			this.id = id;
		},
		// 悬停
		_overStop: function(){			
			this.slider.addEventListener('mouseenter',(function(){clearInterval(this.id)}).bind(this));
			this.slider.addEventListener('mouseleave',this._autoMove.bind(this));
		}

	})
	window.Slider = Slider;	
})(util);

