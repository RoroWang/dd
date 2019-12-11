;(function(){
    class Login{
        constructor(){
            this.user = document.getElementById("username");
            this.pass = document.getElementById("password");
            this.log = document.getElementById("loginsubmit");
            this.span = document.getElementById("span");

            this.addEvent();
        }
        addEvent(){
            var that = this;
            this.log.onclick = function(){
                that.u = that.user.value;
                that.p = that.pass.value;

                that.getMsg();
            }
        }
        getMsg(){
            this.msg = getCookie("userMsg")?JSON.parse(getCookie("userMsg")):[];
            var type = 0;
            for(var i=0;i<this.msg.length;i++){
                if(this.msg[i].user == this.u && this.msg[i].pass == this.p){
                    location.href = "index.html";
                    this.msg[i].onoff = 1;
                    setCookie("userMsg",JSON.stringify(this.msg));
                    type=1;
                }else if(this.msg[i].user == this.u && this.msg[i].pass != this.p){
                    this.span.innerHTML = "密码错误";
                    type = 2;
                }
            }
            if(type == 0){
                this.span.innerHTML = "用户名不存在,请<a href='register.html'>去注册</a>";
            }
        }
    }
    new Login;
    var ouser = document.getElementById("username");

    ouser.onblur = function(){

        var reg = /^1(3|[5-9])\d{9}$/;
        if(reg.test(this.value)){
            
            this.parentNode.nextElementSibling.innerHTML = "手机号正确";
            u = true;
        }else{
            this.parentNode.nextElementSibling.innerHTML = "手机号不正确";
            u = false;
        }
    }
})();