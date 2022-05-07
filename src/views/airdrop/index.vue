<template>
    <!-- 容器 -->
    <v-app class="app-container">
        <!-- 警告状态提示框 -->
        <alert :status="alert.status" :text="alert.text" :type="alert.type"></alert>
        <!-- 顶部菜单栏 -->
        <topMenuBar></topMenuBar>
        <!-- airdrop布局容器main -->
        <div class="airdrop-container-main">
            <!-- airdrop布局容器 -->
            <v-container class="airdrop-container">
                <div class="m-left">
                    <v-img class="v-img" src="@/assets/home-logo.png"></v-img>
                </div>
                <div class="left">
                    <div class="connect-subject">
                        <div class="connect-bnt">
                            <v-btn v-if="!address" @click="connect">{{$t("public.connect_wallet")}}</v-btn>
                            <v-btn v-else @click="disconnect">{{$t("public.disconnect")}}</v-btn>
                        </div>
                        <div class="connect-twitter">
                            <a target="_blank" href="https://www.baidu.com">
                                <v-img class="twitter-img" src="@/assets/airdrop-twitter.png"></v-img>
                            </a>
                        </div>
                        <div class="connect-twitter">
                            <a target="_blank" href="https://www.baidu.com">
                                <v-img  class="twitter-img" src="@/assets/airdrop-telegram.png"></v-img>
                            </a>
                        </div>
                    </div>
                    <div class="presale-countdown">
                        <div class="title">
                            <span>{{$t("presale.start.countdown")}}</span>
                        </div>
                        <div class="count-down">
                            <baseCounter :endTime="deadline"></baseCounter>
                        </div>
                    </div>
                    <div class="airdrop-text">
                        <span>
                            {{$t("airdrop.text")}}
                        </span>
                    </div>
                    <div class="airdrop-title">
                        {{$t("airdrop.title1")}}
                        <span>
                            {{$t("airdrop.title2")}}
                        </span>
                    </div>
                </div>
                <div class="right">
                    <div class="right-img">
                        <v-img class="v-img" src="@/assets/home-logo.png"></v-img>
                    </div>
                </div>
            </v-container>
        </div>
        <!-- 广告图布局容器main -->
        <div class="advertisement-container-main">
             <!-- 广告图布局容器 -->
            <v-container class="advertisement-container">
                <a @click="$router.push('/promo')">
                    <v-img  class="v-img" src="@/assets/en-advertisement.png"></v-img>
                </a>
            </v-container>
        </div>
        <!-- quantity布局容器main -->
        <div class="quantity-container-main">
            <!-- quantity布局容器 -->
            <v-container class="quantity-container">
                <div class="quantity-subject">
                    <div class="title">
                        <v-img class="v-img" src="@/assets/airdrop_notice.png"></v-img>
                        <span>
                            {{$t("airdrop.quantity_title")}}
                        </span>
                    </div>
                    <div class="quantity-car">
                        <span v-if="address!=''">{{airdropQuantity}}</span>
                        <span v-else>0</span>
                        <div class="quantity-l"></div>
                        <div class="quantity-r"></div>
                    </div>
                </div>
            </v-container>
        </div>
        <!-- rules-connection布局容器main -->
        <div class="rules-connection-main">
            <!-- rules-connection布局容器 -->
            <v-container class="rules-connection">
                <div class="subject">
                    <div class="rules">
                        <span class="rules-title">{{$t("presale.rules.title")}}</span>
                        <div class="rules-text">
                            <span>{{$t("presale.rules.text1")}}</span>
                            <span>{{$t("presale.rules.text2")}}</span>
                            <span>{{$t("presale.rules.text3")}}</span>
                        </div>
                    </div>
                </div>
            </v-container>
        </div>
        <!-- car-connection布局容器main -->
        <div class="car-connection-main">
            <!-- car-connection布局容器 -->
            <v-container class="car-connection">
                <div class="subject">
                    <div class="car-subject">
                        <div class="car">
                            <span class="title">{{$t("airdrop.pimoon_airdrop")}}</span>
                            <span class="text" v-if="address">{{ storeMyTotalspacepi}}</span>
                            <span class="text" v-else>0</span>
                            <div class="line"></div>
                        </div>
                        <div class="car">
                            <span class="title">{{$t("airdrop.my_invitation")}}</span>
                            <span class="text" v-if="address">{{storeInviteList.length }} </span>
                            <span class="text" v-else>0</span>
                            <div class="line"></div>
                        </div>
                        <div class="car">
                            <span class="title">{{$t("airdrop.invitation_reward")}}</span>
                            <span class="text" v-if="address">{{ storeInviteRewards}}</span>
                            <span class="text" v-else>0</span>
                            <div class="line"></div>
                        </div>
                    </div>
                    <div class="car-text">
                        <div class="car-text-subject">
                            <v-img class="v-img" src="@/assets/i.png"></v-img>
                            <span>{{$t("airdrop.airdrop_explain")}}</span>
                        </div>
                    </div>
                </div>
            </v-container>
        </div>
        <!-- copy-connection布局容器main -->
        <div class="copy-connection-main">
            <!-- copy-connection布局容器 -->
            <v-container class="copy-connection">
                <div class="subject">
                    <div class="link-subject">
                        <div class="link-title">
                            {{$t("airdrop.link_text")}}
                        </div>
                        <div class="link-url">
                            <span>
                                {{storeInviteLink[0]}}
                            </span>
                        </div>
                    </div>
                    <div class="link-copy">
                        <v-btn v-clipboard:copy="storeInviteLink[0]" v-clipboard:success="onCopy">{{$t("public.copy")}}</v-btn>
                    </div>
                    <div class="link-explain">
                        <span>
                            {{$t("airdrop.link_explain")}}
                        </span>
                    </div>
                </div>
            </v-container>
        </div>
        <subjectMain></subjectMain>
        <!-- 加载弹框 -->
        <v-overlay :absolute="false" :value="loadingState" class="bind-the-popup">
            <v-progress-circular v-if="loadingState" indeterminate size="64"></v-progress-circular>
        </v-overlay>
    </v-app>
