/**
 * @fileoverview 
 * @author bachi<bachi@taobao.com>
 * @module cutter
 **/
KISSY.add(function (S, Node,Anim) {

	"use strict";

	var Cutter = function(){
		this.init.apply(this,arguments);
	};

	Cutter.prototype = {
		//构造器
		init:function(node,o){
			var that = this;
			that.node = S.one(node);
			that.buildParam(o);
			that.renderUI();
			that.bindEvent();
			return this;
		},
		renderUI:function(){
			var that = this;
			var w = that.width / 2;
			var h = that.height / 2;
			that.img_a = [];
			for(var i = 0;i<4;i++){
				that.img_a[i] = S.Node('<div style="position:absolute;z-index:2;"></div>');
				that.img_a[i].css('width',w +'px')
							.css('height',h +'px')
							.css('background','url("'+that.img+'") no-repeat');
				that.node.append(that.img_a[i]);
			}
			that.img_a[0].css('left','0px').css('top','0px');
			that.img_a[1].css('right','0px').css('top','0px').css('backgroundPosition','-'+w+'px '+'0px');
			that.img_a[2].css('left','0px').css('bottom','0px').css('backgroundPosition','0px -'+h+'px');
			that.img_a[3].css('right','0px').css('bottom','0px').css('backgroundPosition','-'+w+'px -'+h+'px');
			that.node.one('img').remove();

			return this;

		},
		bindEvent:function(){
			var that = this;

			that.node.on('mouseover',function(e){
				e.halt();
				var w = that.width / 2;
				var h = that.height / 2;
				that.anim_out[0] = new Anim(
					that.img_a[0],
					{
						top:-h,
						left:-w
					},
					that.out_speed,
					'easeOut'
				);
				that.anim_out[1] = new Anim(
					that.img_a[1],
					{
						top:-h,
						right:-w
					},
					that.out_speed,
					'easeOut'
				);
				that.anim_out[2] = new Anim(
					that.img_a[2],
					{
						bottom:-h,
						left:-w
					},
					that.out_speed,
					'easeOut'
				);
				that.anim_out[3] = new Anim(
					that.img_a[3],
					{
						bottom:-h,
						right:-w
					},
					that.out_speed,
					'easeOut'
				);
				// 执行动画
				for(var i = 0;i<4;i++){
					if(that.anim_in[i]){
						that.anim_in[i].stop();
					}
					that.anim_out[i].run();
				}
			});
			that.node.on('mouseout',function(e){
				e.halt();
				var w = that.width / 2;
				var h = that.height / 2;
				that.anim_in[0] = new Anim(
					that.img_a[0],
					{
						top:0,
						left:0
					},
					that.in_speed,
					that.animout_easing
				);
				that.anim_in[1] = new Anim(
					that.img_a[1],
					{
						top:0,
						right:0
					},
					that.in_speed,
					that.animout_easing
				);
				that.anim_in[2] = new Anim(
					that.img_a[2],
					{
						left:0,
						bottom:0
					},
					that.in_speed,
					that.animout_easing

				);
				that.anim_in[3] = new Anim(
					that.img_a[3],
					{
						bottom:0,
						right:0
					},
					that.in_speed,
					that.animout_easing
				);
				for(var i = 0;i<4;i++){
					if(that.anim_out[i]){
						that.anim_out[i].stop();
					}
					that.anim_in[i].run();
				}

			});
			return this;

		},
		buildParam:function(o){
			var that = this;
			if(typeof o == 'undefined' || o == null){
				var o = {};
			}
			that.out_speed = (typeof o.out_speed == 'undefined' || o.out_speed == null)?0.3:o.out_speed;
			that.in_speed = (typeof o.in_speed == 'undefined' || o.in_speed == null)?0.5:o.in_speed;
			// 结束动画的行为
			that.animout_easing = (typeof o.animout_easing == 'undefined' || o.animout_easing == null)?'bounceOut':o.animout_easing;


			//准备数据
			that.img = that.node.one('img').attr('src');
			that.width = that.node.width();
			that.height = that.node.height();
			that.anim_out = [];
			that.anim_in = [];
			return this;
		}
	};

	return Cutter;

}, {requires:['node', 'anim']});



