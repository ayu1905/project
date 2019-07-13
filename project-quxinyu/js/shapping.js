class Car {
    constructor() {
        this.tbody = document.querySelector("tbody");
        this.input = document.querySelector("#input");
        this.url = "http://localhost/project-quxinyu/data/json.json";

        this.init();
        // 1.删除：绑定删除按钮的事件
        this.addEvent();
    }
    addEvent() {
        var that = this;
        this.tbody.onclick = function() {
                if (event.target.className == "del") {
                    // 2.获取点击商品的id
                    that.id = event.target.parentNode.getAttribute("index");
                    // 3.删除DOM元素
                    event.target.parentNode.remove();
                    // 4.删除localstorage的数据
                    that.setData(function(i) {
                        that.goods.splice(i, 1);
                    });
                }
                // 点击单选按钮
                if (event.target.className == "check") {
                    // 2.获取点击商品的id
                    // console.log(1);
                    that.id = event.target.parentNode.parentNode.getAttribute("index");
                    // console.log(that.id);
                    if (event.target.checked == true) {
                        event.target.checked == false;
                        // console.log(event.target.parentNode.parentNode);
                        that.count = event.target.parentNode.parentNode.getAttribute("count");
                        console.log(that.count);
                    } else {
                        event.target.checked == true;
                    }
                }
            }
            // 8.修改数量：事件委托绑定输入框的事件
        this.tbody.oninput = function() {
                if (event.target.className == "changeNum") {
                    // console.log(event.target)
                    // 9.存储修改的商品的id
                    that.id = event.target.parentNode.parentNode.getAttribute("index");
                    // 10.修改localstorage的数据
                    that.setData(function(i) {
                        that.goods[i].num = event.target.value;
                    });
                    // 修改商品数量，小计跟着改变
                    event.target.parentNode.parentNode.cells[5].innerHTML = event.target.value * event.target.parentNode.parentNode.cells[3].innerHTML.slice(1);
                }
                that.addCount();
            }
            // that.addCount();
    }
    setData(callback) {
            // 5.遍历数据，查找相同id
            for (var i = 0; i < this.goods.length; i++) {
                if (this.goods[i].id == this.id) {
                    // 6.执行回调函数：删除时传进来的是删除，修改时传进来的是修改
                    callback(i);
                }
            }
            // 7.再存回去
            localStorage.setItem("goods", JSON.stringify(this.goods));
        }
        // 获取商品页面传过来的数据
    init() {
        var that = this;
        ajaxPost(this.url, function(res) {
            that.res = JSON.parse(res)
                // console.log(that.res);
            that.getData();
        })
    }
    getData() {
            this.goods = localStorage.getItem("goods") ? JSON.parse(localStorage.getItem("goods")) : [];
            // console.log(this.goods)
            this.display();
            this.checkAll();
        }
        // 展示
    display() {
        var str = "";
        for (var i = 0; i < this.res.row.length; i++) {
            for (var j = 0; j < this.goods.length; j++) {
                // console.log(this.res.row[i].Id)
                // console.log(this.goods[j].Id)
                if (this.res.row[i].Id == this.goods[j].Id) {
                    str += `<tr index="${this.res.row[i].Id}">
                                <td><input class="checkbox" type="checkbox" name="check_box"></td>
                                <td><img src="${this.res.row[i].src.split(",")[0]}" alt=""></td>
                                <td>${this.res.row[i].title}</td>
                                <td>￥${this.res.row[i].price}.00</td>
                                <td><input type="number" value="${this.goods[j].num}" min=1 class="changeNum"></td>
                                <td id="count" count = "count">${this.res.row[i].price * this.goods[j].num}</td>
                                <td class="del">删除</td>
                            </tr>`;
                }
            }
        }
        this.tbody.innerHTML = str;
    }
}
// 全选按钮
Car.prototype.checkAll = function() {
        this.check_all = document.querySelector("#check-all");
        this.checkbox = document.querySelectorAll(".checkbox");
        var that = this;

        this.check_all.onclick = function() {
            if (that.check_all.checked) {
                for (var i = 0; i < that.checkbox.length; i++) {
                    that.checkbox[i].checked = true;
                }
            } else {
                for (var i = 0; i < that.checkbox.length; i++) {
                    that.checkbox[i].checked = false;
                }
            }
            that.addCount();
        }
    }
    // 判断商品是否选中，计算总价
Car.prototype.check = function() {
        var that = this;
        // 选取商品所在的tr标签
        this.tr = this.tbody.rows;
        for (var i = 0; i < this.tr.length; i++) {
            this.tr[i].children[0].childNodes[0].onclick = function() {
                if (this.checked == true) {
                    that.addCount();
                }
            }
        }
    }
    // 遍历商品列表，计算总价
Car.prototype.addCount = function() {
    // 选择tr标签
    this.tr = this.tbody.rows;
    this.sum = 0;
    // 选择tr的子标签
    // console.log(this.tr[0].children[0].childNodes[0].checked);
    for (var i = 0; i < this.tr.length; i++) {
        if (this.tr[i].children[0].childNodes[0].checked) {
            this.sum += parseFloat(this.tr[i].children[5].innerHTML);
        }
    }
    this.input.value = this.sum.toFixed(2);
}
new Car;