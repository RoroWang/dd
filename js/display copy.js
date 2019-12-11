;(function(){
    
    class List{
        constructor(){
            
            this.url3 = "http://localhost:86/json/list.json";
            this.cont3 = document.querySelector(".goodsul");

            this.load();
            this.addEvent();
        }
        load(){
            var that = this;
            ajaxGet(this.url3,function(res){
                that.res = JSON.parse(res);
                that.display3();
                
            });
        }
        
        display3(){
            var str = "";
            for(var i=0;i<this.res.length;i++){
                str += `
                <li index="${this.res[i].id}">
                        <div class="mod-box">
                            <div class="mod-img">
                                <a><img src="${this.res[i].url}" title="${this.res[i].name}" alt="${this.res[i].name}"/></a>
                            </div>
                            
                            <div class="mod-name">
                            <a href="#" title="${this.res[i].name}" target="_blank">${this.res[i].name}</a>
                            </div>
                            <div class="mod-price">
                            <div style="float:left;">
                                <font style="font-size:17px;font-weight:normal;margin-right:-8px;">￥</font>
                                <font style="font-size:24px;font-family:arial;">
                                ${this.res[i].price}                         </font>
                            </div>
                                        <p class="btn">加入购物车</p>
                            
                            </div>
                        </div>
                        </li>
                    `;
            }
            this.cont3.innerHTML = str;

        }
        addEvent(){
            
            var that = this;

            this.cont3.addEventListener("click",function(eve){
                var e = eve || window.event;
                var target = e.target || e.srcElement;
                if(target.className == "btn"){
                    that.id = target.parentNode.parentNode.parentNode.getAttribute("index");              
                    that.setCookie();
                }
                if(target.className == "aimg" || target.className == "title" || target.className == "bimg"){
                    location.href = "../html/detial.html";
                }
            })
        }
        setCookie(){
            this.goods = getCookie("goodsCookie") ? JSON.parse(getCookie("goodsCookie")) : [];
            if(this.goods.length<1){
                this.goods.push({
                    id:this.id,
                    num:1
                })
            }else{
                var onoff = true;
                for(var i=0;i<this.goods.length;i++){
                    if(this.goods[i].id == this.id){
                        this.goods[i].num++;
                        onoff = false;
                    }
                }
                if(onoff){
                    this.goods.push({
                        id:this.id,
                        num:1
                    })
                }
            }
            setCookie("goodsCookie",JSON.stringify(this.goods));
        }
    }
    new List();

})();