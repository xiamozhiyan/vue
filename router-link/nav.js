Vue.component('custom-nav',{
    template:`
    <ul class="custom-nav">
    <router-link to="/" tag="li" exact><span>首页</span></router-link>
    <router-link :to="item.title" v-for="(item,key) in menuData" tag="li" :key="key"><span>{{item.title}}</span></router-link>
</ul>
    `,
    data(){
       return{
           menuData:[
               {title:'js'},
               {title:'css'},
               {title:'php'},
           ]
       }
    }
})