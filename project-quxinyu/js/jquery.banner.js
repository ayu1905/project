;
(function($) {
    "use strict";

    $.fn.banner = function(options) {
        //		因为用了面向对象编程,为了在类中能拿到外面的this,先保存起来
        var _this = this;
        //		定义类
        class Banner {
            constructor(options) {
                //				接收并处理默认参数
                this.img = options.aimg;
                this.left = options.left;
                this.right = options.right;
                this.isList = options.isList === false ? false : true;
                this.autoPlay = options.autoPlay === false ? false : true;
                this.delayTime = options.delayTime || 2000;
                this.moveTime = options.moveTime || 200;
                //				默认显示第几张
                this.index = options.index || 0;

                this.iPrev = this.img.length - 1;

                //				提前计算任意一张图片的宽度
                this.w = this.img.eq(0).width();
                //				设置默认显示的是那张图片
                this.img.css({
                    left: this.w
                }).eq(this.index).css({
                    left: 0
                })

                //				L1.开始根据img的个数,生成list布局
                this.init();
                //				B1.绑定左右按钮的事件
                this.btnEevnt();

                //				P1.开始准备自动轮播
                this.play();
            }
            init() {
                //				L2.判断用户是否需要,如果不需要就不执行
                if (!this.isList) return;

                //				L3.先创建大框
                this.list = $("<div class='list'></div>");
                //				L4.创建每个list(span)
                for (var i = 0; i < this.img.length; i++) {
                    this.list.append($(`<span></span>`))
                }
                _this.append(this.list);
                //				L5.设置大框的样式
                this.list.css({
                    width: this.img.length * 50,
                    height: 50,
                    display: "flex",
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: 0
                }).children("span").css({ //设置span的样式
                    flex: 1,
                    background: "rgba(200,200,200,0.6)",
                    textAlign: "center",
                    margin: 10,
                    lineHeight: "30px",
                    borderRadius: "50%",
                    // borderLeft: "solid 1px #ccc",
                    // borderRight: "solid 1px #ccc",
                }).eq(this.index).css({ //设置当前显示的图片对应的span的样式
                    background: "#f6a00"
                })

                //				L6.开始做list的事件
                this.listEvent();
            }
            listEvent() {
                //				console.log(this.list)
                //				保存实例的this
                var that = this;
                this.list.children("span").click(function() {
                    //					console.log($(this).index())
                    //					L7.根据点击的索引和当前默认索引,判断移动的方向
                    if ($(this).index() > that.index) {
                        //						L10.开始移动:左
                        that.listMove($(this).index(), 1)
                    }
                    if ($(this).index() < that.index) {
                        //						L10.开始移动:右
                        that.listMove($(this).index(), -1)
                    }
                    //					L8.修改list中span的当前项
                    that.list.children("span").css({
                        background: "rgba(200,200,200,0.6)"
                    }).eq($(this).index()).css({
                        background: "#ff6a00"
                    })

                    //					L9.点击之后,一定要将这次点击的索引设置成当前索引
                    that.index = $(this).index();
                })
            }
            listMove(iNow, type) {
                //				L10.开始运动
                //				从哪走
                this.img.eq(this.index).css({
                    left: 0
                }).stop().animate({ //走到哪
                    left: -this.w * type
                }, this.moveTime).end().eq(iNow).css({ //从哪进来
                    left: this.w * type
                }).stop().animate({ //进到哪
                    left: 0
                }, this.moveTime)

                //				end()表示返回上一步选择器,不是上一层;上一层一般都是父级;上一步,不一定
            }

            btnEevnt() {
                //				B2.先判断是否传入左右按钮
                if (this.left == undefined || this.left.length < 1) return;

                var that = this;
                this.left.on("click", function() {
                    //					B3.改变索引
                    that.changeIndex(1)
                })
                this.right.on("click", function() {
                    //					B3.改变索引
                    that.changeIndex(-1)
                })
            }
            changeIndex(type) {
                if (type == 1) {
                    if (this.index == 0) {
                        this.index = this.img.length - 1;
                        this.iPrev = 0;
                    } else {
                        this.index--;
                        this.iPrev = this.index + 1;
                    }
                } else {
                    if (this.index == this.img.length - 1) {
                        this.index = 0;
                        this.iPrev = this.img.length - 1;
                    } else {
                        this.index++;
                        this.iPrev = this.index - 1;
                    }
                }
                //				B4.开始移动
                this.btnMove(type);
            }
            btnMove(type) {
                this.img.eq(this.iPrev).css({
                    left: 0
                }).stop().animate({
                    left: this.w * type
                }, this.moveTime).end().eq(this.index).css({
                    left: -this.w * type
                }).stop().animate({
                    left: 0
                }, this.moveTime)

                //				B5.设置list的当前项
                //				根据用户的参数isList
                //				根据this.list判断
                if (!this.isList) return;

                this.list.children("span").css({
                    background: "rgba(200,200,200,0.6)"
                }).eq(this.index).css({
                    background: "#ff6a00"
                })
            }
            play() {
                //				P2.判断是否有自动播放
                if (!this.autoPlay) return;
                //				P3.开启计时器,自动执行右按钮的事件处理函数(其实就是做右按钮做的事情)
                this.t = setInterval(() => {
                    this.changeIndex(-1);
                }, this.delayTime)

                //				P4.给大框加鼠标进入和离开事件,进入就停止,离开就继续
                _this.hover(() => {
                    clearInterval(this.t)
                }, () => {
                    this.t = setInterval(() => {
                        this.changeIndex(-1);
                    }, this.delayTime)
                })
            }
        }
        new Banner(options)
    }


})(jQuery);