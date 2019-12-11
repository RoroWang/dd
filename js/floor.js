$(".floor li").click(function(){
//			1获取点击元素的索引
//			console.log($(this).index())
    var i = $(this).index();
//			2根据索引找到指定结构,获取距离顶部的位置
    var t = $(".floordiv").eq(i).offset().top;
//			$(document).scrollTop(t);
//			3配合动画方法,设置滚动距离
    $("html").animate({
        scrollTop:t
    })
})