</template>
<script>
// 引入全局
import { mapState, mapActions, mapMutations } from "vuex";
// 引入we3js方法
import { abiObject, getAbi, web3 } from "utils/common";
const { contractObject: PerSaleObj } = getAbi(abiObject.PerSaleAbi);
// 引入页面
import subjectMain from "@/components/subjectMain.vue"
import topMenuBar from "@/components/topMenuBar.vue"
// 组件
import baseCounter from "@/components/baseCounter.vue"
// 引入警告提示组件
import alert from "@/components/alert.vue"
export default {
    data(){
        return {
            // 警告提示
            alert:{
                status:false,
                text:"",
                type:""
            },
            // 正在加载状态
            loadingState:false,
            // 空投数量
            airdropQuantity:0
        }
    },
    method(){
    },
    created() {
        setTimeout(()=>{
            this.updateInvitationLink(this.address);
            this.myInvites(this.address)
            this.getAirdropInfo();
        },2000)
    },
    computed:{
        ...mapState(["deadline","address","storeInviteList","storeSwapRatio","tokenDecimals","storeInviteLink","storeMyTotalspacepi","storeInviteRewards"]),
    },
    components: {
        topMenuBar,
        subjectMain,
        baseCounter,
        alert
    },
    watch: {
        address: {
			handler(newVal, oldVal) {
                // 判断地址不等于空
                if(newVal!=""){
                    this.getAirdropInfo();
                }
			},
			immediate: true,
		},
    },
    methods: {
        ...mapMutations(["updateStoreSwapRatio","editAddress", "updateIsInvited","updateInvitationLink","updateMyspacepi", "updateInviteList"]),
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
                this.loadingState = true;
                this.alert = {
                    status : true,
                    type:"success",
                    text:this.$t("alerts.connect_wallet_success")
                }
                setTimeout(()=>{
                    this.alert = {
                        status: false,
                    }
                },1500);
                setTimeout(()=>{
                    this.loadingState = false;
                    this.updateInvitationLink(this.address);
                    //window.location.reload();
                },2000)
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
                //window.location.reload();
                this.getAirdropInfo();
                this.updateInvitationLink(this.address);
            },2000);
        },
        // 获取空投信息
        async getAirdropInfo(){
            const totalAirdrop = await PerSaleObj.methods.totalAirdrop().call();
            const tokenDecimals = await PerSaleObj.methods.decimals().call()
            // 空投数量
            const getAirdropQuantity = Number(totalAirdrop / 10 ** tokenDecimals);
            //console.log(totalAirdrop,tokenDecimals);
            if(this.address!="")
            {
                this.airdropQuantity = Object.is(getAirdropQuantity, NaN)?0:getAirdropQuantity;
            }else{
                this.airdropQuantity = 0
            }
        },
        // 监听复制按钮
        onCopy(e) {
            this.alert = {
                    status : true,
                    type:"success",
                    text:this.$t("alerts.copy_success")
                }
                setTimeout(()=>{
                    this.alert = {
                        status: false,
                    }
                },1500);
		},
    }
};
</script>
<style scoped lang="less">
@import "@/styles/app";
// airdrop布局容器main
.airdrop-container-main{
    background: #110C3F;
}
// airdrop布局容器
.airdrop-container{
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
        display: grid;
        grid-gap: 20px;
        .connect-subject{
            display: flex;
            grid-gap: 20px;
            align-items:center;
            .connect-bnt{
                .v-btn{
                    width: 500px;
                    height: 57px;
                    background: #0FBFFF;
                    border-radius: 8px;
                    font-size: 22px;
                    font-family: Alibaba PuHuiTi-Regular, Alibaba PuHuiTi;
                    font-weight: 400;
                    color: #FFFFFF;
                    line-height: 26px;
                }
            }
            .connect-twitter{
                width: 50px;
                height: 50px;
                background: rgba(71, 1, 142, 0.38);
                border-radius: 8px;
                backdrop-filter: blur(10px);
                display: flex;
                justify-content: center;
                align-items:center;
                .twitter-img{
                    width: 30px;
                    height: 30px;
                }
            }
        }
        .presale-countdown{
            display: grid;
            grid-gap: 20px;
            .title{
                font-size: 18px;
                font-family: Alibaba PuHuiTi-Regular, Alibaba PuHuiTi;
                font-weight: 400;
                color: #FFFFFF;
                line-height: 26px;
            }
            .count-down{
                font-size: 70px;
                font-family: Alibaba PuHuiTi-Bold, Alibaba PuHuiTi;
                font-weight: bold;
                color: #FFFFFF;
                line-height: 70px;
            }
        }
        .airdrop-text{
            span{
                width: 500px;
                font-size: 18px;
                font-family: Alibaba PuHuiTi-Regular;
                font-weight: 400;
                color: #FFFFFF;
                line-height: 26px;
            }
        }
        .airdrop-title{
            display: grid;
            grid-gap: 30px;
            font-size: 40px;
            font-family: Alibaba PuHuiTi-Heavy, Alibaba PuHuiTi;
            font-weight: 800;
            color: #0FBFFF;
            line-height: 30px;
            span{
                color: #FFFFFF;
            }
        }
    }
    .right{
        position: relative;
        align-self: center;
        .right-img{
            display: grid;
            justify-content: center;
            .v-img{
                width: 450px;
                height: 450px;
            }
        }
    }
}
// 广告图布局容器main
.advertisement-container-main{
    margin-top: 100px;
}
// 广告图布局容器
.advertisement-container{
    max-width: 1300px;
}
// quantity布局容器main
.quantity-container-main{}
// quantity布局容器
.quantity-container{
    max-width: 1300px;
    .quantity-subject{
        display: grid;
        grid-gap: 20px;
        justify-items: center;
        .title{
            display: flex;
            align-items: center;
            justify-content: center;
            .v-img{
                width: 31px;
                height: 23px;
                margin-right: 10px;
            }
            span{
                font-size: 26px;
                font-family: AlibabaPuHuiTi-2-65-Medium;
                color: #814BF6;
                line-height: 44px;
            }
        }
        .quantity-car{
            width: 100%;
            height: 101px;
            background: rgba(56, 29, 98, 0.38);
            border-radius: 100px;
            backdrop-filter: blur(10px);
            display: flex;
            justify-content: center;
            align-items:center;
            position: relative;
            span{
                font-size: 60px;
                font-family: AlibabaPuHuiTi-2-85-Bold;
                color: #FFFFFF;
                line-height: 26px;
            }
            .quantity-l{
                width: 30px;
                height: 30px;
                background: rgba(255, 255, 255, 0.1);
                border: 1px solid #381D62;
                backdrop-filter: blur(10px);
                border-radius: 100px;
                position: absolute;
                left: 36px;
            }
            .quantity-r{
                width: 30px;
                height: 30px;
                background: rgba(255, 255, 255, 0.1);
                border: 1px solid #381D62;
                backdrop-filter: blur(10px);
                border-radius: 100px;
                position: absolute;
                right: 36px;
            }
        }
    }
}
// rules-connection布局容器main
.rules-connection-main{}
// rules-connection布局容器
.rules-connection{
    max-width: 1300px;
    .subject{
        display: grid;
        grid-gap: 50px;
        .rules{
            text-align: left;
            display: grid;
            grid-gap: 30px;
            grid-template-columns: 1fr;
            .rules-title{
                font-size: 26px;
                font-family: AlibabaPuHuiTi-2-85-Bold;
                font-weight: normal;
                color: #FFFFFF;
                line-height: 26px;
            }
            .rules-text{
                text-align: left;
                display: grid;
                grid-gap: 10px;
                grid-template-columns: 1fr;
                font-size: 18px;
                font-family: Alibaba PuHuiTi-Regular, Alibaba PuHuiTi;
                font-weight: 400;
                color: #FFFFFF;
                line-height: 26px;
            }
        }
    }
}
// car-connection布局容器main
.car-connection-main{}
// car-connection布局容器
.car-connection{
    max-width: 1300px;
    .subject{
        display: grid;
        grid-gap: 20px;
        .car-subject{
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-gap: 50px;
            .car{
                display: grid;
                height: 196px;
                background: rgba(53, 1, 106, 0.38);
                align-items: center;
                border-radius: 8px;
                backdrop-filter: blur(10px);
                position: relative;
                .title{
                    font-size: 22px;
                    font-family: AlibabaPuHuiTi-2-85-Bold;
                    color: #814BF6;
                    line-height: 26px;
                    padding-top: 50px;
                }
                .text{
                    font-size: 40px;
                    font-family: AlibabaPuHuiTi-2-85-Bold;
                    color: #FFFFFF;
                    line-height: 26px;
                    padding-bottom: 50px;
                }
                .line{
                    width: 100%;
                    height: 17px;
                    background: linear-gradient(90deg, #814BF6 0%, #54ACFC 100%);
                    border-radius: 0px 0px 8px 8px;
                    position:absolute;
                    bottom: 0;
                }
            }
        }
        .car-text{
            display: flex;
            height: 76px;
            background: rgba(56, 29, 98, 0.38);
            border-radius: 8px;
            align-items:center;
            width: 100%;
            backdrop-filter: blur(10px);
            .car-text-subject{
                display: flex;
                align-items: center;
                padding-left:20px ;
                padding-right:20px ;
                .v-img{
                    width: 23px;
                    height: 23px;
                    margin-right: 10px;
                }
                span{
                    font-size: 22px;
                    font-family: Alibaba PuHuiTi-Regular, Alibaba PuHuiTi;
                    font-weight: 400;
                    color: rgba(255, 255, 255, 0.6);
                    line-height: 26px;
                }
            }
        }
    }
}
// copy-connection布局容器main
.copy-connection-main{}
// copy-connection布局容器
.copy-connection{
    max-width: 1300px;
    .subject{
        display: grid;
        grid-gap: 50px;
        .link-subject{
            display: grid;
            grid-gap: 5px;
            font-size: 26px;
            font-family: Alibaba PuHuiTi-Regular;
            font-weight: 400;
            color: #FFFFFF;
            line-height: 36px;
        }
        .link-copy{
            .v-btn{
                width: 187px;
                height: 63px;
                background: #814BF6;
                border-radius:8px;
                font-size: 22px;
                font-family: Alibaba PuHuiTi-Regular;
                font-weight: 400;
                color: #FFFFFF;
                line-height: 26px;
            }
        }
        .link-explain{
            span{
                font-size: 22px;
                font-family: Alibaba PuHuiTi-Regular;
                font-weight: 400;
                color: #B1B1B1;
                line-height: 26px;
            }
        }
    }
}

// 小型号到大型号的手机
@media screen and (max-width:600px){
    // 广告图布局容器main
    .advertisement-container-main{
        margin-top: 0;
    }
    // airdrop布局容器main
    .airdrop-container-main{
        background: none;
    }
    // airdrop布局容器
    .airdrop-container{
        grid-template-columns: 1fr;
        margin-top: calc(100vw * -200 / 600);
        display: flow-root;
        height:auto;
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
            .connect-subject{
                grid-gap: 10px;
                .connect-bnt{
                    display: flex;
                    width: 100%;
                    .v-btn{
                        width: 100%;
                        height: 44px;
                        border-radius: 4px;
                        font-family: AlibabaPuHuiTi-2-55-Regular;
                        font-size: 22px;
                        line-height: 26px;
                    }
                }
                .connect-twitter{
                    display: flex;
                    width: 70px;
                    height: 50px;
                }
            }
            .presale-countdown{
                .count-down{
                    font-size: calc(100vw * 70 / 600);
                    line-height: calc(100vw * 70 / 600);
                }
            }
            .airdrop-text{
                span{
                    width: 100%;
                    font-family:AlibabaPuHuiTi-2-55-Regular;
                    font-weight: normal;
                    color:rgba(255, 255, 255, 0.6);
                }
            }
            .airdrop-title{
                grid-gap: 10px;
                font-family: AlibabaPuHuiTi-2-55-Regular;
                font-weight: normal;
                font-size: 24px;
                line-height: 30px;
            }
        }
        .right{
            display: none;
        }
    }
    // quantity布局容器
    .quantity-container{
        .quantity-subject{
            grid-gap: 10px;
            .title{
                .v-img{
                    width: 23px;
                    height: 17px;
                }
                span{
                    font-size: 14px;
                }
            }
            .quantity-car{
                height: auto;
                span{
                    font-size: 22px;
                }
                background: none;
                .quantity-l{
                    display: none;
                }
                .quantity-r{
                    display: none;
                }
            }
        }
    }
    // rules-connection布局容器
    .rules-connection{
        .subject{
            .rules{
                .rules-title{
                    font-size: 16px;
                    font-family: AlibabaPuHuiTi-2-85-Bold;
                    font-weight: normal;
                    color: #0FBFFF;
                    line-height: 26px;
                }
                .rules-text{
                    font-size: 14px;
                    font-family: AlibabaPuHuiTi-2-55-Regular;
                    font-weight: normal;
                    color: rgba(15, 191, 255, 0.6);
                    line-height: 16px;
                }
            }
        }
    }
    // car-connection布局容器
    .car-connection{
        .subject{
            grid-gap: 25px;
            border: 1px solid #814BF6;
            padding: 20px;
            border-radius: 8px;
            .car-subject{
                grid-template-columns: 1fr;
                grid-gap: 25px;
                .car{
                    grid-template-columns: 1fr 1fr;
                    align-items: center;
                    height: auto;
                    background: none;
                    backdrop-filter: none;
                    .title{
                        display: flex;
                        padding-top:0;
                        justify-content: flex-start;
                        font-size: 12px;
                        white-space:nowrap;

                    }
                    .text{
                        padding-bottom: 0;
                        display: flex;
                        justify-content: flex-end;
                        font-size: 18px;
                    }
                    .line{
                        display: none;
                    }
                }
            }
            .car-text{
                background: none;
                height: auto;
                backdrop-filter: none;
                .car-text-subject{
                    padding:0;
                    .v-img{
                        width: 12px;
                        height: 12px;
                    }
                    span{
                        font-size: calc(100vw * 18 / 600);
                    }
                }
            }
        }
    }
    // copy-connection布局容器
    .copy-connection{
        .subject{
            grid-gap: 25px;
            .link-subject{
                font-size: 12px;
                line-height: calc(100vw * 30 / 960);
                font-family: AlibabaPuHuiTi-2-55-Regular;
                line-height: 16px;
                .link-title{
                    color: #0FBFFF;
                }
                .link-url{
                    word-break: break-all;
                    font-size: 10px;
                    color: #B1B1B1;
                    line-height: 26px;
                }
            }
            .link-copy{
                .v-btn{
                    width: 187px;
                    height: 42px;
                    font-size: 16px;
                    font-family: AlibabaPuHuiTi-2-55-Regular;
                    font-weight: normal;
                }
            }
            .link-explain{
                span{
                    font-size: 10px;
                    font-family: AlibabaPuHuiTi-2-55-Regular;
                    font-weight: normal;
                    color: #B1B1B1;
                }
            }
        }
    }
}
// 小型号到中型号的平板
@media screen and (min-width:600px) and (max-width:960px){
    // airdrop布局容器main
    .airdrop-container-main{
        background: none;
    }
    // airdrop布局容器
    .airdrop-container{
        padding-left: 58px;
        padding-right: 58px;
        grid-template-columns: 1fr;
        margin-top: calc(100vw * -350 / 960);
        height:auto;
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
            grid-gap: 30px;
            .connect-subject{
                grid-gap: 20px;
                .connect-bnt{
                    width: 100%;
                    .v-btn{
                        width: 100%;
                        font-family: AlibabaPuHuiTi-2-55-Regular;
                    }
                }
                .connect-twitter{
                    display: flex;
                    width: 70px;
                    height: 55px;
                }
            }
            .presale-countdown{
                grid-gap: 30px;
                .count-down{
                    font-size: calc(100vw * 100 / 960);
                    line-height: calc(100vw * 100 / 960);
                }
            }
            .airdrop-text{
                span{
                    color: rgba(255, 255, 255, 0.6);
                    font-family: AlibabaPuHuiTi-2-55-Regular;
                }
            }
            .airdrop-title{
                font-family: AlibabaPuHuiTi-2-55-Regular;
                font-weight: normal;
            }
        }
        .right{
            display: none;
        }
    }
    // 广告图布局容器main
    .advertisement-container-main{
        margin-top: 0;
    }
    //广告图布局容器
    .advertisement-container{
        padding-left: 58px;
        padding-right: 58px;
    }
    // quantity布局容器
    .quantity-container{
        padding-left: 58px;
        padding-right: 58px;
        .quantity-subject{
            .quantity-car{
                background: none;
                .quantity-l{
                    display: none;
                }
                .quantity-r{
                    display: none;
                }
            }
        }
    }
    // rules-connection布局容器
    .rules-connection{
        padding-left: 58px;
        padding-right: 58px;
        .subject{
            .rules{
                .rules-title{
                    font-family: AlibabaPuHuiTi-2-85-Bold;
                    font-weight: normal;
                    color: #0FBFFF;
                }
                .rules-text{
                    font-family: AlibabaPuHuiTi-2-55-Regular;
                    font-weight: normal;
                    color: rgba(15, 191, 255, 0.6);
                }
            }
        }
    }
    // car-connection布局容器
    .car-connection{
        padding-left: 58px;
        padding-right: 58px;
        .subject{
            grid-gap: 50px;
            border: 1px solid #814BF6;
            padding-top:50px ;
            padding-bottom:50px ;
            padding-left:25px ;
            padding-right:25px ;
            border-radius: 8px;
            .car-subject{
                grid-template-columns: 1fr;
                .car{
                    grid-template-columns: 1fr 1fr;
                    align-items: center;
                    height: auto;
                    background: none;
                    backdrop-filter: none;
                    .title{
                        display: flex;
                        padding-top:0;
                        justify-content: flex-start;

                    }
                    .text{
                        padding-bottom: 0;
                        display: flex;
                        justify-content: flex-end;
                    }
                    .line{
                        display: none;
                    }
                }
            }
            .car-text{
                background: none;
                height: auto;
                backdrop-filter: none;
                .car-text-subject{
                    padding:0;
                    span{
                        font-size: calc(100vw * 22 / 960);
                    }
                }
            }
        }
    }
    // copy-connection布局容器
    .copy-connection{
        padding-left: 58px;
        padding-right: 58px;
        .subject{
            .link-subject{
                font-size: calc(100vw * 22.5 / 960);
                line-height: calc(100vw * 30 / 960);
                font-family: AlibabaPuHuiTi-2-55-Regular;
                .link-title{
                    color: #0FBFFF;
                }
                .link-url{
                    color: #B1B1B1;
                }
            }
        }
    }
}
// 小型号到中型号的平板
@media screen and (min-width:960px) and (max-width:1264px){
    // airdrop布局容器
    .airdrop-container{
        height:680px;
        padding-left: 58px;
        padding-right: 58px;
        .left{
            .connect-subject{
                .connect-bnt{
                    .v-btn{
                        width: calc(100vw * 350 / 1264);
                    }
                }
            }
            .presale-countdown{
                .count-down{
                    font-size: calc(100vw * 65 / 1264);
                    line-height: calc(100vw * 65 / 1264);
                }
            }
            .airdrop-text{
                span{
                    width: calc(100vw * 400 / 1264);
                    font-size: 17px;
                    line-height: 25px;
                }
            }
        }
        .right{
            .right-img{
                .v-img{
                    width: 350px;
                    height: 350px;
                }
            }
        }
    }
    //广告图布局容器
    .advertisement-container{
        padding-left: 58px;
        padding-right: 58px;
    }
    // quantity布局容器
    .quantity-container{
        padding-left: 58px;
        padding-right: 58px;
    }
    // rules-connection布局容器
    .rules-connection{
        padding-left: 58px;
        padding-right: 58px;
    }
    // car-connection布局容器
    .car-connection{
        padding-left: 58px;
        padding-right: 58px;
        .subject{
            .car-subject{
                .car{
                    height: 150px;
                    .title{
                        padding-top: 25px;
                    }
                    .text{
                        padding-bottom: 25px;
                    }
                    .line{
                        height: 10px;
                    }
                }
            }
        }
    }
    // copy-connection布局容器
    .copy-connection{
        padding-left: 58px;
        padding-right: 58px;
    }
}
// 桌面端
@media screen and (min-width:1264px) and (max-width:1904px){
    // airdrop布局容器
    .airdrop-container{
        height:780px;
        max-width: 1200px;
        .left{
            .connect-subject{
                .connect-bnt{
                    .v-btn{
                        width: 350px;
                    }
                }
            }
            .airdrop-text{
                span{
                    width: 300px;
                    font-size: 17px;
                    line-height: 25px;
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
    //广告图布局容器
    .advertisement-container{
        max-width: 1200px;
    }
    // quantity布局容器
    .quantity-container{
        max-width: 1200px;
    }
    // rules-connection布局容器
    .rules-connection{
        max-width: 1200px;
    }
    // car-connection布局容器
    .car-connection{
        max-width: 1200px;
    }
    // copy-connection布局容器
    .copy-connection{
        max-width: 1200px;
    }
}
// 4K 和超宽屏幕
@media screen and (min-width:1904px){}
</style>