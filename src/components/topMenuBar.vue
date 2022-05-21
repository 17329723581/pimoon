<template>
    <div>
        <!-- App bars（应用栏）-->
        <v-app-bar height="80" color="rgba(15, 11, 52, 0)" class="h-menu" elevation="2">
            <div class="topMenuBar-container">
                <div class="topMenuBar-container-width">
                    <!-- LOGO -->
                    <a @click="$router.push('/')">
                        <v-img  contain max-height="42" max-width="154" src="@/assets/logo.svg"></v-img>
                    </a>
                    <v-spacer></v-spacer>
                    <div class="tab-menu">
                        <!-- Tabs（选项卡）-->
                        <div class="tab">
                            <a @click="$router.push('/')">
                                <span>{{$t('topMneBar.home')}}</span>
                                <div class="line"></div>
                            </a>
                            <a @click="$router.push('/presale')">
                                <span>{{$t('topMneBar.presale')}}</span>
                                <div class="line"></div>
                            </a>
                            <a @click="$router.push('/airdrop')">
                                <span>{{$t('topMneBar.airdrop')}}</span>
                                <div class="line"></div>
                            </a>
                        </div>
                        <!-- 语言按钮 -->
                        <v-menu offset-y>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn v-bind="attrs" v-on="on" class="locale">
                                    <div v-for="(item, index) in localeData" :key="index" :value="index" >
                                        <span v-if="item[0] == locale">
                                            {{item[1]}}
                                        </span>
                                    </div>
                                </v-btn>
                            </template>
                            <v-list>
                                <v-list-item v-for="(item, index) in localeData" :key="index">
                                    <v-list-item-title @click="localeClick(item[0])">{{ item[1]}}</v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                        <!-- 菜单栏点击弹框 -->
                        <v-img max-height="30" max-width="30" class="menuClick" src="@/assets/more.svg" @click="menuStatus=true"></v-img>
                    </div>
                </div>
            </div>
        </v-app-bar>
        <!-- 菜单栏弹框组件 -->
        <v-overlay v-model="menuStatus" @click:outside="menuOutside">
            <div class="menu-overlay" :style="overlayStyle">
                <div class="close" @click="menuStatus=false">
                    <v-img  max-height="24" max-width="24" class="menuClick" src="@/assets/close.svg" @click="menuStatus=true"></v-img>
                </div>
                <div class="line"></div>
                <div class="title" @click="mobileOutside('/')">
                    {{$t('topMneBar.home')}}
                </div>
                <div class="line"></div>
                <div class="title" @click="mobileOutside('/presale')">
                    {{$t('topMneBar.presale')}}
                </div>
                <div class="line"></div>
                <div class="title" @click="mobileOutside('/airdrop')">
                    {{$t('topMneBar.airdrop')}}
                </div>
                <div class="line"></div>
                <div class="locale-menu">
                    <!-- 语言按钮 -->
                    <v-menu :offset-y="true" top>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn v-bind="attrs" v-on="on" class="locale">
                                <div v-for="(item, index) in localeData" :key="index" :value="index" >
                                    <span v-if="item[0] == locale">
                                        {{item[1]}}
                                    </span>
                                </div>
                            </v-btn>
                        </template>
                        <v-list>
                            <v-list-item v-for="(item, index) in localeData" :key="index">
                                <v-list-item-title @click="localeClick(item[0])">{{ item[1]}}</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </div>
            </div>
        </v-overlay>
    </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
