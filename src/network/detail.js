import {request} from './request'

export function getDetail(iid){
    return request({
        url:'/detail',
        params:{
            iid
        }
    })
}

export class Goods{
    constructor(itemInfo,columns,services){
        this.title=itemInfo.title
        this.desc=itemInfo.desc
        this.newPrice=itemInfo.price
        this.oldPrice=itemInfo.oldPrice
        this.discount=itemInfo.discountDesc
        this.realPrice=itemInfo.lowNowPrice
        this.columns=columns
        this.services=services
    }
}

export class Shop{
    constructor(shopInfo){
        this.name=shopInfo.name
        this.shopLogo=shopInfo.shopLogo
        this.score=shopInfo.score
        this.cSells=shopInfo.cSells
        this.cGoods=shopInfo.cGoods
    }
}

export function getRecomment(){
    return request({
        url:'/recommend'
    })
}