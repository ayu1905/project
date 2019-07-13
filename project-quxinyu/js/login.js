$(function() {
    // 获取用户状态
    this.state = JSON.parse(localStorage.getItem("state"));
    this.state = [{
        state: false
    }];
    localStorage.setItem("state", JSON.stringify(this.state));

    // 获取注册用户
    this.user = JSON.parse(localStorage.getItem("user"));
    if (this.user != null) {
        // 提取关键字，组成数组
        var arr = Object.keys(this.user);
        // 计算注册用户人数
        var len = arr.length;
    } else {
        var len = 0;
    }

    // 获取用户状态
    this.state = JSON.parse(localStorage.getItem("state"));

    var that = this;
    $("#registerGo").click(function() {
        for (var i = 0; i < len; i++) {
            if (that.user[i].username == $("#username").val() && that.user[i].password == $("#password").val()) {
                that.state.push({
                    state: true
                })
                localStorage.setItem("state", JSON.stringify(that.state));

                setInterval(function() {
                    window.location.href = "http://localhost/project-quxinyu/index.html";
                }, 100)

                return;
            } else {
                alert("用户名或密码不符");
                $("#username").val("");
                $("#password").val("");
                return;
            }
        }
    })
    localStorage.setItem("state", JSON.stringify(this.state));
})