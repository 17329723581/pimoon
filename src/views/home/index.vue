<template>
    <div class="body">
        <!-- 容器 -->
        <v-app class="app-container">
            <!-- 警告状态提示框 -->
            <alert :status="alert.status" :text="alert.text" :type="alert.type"></alert>
            <!-- 顶部菜单栏 -->
            <topMenuBar></topMenuBar>
            <v-main>
                <!-- PIMOON布局容器main -->
                <div class="pimoon-container-main">
                    <!-- PIMOON布局容器 -->
                    <v-container class="pimoon-container">
                        <div class="m-left">
                            <v-img class="v-img"  src="@/assets/home-logo.png"></v-img>
                        </div>
                        <div class="left">
                            <div class="title">
                                <span>{{$t("home.title")}}</span>
                            </div>
                            <div class="text">
                                <span>{{$t("home.text")}}</span>
                            </div>
                            <div class="explain">
                                <span>{{$t("home.explain")}}</span>
                            </div>
                            <div class="pimoon-btm">
                                <v-btn :href="$t('home.pimoon_btm.whitepaper.url')" target="_blank" class="pimoon-btm-left">{{$t("home.pimoon_btm.whitepaper.title")}}</v-btn>
                                <v-btn :href="$t('home.pimoon_btm.certik.url')" target="_blank" class="pimoon-btm-right">{{$t('home.pimoon_btm.certik.title')}}</v-btn>
                                <v-btn v-if="!address" class="connect" @click="connect">{{$t('public.connect_wallet')}}</v-btn>
                                <v-btn v-else class="connect" @click="disconnect">{{$t("public.disconnect")}}</v-btn>
                            </div>
                        </div>
                        <div class="right">
                            <div class="right-img">
                                <v-img class="v-img" src="@/assets/home-logo.png"></v-img>
                            </div>
                        </div>
                    </v-container>
                </div>
                <!-- CAR布局容器main -->
                <div class="car-container-main">
                    <!-- CAR布局容器 -->
                    <v-container class="car-container">
                        <div class="car-s">
                            <div class="car">
                                <div class="car-fund"></div>
                                <div class="img">
                                    <v-img class="v-img"  src="@/assets/car-fund-security.svg"></v-img>
                                </div>
                                <div class="title">
                                    <span>{{$t("home.pimoon_car.fund.title")}}</span>
                                </div>
                                <div class="text">
                                    <span>{{$t("home.pimoon_car.fund.text")}}</span>
                                </div>
                                <div class="line"></div>
                            </div>
                        </div>
                        <div class="car-s">
                            <div class="car">
                                <div class="car-community-autonomy"></div>
                                <div class="img">
                                    <v-img class="v-img" src="@/assets/car-community-autonomy.svg"></v-img>
                                </div>
                                <div class="title">
                                    <span>{{$t("home.pimoon_car.community.title")}}</span>
                                </div>
                                <div class="text">
                                    <span>{{$t("home.pimoon_car.community.text")}}</span>
                                </div>
                                <div class="line"></div>
                            </div>
                        </div>
                        <div class="car-s">
                            <div class="car">
                                <div class="car-general-trend"></div>
                                <div class="img">
                                    <v-img class="v-img" src="@/assets/car-general-trend.svg"></v-img>
                                </div>
                                <div class="title">
                                    <span>{{$t("home.pimoon_car.general.title")}}</span>
                                </div>
                                <div class="text">
                                    <span>{{$t("home.pimoon_car.general.text")}}</span>
                                </div>
                                <div class="line"></div>
                            </div>
                        </div>
                    </v-container>
                </div>
            </v-main>
            <subjectMain></subjectMain>
            <!-- 加载弹框 -->
            <v-overlay :absolute="false" :value="loadingState" class="bind-the-popup">
                <v-progress-circular v-if="loadingState" indeterminate size="64"></v-progress-circular>
            </v-overlay>
        </v-app>
    </div>
