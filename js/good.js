    class Page{
        constructor(options){
            this.url = options.url;
            this.left = options.left;
            this.right = options.right;
			this.list = options.list;
			this.pageCont = options.pageCont;
			this.index = options.index || 0;
            this.num = options.num || 5;
            this.load();
            this.addEvent();
        }
        load(){
            var that = this;
            ajaxGet(this.url,function(res){
                that.res = JSON.parse(res);
                that.display();
                that.creatPage();
            })
        }
        display(){
            var str = "";
            for(var i=this.index*this.num;i<(this.index+1)*this.num;i++){
                if(i<this.res.length){
                    str +=`<li>
                                <img src="${this.res[i].url}" alt="" class="img">        
                                <h2>商品名称:<span>${this.res[i].name}</span></h2>
                                <h2>商品介绍:<span>${this.res[i].tip}</span></h2>
                                <h2>商品价格:<span>${this.res[i].price}</span></h2>
                            </li>`;
                }
            }
            this.list.innerHTML = str;
        }
        creatPage(){
            this.maxNum = Math.ceil(this.res.length / this.num);
            var str = "";
            for(var i=0;i<this.maxNum;i++){
                str += `<li>${i+1}</li>`; 
            }
            this.pageCont.innerHTML = str;
            this.setActive();
        }
        setActive(){
            for(var i=0;i<this.pageCont.children.length;i++){
                this.pageCont.children[i].className = "";
            }
            this.pageCont.children[this.index].className = "active";
        }
        addEvent(){
            var that = this;
            this.right.onclick = function(){
                that.changeIndexR();
            }
            this.left.onclick = function(){
                that.changeIndexL();
            }
        }
        changeIndexL(){
            if(this.index == 0){
                this.index = this.maxNum-1;
            }else{
                this.index--;
            }
            this.setActive();
            this.display();
        }
        changeIndexR(){
            if(this.index == this.maxNum-1){
                this.index = 0;
            }else{
                this.index ++;
            }
            this.setActive();
            this.display();
        }
    }
    new Page({
        url:"http://localhost/lianxi/page/goods.json",
        left:document.getElementById("btnL"),
        right:document.getElementById("btnR"),
        list:document.getElementById("list"),
        pageCont:document.getElementById("pageWarp").querySelector("ul"),
        index:0,
        num:5
    })
