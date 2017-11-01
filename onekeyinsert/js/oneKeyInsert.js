/**
 * Created by Administrator on 2017/10/31.
 */
new Vue({
    el:'.oneKeyBox',
    data:{
        memoLabelList : [],
        text : "",
        pos : 0,
    },
    mounted:function(){
        this.$nextTick(function(){
            this.getLabelData();
        });
    },
    watch:{
        text:{
            handler:function(val,oldVal){
                var _this = this;
                this.memoLabelList.forEach(function(item,index){
                    if(typeof(item.checked) == 'undefined'){
                        if(val.indexOf(item.name) == -1){
                            _this.$set(item,'checked',false);
                        }else{
                            _this.$set(item,'checked',true);
                        }
                    }else{
                        if(val.indexOf(item.name) == -1){
                            item.checked = false;
                        }else{
                            item.checked = true;
                        }
                    }
                });
            },
            deep:true
        }
    },
    methods:{
        getLabelData: function(){
            var _this = this;
            //this.$http.get('/IN/info/memoLabel').then(function(res){//原来是从网上获取数据的
            this.$http.get('data/tsconfig.json').then(function(res){
                if(res.body.errorCode == 0){
                    _this.memoLabelList = res.body.result;
                }else{
                    alert(res.body.message);
                }

            });
        },
        init:function(){
            var _this = this;
            this.memoLabelList.forEach(function(item,index){
                if(typeof(item.checked) == 'undefined'){
                    if(_this.text.indexOf(item.name) == -1){
                        _this.$set(item,'checked',false);
                    }else{
                        _this.$set(item,'checked',true);
                    }
                }else{
                    if(_this.text.indexOf(item.name) == -1){
                        item.checked = false;
                    }else{
                        item.checked = true;
                    }
                }
            });
        },
        addLabel: function(item,index){
            if(typeof(item.checked) == 'undefined'){
                this.$set(item,'checked',true);
                if(this.text.lenght<this.pos){//在指定位置插入标签
                    this.text = this.text+item.name;
                }else{
                    this.text = this.text.substring(0,this.pos)+item.name+this.text.substring(this.pos,this.text.length);
                }
            }else{
                item.checked = !item.checked;
                if(item.checked){
                    if(this.text.lenght<this.pos){//在指定位置插入标签
                        this.text = this.text+item.name;
                    }else{
                        this.text = this.text.substring(0,this.pos)+item.name+this.text.substring(this.pos,this.text.length);
                    }
                }else{
                    if(this.text.indexOf(item.name) != -1){
                        this.text = this.text.replace(item.name,"");
                    };
                }
            }
            this.pos = this.text.length;
        },
        show: function () {
            //this.init();
            this.getPosition();
        },
        getPosition: function(){
            if(document.getElementById('remark').selectionStart !='undefined'){ //IE以外
                this.pos = document.getElementById('remark').selectionStart;
            }else{ //IE
                var rng;
                if(document.getElementById('remark').tagName == "textarea" || document.getElementById('remark').tagName =="TEXTAREA"){ //TEXTAREA
                    rng = event.srcElement.createTextRange();
                    rng.moveToPoint(event.x,event.y);
                }else{ //Text
                    rng = document.selection.createRange();
                }
                rng.moveStart("character",-event.srcElement.value.length);
                this.pos = rng.text.length;
            }
        }

    }
});