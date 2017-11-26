//练习一（实现点击内容变化，颜色变化）
Vue.component('custom-box' ,{
    props:['name'],
    data:function(){
        return {
            myname:this.name,
            red:false,
            flag:true
        }
    },
    template:"<div class='btn' @click='show(flag)' :class='{red:red}'>{{this.myname}}</div>",
    methods:{
        show(flag){
            if(flag){
                this.myname='提交';
                this.red=true;
                this.flag=false;
            }else{
                this.myname='上传';
                this.red=false;
                this.flag=true;
            }
        }
    }
})
//练习二（实现子组件对父组件内容的改变）
Vue.component('custom-search',{
    props:{
        listData:{
            default:function () {
                return [];
            }
        }
    },
    data(){
      return{
          val:''
      }
    },
    template:`<div class="custom-search">
        <input type="text" v-model="val">
        <list :listData="listData"  @aa="bb"></list>
</div>`,
    methods:{
        bb(val){
            this.val=val;
        }
    }
})
Vue.component('list',{
    props:{
        listData:{
            default:function () {
                return [];
            }
        }
    },
    template:`<ul>
        <li v-for="item in listData" @click="back(item)">~~{{item}}</li>
    </ul>`,
    methods:{
        back(val){
            this.$emit('aa',val);
        }
    }
})
//练习3（实现下拉类标的无限极查询）
Vue.component('custom-menu',{
    props:['menuData'],
    template:`
    <div class="custom-menu">
        <menu-list :menuData="menuData"></menu-list>
    </div>
    `,
})
Vue.component('menu-list',{
    props:['menuData'],
    template:`
    <ul>
        <li v-for="item in menuData" @click.stop="show(item)">
            {{item.title}}
            <transition name="bounce">
            <menu-list v-if="item.child" v-show="item.flag" :menuData="item.child"></menu-list>
            </transition>
        </li>
    </ul>
    `,
    methods:{
        show(item){
            item.flag=!item.flag;
        }
    }
})