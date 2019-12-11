var aspan = document.querySelectorAll(".yqlink span");
var ap = document.querySelectorAll(".divlink");

// 2.绑定事件
for(var i=0;i<aspan.length;i++){
    aspan[i].index = i;

    aspan[i].onmousemove = function(){
        for(var j=0;j<ap.length;j++){
            aspan[j].className = "";
            ap[j].style.display = "none";
        }
        this.className = "active";
        ap[this.index].style.display = "block";
    }
}
