<template>
    <div>
        <!-- 警告状态提示框 -->
        <alert :status="alert.status" :text="alert.text" :type="alert.type"></alert>
        <!-- presale布局容器main -->
        <div class="presale-container-main">
            <!-- presale布局容器 -->
            <v-container class="presale-container">
                <div class="m-left">
                    <v-img class="v-img"  src="@/assets/home-logo.png"></v-img>
                </div>
                <div class="left">
                    <div class="left-s">
                        <div class="left-count">
                            <div class="soft-top">
                                <span class="title">{{$t("presale.start.soft_top.title")}}</span>
                                <span class="text">{{$t("presale.start.soft_top.text")}}</span>
                            </div>
                            <div class="hard-top">
                                <span class="title">{{$t("presale.start.hard_top.title")}}</span>
                                <span class="text">{{$t("presale.start.hard_top.text")}}</span>
                            </div>
                        </div>
                        <div class="percentage">
                            <v-progress-linear :value="20" bg-opacity="1" bg-color="#FFFFFF" color="#0FBFFF" height="8"></v-progress-linear>
                        </div>
                        <div class="presale-countdown">
                            <div class="title">
                                <span>{{$t("presale.start.countdown")}}</span>
                            </div>
                            <div class="count-down">
                                <baseCounter :endTime="deadline"></baseCounter>
                            </div>
                        </div>
                        <div class="presale-text">
                            <span>
                                {{$t("presale.start.text")}}
                            </span>
                        </div>
                        <div class="presale-title">
                            {{$t("presale.start.title")}}
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
        <!-- wallet-connection布局容器main -->
        <div class="wallet-connection-container-main">
            <!-- wallet-connection布局容器 -->
            <v-container class="wallet-connection-container">
                <div class="wallet-connection-subject">
                    <div class="wallet-car">
                        <div class="wallet-car-s">
                            <div class="wallet-car-type">
                                <span class="title">{{$t("presale.type.title")}}</span>
                                <span class="text">{{$t("presale.type.text")}}</span>
                            </div>
                            <div class="wallet-car-min">
                                <span class="title">{{$t("presale.min.title")}}</span>
                                <span class="text">{{$t("presale.min.text")}}</span>
                            </div>
                            <div class="wallet-car-max">
                                <span class="title">{{$t("presale.max.title")}}</span>
                                <span class="text">{{$t("presale.max.text")}}</span>
                            </div>
                        </div>
                        <div class="wallet-car-ratio">
                            <div class="title">{{$t("presale.ratio_title")}}</div>
                            <div class="text">1 {{$t("currency.bnb")}} = {{storeSwapRatio}} {{$t("currency.pimoon")}}</div>
                        </div>
                        <div class="wallet-car-line"></div>
                        <div class="wallet-car-amount">
                            <div class="title">{{$t("presale.amount_title")}}</div>
                            <div class="amount">
                                <div class="amount-title">{{$t("presale.amount_title")}}</div>
                                <div class="amount-input">
                                    <input type="number" :value="inputBuy" v-on:keyup="getinputBuy" :maxlength="12" :min="0.1" :max="1" :precision="0" oninput="if(value.length>12)value=value.slice(0,12)">
                                </div>
                                <div class="amount-max">
                                    <a @click="getBalanceMax">
                                        {{$t("public.max")}}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="wallet-bnt">
                        <div class="wallet-balance">
                            <span> {{$t("public.balance")}} : {{walletBalance}} {{$t("currency.bnb")}}</span>
                        </div>
                        <div class="wallet-connect">
                            <v-btn v-if="!address" @click="connect">{{$t("public.connect_wallet")}}</v-btn>
                            <v-btn v-if="address" @click="exchange(inputBuy)">{{$t("public.exchange")}}</v-btn>
                        </div>
                        <div class="wallet-address" >
                            <span>
                                {{address}}
                            </span>
                            <v-btn v-if="address" @click="disconnect">{{$t("public.disconnect")}}</v-btn>
                        </div>
                    </div>
                    <div class="wallet-random">
                        <div class="wallet-random-subject">
                            <div class="text">{{$t("public.the_latest")}}</div>
                            <div class="text1" >{{gatRandomAddress}}</div>
                            <div class="text">{{$t("public.purchase") }} {{getRandomBalance}} {{$t("currency.bnb")}}</div>
                        </div>
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
        <!-- 绑定邀请人弹框 -->
        <v-overlay :absolute="false" :value="boundBulletState" class="bind-the-popup">
            <v-sheet class="px-7 pt-7 pb-4 mx-auto text-center d-inline-block" color="blue-grey ">
                <div class="mb-4">
                    <h3>{{$t("presale.start.bind_invitee_address")}}</h3>
                </div>
                <div class="text--lighten-1 text-body-2 mb-4">
                    {{getInviteeAddress}}
                </div>
                <v-btn class="ma-1" @click="bindInvitee" plain>{{$t("public.bind")}}</v-btn>
                <v-btn class="ma-1" color="error" plain @click="boundBulletState=false">{{$t("public.cancel")}}</v-btn>
            </v-sheet>
        </v-overlay>
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
import { abiObject, getAbi, web3 } from "utils/common";
const { contractObject: PerSaleObj } = getAbi(abiObject.PerSaleAbi);
// 倒计时组件
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
            // 绑定弹框状态
            boundBulletState:false,
            // 正在加载状态
            loadingState:false,
            // 输入购买余额
            inputBuy:0,
            // 我的预售
            myPresale:0,
            // 获取Pimoon
            getPimoon:0,
            // 随机列表
            randomList: [
                { address: "0x3A2d...", num: "1" },
                { address: "0x8a6F...", num: "2" },
                { address: "0x385f...", num: "3" },
                { address: "0x724e...", num: "4" },
                { address: "0x1284...", num: "5" },
                { address: "0x695a...", num: "6" },
                { address: "0x352a...", num: "7" },
                { address: "0x9e7f...", num: "8" },
                { address: "0x4252...", num: "9" },
                { address: "0x3746...", num: "10" },
                { address: "0x774a...", num: "11" },
                { address: "0xe226...", num: "12" },
            ],
            // 获取随机地址
            gatRandomAddress:"",
            // 获取随机余额
            getRandomBalance:""
        }
    },
    computed:{
        ...mapState([
            "address",
            "deadline",
            "inviteeAddress",
            "isInvited",
            "balanceof",
            "storeSwapRatio",
            "tokenDecimals"
        ]),
        // 获取邀请人地址
        getInviteeAddress(e){
            // 判断邀请人是否为空 否:获取邀请人 是:获取全局邀请人地址
            if (JSON.stringify(e.$route.query) != "{}") {
                return e.$route.query.address;
            }else{
                return this.inviteeAddress;
            }
        },
        // 钱包余额
        walletBalance(){
            // 判断地址是否为空
            if(this.address == ""){
                return 0;
            }else{
                return this.balanceof;
            }

        }
    },
    components: {
        baseCounter,
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
					// 处理我的邀请方法到全局
					this.myInvites(newVal)
                    // 更新邀请分享链接到全局
					this.updateInvitationLink(newVal)
                    // 获取邀请人
					this.getInvited(newVal)
				}
                // 判断地址是否为空
                if(newVal != ""){
                    //判断是否绑定邀请人 false未绑定 true已绑定
                    if(this.isInvited[1] == false){
                        this.loadingState = true;
                        setTimeout(()=>{
                            this.loadingState = false;
                            // 判断邀请人地址不等于当前用户地址
                            if(this.getInviteeAddress.toLowerCase() != this.address){
                                this.bondInvite();
                            }
                        },2000);
                    }
                }else{
                    this.inputBuy = 0;
                }
			},
			immediate: true,
        }
    },
    created() {
        this.getParticipateUpPresaleRandom();
        setTimeout(()=>{
            this.getUserLock();
        },2000)
    },
    methods: {
        ...mapMutations(["updateStoreSwapRatio","editAddress", "updateIsInvited","updateInvitationLink","updateMyspacepi", "updateInviteList","updateBalanceof"]),
        ...mapActions(["getInvited", "myInvites"]),
        // 连接钱包
        connect() {
            ethereum.request({method: "eth_requestAccounts"}).then(async (accounts) => {
                this.editAddress(accounts[0])
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
                    //window.location.reload();

                },2000)
                // 判断邀请人地址不等于当前用户地址
                if(this.getInviteeAddress.toLowerCase() != this.address){
                    // 判断是否绑定邀请人 false未绑定 true已绑定
                    if (isInvited[1]==false) {
                        this.bondInvite(isInvited);
                    }
                }
            })
		},
        // 绑定邀请人
        bondInvite() {
            // 获取正在时间戳
            const getIsTime = new Date().getTime();
            // 判断正在时间是否大于结束时间
            if(getIsTime > this.deadline)
            {
                return;
            }
            const h = this.$createElement;
            // 获取邀请人地址
            const getInviteeAddress = this.getInviteeAddress;
            // 判断地址是否存在
            if(this.address!="")
            {
                // 判断是否绑定邀请人 undefined未绑定
                if (this.isInvited[1] == false) {
                    this.boundBulletState = true;
                }
            }
        },
        // 弹框回调绑定邀请人
        bindInvitee(){
            // 判断邀请人地址是否等等于用户地址
            if(this.getInviteeAddress.toLowerCase() == this.address){
                this.alert = {
                    status : true,
                    type:"warning",
                    text:this.$t("alerts.bind_failed")
                }
                setTimeout(()=>{
                    this.alert = {
                        status: false,
                    }
                },2000);
                return;
            }
            this.loadingState = true;
            PerSaleObj.methods.bondInvite(this.getInviteeAddress).send({
                from: this.address,
            }).then(()=>{
                this.alert = {
                    status : true,
                    type:"success",
                    text:this.$t("alerts.bind_success")
                }
                setTimeout(()=>{
                    this.alert = {
                        status: false,
                    }
                },1500);
                this.boundBulletState = false;
                setTimeout(()=>{
                    this.loadingState = false;
                },2000);
            }).catch(()=>{
                this.alert = {
                    status : true,
                    type:"success",
                    text:this.$t("alerts.unbind")
                }
                setTimeout(()=>{
                    this.alert = {
                        status: false,
                    }
                },1500);
                this.boundBulletState = false;
                setTimeout(()=>{
                    this.loadingState = false;
                },2000);
            });
            // 获取触发全局邀请人方法
            this.getInvited(this.address);
        },
        // 获取输入余额
        getinputBuy(e){
            this.inputBuy = e.target.value;
        },
        // 获取钱包余额最大
        getBalanceMax(){
            // 获取钱包余额
            const getBalance = Number(this.balanceof);
            // 获取我的预售
            const myPresale = Number(this.myPresale);
            // 获取输入钱包余额最大
            const getInputMax = new this.$BigNumber(10).minus(new this.$BigNumber(myPresale)).toNumber();
            // 判断地址不等于空
            if(this.address != "")
            {
                // 判断获取输入钱包余额是否小于或等于当前钱包余额
                if (getInputMax <= getBalance) {
                    this.inputBuy = getInputMax;
                }else{
                    // 判断当前钱包余额减0.02小于0
                    if (Number(getBalance) - 0.02 < 0) {
                        this.inputBuy = 0;
                    }else{
                        this.inputBuy = Number(getBalance) - 0.02;
                    }
                }
            }
        },
        // 兑换
        exchange(){
            // 获取输入余额
            const getInputBuy = Number(this.inputBuy);
            // 获取钱包余额
            const getBalance = Number(this.balanceof);
            console.log(getInputBuy)
            // 判断获取输入余额小于0.1
            if (getInputBuy < 0.1) {
                this.alert = {
                    status : true,
                    type:"warning",
                    text:this.$t("alerts.warning_balance_min")
                }
                this.loadingState = true;
                setTimeout(()=>{
                    this.alert = {
                        status: false,
                    }
                },1500);
                setTimeout(()=>{
                    this.loadingState = false;
                },2000)
            }else if(getInputBuy > 10) // 判断获取输入余额大于10
            {
                this.alert = {
                    status : true,
                    type:"warning",
                    text:this.$t("alerts.warning_balance_max")
                }
                this.loadingState = true;
                setTimeout(()=>{
                    this.alert = {
                        status: false,
                    }
                },1500);
                setTimeout(()=>{
                    this.loadingState = false;
                },2000)
            }else if(getInputBuy > getBalance) // 判断获取输入余额是否大于获取钱包余额
            {
                this.alert = {
                    status : true,
                    type:"warning",
                    text:this.$t("alerts.warning_balance_insufficient")
                }
                this.loadingState = true;
                setTimeout(()=>{
                    this.alert = {
                        status: false,
                    }
                },1500);
                setTimeout(()=>{
                    this.loadingState = false;
                },2000)
            }else{
                this.loadingState = true;
                PerSaleObj.methods.buy().send({
                    from: this.address,
                    value: web3.utils.toWei(this.inputBuy + ""),
                }).then(()=>{
                    this.alert = {
                        status : true,
                        type:"success",
                        text:this.$t("alerts.exchange_success")
                    }
                    setTimeout(()=>{
                        this.alert = {
                            status: false,
                        }
                    },1500);
                    setTimeout(()=>{
                        this.loadingState = false;
                        this.updateBalanceof(this.walletBalance - this.inputBuy);
                    },2000)
                }).catch(()=>{
                    this.alert = {
                        status : true,
                        type:"warning",
                        text:this.$t("alerts.exchange_failed")
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
                });
            }
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
                this.getUserLock();
            },2000);
        },
        // 获取参与最新预售随机
        getParticipateUpPresaleRandom()
        {
            // 获取随机列表
            var getRandomList = this.randomList;
            var getRandomList = getRandomList[Math.floor(Math.random() * getRandomList.length)];
            // 获取随机地址
            this.gatRandomAddress = getRandomList.address;
            // 随机数小数点
            const random = Math.random() * 1.5;
            // 获取随机余额
            this.getRandomBalance = random.toFixed(1);
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
            .left-count{
                display: grid;
                grid-template-columns: 1fr 1fr;
                .soft-top{
                    display: grid;
                    grid-template-columns: 1fr;
                    grid-gap: 20px;
                    .title{
                        font-size: 18px;
                        font-family: Alibaba PuHuiTi-Regular;
                        font-weight: 400;
                        color: #0FBFFF;
                        line-height: 26px;
                    }
                    .text{
                        font-size: 26px;
                        font-family: Alibaba PuHuiTi-Bold;
                        font-weight: bold;
                        color: #FFFFFF;
                        line-height: 26px;
                    }
                }
                .hard-top{
                    display: grid;
                    grid-template-columns: 1fr;
                    grid-gap: 20px;
                    .title{
                        font-size: 18px;
                        font-family: Alibaba PuHuiTi-Regular;
                        font-weight: 400;
                        color: #0FBFFF;
                        line-height: 26px;
                    }
                    .text{
                        font-size: 26px;
                        font-family: Alibaba PuHuiTi-Bold;
                        font-weight: bold;
                        color: #FFFFFF;
                        line-height: 26px;
                    }
                }
            }
            .percentage{
                .v-progress-linear{
                    width: 500px;
                    border-radius: 20px;
                }
            }
            .presale-countdown{
                display: grid;
                grid-template-columns: 1fr;
                grid-gap: 20px;
                .title{
                    font-size: 18px;
                    font-family: Alibaba PuHuiTi-Regular;
                    font-weight: 400;
                    color: #FFFFFF;
                    line-height: 26px;
                }
                .count-down{
                    color: #FFFFFF;
                    font-size: 70px;
                    font-family: Alibaba PuHuiTi-Bold;
                    font-weight: bold;
                    line-height: 70px;
                }
            }
            .presale-text{
                display: grid;
                grid-template-columns: 1fr;
                grid-gap: 20px;
                span{
                    width: 500px;
                    font-size: 18px;
                    font-family: Alibaba PuHuiTi-Regular;
                    font-weight: 400;
                    color: #FFFFFF;
                    line-height: 26px;
                }
            }
            .presale-title{
                font-size: 40px;
                font-family: Alibaba PuHuiTi-Heavy;
                font-weight: 800;
                color: #0FBFFF;
                line-height: 30px;
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
// wallet-connection布局容器main
.wallet-connection-container-main{
    margin-top: 100px;
}
// wallet-connection布局容器
.wallet-connection-container{
    max-width: 1300px;
    .wallet-connection-subject{
        height: auto;
        .wallet-car{
            padding-top:30px;
            padding-bottom: 30px;
            background: rgba(56, 29, 98, 0.38);
            border-radius: 8px;
            backdrop-filter: blur(10px);
            display: grid;
            grid-template-columns: 1fr;
            grid-gap: 30px;
            .wallet-car-s{
                padding-left:30px;
                padding-right:30px;
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
                .wallet-car-type{
                    display: flex;
                    align-items: center;
                    .title{
                        font-size: 22px;
                        font-family:AlibabaPuHuiTi-2-85-Bold;
                        color: #0FBFFF;
                        line-height: 26px;
                    }
                    .text{
                        font-size: 24px;
                        font-family:AlibabaPuHuiTi-2-85-Bold;
                        color: #814BF6;
                        line-height: 26px;
                        margin-left: 50px;
                    }
                }
                .wallet-car-min{
                    display: flex;
                    justify-content: center;
                    align-items:center;
                    .title{
                        font-size: 22px;
                        font-family: AlibabaPuHuiTi-2-85-Bold;
                        color: #0FBFFF;
                        line-height: 26px;
                    }
                    .text{
                        font-size: 24px;
                        font-family: AlibabaPuHuiTi-2-85-Bold;
                        color: #FFFFFF;
                        line-height: 26px;
                        margin-left: 50px;
                    }

                }
                .wallet-car-max{
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                    .title{
                        font-size: 22px;
                        font-family: AlibabaPuHuiTi-2-85-Bold;
                        color: #0FBFFF;
                        line-height: 26px;
                    }
                    .text{
                        font-size: 24px;
                        font-family: AlibabaPuHuiTi-2-85-Bold;
                        color: #FFFFFF;
                        line-height: 26px;
                        margin-left: 50px;
                    }
                }
            }
            .wallet-car-ratio{
                display: flex;
                padding-left:30px;
                padding-right:30px;
                align-items:center;
                .title{
                    font-size: 22px;
                    font-family: AlibabaPuHuiTi-2-85-Bold;
                    color: #0FBFFF;
                    line-height: 26px;
                }
                .text{
                    font-size: 24px;
                    font-family: AlibabaPuHuiTi-2-85-Bold;
                    color: #FFFFFF;
                    line-height: 26px;
                    margin-left: 50px;
                }
            }
            .wallet-car-line{
                height: 7px;
                background: linear-gradient(90deg, #54ACFC 0%, #814BF6 100%);
            }
            .wallet-car-amount{
                display: grid;
                padding-left:30px;
                padding-right:30px;
                .title{
                    display: none;
                }
                .amount{
                    display: grid;
                    grid-template-columns: 1fr 1fr 1fr;
                    padding-left:30px;
                    padding-right:30px;
                    border: 1px solid #814BF6;
                    border-radius: 8px;
                    align-items:center;
                    height: 97px;
                    .amount-title{
                        font-size: 36px;
                        font-family:AlibabaPuHuiTi-2-85-Bold;
                        color: #FFFFFF;
                        line-height: 26px;
                        width: 410px;
                    }
                    .amount-input{
                        display: flex;
                        justify-content: center;
                        margin-left: 150px;
                        input{
                            width: 297px;
                            height: 73px;
                            background: #250144;
                            border-radius: 100px;
                            font-size: 34px;
                            font-family: AlibabaPuHuiTi-2-95-ExtraBold;
                            color: #814BF6;
                            line-height: 26px;
                            text-align: center;
                            border: 0;
                            outline:none;
                        }
                        /* 在Chrome浏览器下 */
                        input::-webkit-outer-spin-button,
                        input::-webkit-inner-spin-button {
                            -webkit-appearance: none;
                        }
                        /* 在Firefox浏览器下 */
                        input[type="number"]{
                            -moz-appearance: none;
                        }

                    }
                    .amount-max{
                        text-align: right;
                        font-size: 22px;
                        font-family: AlibabaPuHuiTi-2-95-ExtraBold;
                        color: #814BF6;
                        line-height: 26px;
                    }
                }
            }
        }
        .wallet-bnt{
            margin-top:30px;
            display: grid;
            grid-template-columns: 1fr;
            grid-gap: 30px;
            .wallet-balance{
                font-size: 26px;
                font-family: AlibabaPuHuiTi-2-85-Bold;
                color: #0FBFFF;
                line-height: 26px;
            }
            .wallet-connect{
                .v-btn{
                    width: 399px;
                    height: 82px;
                    background: #814BF6;
                    border-radius: 4px;
                    font-size: 30px;
                    font-family: AlibabaPuHuiTi-2-45-Light;
                    color: #FFFFFF;
                    line-height: 36px;
                }
            }
            .wallet-address{
                display: flex;
                grid-gap: 30px;
                justify-content: center;
                align-items: center;
                span{
                    font-size: 18px;
                    font-family: AlibabaPuHuiTi-2-85-Bold;
                    color: #0FBFFF;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
                .v-btn{
                    height: 50px;
                    background: #814BF6;
                    border-radius: 4px;
                    font-size: 20px;
                    font-family: AlibabaPuHuiTi-2-45-Light;
                    color: #FFFFFF;
                    line-height: 50px;
                }
            }
        }
        .wallet-random{
            margin-top:50px;
            display: flex;
            justify-content: center;
            .wallet-random-subject{
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
                width: 984px;
                height: 82px;
                background: rgba(56, 29, 98, 0.2);
                border-radius: 100px;
                align-items:center;
                backdrop-filter: blur(10px);
                .text{
                    font-size: 22px;
                    font-family: AlibabaPuHuiTi-2-55-Regular;
                    color: #FFFFFF;
                    line-height: 26px;
                }
                .text1{
                    font-size: 22px;
                    font-family: Alibaba PuHuiTi-Regular;
                    font-weight: 400;
                    color: #814BF6;
                    line-height: 26px;
                }
            }
        }
    }
}
// rules-connection布局容器main
.rules-connection-main{}
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

// 绑定邀请人弹框
.bind-the-popup{
    .v-sheet{
        border-radius:10px;
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
        margin-top:calc(100vw * -200 / 600);
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
                .left-count{
                    .soft-top{
                        .title{
                            font-size: 14px;
                            font-family: AlibabaPuHuiTi-2-55-Regular;
                            line-height: 26px;
                        }
                        .text{
                            font-size: 18px;
                            font-family: AlibabaPuHuiTi-2-85-Bold;
                            line-height: 26px;
                        }
                    }
                    .hard-top{
                        .title{
                            font-size: 14px;
                            font-family: AlibabaPuHuiTi-2-55-Regular;
                            line-height: 26px;
                        }
                        .text{
                            font-size: 18px;
                            font-family: AlibabaPuHuiTi-2-85-Bold;
                            line-height: 26px;
                        }
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
                        font-size: calc(100vw * 70 / 600);
                        line-height: calc(100vw * 70 / 600);
                    }
                }
                .presale-text{
                    span{
                        width: 100%;
                        font-family: AlibabaPuHuiTi-2-55-Regular;
                        color: rgba(255, 255, 255, 0.6);
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
    // wallet-connection布局容器main
    .wallet-connection-container-main{
        margin-top: 0;
    }
    // wallet-connection布局容器
    .wallet-connection-container{
        .wallet-connection-subject{
            padding-top: 20px;
            padding-bottom: 20px;
            background: rgba(56, 29, 98, 0.38);
            border-radius: 8px;
            backdrop-filter: blur(10px);
            .wallet-car{
                padding-top: 0px;
                padding-bottom: 0px;
                background: none;
                backdrop-filter: none;
                .wallet-car-s{
                    padding-left:20px;
                    padding-right:20px;
                    .wallet-car-type{
                        display: grid;
                        grid-template-columns: 1fr;
                        grid-gap: 0px;
                        justify-items: flex-start;
                        .title{
                            font-size: 14px;
                            line-height: 26px;
                        }
                        .text{
                            font-size: 16px;
                            line-height: 26px;
                            margin-left: 0;
                        }
                    }
                    .wallet-car-min{
                        display: grid;
                        grid-template-columns: 1fr;
                        grid-gap: 0px;
                        .title{
                            font-size: 14px;
                            line-height: 26px;
                        }
                        .text{
                            font-size: 14px;
                            line-height: 26px;
                            margin-left: 0;
                        }
                    }
                    .wallet-car-max{
                        display: grid;
                        grid-template-columns: 1fr;
                        grid-gap: 20px;
                        justify-items: flex-end;
                        .title{
                            font-size: 14px;
                            line-height: 26px;
                        }
                        .text{
                            font-size: 14px;
                            line-height: 26px;
                            margin-left: 0;
                        }
                    }
                }
                .wallet-car-ratio{
                    display: grid;
                    grid-gap:10px;
                    justify-items: flex-start;
                    padding-left:20px;
                    padding-right:20px;
                    .title{
                        font-size: 14px;
                        line-height: 26px;
                    }
                    .text{
                        margin-left: 0;
                        font-size: calc(100vw * 22.5 / 600);
                        line-height: calc(100vw * 25 / 600);
                    }
                }
                .wallet-car-amount{
                    padding-left:20px;
                    padding-right:20px;
                    grid-gap: 20px;
                    .title{
                        display: block;
                        font-size: 18px;
                        font-family: AlibabaPuHuiTi-2-85-Bold;
                        color: #0FBFFF;
                        line-height: 26px;
                    }
                    .amount{
                        border-radius: 100px;
                        height: 51px;
                        grid-template-columns: 1fr 1fr;
                        .amount-title{
                            display: none;
                        }
                        .amount-input{
                            margin-left:0;
                            input{
                                width: calc(100vw * 300 / 600);
                                height: 51px;
                                background: none;
                                font-size: 24px;
                                line-height: 18px;
                            }
                        }
                        .amount-max{
                            font-size: 16px;
                            line-height: 26px;
                        }
                    }
                }
            }
            .wallet-bnt{
                .wallet-balance{
                    font-size: 18px;
                    line-height: 26px;
                }
                .wallet-connect{
                    .v-btn{
                        width: 180px;
                        height: 37px;
                        font-size: 16px;
                        line-height: 16px;
                    }
                }
                .wallet-address{
                    padding-left: 20px;
                    padding-right: 20px;
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    justify-items: center;
                    span{
                        white-space:nowrap;
                        overflow:hidden;
                        text-overflow:ellipsis;
                        width: 100%;
                        max-width: 100px;
                    }
                    .v-btn{
                        width: 150px;
                        height: 37px;
                        font-size: 16px;
                        line-height: 16px;
                    }
                }
            }
            .wallet-random{
                .wallet-random-subject{
                    background: none;
                    width: 100%;
                    backdrop-filter: none;
                    .text{
                        font-size: 12px;
                        line-height: 26px;
                        color: rgba(255, 255, 255, 0.6)
                    }
                    .text1{
                        font-size: 12px;
                        line-height: 26px;
                        color: rgba(129, 75, 246, 0.6)
                    }
                }
            }
        }
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
            .left-s{
                grid-gap: 30px;
                .left-count{
                    .soft-top{
                        grid-gap: 30px;
                    }
                }
                .percentage{
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
                        font-size: calc(100vw * 100 / 960);
                        line-height: calc(100vw * 100 / 960);
                    }
                }
                .presale-text{
                    grid-gap: 30px;
                    span{
                        width: 100%;
                        color:rgba(255, 255, 255, 0.6);
                        font-family: AlibabaPuHuiTi-2-55-Regular;
                        font-weight: normal;
                        font-size: 20px;
                        line-height: 28px;
                    }
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
    // wallet-connection布局容器main
    .wallet-connection-container-main{
        margin-top: 0;
    }
    // wallet-connection布局容器
    .wallet-connection-container{
        padding-left: 58px;
        padding-right: 58px;
        .wallet-connection-subject{
            padding-top: 30px;
            padding-bottom: 30px;
            background: rgba(56, 29, 98, 0.38);
            border-radius: 16px;
            backdrop-filter: blur(10px);
            .wallet-car{
                background: none;
                backdrop-filter: blur(0px);
                .wallet-car-s{
                    .wallet-car-type{
                        display: grid;
                        grid-template-columns: 1fr;
                        grid-gap: 20px;
                        justify-items: flex-start;
                        .text{
                            margin-left: 0;
                        }
                    }
                    .wallet-car-min{
                        display: grid;
                        grid-template-columns: 1fr;
                        grid-gap: 20px;
                        .text{
                            margin-left: 0;
                        }
                    }
                    .wallet-car-max{
                        display: grid;
                        grid-template-columns: 1fr;
                        grid-gap: 20px;
                        justify-items: flex-end;
                        .text{
                            margin-left: 0;
                        }
                    }
                }
                .wallet-car-ratio{
                    display: grid;
                    grid-gap: 20px;
                    justify-items: flex-start;
                    .text{
                        margin-left: 0;
                    }
                }
                .wallet-car-amount{
                    grid-gap: 30px;
                    .title{
                        display: block;
                        font-size: 30px;
                        font-family: AlibabaPuHuiTi-2-85-Bold;
                        color: #0FBFFF;
                        line-height: 26px;
                    }
                    .amount{
                        border-radius: 100px;
                        height: 85px;
                        grid-template-columns: 1fr 1fr;
                        .amount-title{
                            display: none;
                        }
                        .amount-input{
                            margin-left:calc(100vw * 50 / 960);
                            input{
                                background: none;
                            }
                        }
                        .amount-max{

                        }
                    }
                }
            }
            .wallet-bnt{
                .wallet-connect{
                    .v-btn{
                        width: 50%;
                        height: 62px;
                        font-size: 20px;
                        line-height: 26px;
                    }
                }
                .wallet-address{
                    padding-left: 30px;
                    padding-right: 30px;
                    span{
                        width: 300px;
                    }
                    .v-btn{
                        width: 170px;
                        height: 50px;
                        font-size: 18px;
                        line-height: 16px;
                    }
                }
            }
            .wallet-random{
                .wallet-random-subject{
                    background: none;
                    width: 100%;
                    backdrop-filter: blur(0);
                    .text{
                        font-size: 20px;
                        line-height: 20px;
                        color: rgba(255, 255, 255, 0.6)
                    }
                    .text1{
                        font-size: 20px;
                        line-height: 20px;
                        color: rgba(129, 75, 246, 0.6)
                    }
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
                grid-gap: 10px;
                .left-count{
                    .soft-top{
                        grid-gap: 10px;
                        .title{
                            font-size: 15px;
                            line-height: 23px;
                        }
                        .text{
                            font-size: 23px;
                            line-height: 23px;
                        }
                    }
                    .hard-top{
                        grid-gap: 10px;
                        .title{
                            font-size: 15px;
                            line-height: 23px;
                        }
                        .text{
                            font-size: 23px;
                            line-height: 23px;
                        }
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
                        font-size: 55px;
                        line-height: 55px;
                    }
                }
                .presale-text{
                    grid-gap: 10px;
                    span{
                        width: 400px;
                        font-size: 15px;
                        line-height: 20px;
                    }
                }
                .presale-title{
                    font-size: 35px;
                    font-weight: 700;
                    line-height: 35px;
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
    // wallet-connection布局容器
    .wallet-connection-container{
        padding-left: 58px;
        padding-right: 58px;
        .wallet-connection-subject{
            .wallet-car{
                .wallet-car-s{
                    .wallet-car-type{
                        .title{
                            font-size: 20px;
                            line-height: 24px;
                        }
                        .text{
                            font-size: 22px;
                            line-height: 24px;
                        }
                    }
                    .wallet-car-min{
                        .title{
                            font-size: 20px;
                            line-height: 24px;
                        }
                        .text{
                            font-size: 22px;
                            line-height: 24px;
                        }
                    }
                    .wallet-car-max{
                        .title{
                            font-size: 20px;
                            line-height: 24px;
                        }
                        .text{
                            font-size: 22px;
                            line-height: 24px;
                        }
                    }
                }
                .wallet-car-ratio{
                    .title{
                        font-size: 20px;
                        line-height: 24px;
                    }
                    .text{
                        font-size: 22px;
                        line-height: 24px;
                        margin-left: 50px;
                    }
                }
                .wallet-car-amount{
                    .amount{
                        height: 80px;
                        .amount-title{
                            font-size: calc(100vw * 30 / 1264);
                            line-height: calc(100vw * 20 / 1264);
                            width: calc(100vw * 350 / 1264);
                        }
                        .amount-input{
                            margin-left: calc(100vw * 50 / 1264);
                            input{
                                width: 200px;
                                height: 65px;
                                font-size: 30px;
                                line-height: 22px;
                            }
                        }
                    }
                }
            }
            .wallet-bnt{
                .wallet-balance{
                    font-size: 20px;
                }
                .wallet-connect{
                    .v-btn{
                        width: 300px;
                        height: 60px;
                        font-size: 25px;
                        line-height: 30px;
                    }
                }
            }
            .wallet-random{
                .wallet-random-subject{
                    width: 750px;
                    height: 72px;
                    .text{
                        font-size: 18px;
                        line-height: 20px;
                    }
                    .text1{
                        font-size: 18px;
                        line-height: 20px;
                    }
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
    // wallet-connection布局容器
    .wallet-connection-container{
        max-width: 1200px;
        .wallet-connection-subject{
            .wallet-car{
                .wallet-car-amount{
                    .amount{
                        .amount-title{
                            font-size: 30px;
                            line-height: 20px;
                            width: 350px;
                        }
                    }
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