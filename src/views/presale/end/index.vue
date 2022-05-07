<template>
    <div>
        <!-- 警告状态提示框 -->
        <alert :status="alert.status" :text="alert.text" :type="alert.type"></alert>
        <!-- presale布局容器main -->
        <div class="presale-container-main">
            <!-- presale布局容器 -->
            <v-container class="presale-container">
                <div class="m-left">
                    <v-img class="v-img" src="@/assets/home-logo.png"></v-img>
                </div>
                <div class="left">
                    <div class="left-s">
                        <div class="connect">
                            <div class="connect-left">
                                <v-btn v-if="!address" @click="connect">{{$t("public.connect_wallet")}}</v-btn>
                                <v-btn v-else @click="disconnect">{{$t("public.disconnect")}}</v-btn>
                            </div>
                            <div class="connect-right">
                                <div>
                                    100%
                                </div>
                                <div v-if="address!=''">
                                    <span style="" v-if="address!=''">{{getnum(getPimoon/100000000000,0)}}B {{$t("currency.pimoon")}}</span>
                                </div>
                                <div v-else>
                                    <span style="">0</span> {{$t("currency.pimoon")}}
                                </div>
                            </div>
                        </div>
                        <div class="presale-countdown">
                            <div class="title">
                                <span>{{$t("presale.start.countdown")}}</span>
                            </div>
                            <div class="count-down">
                                123,000,014,433,311
                            </div>
                        </div>
                        <div class="percentage">
                            <v-progress-linear :value="50" :bg-opacity="1" bg-color="#FFFFFF" color="#0FBFFF" height="8"></v-progress-linear>
                        </div>
                        <div class="presale-text">
                            {{$t("presale.end.text")}}
                            <span>
                                {{$t("presale.end.tetx1")}} {{ thousands(getCurrentBlock)}}
                            </span>
                        </div>
                        <div class="presale-title">
                            {{$t("presale.end.title")}}
                            <span>
                                {{$t("presale.end.title1")}}
                            </span>
                        </div>
                    </div>
                </div>
                <div class="right">
                    <div class="right-img">
                        <v-img class="v-img" src="@/assets/home-logo.png"></v-img>
                    </div>
                </div>
            </v-container>
        </div>
        <!-- rules-connection布局容器main -->
        <div class="rules-connection-main">
            <!-- rules-connection布局容器 -->
            <v-container class="rules-connection">
                <div class="subject">
                    <div class="rules-car">
                        <div class="rules-car-s">
                            <div class="rules-title">{{$t("public.my_presale")}}</div>
                            <div class="rules-text" v-if="address!=''">{{myPresale}}</div>
                            <div class="rules-text" v-else>0</div>
                            <div class="rules-line"></div>
                        </div>
                        <div class="rules-car-s">
                            <div class="rules-title">{{$t("currency.pimoon")}}</div>
                            <div class="rules-text" v-if="address!=''">{{getPimoon}}</div>
                            <div class="rules-text" v-else>0</div>
                            <div class="rules-line"></div>
                        </div>
                    </div>
                    <div class="rules-text">{{$t("presale.explain")}}</div>
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
        <!-- 加载弹框 -->
        <v-overlay :absolute="false" :value="loadingState" class="bind-the-popup">
            <v-progress-circular v-if="loadingState" indeterminate size="64"></v-progress-circular>
        </v-overlay>
    </div>
