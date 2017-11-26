//layer组件，父组件
Vue.component("layer",{
    props:["width","menuData"],
    template:`<div class="layer">
                    <div class="left" :style="leftw">
                         <custom-menu :menu-data="menuData"></custom-menu>
                    </div>
                    <div class="right" :style="rightw">
                        <!-- 路由出口 -->
                        <!-- 路由匹配到的组件将渲染在这里 -->
                        <transition name="bounce">
                        <router-view></router-view>
                        </transition>
                    </div>
              </div>`,
    computed:{
        //实现左右宽度的动态
        leftw(){
            return {width:this.width.left}
        },
        rightw(){
            return {width:this.width.right}
        }
    },
})

//左边的子组件
Vue.component("custom-menu",{
    props:["menuData"],
    template:`
        <div class="custom-menu">
            <son :menu-data="menuData" :margin="0"></son>
        </div>
`
})
//列表的无限极查询
Vue.component("son",{
    props:["menuData","margin"],
    data(){
        //设置一个属性，marginNum动态的设置ul，li的marginLeft
        return {
            marginNum:this.margin+20
        }
    },
    template:`<ul :style="{marginLeft:marginNum+'px'}">
                    <li style="margin-left: -20px" class="cate">分类</li>
                     <li v-for="item in menuData" @click.stop="show(item)">
                         <!-- 使用 router-link 组件来导航. -->
                        <!-- 通过传入 \`to\` 属性指定链接. -->
                        <!-- <router-link> 默认会被渲染成一个 <a>标签 -->
                         <router-link :to="item.url">{{item.title}}</router-link>
                         <son v-if="item.child" v-show="item.flag" :menu-data="item.child" :margin="marginNum"></son>
                     </li>
                  
            </ul>`,
    methods:{
        show(item){
            item.flag=!item.flag;
        }
    }
})

var con=Vue.component("router-view",{
    template:"<div class='router-view'><h2>前端和后台的区别</h2><span>1、前端：以用户为中心，主要是和用户的交互，操作文件少，只是html、css、js三个文件的使用，只为呈现不同的用户视觉感受和基本操作，目标单一，变化不大，呈现的页面也只是静态 的页面<br>" +
    "<br>" +
    "2、后台：以机器为中心，主要为用户服务，记录用户的状态，后台主要是数据的存储与数据的传递，连接数据库，让机器实现用户的逻辑思想，带来更高的体验性，主要是要求拥有较高的逻辑思维与流程思考能力，也就是需要有全栈的能力。<br>" +
    "<br>" +
    "3、在一定程度上可以说前端是运行在后台基础上的，有了后台前端才有了意义，有了前端后台才能给用户带来更好的视觉体验与基本操作能力，两者密不可分，缺一不可。<br></span></div>"
})
var con1=Vue.component("router-view",{
    data(){
        return {
            content:[],
        }
    },
    //导航完成后获取数据
    created(){
        // $route.params.id 获取数据
        var id=this.$route.params.id;
        var that=this;
        fetch("/fetch/"+id).then(function(e){
            return e.json()
        }).then(function(e){
            console.log(e);
            that.content=e;
        })

    },
    //在导航完成前获取数据
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    beforeRouteUpdate(to,from,next){
        // to即将要进入的目标 路由对象
        // form当前导航正要离开的路由
        // next 实现组件的复用
        var id=to.path.slice(1);
        var that=this;
        fetch("/fetch/"+id).then(function(e){
            return e.json();
        }).then(function(e){
            that.content=e;
            next();
        })
    },
    template:`<ul>
               <li v-for="item in content">
                    <h2>{{item.ctitle}}</h2>
                    <span>{{item.con}}</span>
               </li>
            </ul>`
})