</template>
<script>
// 引入页面
import topMenuBar from "@/components/topMenuBar.vue"
import subjectMain from "@/components/subjectMain.vue"
// 引入全局
import { mapState, mapMutations,mapActions } from "vuex";
// 引入we3js方法
import { abiObject, getAbi, web3 } from "utils/common";
const { contractObject: PerSaleObj } = getAbi(abiObject.PerSaleAbi);
// 引入警告提示组件
import alert from "@/components/alert.vue"
export default {
    components: {
        topMenuBar,
        subjectMain,
        alert
    },
    watch: {
        // 地址
        address: {
            handler(newVal, oldVal) {
				if (newVal !== "") {
					// 处理我的邀请方法到全局
					this.myInvites(newVal)
                    // 更新邀请分享链接到全局
					this.updateInvitationLink(newVal)
                    // 获取邀请人
					this.getInvited(newVal)
				}
			},
			immediate: true,
        },
    },
    computed:{
        ...mapState([
            "address",
        ])
    },
    data(){
        return {
            // 警告提示
            alert:{
                status:false,
                text:"",
                type:""
            },
            // 正在加载状态
            loadingState:false
        }
    },
    methods: {
        ...mapMutations(["editAddress", "updateIsInvited","updateInvitationLink","updateMyspacepi", "updateInviteList"]),
        ...mapActions(["getInvited", "myInvites"]),
        // 连接钱包
        connect() {
            ethereum.request({method: "eth_requestAccounts"}).then(async (accounts) => {
                // 添加用户地址到全局
				this.editAddress(accounts[0])
                // 获取邀请人
                const isInvited = await PerSaleObj.methods.isInvited(accounts[0]).call()
                // 更新邀请人方法到全局
                this.updateIsInvited(isInvited)
                // 获取邀请人存储到缓存
                sessionStorage.setItem("isInvited", JSON.stringify(isInvited))
                this.alert = {
                    status : true,
                    type:"success",
                    text:this.$t("alerts.connect_wallet_success")
                }
                this.loadingState = true;
                setTimeout(()=>{
                    this.alert = {
                        status: false,
                    }
                },1500)
                setTimeout(()=>{
                    this.loadingState = false;
                    window.location.reload();
                },2000);
            })
		},
        // 断开连接
        disconnect(){
            // 删除存储缓存
            sessionStorage.removeItem("accountAddress");
            sessionStorage.removeItem("isInvited");
            sessionStorage.removeItem("vuex");
            this.alert = {
                status : true,
                type:"success",
                text:this.$t("alerts.disconnect_success")
            }
            this.loadingState = true;
            setTimeout(()=>{
                this.alert = {
                    status: false,
                }
                this.$store.commit('editAddress',"")
            },1500);
            setTimeout(()=>{
                this.loadingState = false;
                window.location.reload();
            },2000);
        }
    }
};
</script>
<style scoped lang="less">
@import "@/styles/app";
// PIMOON布局容器main
.pimoon-container-main{
    background: #110C3F;
}
// PIMOON布局容器
.pimoon-container{
    display: grid;
    grid-template-columns: 1fr 1fr;
    height: 880px;
    max-width: 1300px;
    .m-left{
        display: none;
    }
    .left{
        align-self: center;
        text-align: left;
        .title{
            font-size:80px;
            line-height:80px;
            color: #814BF6;
            font-family: AlibabaPuHuiTi-2-105-Heavy;
            font-weight: normal;
        }
        .text{
            font-size: 70px;
            line-height: 80px;
            font-weight: normal;
            color: #54ACFC;
            font-family: AlibabaPuHuiTi-2-65-Medium;
        }
        .explain{
            margin-top: 8px;
            font-size: 16px;
            color: #FFFFFF;
            font-weight: normal;
            line-height: 30px;
            font-family: AlibabaPuHuiTi-2-65-Medium;
        }
        .pimoon-btm{
            margin-top: 53px;
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-gap: 11px;
            .v-btn{
                color: rgba(255, 255, 255, 0.6);
                border-radius: 4px;
                background:none;
                border: 1px solid #814BF6;
                width: 152px;
                height: 63px;
                font-family: AlibabaPuHuiTi-2-45-Light;
                font-size: 20px;
            }
            .connect{
                background: linear-gradient(82deg, #0FBFFF 0%, #814BF6 100%);
                width:300px;
                border: 0;
            }
        }
    }
    .right{
        position: relative;
        align-self: center;
        .right-img{
            display: grid;
            justify-items: center;
            .v-img{
                width: 450px;
                height: 450px;
            }
        }
    }
}
// CAR布局容器main
.car-container-main{
    color:#FFFFFF;
    margin-top: 100px;
}
// CAR布局容器
.car-container{
    max-width: 1300px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 80px;
    justify-content: center;
    align-items: center;
    position:relative;
    .car-s{
        position: relative;
        display: flex;
        height: 423px;
    }
    .car{
        width: 368px;
        height: 423px;
        background: rgba(56, 29, 98, 0.38);
        box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);
        border-radius: 8px;
        backdrop-filter: blur(10px);
        display: grid;
        grid-template-columns: 1fr;
        justify-content: center;
        place-items: center;
        @-webkit-keyframes fadeOut{
            0%{
                opacity: 0;
                -webkit-transform: translateY(-10px);
            }
            10%{
                opacity: 0.1;
                -webkit-transform: translateY(-9px);
            }
            20%{
                opacity: 0.2;
                -webkit-transform: translateY(-8px);
            }
            30%{
                opacity: 0.3;
                -webkit-transform: translateY(-7px);
            }
            40%{
                opacity: 0.4;
                -webkit-transform: translateY(-6px);
            }
            50%{
                opacity: 0.5;
                -webkit-transform: translateY(-5px);
            }
            60%{
                opacity: 0.6;
                -webkit-transform: translateY(-4px);
            }
            70%{
                opacity: 0.7;
                -webkit-transform: translateY(-3px);
            }
            80%{
                opacity: 0.8;
                -webkit-transform: translateY(-2px);
            }
            90%{
                opacity: 0.9;
                -webkit-transform: translateY(-1px);
            }
            100%{
                opacity: 1;
                -webkit-transform: translateY(0px);
            }
        }
        -webkit-transform: translateY(0px);
        -webkit-animation-name: fadeOut;
        -webkit-animation-duration:0.5s ;
        -webkit-animation-iteration-count:1 ;
        -webkit-animation-delay:0 ;
        .img{
            .v-img{
                width: 130px;
            }
        }
        .title{
            font-family: AlibabaPuHuiTi-2-85-Bold;
            font-size: 30px;
            color: #FFFFFF;
            line-height: 30px;
            margin-top:-60px;
        }
        .text{
            width: 312px;
            height: 120px;
            font-family: AlibabaPuHuiTi-2-45-Light;
            font-size: 22px;
            color: #FFFFFF;
            line-height: 30px;
            margin-top:-60px;
        }
        .line{
            width: 100%;
            height: 7px;
            background: linear-gradient(90deg, #54ACFC 0%, #814BF6 100%);
            box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);
            border-radius: 0px 0px 8px 8px;
            opacity: 1;
            position: absolute;
            bottom: 0;
            display: none;
        }
    }
    .car:hover{
        position: absolute;
        @-webkit-keyframes fadeIn{
            0%{
                opacity: 0;
                -webkit-transform: translateY(0px);
            }
            10%{
                opacity: 0.1;
                -webkit-transform: translateY(-1px);
            }
            20%{
                opacity: 0.2;
                -webkit-transform: translateY(-2px);
            }
            30%{
                opacity: 0.3;
                -webkit-transform: translateY(-3px);
            }
            40%{
                opacity: 0.4;
                -webkit-transform: translateY(-4px);
            }
            50%{
                opacity: 0.5;
                -webkit-transform: translateY(-5px);
            }
            60%{
                opacity: 0.6;
                -webkit-transform: translateY(-6px);
            }
            70%{
                opacity: 0.7;
                -webkit-transform: translateY(-7px);
            }
            80%{
                opacity: 0.8;
                -webkit-transform: translateY(-8px);
            }
            90%{
                opacity: 0.9;
                -webkit-transform: translateY(-9px);
            }
            100%{
                opacity: 1;
                -webkit-transform: translateY(-10px);
            }
        }
        -webkit-transform: translateY(-10px);
        -webkit-animation-name: fadeIn;
        -webkit-animation-duration:0.5s ;
        -webkit-animation-iteration-count:1 ;
        -webkit-animation-delay:0 ;
        .img{
            .v-img{
                filter: invert(53%) sepia(94%) saturate(1808%) hue-rotate(167deg) brightness(106%) contrast(101%);
            }
        }
        .title{
            color: #0FBFFF;
        }
        .text{
            color: #0FBFFF;
        }
        .line{
            display: block;
        }
    }
}
// 小型号到大型号的手机
@media screen and (max-width:600px){
    // CAR布局容器main
    .car-container-main{
        margin-top: 0;
    }
    // PIMOON布局容器main
    .pimoon-container-main{
        background: none;
    }
    // PIMOON布局容器
    .pimoon-container{
        display: flow-root;
        height:auto;
        grid-template-columns: 1fr;
        margin-top: calc(100vw * -200 / 600);
        .m-left{
            position: relative;
            align-self: center;
            display: grid;
            justify-content: center;
            .v-img{
                width: calc(100vw * 550 / 600);
                height: calc(100vw * 550 / 600);
            }
        }
        .left{
            text-align: center;
            margin-top:  30px;
            .title{
                font-size: 50px;
                line-height: 80px;
            }
            .text{
                font-size: 30px;
                line-height: 30px;
            }
            .explain{
                margin-top: 18px;
                font-size: 12px;
                line-height: 14px;
            }
            .pimoon-btm{
                margin-top: 40px;
                display: block;
                .v-btn{
                    border-radius: 8px;
                    color: #FFFFFF;
                    font-size: 20px;
                }
                .pimoon-btm-left{
                    width: 49%;
                    float: left;
                }
                .pimoon-btm-right{
                    width: 49%;
                    float: right;
                }
                .connect{
                    margin-top:15px;
                    width: 100%;
                }
            }
        }
        .right{
            display: none;
        }
    }
    // CAR布局容器
    .car-container{
        display: grid;
        grid-template-columns: 1fr;
        @-webkit-keyframes fadeOut{
            100%{
                opacity: 1;
            }
        }
        -webkit-animation-name: fadeOut;
        -webkit-animation-duration:0.5s ;
        -webkit-animation-iteration-count:1 ;
        -webkit-animation-delay:0 ;
        grid-row-gap: 26px;
        .car-s{
            height: 190px;
        }
        .car{
            width: 100%;
            height: 190px;
            position: relative;
            background: none;
            border:2px solid rgba(129, 75, 246, 0.38);
            border-bottom: 0;
            .img{
                display: none;
            }
            .title{
                font-size: 24px;
                line-height: 30px;
                color: #0FBFFF;
                margin-top: 20px;
            }
            .text{
                font-size: 20px;
                line-height: 24px;
                width: 95%;
                color: rgba(15, 191, 255, 0.6);
                height: 120px;
                margin-top: 20px;
            }
            .line{
                height: 7px;
                display: block;
            }
            .car-fund{
                background-image: url('/assets/car-fund-security-h.svg');
                background-size: 100% 100%;
                background-repeat: no-repeat;
                background-position-x: center;
                background-position-y: center;
                opacity: 0.1;
                position: absolute;
                width: 100%;
                height: 100%;
            }
            .car-community-autonomy{
                background-image: url('/assets/car-community-autonomy-h.svg');
                background-size: 100% 100%;
                background-repeat: no-repeat;
                background-position-x: center;
                background-position-y: center;
                opacity: 0.1;
                position: absolute;
                width: 100%;
                height: 100%;
            }
            .car-general-trend{
                background-image: url('/assets/car-general-trend-h.svg');
                background-size: 100% 100%;
                background-repeat: no-repeat;
                background-position-x: center;
                background-position-y: center;
                opacity: 0.1;
                position: absolute;
                width: 100%;
                height: 100%;
            }
        }
        .car:hover{
            @-webkit-keyframes fadeIn{
                100%{
                    opacity: 1;
                }
            }
            -webkit-transform: translateY(0);
            -webkit-animation-name: fadeIn;
            -webkit-animation-duration:0.5s ;
            -webkit-animation-iteration-count:1 ;
            -webkit-animation-delay:0 ;
            .title{
                color: none;
            }
            .text{
                color: rgba(15, 191, 255, 0.6);
            }
            .line{
                display: block;
            }
        }
    }
}
// 小型号到中型号的平板
@media screen and (min-width:600px) and (max-width:960px){
    // PIMOON布局容器main
    .pimoon-container-main{
        background: none;
        margin-top: 0;
    }
    // CAR布局容器main
    .car-container-main{
        margin-top: 0;
    }
    // PIMOON布局容器
    .pimoon-container{
        display: flow-root;
        height:auto;
        grid-template-columns: 1fr;
        margin-top: calc(100vw * -350 / 960);
        padding-left: 58px;
        padding-right: 58px;
        .m-left{
            position: relative;
            align-self: center;
            display: grid;
            justify-content: center;
            .v-img{
                width: calc(100vw * 800 / 960);
                height: calc(100vw * 800 / 960);
            }
        }
        .left{
            text-align: center;
            margin-top:  60px;
            .title{
                font-size: 70px;
                line-height: 100px;
            }
            .text{
                width: 100%;
                font-size: 50px;
                line-height: 50px;
            }
            .explain{
                margin-top: 6px;
                font-size: 14px;
                line-height: 16px;
            }
            .pimoon-btm{
                margin-top: 33px;
                display: block;
                .v-btn{
                    border-radius: 8px;
                }
                .pimoon-btm-left{
                    width: 49%;
                    float: left;
                }
                .pimoon-btm-right{
                    width: 49%;
                    float: right;
                }
                .connect{
                    margin-top:15px;
                    width: 100%;
                }
            }
        }
        .right{
            display: none;
        }
    }
    // CAR布局容器
    .car-container{
        padding-left: 58px;
        padding-right: 58px;
        display: grid;
        grid-template-columns: 1fr;
        @-webkit-keyframes fadeOut{
            100%{
                opacity: 1;
            }
        }
        -webkit-animation-name: fadeOut;
        -webkit-animation-duration:0.5s ;
        -webkit-animation-iteration-count:1 ;
        -webkit-animation-delay:0 ;
        grid-row-gap: 56px;
        .car-s{
            height: 400px;
        }
        .car{
            width: 100%;
            height: 400px;
            position: relative;
            background: none;
            border:2px solid rgba(129, 75, 246, 0.38);
            border-bottom: 0;
            .img{
                display: none;
            }
            .title{
                font-size: 45px;
                line-height: 45px;
                color: #0FBFFF;
                margin-top: 60px;
            }
            .text{
                font-size: 35px;
                line-height: 45px;
                width: 95%;
                color: rgba(15, 191, 255, 0.6);
                height: 250px;
                margin-top: 0px;
                padding-bottom: 20px;
            }
            .line{
                height: 14px;
                display: block;
            }
            .car-fund{
                background-image: url('/assets/car-fund-security-h.svg');
                background-size: 100% 100%;
                background-repeat: no-repeat;
                background-position-x: center;
                background-position-y: center;
                opacity: 0.1;
                position: absolute;
                width: 100%;
                height: 100%;
            }
            .car-community-autonomy{
                background-image: url('/assets/car-community-autonomy-h.svg');
                background-size: 100% 100%;
                background-repeat: no-repeat;
                background-position-x: center;
                background-position-y: center;
                opacity: 0.1;
                position: absolute;
                width: 100%;
                height: 100%;
            }
            .car-general-trend{
                background-image: url('/assets/car-general-trend-h.svg');
                background-size: 100% 100%;
                background-repeat: no-repeat;
                background-position-x: center;
                background-position-y: center;
                opacity: 0.1;
                position: absolute;
                width: 100%;
                height: 100%;
            }
        }
        .car:hover{
            @-webkit-keyframes fadeIn{
                100%{
                    opacity: 1;
                }
            }
            -webkit-transform: translateY(0);
            -webkit-animation-name: fadeIn;
            -webkit-animation-duration:0.5s ;
            -webkit-animation-iteration-count:1 ;
            -webkit-animation-delay:0 ;
            .title{
                color: none;
            }
            .text{
                color: rgba(15, 191, 255, 0.6);
            }
            .line{
                display: block;
            }
        }
    }
}
// 小型号到中型号的平板
@media screen and (min-width:960px) and (max-width:1264px){
    // PIMOON布局容器
    .pimoon-container{
        height:680px;
        padding-left: 58px;
        padding-right: 58px;
        .left{
            .title{
                font-size:calc(100vw * 80 / 1904);
                line-height:calc(100vw * 80 / 1904);
            }
            .text{
                font-size:calc(100vw * 70 / 1904);
                line-height:calc(100vw * 80 / 1904);
            }
            .explain{
                margin-top: calc(100vw * 8 / 1904);
                font-size:calc(100vw * 16 / 1904);
                line-height: calc(100vw * 30 / 1904);
            }
            .pimoon-btm{
                margin-top: calc(100vw * 53 / 1904);
                grid-gap: calc(100vw * 11 / 1904);
                .v-btn{
                    width: 100%;
                    font-size: 16px;
                    height: 50px;
                }
                .connect{
                    width: calc(100vw * 350 / 1904);
                }
            }
        }
        .right{
            .right-img{
                display: grid;
                justify-items: center;
                .v-img{
                    width: 350px;
                    height: 350px;
                }
            }
        }
    }
    // CAR布局容器
    .car-container{
        padding-left: 58px;
        padding-right: 58px;
        grid-gap: 11px;
        .car-s{
            width: 320px;
            height:380px;
        }
        .car{
            width: 320px;
            height:380px;
            .img{
                .v-img{
                    width: 90px;
                }
            }
            .title{
                font-size: 20px;
                line-height: 20px;
                margin-top:-60px;
            }
            .text{
                width:260px;
                font-size: 20px;
                line-height: 28px;
                margin-top:-60px;
            }
        }
    }
}
// 桌面端
@media screen and (min-width:1264px) and (max-width:1904px){
    // PIMOON布局容器
    .pimoon-container{
        height:780px;
        max-width: 1200px;
        .left{
            .title{
                font-size:calc(100vw * 80 / 1904);
                line-height:calc(100vw * 80 / 1904);
            }
            .text{
                font-size:calc(100vw * 70 / 1904);
                line-height:calc(100vw * 80 / 1904);
            }
            .explain{
                margin-top: calc(100vw * 8 / 1904);
                font-size:calc(100vw * 16 / 1904);
                line-height: calc(100vw * 30 / 1904);
            }
            .pimoon-btm{
                margin-top: calc(100vw * 53 / 1904);
                grid-gap: calc(100vw * 11 / 1904);
                .v-btn{
                    width:100%;
                    font-size: 18px;
                    height: 53px;
                }
                .connect{
                    width: calc(100vw * 300 / 1904);
                }
            }
        }
        .right{
            .right-img{
                display: grid;
                justify-items: center;
                .v-img{
                    width: 400px;
                    height: 400px;
                }
            }
        }
    }
    // CAR布局容器
    .car-container{
        max-width: 1200px;
        grid-gap: 11px;
        .car{
            width: 340px;
            height:403px;
            .img{
                .v-img{
                    width: 110px;
                }
            }
            .title{
                font-size: 25px;
                line-height: 25px;
                margin-top:-40px;
            }
            .text{
                width:290px;
                font-size: 20px;
                line-height: 28px;
                margin-top:-40px;
            }
        }
    }
}
// 4K 和超宽屏幕
@media screen and (min-width:1904px){}
</style>