export default {
    name:"topMenuBar",
    data() {
        return {
            //语言
            localeData:[{
                0 : "en",
                1 : "English"
            },
            {
                0 : "zhHans",
                1 : "中文"
            }],
            // 菜单弹框状态
            menuStatus:false,
            windowWidth: document.documentElement.clientWidth,  //实时屏幕宽度
            windowHeight: document.documentElement.clientHeight,   //实时屏幕高度
            topMenuBarStyle:"",
            overlayStyle:""
        };
    },
    props: {},
    computed: {
        ...mapState(["locale"]),
    },
    watch: {
    },
    components: {},
    created() {
        var windowWidth = document.documentElement.clientWidth;  //实时屏幕宽度
        var windowHeight = document.documentElement.clientHeight;
        this.overlayStyle = 'width:'+windowWidth+'px;height:'+windowHeight+'px'   //实时屏幕高度
    },
    mounted() {
        this.$nextTick(()=>{
            window.onresize = () => {
                return (() => {
                    setTimeout(()=>{
                        var m = this.isMobile();
                        var windowWidth = document.documentElement.clientWidth;  //实时屏幕宽度
                        var windowHeight = document.documentElement.clientHeight;   //实时屏幕高度
                        this.overlayStyle = 'width:'+windowWidth+'px;height:'+windowHeight+'px'
                    },100)
                })();
            };
        })
    },
    methods: {
        ...mapMutations(["setLocale"]),
        // 语言点击事件
        localeClick(value){
            this.$store.commit("setLocale", value);
            this.$i18n.locale = value;
        },
        // 模拟外部点击事件
        menuOutside(){
            var _this = this;
            this.menuStatus = true;
        },
        // 添加判断方法
        isMobile() {
            let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
            return flag;
        },
        // 模拟手机内部点击
        mobileOutside(e){
            if(e!=this.$route.path){
                this.$router.push(e)
            }else{
                this.menuStatus = false;
            }
        }
    },
};
</script>
<style scoped lang="less">
// 顶部菜单容器
.topMenuBar-container{
    align-items: center;
    display: flex;
    flex: 0 0 auto;
    position: relative;
    transition: inherit;
    width: 100%;
    justify-content: center;
    align-items: center;
    // 顶部菜单容器限制宽度
    .topMenuBar-container-width{
        width: 100%;
        max-width: 1920px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
// 应用栏
.v-app-bar{
    color: #fff;
    border-bottom: 1px solid rgba(160, 71, 236, 0.3);
    box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);
    backdrop-filter: blur(10px);
    .tab-menu{
        display: flex;
        grid-gap: 20px;
        align-items: center;
    }
    // TAB选择项
    .tab{
        height: 81px;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-gap: 20px;
        align-items: center;
        justify-content: center;
        position: relative;
        a{
            width: 100%;
            height: 80px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: AlibabaPuHuiTi-2-55-Regular;
            color: rgba(255, 255, 255, 0.6);
            transition: 0.3s;
            -webkit-transition: 0.3s;
            -moz-transition: 0.3s;
            -ms-transition: 0.3s;
            -o-transition: 0.3s;
        }
        a:active{
            color: #fff;
        }
        a:hover{
            color: #fff;
            transition: 0.3s;
            -webkit-transition: 0.3s;
            -moz-transition: 0.3s;
            -ms-transition: 0.3s;
            -o-transition: 0.3s;
            .line{
                border-bottom: 2px solid #B24BF6;
                width: 44px;
                position: absolute;
                bottom: 0;
                transition: 0.3s;
                -webkit-transition: 0.3s;
                -moz-transition: 0.3s;
                -ms-transition: 0.3s;
                -o-transition: 0.3s;
            }
        }
    }
    // 语言按钮
    .theme--light.v-btn.v-btn--has-bg {
        background-color: rgba(255,255,255,0);
    }
    .locale{
        width: 134px;
        color: #814BF6;
        border-radius: 4px 4px 4px 4px;
        border: 1px solid #814BF6;
        font-family: AlibabaPuHuiTi-2-55-Regular;
    }
    // 菜单栏点击弹框
    .menuClick{
        display: none;
    }
}
.h-menu{
    position: fixed;
    z-index: 5;
}
// 菜单栏工具
.v-toolbar{
    align-items: center;
}
//菜单栏弹框组件
.menu-overlay{
    background: rgba(129, 75, 246, 0.1);
    box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);
    border-radius: 0px 0px 0px 0px;
    backdrop-filter: blur(30px);
}
// 小型号到大型号的手机
@media screen and (max-width:600px){
    // 应用栏
    .v-app-bar{
        // TAB选择项
        .tab{
            display: none;
        }
        // 语言按钮
        .locale{
            display: none;
        }
        // 菜单栏点击弹框
        .menuClick{
            display: block;
        }
    }
    //菜单栏弹框组件
    .menu-overlay{
        color: #fff;
        padding-left: 16px;
        padding-right: 16px;
        padding-top: 16px;
        padding-bottom: 16px;
        position: relative;
        .close{
            height: 42px;
            display: flex;
            align-items: center;
            margin-bottom: 20px;
        }
        .line{
            width: 100%;
            height: 2px;
            background: #814BF6;
        }
        .title{
            padding-top: 20px;
            padding-bottom: 20px;
            font-size: 30px;
            color: #FFFFFF;
            font-family:AlibabaPuHuiTi-2-95-ExtraBold;
        }
        .locale-menu{
            width: 100%;
            display: flex;
            justify-content: center;
            position: flex;
            bottom: 0;
            .locale{
                width: 90%;
                position: absolute;
                bottom: 30px;
                height: 44px;
                background: #814BF6;
                font-size: 30px;
                color: #FFFFFF;
                display: flex;
                align-items: center;
            }
        }
    }
}
// 小型号到中型号的平板
@media screen and (min-width:600px) and (max-width:960px){
    // 菜单栏
    .v-app-bar{
        padding-left: 58px;
        padding-right: 58px;
        // TAB选择项
        .tab{
            display: none;
        }
        // 语言按钮
        .locale{
            display: none;
        }
        // 菜单栏点击弹框
        .menuClick{
            display: block;
        }
    }
    //菜单栏弹框组件
    .menu-overlay{
        color: #fff;
        padding-left: 16px;
        padding-right: 16px;
        padding-top: 16px;
        padding-bottom: 16px;
        position: relative;
        .close{
            height: 42px;
            display: flex;
            align-items: center;
            margin-bottom: 20px;
        }
        .line{
            width: 100%;
            height: 2px;
            background: #814BF6;
        }
        .title{
            padding-top: 20px;
            padding-bottom: 20px;
            font-size: 30px;
            color: #FFFFFF;
            font-family:AlibabaPuHuiTi-2-95-ExtraBold;
        }
        .locale-menu{
            width: 100%;
            display: flex;
            justify-content: center;
            position: flex;
            bottom: 0;
            .locale{
                width: 90%;
                position: absolute;
                bottom: 30px;
                height: 44px;
                background: #814BF6;
                font-size: 30px;
                color: #FFFFFF;
                display: flex;
                align-items: center;
            }
        }
    }
}
// 小型号到中型号的平板
@media screen and (min-width:960px) and (max-width:1264px){
    // 菜单栏
    .v-app-bar{
        padding-left: 58px;
        padding-right: 58px;
    }
}
// 桌面端
@media screen and (min-width:1264px) and (max-width:1904px){
    // 菜单栏
    .v-app-bar{
        padding-left: 58px;
        padding-right: 58px;
    }
}
// 4K 和超宽屏幕
@media screen and (min-width:1904px){
    // 菜单栏
    .v-app-bar{
        padding-left: 58px;
        padding-right: 58px;
    }
}
</style>