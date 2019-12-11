;(function(){
    		
		
    class Index{
        constructor(){
            this.tleft = document.querySelector(".t-left");
            this.welcome = document.querySelector(".welcome");
            this.user = document.getElementById("namexx");
            this.exit = document.getElementById("exit");
            
            this.getMsg();
            this.addEvent()
        }
        addEvent(){
            var that = this;
            this.exit.onclick = function(){
                that.msg[that.i].onoff = "0";
                setCookie("userMsg",JSON.stringify(that.msg));
                location.reload();
            }
        }
        getMsg(){
            this.msg = getCookie("userMsg") ? JSON.parse(getCookie("userMsg")) : [];
            
            this.i = null; 
            var type = this.msg.some((val,idx)=>{
                this.i = idx;
                return val.onoff === 1;
            })
            
            if(type){
                this.tleft.style.display = "none";
                this.welcome.style.display = "block";
                this.user.innerHTML = this.msg[this.i].user;
            }
        }
    }
    
    new Index;
})();