;(function(){
    class Car{
        constructor(){
            this.url = "http://localhost:86/json/goods.json";
            this.url2 = "http://localhost:86/json/goods2.json";
            this.url3 = "http://localhost:86/json/list.json";
            this.tbody = document.querySelector(".tbody1");
            this.checkAll = document.querySelector("#chkAll");

            this.smoney=document.querySelector(".xiaoji");
            this.num = 0;
            this.smon=0;

            this.load();
            this.addEvent();
        }
        load(){
            ajaxGet(this.url,(res)=>{
                this.res = JSON.parse(res);

                this.getCookie();
            });
            ajaxGet(this.url2,(res)=>{
                this.res = JSON.parse(res);

                this.getCookie();
            });
            ajaxGet(this.url3,(res)=>{
                this.res = JSON.parse(res);

                this.getCookie();
            });
        }
        getCookie(){
            this.goods = getCookie("goodsCookie")? JSON.parse(getCookie("goodsCookie")):[];

            this.display2();
            // this.display();
        }
        display2(){

            var str = "";
            for(var i=0;i<this.res.length;i++){
                for(var j=0;j<this.goods.length;j++){
                    
                    if(this.res[i].id == this.goods[j].id){
                        if(this.goods[j].check == 1){
                            this.check = "checked";
                            this.smon += this.goods[j].num*parseInt(this.res[i].price);
                        }else{
                            this.check = "";
                        }
                        var sub=parseInt(this.res[i].price)*this.goods[j].num
                        str += `<tr index="${this.res[i].id}">
                            <td style="width:100%;;border-left:1px solid #eee;border-right:1px solid #eee;">
                                <table cellpadding="5" cellspacing="1" border="0" width="100%" style="border:1px solid #eee;">
                                    <tbody>
                                        <tr> 
                                            <td align="center" width="5%">
                                                <input type="checkbox" class="check" ${this.check}>
                                            </td>
                                            <td align="center" width="40%">
                               
                                                <div class="thumb_name">
                                                    <dl>
                                                        <dt> <a href="product-23001.html" target="_blank"><img src="${this.res[i].url}" border="0" title="${this.res[i].name}"></a> </dt>
                                                        <dd> <a href="product-23001.html" target="_blank" class="f6">${this.res[i].name}</a>
                                                        <br>
                                                        <font class="attrname"></font> 
                                                        </dd>
                                                    </dl>
                                                </div>
                                            </td>
                                            <td align="center" width="15%">￥<font class="cart_jmprice" id="goods_price_6686547" style="color:#333;font-weight:normal;">${this.res[i].price}</font></td>
                                            <td align="center" width="15%">
                                                <div class="jm_cartnum"> 
                                                    <input type="number" value="${this.goods[j].num}" min=1 size="4" class="jminputBg">
                                                </div>
                                            </td>
             
                                            <td align="center" width="15%">￥<font class="cart_jmprice" id="subtotal_6686547" style="color:#333;font-weight:bold;">${sub}</font></td>
                                            <td class="delete" width="10%"style="cursor:pointer;">删除</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>`;
                    }
                }
            }
            this.smoney.innerHTML = this.smon;
            this.smon=0;
            this.tbody.innerHTML = str;
        }
        
        addEvent(){
            var that = this;
            
            this.tbody.addEventListener("click",function(eve){
                var e = eve || window.event;
                var target = e.target || e.srcElement;
                if(target.className == "delete"){
                    that.id = target.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute("index");
                    target.parentNode.parentNode.parentNode.parentNode.parentNode.remove();
                    that.changeCookie(function(i){
                        that.goods.splice(i,1);
                    });
                }
                
                if(target.className == "check"){
                    that.id = target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute("index");
                    
                    that.bcheck(target);
                }
            })
            this.tbody.addEventListener("input",function(eve){
                var e = eve || window.event;
                var target = e.target || e.srcElement;
                if(target.className == "jminputBg"){
                    that.id = target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute("index");
                    
                    target.parentNode.parentNode.nextElementSibling.children[0].innerHTML=
                    target.value*target.parentNode.parentNode.previousElementSibling.children[0].innerHTML;
                    that.changeCookie(function(i){
                        that.goods[i].num = target.value;
                    });
                }
            })
            this.checkAll.onclick = function(){
                var acheck = document.querySelectorAll(".check");
                for(var i=0;i<acheck.length;i++){
                    if(this.checked == true){
                        
                        acheck[i].checked = true;
                        that.goods[i].check = 1;
                    }else{
                        acheck[i].checked = false;
                        that.goods[i].check = 0;
                    }
                }
                setCookie("goodsCookie",JSON.stringify(that.goods));
            }
           
        }
        changeCookie(cb){
            
            for(var i=0;i<this.goods.length;i++){
                if(this.id == this.goods[i].id){                 
                    cb(i);
                    break;
                }
            }
            setCookie("goodsCookie",JSON.stringify(this.goods));
        }
        bcheck(b){
            for(var i=0;i<this.goods.length;i++){               
                if(this.goods[i].id == this.id){                
                    if(this.goods[i].check == 1){
                        this.goods[i].check = 0;
                        b.checked = false;
                        
                    }else{
                        this.goods[i].check = 1;
                        b.checked = true;
                    }
                }
            }

            this.checkbox();
            setCookie("goodsCookie",JSON.stringify(this.goods));
            this.display2();    
        }
        checkbox(){
            var that = this;
            var a = this.goods.every(function(val,idx){
                if(that.goods[idx].check != 1){
                    return false;
                }else{
                    return true;
                }
            })
            if(a){
                this.checkAll.checked = true;
            }else{
                this.checkAll.checked = false;
            }
        }
       
    }
    new Car;
})();