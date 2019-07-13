$(".banner").banner({
    aimg: $(".banner").children(".box").find("img"), //必传
    left: $(".banner").find("#left"), //可选,传了有功能，不传没有功能
    right: $(".banner").find("#right"), //可选,传了有功能，不传没有功能
    isList: true, //可选，默认为true
    autoPlay: true, //可选，默认为true
    moveTime: 200, //可选，默认为200
    index: 3
})