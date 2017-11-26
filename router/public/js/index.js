//每个路由应该映射一个组件。
const routes = [
    {"path":"/","component":con},
    {"path":"/:id","component":con1},
]
//创建 router 实例，然后传 `routes` 配置
const router = new VueRouter({
    //vue-router 默认 hash 模式 —— 使用 URL 的 hash 来模拟一个完整的 URL，于是当 URL 改变时，页面不会重新加载。
    // HTML5 History 模式 ,则是直接/id就可以实现页面的加载
    mode: 'history',
    routes // （缩写）相当于 routes: routes
})

new Vue({
    el:"#root",
    data:{
        menuData:[]
    },
    //使用路由，实例化是必须添加router参数
    router:router,
    created(){
        var that=this;
        //相当于ajax，读取数据
        fetch("/fetch").then(function (e) {
            return e.json();
        }).then(function(e){
            var arr=e.map(function(a){
                var obj={};
                obj.title=a.cname;
                obj.flag=true;
                obj.url=a.cid.toString();
                return obj;
            })
            that.menuData=arr;
        })
    }
})