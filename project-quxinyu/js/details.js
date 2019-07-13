$(function() {
    class Data {
        constructor() {
            // 小图片
            this.cont1 = document.querySelector(".centerfloor .left");
            // 大图片
            this.cont2 = document.querySelector(".centerfloor .magic");
            this.cont3 = document.querySelector(".centerfloor .right .right_top");
            this.cont4 = document.querySelector(".centerfloor .right .center_right ul");
            this.cont = document.querySelector(".centerfloor .bottom_right");
            // 获取地址栏信息，提取商品ID
            var str = location.href;
            this.Id = str.split("?")[1].split("=")[1];

            this.url = "http://localhost/project-quxinyu/data/json.json";

            this.init();
            // 绑定事件
            this.addEvent();

        }
        init() {
            var that = this;
            ajaxPost(this.url, function(res) {
                that.res = JSON.parse(res);
                that.display();
            })
        }

        display() {
            var str1 = "";
            var str2 = "";
            var str3 = "";
            var str4 = "";
            for (var i = 0; i < this.res.row.length; i++) {
                if (this.res.row[i].Id == this.Id) {
                    str1 += `<img src="${this.res.row[i].src}" alt="">
                                <span></span>`;
                    str2 += `<img src="${this.res.row[i].src}" alt="">`;
                    str3 += `<span><a href="#">${this.res.row[i].keyword}</a></span>`;
                    str4 += `<li>
                                <p>价格</p>
                                <span>￥${this.res.row[i].price}.00</span>
                            </li>
                            <li>
                                <p>介绍</p>
                                <span>${this.res.row[i].title}</span>
                            </li>`;
                }
            }
            this.cont1.innerHTML = str1;
            this.cont2.innerHTML = str2;
            this.cont3.innerHTML = str3;
            this.cont4.innerHTML = str4;

            this.addMagic();
        }
        addEvent() {
            var that = this;
            this.cont.onclick = function(eve) {
                var e = eve || window.event;
                var t = e.target || e.srcElement;
                // 点击添加购物车
                if (t.className == "addCar") {
                    // 存储数据localstorage
                    that.setData();
                }
            }
        }
        setData() {
            // 查看加入购物车的商品列表
            this.goods = localStorage.getItem("goods");
            // 存储信息
            // 列表不为空
            if (this.goods) {
                // 不是第一次存储商品
                this.goods = JSON.parse(this.goods);
                // 根据状态判断购物车是否有该商品，true表示没有
                var onoff = true;
                for (var i = 0; i < this.goods.length; i++) {
                    // 购物车有该商品
                    if (this.goods[i].id == this.Id) {
                        this.goods[i].num++;
                        onoff = false;
                    }
                }
                // 购物车没有该商品
                if (onoff) {
                    this.goods.push({
                        id: this.Id,
                        num: 1
                    })
                }
            } else {
                // 第一次存储商品
                //     直接存
                this.goods = [{
                    id: this.Id,
                    num: 1
                }];
            }
            // 最后将数据设置回去
            localStorage.setItem("goods", JSON.stringify(this.goods));
        }
        addMagic() {
            this.sBox = document.querySelector(".centerfloor .left");
            this.bBox = document.querySelector(".centerfloor .magic");
            this.span = document.querySelector(".centerfloor .left span");
            this.bImg = document.querySelector(".centerfloor .magic img");
            this.sImg = document.querySelector(".centerfloor .left img");

            this.addInit();
            this.addBevent();
        }
        addInit() {
            //右边大图的宽高  除以  右边框的宽高  得到比例
            var w = this.bImg.offsetWidth / this.bBox.offsetWidth;
            var h = this.bImg.offsetHeight / this.bBox.offsetHeight;
            //左边框的宽高  除以  比例  得到  span的宽高
            this.span.style.width = this.sBox.offsetWidth / w + "px";
            this.span.style.height = this.sBox.offsetHeight / h + "px";
        }
        addBevent() {
            var that = this;
            //进入
            this.sBox.addEventListener("mouseover", function() {
                    that.span.style.display = "block";
                    that.bBox.style.display = "block";
                    //补充布局:因为元素被display:none了，js获取不到隐藏的元素的尺寸
                    that.addInit();
                })
                //离开
            this.sBox.addEventListener("mouseout", function() {
                    that.span.style.display = "none";
                    that.bBox.style.display = "none";
                })
                //移动
            this.sBox.addEventListener("mousemove", function(eve) {
                var e = eve || window.event;
                that.move(e);
            })
        }
        move(e) {
            // span跟随移动
            // 利用尺寸的计算
            // 利用布局解决
            var l = e.clientX - this.span.offsetWidth / 2 - this.sBox.offsetLeft;
            var t = e.clientY - this.span.offsetHeight / 2;

            // 边界限定
            if (l < 0) l = 0;
            if (l > this.sBox.offsetWidth - this.span.offsetWidth)
                l = this.sBox.offsetWidth - this.span.offsetWidth;
            if (t < 0) t = 0;
            if (t > this.sBox.offsetHeight - this.span.offsetHeight)
                t = this.sBox.offsetHeight - this.span.offsetHeight;

            // 计算比例
            var x = l / (this.sBox.offsetWidth - this.span.offsetWidth);
            var y = t / (this.sBox.offsetHeight - this.span.offsetHeight);

            // 让span跟随鼠标
            this.span.style.left = l + "px";
            this.span.style.top = t + "px";

            // 根据比例移动大图
            this.bImg.style.left = -x * (this.bImg.offsetWidth - this.bBox.offsetWidth) + "px";
            this.bImg.style.top = -y * (this.bImg.offsetHeight - this.bBox.offsetHeight) + "px";

            //设置span的背景图的位置，跟随鼠标反方向移动
            this.span.style.backgroundPosition = -l + "px " + -t + "px";
        }
    }
    new Data;
});