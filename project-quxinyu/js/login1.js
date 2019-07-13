$(function() {

    // console.log(111);
    // console.log($("#username").val());
    // alert(1)
    this.user = localStorage.getItem('user')
        // console.log(this.user)
    $("#registerGo").click(function() {

        if ($("#username").val() === localStorage.getItem('username') && $("#password").val() === localStorage.getItem('password')) {
            window.location.href = "http://localhost/project-quxinyu/index.html";
            // if ($("#password").val() === localStorage.getItem('password')) {
            //     alert("denglu OK");
            //     window.location.href = "http://localhost/project-quxinyu/index.html";
            // } else {
            //     console.log($("#password").val())
            //     alert("pass cuowu");
            // }
        } else {
            alert('yonghu,cuowu')
        }
        return false
    })
})