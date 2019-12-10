import debounce from './utils'

export var itemListenerMixin = {
    data() {
        return {
            itemImgListener:null,
            newRefresh:null
        }
    },
    mounted() {
        this.newRefresh=debounce(this.$refs.scroll.refresh,100)
        this.itemImgListener=()=>{
            this.newRefresh()
        }
        this.$bus.$on('goodsListImgLoad',this.itemImgListener)
        console.log('mixin');
        
    },
}