</template>
<script>
// 引入全局
import { mapState, mapActions, mapMutations } from "vuex";
// 引入we3js方法
import { abiObject, getAbi, web3,thousands} from "utils/common";
const { contractObject: PerSaleObj } = getAbi(abiObject.PerSaleAbi);
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
            // 我的预售
            myPresale:0,
            // 获取Pimoon
            getPimoon:0,
            // thousands
            thousands:thousands,
            // 获取区块高度
            getCurrentBlock: 0,
            // 正在加载状态
            loadingState:false,
        }
    },
    created() {
        this.getCurrentBlockHigh();
    },
    computed:{
        ...mapState([
            "address",
            "tokenDecimals",
            "storeSwapRatio"
        ]),
    },
    components: {
        alert
    },
    watch: {
        // 地址
        address: {
            handler(newVal, oldVal) {
                // 判断地址是否为空
				if (newVal != "") {
                    // 获取用户的预售和Pimoon
                    this.getUserLock();
				}
			},
			immediate: true,
        }
    },
    methods: {
        ...mapMutations(["updateStoreSwapRatio","editAddress", "updateIsInvited","updateInvitationLink","updateMyspacepi", "updateInviteList"]),
        ...mapActions(["getInvited", "myInvites"]),
        getnum(a,num)
        {
            var a_type = typeof(a);
            if(a_type == "number"){
                var aStr = a.toString();
                var aArr = aStr.split('.');
            }else if(a_type == "string"){
                var aArr = a.split('.');
            }
            
            if(aArr.length > 1) {
                if(num == 0)
                {
                    a = aArr[0];
                }else{
                    a = aArr[0] + "." + aArr[1].substr(0, num);
                }
            }
            return a
        },
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
                    this.getUserLock();
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
            },2000);
        },
        // 获取用户的预售和Pimoon
        async getUserLock(){
            const userLock = await PerSaleObj.methods.getUserLock(this.address).call();
            // 全部
            let total = new this.$BigNumber(userLock[0]);
            // 获取Pimoon
            let getPimoon = total.toFixed(0) / 10 ** Number(this.tokenDecimals);
            this.getPimoon = Object.is(getPimoon, NaN)?0:getPimoon;
            // 获取我的预售
            let myPresale = Number(getPimoon) / Number(this.storeSwapRatio);
            this.myPresale = Object.is(myPresale, NaN)?0:Object.is(myPresale, Infinity)?0:myPresale;
            this.$emit("handleUserLock", this.myPresale);
        },
        // 获取当前区块高度
        getCurrentBlockHigh() {
			this.timer = setInterval(async () => {
				this.getCurrentBlock = await web3.eth.getBlockNumber();
			}, 5000);
		}
    }
};
</script>
<style scoped lang="less">
// presale布局容器main
.presale-container-main{
    background: #110C3F;
}
// presale布局容器
.presale-container{
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
        .left-s{
            display: grid;
            grid-template-columns: 1fr;
            grid-gap: 20px;
            .connect{
                color: #0FBFFF;
                display: flex;
                grid-template-columns: 1fr 1fr;
                grid-gap: 20px;
                align-items:center;
                .connect-left{
                    .v-btn{
                        width: 190px;
                        height: 45px;
                        background: #0FBFFF;
                        border-radius: 8px;
                        font-size: 22px;
                        font-family: Alibaba PuHuiTi-Bold;
                        font-weight: bold;
                        color: #FFFFFF;
                        line-height: 22px;
                    }
                }
                .connect-right{
                    width: 446px;
                    height: 45px;
                    border-radius: 8px;
                    border: 1px solid #0FBFFF;
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    align-items: center;
                    justify-items: center;
                    font-size: 18px;
                    font-family: Alibaba PuHuiTi-Bold, Alibaba PuHuiTi;
                    font-weight: bold;
                    color: #FFFFFF;
                    line-height: 22px;
                }
            }
            .percentage{
                margin-top: 30px;
                .v-progress-linear{
                    width: 500px;
                    border-radius: 20px;
                }
            }
            .presale-countdown{
                display: grid;
                grid-template-columns: 1fr;
                grid-gap: 30px;
                .title{
                    font-size: 18px;
                    font-family: Alibaba PuHuiTi-Regular;
                    font-weight: 400;
                    color: #FFFFFF;
                    line-height: 26px;
                }
                .count-down{
                    color: #FFFFFF;
                    font-size: 60px;
                    font-family: Alibaba PuHuiTi-Bold;
                    font-weight: bold;
                    line-height: 26px;
                }
            }
            .presale-text{
                display: grid;
                grid-template-columns: 1fr;
                grid-gap: 20px;
                color: #FFFFFF;
                width: 610px;
                font-size: 18px;
                font-family: Alibaba PuHuiTi-Regular;
                font-weight: 400;
                color: #FFFFFF;
                line-height: 26px;
                span{
                    font-size: 27px;
                    font-family: Alibaba PuHuiTi-Heavy;
                    font-weight: 800;
                    color: #0FBFFF;
                    line-height: 25px;
                }
            }
            .presale-title{
                font-size: 52px;
                font-family: Alibaba PuHuiTi-Heavy;
                font-weight: 800;
                color: #FFFFFF;
                line-height: 69px;
                span{
                    color: #0FBFFF;
                }
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
// rules-connection布局容器main
.rules-connection-main{
    margin-top: 100px;
}
// rules-connection布局容器
.rules-connection{
    .subject{
        display: grid;
        grid-gap: 50px;
        .rules{
            text-align: left;
            display: grid;
            grid-gap: 30px;
            grid-template-columns: 1fr;
            .rules-title{
                font-size: 22px;
                font-family: Alibaba PuHuiTi-Bold;
                font-weight: bold;
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
                color: rgba(255, 255, 255, 0.6);
                line-height: 26px;
            }
        }
        .rules-car{
            display: grid;
            grid-gap: 30px;
            grid-template-columns: 1fr 1fr;
            .rules-car-s{
                display: grid;
                grid-gap: 0px;
                width: 580px;
                height: 175px;
                background: rgba(56, 29, 98, 0.38);
                align-items: center;
                border-radius: 8px;
                backdrop-filter: blur(10px);
                .rules-title{
                    font-size: 22px;
                    font-family: AlibabaPuHuiTi-2-55-Regular;
                    color: #FFFFFF;
                    line-height: 26px;
                    padding-top: 30px;
                }
                .rules-text{
                    font-size: 30px;
                    font-family:AlibabaPuHuiTi-2-105-Heavy;
                    font-weight: normal;
                    color: #FFFFFF;
                    line-height: 26px;
                    padding-bottom: 30px;
                }
                .rules-line{
                    width: 4px;
                    height: 82px;
                    background: linear-gradient(180deg, #814BF6 0%, #0FBFFF 100%);
                    box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);
                    border-radius: 0px 8px 8px 0px;
                    opacity: 0.38;
                    position:absolute;
                    left: 0;
                }

            }
        }
        .rules-text{
            font-size: 18px;
            font-family: AlibabaPuHuiTi-2-45-Light;
            font-weight: normal;
            color: rgba(255, 255, 255, 0.6);
            line-height: 26px;
        }
    }
}

// 小型号到大型号的手机
@media screen and (max-width:600px){
    // presale布局容器main
    .presale-container-main{
        background: none;
    }
    // presale布局容器
    .presale-container{
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
            .left-s{
                .connect{
                    .connect-left{
                        .v-btn{
                            width: 100%;
                            font-size: 20px;
                            line-height: 20px;
                            font-family:AlibabaPuHuiTi-2-45-Light;
                            font-weight: normal;
                        }
                    }
                    .connect-right{
                        width: 100%;
                        font-size: 20px;
                        line-height: 20px;
                        font-family:AlibabaPuHuiTi-2-45-Light;
                        font-weight: normal;
                    }
                }
                .percentage{
                    .v-progress-linear{
                        width: 100%;
                        border-radius: 20px;
                    }
                }
                .presale-countdown{
                    .count-down{
                        font-size: calc(100vw * 50 / 600);
                        line-height: calc(100vw * 50 / 600);
                    }
                }
                .presale-text{
                    width: 100%;
                    span{
                        width: 100%;
                        font-family: AlibabaPuHuiTi-2-55-Regular;
                        color: #0FBFFF;
                        line-height: 27px;
                    }
                }
                .presale-title{
                    font-size: 24px;
                    font-family: AlibabaPuHuiTi-2-55-Regular;
                    font-weight: normal;
                    line-height: 30px;
                }
            }
        }
        .right{
            display: none;
        }
    }
    // rules-connection布局容器main
    .rules-connection-main{
        margin-top: 0;
    }
    // rules-connection布局容器
    .rules-connection{
        .subject{
            grid-gap: 20px;
            .rules{
                grid-gap: 20px;
                text-align: center;
                .rules-title{
                    font-size: 24px;
                    font-family: AlibabaPuHuiTi-2-85-Bold;
                    color: #0FBFFF;
                    line-height: 26px;
                }
                .rules-text{
                    font-size: 22px;
                    font-family: AlibabaPuHuiTi-2-55-Regular;
                    color: rgba(15, 191, 255, 0.6);
                    line-height: 26px;
                }
            }
            .rules-car{
                grid-template-columns: 1fr;
                grid-gap: 20px;
                .rules-car-s{
                    width: 100%;
                    height: 100px;
                    .rules-title{
                        font-size: 14px;
                        line-height: 8px;
                        color: #0FBFFF;
                        padding-top: 20px;
                    }
                    .rules-text{
                        font-size: 18px;
                        line-height: 7px;
                        padding-bottom: 20px;
                    }
                    .rules-line{
                        height: 70px;
                    }
                }
            }
            .rules-text{
                font-size: 12px;
                line-height: 26px;
            }
        }
    }
}
// 小型号到中型号的平板
@media screen and (min-width:600px) and (max-width:960px){
    // presale布局容器main
    .presale-container-main{
        background: none;
    }
    // presale布局容器
    .presale-container{
        padding-left: 58px;
        padding-right: 58px;
        height:auto;
        grid-template-columns: 1fr;
        margin-top: calc(100vw * -350 / 960);
        .m-left{
            position: relative;
            align-self: center;
            display: flex;
            justify-content: center;
            .v-img{
                width: calc(100vw * 800 / 960);
                height: calc(100vw * 800 / 960);
            }
        }
        .left{
            text-align: center;
            margin-top:  60px;
            .left-s{
                grid-gap: 30px;
                .connect{
                    .connect-left{
                        .v-btn{
                            width: 200px;
                            font-size: 20px;
                            line-height: 20px;
                            font-family:AlibabaPuHuiTi-2-45-Light;
                            font-weight: normal;
                        }
                    }
                    .connect-right{
                        width: 100%;
                        font-size: 20px;
                        line-height: 20px;
                        font-family:AlibabaPuHuiTi-2-45-Light;
                        font-weight: normal;
                    }
                }
                .percentage{
                    margin-top: 20px;
                    .v-progress-linear{
                        width: 100%;
                        border-radius: 20px;
                    }
                }
                .presale-countdown{
                    grid-gap: 30px;
                    .title{
                        font-size: 20px;
                        line-height: 28px;
                    }
                    .count-down{
                        font-size: calc(100vw * 80 / 960);
                        line-height: calc(100vw * 80 / 960);
                    }
                }
                .presale-text{
                    grid-gap: 20px;
                    width: 100%;
                    color:rgba(255, 255, 255, 0.6);
                    font-family: AlibabaPuHuiTi-2-55-Regular;
                    font-weight: normal;
                    font-size: 20px;
                    line-height: 28px;
                }
                .presale-title{
                    font-family: AlibabaPuHuiTi-2-55-Regular;
                    font-weight: normal;
                }
            }
        }
        .right{
            display: none;
        }
    }
    // rules-connection布局容器main
    .rules-connection-main{
        margin-top: 0;
    }
    // rules-connection布局容器
    .rules-connection{
        padding-left: 58px;
        padding-right: 58px;
        .subject{
            .rules{
                text-align: center;
                .rules-title{
                    color: #0FBFFF;
                    font-family:AlibabaPuHuiTi-2-85-Bold;
                }
                .rules-text{
                    font-family: AlibabaPuHuiTi-2-55-Regular;
                    color: rgba(15, 191, 255, 0.6);
                }
            }
            .rules-car{
                grid-template-columns: 1fr;
                .rules-car-s{
                    width: 100%;
                    .rules-title{
                        color: #0FBFFF;
                    }
                }
            }
        }
    }
}
// 小型号到中型号的平板
@media screen and (min-width:960px) and (max-width:1264px){
    // presale布局容器
    .presale-container{
        height:680px;
        padding-left: 58px;
        padding-right: 58px;
        .left{
            .left-s{
                grid-gap: 20px;
                .connect{
                    .connect-left{
                        .v-btn{
                            width: calc(100vw * 200 / 1264);
                            font-size:calc(100vw * 25 / 1264);
                            line-height: calc(100vw * 25 / 1264);
                        }
                    }
                    .connect-right{
                        width: calc(100vw * 400 / 1264);
                        font-size: calc(100vw * 25 / 1264);
                        line-height: calc(100vw * 25 / 1264);
                    }
                }
                .percentage{
                    .v-progress-linear{
                        width: 400px;
                        border-radius: 20px;
                    }
                }
                .presale-countdown{
                    grid-gap: 10px;
                    .title{
                        font-size: 15px;
                        line-height: 20px;
                    }
                    .count-down{
                        font-size: 45px;
                        line-height: 45px;
                    }
                }
                .presale-text{
                    grid-gap: 20px;
                    width: calc(100vw * 400 / 1264);
                    font-size: 17px;
                    span{
                        width: calc(100vw * 450 / 1264);
                        font-size: 20px;
                        line-height: 20px;
                    }
                }
                .presale-title{
                    
                    font-size: 40px;
                    font-weight: 700;
                    line-height: 69px;
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
    // rules-connection布局容器
    .rules-connection{
        max-width: 100%;
        padding-left: 58px;
        padding-right: 58px;
        .subject{
            .rules-car{
                .rules-car-s{
                    width: 100%;
                }
            }
        }
    }
}
// 桌面端
@media screen and (min-width:1264px) and (max-width:1904px){
    // presale布局容器
    .presale-container{
        height:780px;
        max-width: 1200px;
        .left{

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
    // rules-connection布局容器
    .rules-connection{
        max-width: 1200px;
    }
}
// 4K 和超宽屏幕
@media screen and (min-width:1904px){
    // rules-connection布局容器
    .rules-connection{
        max-width: 1300px;
    }
}
</style>