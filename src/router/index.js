import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

//重写路由
const routerPush=VueRouter.prototype.push
VueRouter.prototype.push=function push(location){
    return routerPush.call(this,location).catch(error=>error)
}

const router=new VueRouter({
    routes:[
        {
            path:'',
            redirect:'/home'
        },
        {
            path:'/home',
            component:()=>import('views/home/Home')
        },
        {
            path:'/category',
            component:()=>import('views/category/Category')
        },
        {
            path:'/cart',
            component:()=>import('views/cart/Cart')
        },
        {
            path:'/profile',
            component:()=>import('views/profile/Profile')
        },
        {
            path:'/detail/:iid',
            component:()=>import('views/detail/Detail')
        }
    ],
    mode:'history'
})
export default router