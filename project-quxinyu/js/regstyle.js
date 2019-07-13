$(function() {
    $("#change").click(function() {
        translate();
    })

    // 正则提示
    var re_username = /^[A-Za-z]{1}[A-Za-z0-9_-]{3,9}$/;
    var re_password = /^[\w_-]{6,16}$/;
    // 注册登录按钮
    var registerGo = $("#registerGo");
    // 获取用户输入的内容
    var username = $("#username");
    var nameInfo = $("#nameInfo");
    var password = $("#password");
    var passwordInfo = $("#passwordInfo");
    var password_repeat = $("#password_repeat");
    var repeatInfo = $("#repeatInfo");
    // 判断状态
    var usernameOK = null;
    var passwordOk = null;
    var password_repeatOk = null;
    var replaceOK = null;
    // 用户名验证模块
    username.change(() => {
        username.focus(() => {
            username.css("box-shadow", "0 0 4px 1px rgba(32,157,230,.4)");
            nameInfo.text("用户名需以字母开头，并且长度控制在4到10位");
            nameInfo.css("color", "#999")
        })
        username.blur(function() {
            console.log(111)
            if (re_username.test(username.val())) {
                username.css("box-shadow", "none");
                nameInfo.show();
                nameInfo.text("您输入的用户名格式正确!");
                nameInfo.css("color", "#4caf50");
                usernameOK = true;
            } else if (username.val() === "") {
                nameInfo.show();
                nameInfo.text("您还未输入用户名!");
                username.css("box-shadow", "0 0 4px 1px rgba(228,36,36,.6)");
                nameInfo.css("color", "#f64a4a");
                usernameOK = false;
            } else {
                nameInfo.show();
                nameInfo.text("您的用户名格式错误，请检查一下哦!");
                username.css("box-shadow", "0 0 4px 1px rgba(228,36,36,.6)");
                nameInfo.css("color", "#f64a4a");
                usernameOK = false;
            }

        })
    });
    // 密码验证模块
    password.change(() => {
        password.focus(() => {
            password.css("box-shadow", "0 0 4px 1px rgba(32,157,230,.4)");
            passwordInfo.text("6-16个字符，建议使用字母加数字或符号组合");
            passwordInfo.css("color", "#999");
        })
        password.blur(function() {
            if (re_password.test(password.val())) {
                password.css("box-shadow", "none");
                passwordInfo.show();
                passwordInfo.text("恭喜您密码可用!");
                passwordInfo.css("color", "#4caf50");
                passwordOk = true;
            } else if (password.val() === "") {
                passwordInfo.show();
                passwordInfo.text("您还未输入密码!");
                password.css("box-shadow", "0 0 4px 1px rgba(228,36,36,.6)");
                passwordInfo.css("color", "#f64a4a");
                passwordOk = false;
            } else {
                passwordInfo.show();
                passwordInfo.text("为了您的账号安全，密码长度需在 6-16 个字符之间");
                password.css("box-shadow", "0 0 4px 1px rgba(228,36,36,.6)");
                passwordInfo.css("color", "#f64a4a");
                passwordOk = false;
            }

        })
    });
    password_repeat.change(() => {
        password_repeat.focus(() => {
            password_repeat.css("box-shadow", "0 0 4px 1px rgba(32,157,230,.4)");
            repeatInfo.text("为了您的账号安全，请您再次输入密码");
            repeatInfo.css("color", "#999")
        })
        password_repeat.blur(() => {
            console.log(password_repeat.val())
            if (password.val() === password_repeat.val()) {
                password_repeat.css("box-shadow", "none");
                repeatInfo.show();
                repeatInfo.text("确认密码成功!");
                repeatInfo.css("color", "#4caf50");
                password_repeatOk = true;
            } else if (password_repeat.val() === "") {
                repeatInfo.show();
                repeatInfo.text("请您再次输入密码，以保障您的账户安全!");
                password_repeat.css("box-shadow", "0 0 4px 1px rgba(228,36,36,.6)");
                repeatInfo.css("color", "#f64a4a");
                password_repeatOk = false;
            } else {
                repeatInfo.show();
                repeatInfo.text("两次密码输入不一致，请重新输入");
                password_repeat.css("box-shadow", "0 0 4px 1px rgba(228,36,36,.6)");
                repeatInfo.css("color", "#f64a4a");
                password_repeatOk = false;
            }

        })

    });
    // 验证码模块
    $("#replace").click(function() {
        check($("#small"), $("#checking"), $("#checkingInfo"))
        $("#small").change(() => {
            $("#small").focus(() => {
                $("#small").css("box-shadow", "0 0 4px 1px rgba(32,157,230,.4)");
                $("#checkingInfo").text("请按右图填写，不区分大小写！");
                $("#checkingInfo").css("color", "#999")
            })
            $("#small").blur(function() {
                if ($("#small").val().toLowerCase() === $("#checking").text().toLowerCase()) {
                    $("#small").css("box-shadow", "none");
                    $("#checkingInfo").show();
                    $("#checkingInfo").text("验证成功！");
                    $("#checkingInfo").css("color", "#4caf50")
                    replaceOK = true;
                } else if ($("#small").val() === "") {
                    $("#checkingInfo").show();
                    $("#checkingInfo").text("您还未输入验证码!");
                    $("#small").css("box-shadow", "0 0 4px 1px rgba(228,36,36,.6)");
                    $("#checkingInfo").css("color", "#f64a4a");
                    replaceOK = false;
                } else {
                    $("#checkingInfo").show();
                    $("#checkingInfo").text("您的验证码输入错误，请检查一下哦!");
                    $("#small").css("box-shadow", "0 0 4px 1px rgba(228,36,36,.6)");
                    $("#checkingInfo").css("color", "#f64a4a");
                    replaceOK = false;
                }
            })

        })
    });
    $("#replace").click();

    function newColor() {
        var r = Math.floor(Math.random() * 255);
        var b = Math.floor(Math.random() * 255);
        var a = Math.floor(Math.random() * 255);
        return "rgb(" + r + "," + b + "," + a + ")"
    }

    function check(input, bg, info) {
        var random_arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        // clearInterval(timer);
        // 点击获取验证码后input框和信息框清空
        // info.innerHTML = "";
        // txt.value = "";
        // 利用随机数长乘以数组，然后向下取整，生成6个随机的索引,添加进数组nums
        var num1 = Math.floor(Math.random() * random_arr.length);
        var num2 = Math.floor(Math.random() * random_arr.length);
        var num3 = Math.floor(Math.random() * random_arr.length);
        var num4 = Math.floor(Math.random() * random_arr.length);
        bg.text(random_arr[num1] + random_arr[num2] + random_arr[num3] + random_arr[num4])
        console.log(newColor() + ",red");
        bg.css("color", newColor());
        bg.css("background", newColor());
    }


    registerGo.click(() => {

        if ($("#small").val().toLowerCase() === $("#checking").text().toLowerCase()) {
            $("#small").css("box-shadow", "none");
            $("#checkingInfo").show();
            $("#checkingInfo").text("验证成功！");
            $("#checkingInfo").css("color", "#4caf50")
            replaceOK = true;
        } else if ($("#small").val() === "") {
            $("#checkingInfo").show();
            $("#checkingInfo").text("您还未输入验证码!");
            $("#small").css("box-shadow", "0 0 4px 1px rgba(228,36,36,.6)");
            $("#checkingInfo").css("color", "#f64a4a");
            replaceOK = false;
        } else {
            $("#checkingInfo").show();
            $("#checkingInfo").text("您的验证码输入错误，请检查一下哦!");
            $("#small").css("box-shadow", "0 0 4px 1px rgba(228,36,36,.6)");
            $("#checkingInfo").css("color", "#f64a4a");
            replaceOK = false;
        }



        if (usernameOK && passwordOk && password_repeatOk && replaceOK) {

            console.log(usernameOK, passwordOk, password_repeatOk, replaceOK)
            var info = 'username=' + username.val() + '&password=' + password.val();
            // $.ajax({
            //     url: "../admin/RegUser.php",
            //     type: "post",
            //     data: info,
            //     success: function(data) {
            //         var backInfo = JSON.parse(data)
            //         console.log(backInfo)
            //         if (backInfo.state === 1) {
            //             alert("恭喜您，注册成功,点击确定跳转到登录页面")
            //             window.location.href = "login.html"
            //             return false;
            //         }
            //         if (backInfo.state === 0) {
            //             console.log(backInfo.error_msg);
            //             alert("no")
            //             window.location.reload();
            //             return false;
            //         }
            //     }

            // })






            return false;


        } else if (usernameOK === null && passwordOk === null && password_repeatOk === null && replaceOK === null) {
            // 用户名提示
            nameInfo.show();
            nameInfo.text("您还未输入用户名!");
            username.css("box-shadow", "0 0 4px 1px rgba(228,36,36,.6)");
            nameInfo.css("color", "#f64a4a");
            // 密码提示
            passwordInfo.show();
            passwordInfo.text("您还未输入密码!");
            password.css("box-shadow", "0 0 4px 1px rgba(228,36,36,.6)");
            passwordInfo.css("color", "#f64a4a");
            // 重复密码提示
            repeatInfo.show();
            repeatInfo.text("请您再次输入密码，以保障您的账户安全!");
            password_repeat.css("box-shadow", "0 0 4px 1px rgba(228,36,36,.6)");
            repeatInfo.css("color", "#f64a4a");
            // 验证码提示
            $("#checkingInfo").show();
            $("#checkingInfo").text("您还未输入验证码!");
            $("#small").css("box-shadow", "0 0 4px 1px rgba(228,36,36,.6)");
            $("#checkingInfo").css("color", "#f64a4a");
            return false
        } else if (!usernameOK || !passwordOk || !password_repeatOk || !replaceOK) {
            return false
        } else {

            return false
        }

    }) this.user = JSON.parse(localStorage.getItem("user"));

    if (this.user != null) {
        var arr = Object.keys(this.user);
        var len = arr.length;
    } else {
        var len = 0;
    }


    var name = $("#username").val();
    var word = $("#password").val()

    if (this.user == null) {
        this.user = [{
            username: name,
            password: word,

        }]
    } else {
        this.user.push({
            username: name,
            password: word,

        })
    }
    localStorage.setItem("user", JSON.stringify(this.user));

    // window.location.href = "http://localhost/project-niping/index.html";





})