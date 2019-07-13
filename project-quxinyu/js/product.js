$(function() {
    class GoodsList {
        constructor() {
            this.cont = document.getElementById("cont");
            this.left = document.querySelector("#btnL");
            this.right = document.querySelector("#btnR");
            this.pageList = document.querySelector("#pageWarp").getElementsByTagName("ul")[0];
            this.url = "http://localhost/project-quxinyu/data/json.json";
            this.num = 20;
            this.index = 0;
            this.init();
            //1. 绑定事件
            this.addEvent();
        }
        init() {
            var that = this;
            ajaxPost(this.url, function(res) {
                that.res = JSON.parse(res);
                // console.log(res)
                that.createPage();
                that.display()
            })
        }
        createPage() {
            this.maxNum = Math.ceil(this.res.row.length / this.num);
            var str = "";
            for (var i = 0; i < this.maxNum; i++) {
                str += `<li>${i + 1}</li>`;
            }
            this.pageList.innerHTML = str;
            this.li = this.pageList.children;
            this.active();
        }
        active() {
            var that = this;
            for (var i = 0; i < this.li.length; i++) {
                this.li[i].setAttribute("index", i);
                this.li[i].className = "";
                this.li[i].onclick = function() {
                    for (var j = 0; j < that.li.length; j++) {
                        that.li[j].className = "";
                    }
                    that.index = this.getAttribute("index");
                    this.className = "active";
                    that.display();
                }
            }
            this.li[this.index].className = "active";
        }
        display() {
            var str = "";
            for (var i = this.index * this.num; i < (this.index + 1) * this.num; i++) {
                console.log(this.res.row[0].src)
                if (i < this.res.row.length) {
                    this.href = `details.html?id=${this.res.row[i].Id}`;
                    str += `<div class="box" index="${this.res.row[i].Id}">
                                <a href="${this.href}"><img src="${this.res.row[i].src}" alt=""></a>
                                <p>${this.res.row[i].keyword}</p>
                                <span>￥${this.res.row[i].price}.00</span>
                                <em class="addCar">加入购物车</em>
                            </div>`;
                }
            }
            this.cont.innerHTML = str;
        }

        addEvent() {
            var that = this;
            this.cont.onclick = function(eve) {
                var e = eve || window.event;
                var t = e.target || e.srcElement;
                if (t.className == "addCar") {
                    // 2.获取当前的商品ID
                    that.Id = t.parentNode.getAttribute("index");

                    // 3. 存localstorage
                    that.setData();
                }
            }
            this.left.onclick = function() {
                that.changeIndex(-1);
            }
            this.right.onclick = function() {
                that.changeIndex(1);
            }
        }
        setData() {
            this.goods = localStorage.getItem("goods");

            // console.log(this.goods)
            if (this.goods != null) {
                // 不是第一次
                // console.log(1)
                this.goods = JSON.parse(this.goods)

                var onoff = true;
                // 之后存
                for (var i = 0; i < this.goods.length; i++) {
                    // console.log(this.goods[0].Id)
                    // console.log(this.Id)
                    console.log(this.goods[0].Id == this.Id);
                    //  老的
                    if (this.goods[i].Id == this.Id) {
                        console.log(1)
                        this.goods[i].num++;
                        onoff = false;
                    }
                }
                // 新的
                if (onoff) {
                    this.goods.push({
                        Id: this.Id,
                        num: 1
                    })
                }
            } else {
                // 第一次存
                //   直接存
                this.goods = [{
                    Id: this.Id,
                    num: 1
                }];
            }

            //最后将数据设置回去
            localStorage.setItem("goods", JSON.stringify(this.goods))
        }
        changeIndex(type) {
            if (type == 1) {
                if (this.index == this.maxNum - 1) {
                    this.index = 0;
                } else {
                    this.index++;
                }
            } else if (type == -1) {
                if (this.index == 0) {
                    this.index = this.maxNum - 1;
                } else {
                    this.index--;
                }
            } else {
                this.index = type;
            }
            this.active();
            this.display();
        }


    }
    new GoodsList;

})