var index=Vue.component('index',{
    template:`<div>这是index页面</div>`
})
var js=Vue.component('js',{
    template:`<div>这是js页面</div>`
})
var css=Vue.component('css',{
    template:`<div>这是css页面</div>`
})
var php=Vue.component('php',{
    template:`<div>
        <div>这是php页面</div>
        <ol>
        <router-link :to="item.url" v-for="(item,key) in phpData" tag="li" :key="key">{{item.title}}</router-link>
        </ol>
        <router-view></router-view>
</div>`,
    data(){
       return{
           phpData:[
               {title:'smarty',url:'php'},
               {title:'thinkphp',url:'thinkphp'},
               {title:'mvc',url:'mvc'}
           ]
       }
    }
})

var smarty=Vue.component('smarty',{
    template:`<div>这是smarty页面</div>`
})

var thinkphp=Vue.component('thinkphp',{
    template:`<div>这是thinkphp页面</div>`
})
var mvc=Vue.component('mvc',{
    template:`<div>这是mvc页面</div>`
})