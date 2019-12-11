;(function(){
    class Register{
        constructor(){
            this.user = document.getElementById("username");
            this.pass = document.getElementById("password");
            this.pass2 = document.getElementById("password2");
            this.reg = document.getElementById("loginsubmit");
            // this.log = document.getElementById("log");
            this.span = document.getElementById("span");

            this.addEvent();
        }
        addEvent(){
            var that = this;
            this.reg.onclick = function(){
                that.u = that.user.value;
                that.p = that.pass.value;

                that.setMsg();
            }
            // this.log.onclick = function(){
            //     location.href = "login.html";
            // }
        }
        setMsg(){
            this.msg = getCookie("userMsg")? JSON.parse(getCookie("userMsg")) : [];

            if(this.msg.length<1){
                this.msg.push({
                    user:this.u,
                    pass:this.p,
                    onoff:0
                })
                this.success();
            }else{
                var type = this.msg.some((val,idx)=>{
                    return val.user === this.u;
                });
                if(type){
                    this.span.innerHTML = "用户名重复";
                }else{
                    this.msg.push({
                    user:this.u,
                    pass:this.p,
                    onoff:0
                    })
                    this.success();
                }
            }
            setCookie("userMsg",JSON.stringify(this.msg));
        }
        success(){
            this.span.innerHTML = "注册成功，3秒后<a href='login.html'>跳转到登录界面</a>"
            setTimeout(() => {
                location.href = "login.html";
            }, 3000);
        }
    }
    new Register;
        var ouser = document.getElementById("username");
        var opass = document.getElementById("password");
        var opass2 = document.getElementById("password2");
        var obtn = document.getElementById("loginsubmit");
        var lower = document.getElementById("pwd_lower");
        var middle = document.getElementById("pwd_middle");
        var high = document.getElementById("pwd_high");

        var u=p=p2=false;
    
        ouser.onblur = function(){
            var reg =/^1(3|[5-9])\d{9}$/;
            if(reg.test(this.value)){
                this.parentNode.nextElementSibling.innerHTML = "手机号正确";
                u = true;
            }else{
                this.parentNode.nextElementSibling.innerHTML = "手机号不正确";
                u = false;
            }
        }
    
        opass.onblur = function(){
            // 不允许为空，为空的话，验证就不验证
            if(this.value == ""){
                this.nextElementSibling.innerHTML = "不允许为空";
                p = false
                return;
            }
           
            var n=a=t=0;
            
           
            var numReg = /\d/;
            var azReg = /[a-z]/i;
            var tsReg = /[^\da-z]/i;
            if(numReg.test(this.value)){
                n=1
            }
            if(azReg.test(this.value)){
                a=1
            }
            if(tsReg.test(this.value)){
                t=1
            }
    
            switch(n+a+t){
                case 1:
                lower.style.border ="1px solid red";break;
                case 2:
                middle.style.border ="1px solid red";break;
                case 3:
                high.style.border ="1px solid red";break;
            }
            p = true;
    
            if(opass2.value == "") return;
            if(this.value == opass2.value){
                opass2.parentNode.nextElementSibling.innerHTML = "一致";
                p2 = true;
            }else{
                opass2.parentNode.nextElementSibling.innerHTML = "不一致";
                p2 = false;
            }
        }
    
        opass2.oninput = function(){
            if(this.value == opass.value){
                this.parentNode.nextElementSibling.innerHTML = "一致";
                p2 = true;
            }else{
                this.parentNode.nextElementSibling.innerHTML = "不一致";
                p2 = false;
            }
        }
    
 
    
})();