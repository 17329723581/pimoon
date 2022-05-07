<template>
    <!-- 容器 -->
    <v-app class="app-container">
        <!-- 警告状态提示框 -->
        <alert :status="alert.status" :text="alert.text" :type="alert.type"></alert>
        <!-- 顶部菜单栏 -->
        <topMenuBar></topMenuBar>
        <!-- promo布局容器main -->
        <div class="promo-container-main">
            <!-- promo布局容器 -->
            <v-container class="promo-container">
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
        <!-- random布局容器main -->
        <div class="random-container-main">
            <!-- promo布局容器 -->
            <v-container class="random-container">
                <div class="random">
                    <div class="random-subject">
                        <div class="text">{{$t("public.the_latest")}}</div>
                        <div class="text1" >{{gatRandomAddress}}</div>
                        <div class="text">{{$t("public.purchase") }} {{getRandomBalance}} {{$t("currency.bnb")}}</div>
                    </div>
                </div>
            </v-container>
        </div>
        <!-- promo-car布局容器main -->
        <div class="promo-car-container-main">
            <!-- promo-car布局容器 -->
            <v-container class="promo-car-container">
                <div class="subject">
                    <div class="car">
                        <span class="title">{{$t("airdrop.pimoon_airdrop")}}</span>
                        <span class="text" v-if="address!=''">{{storeMyTotalspacepi}}</span>
                        <span class="text" v-else>0</span>
                    </div>
                    <div class="car">
                        <span class="title">{{$t("promo.presale_friends_number")}}</span>
                        <span class="text" v-if="address!=''">{{pimoonAirdropCount}}</span>
                        <span class="text" v-else>0</span>
                    </div>
                    <div class="car">
                        <span class="title">{{$t("promo.total_invitation_amount")}}</span>
                        <span class="text" v-if="address!=''">{{myInvitationCount}}</span>
                        <span class="text" v-else>0</span>
                    </div>
                    <div class="car">
                        <span class="title">{{$t("promo.reward_amount")}}</span>
                        <span class="text" v-if="address!=''">{{invitationRewardsCount}}</span>
                        <span class="text" v-else>0</span>
                    </div>
                    <div class="car-line"></div>
                </div>
            </v-container>
        </div>
        <!-- rceive布局容器main -->
        <div class="rceive-container-main">
            <!-- rceive布局容器 -->
            <v-container class="rceive-container">
                <v-btn v-if="storeInviteLink[0].split('?')[1].split('&')[0].split('=')[1] != '' && airdropStatus == true && isInvited[1] == true" style="background:#808080">{{$t("public.rceive")}}</v-btn>
                <v-btn v-if="storeInviteLink[0].split('?')[1].split('&')[0].split('=')[1] != '' && airdropStatus == false && isInvited[1] == true" @click="rceiveAirdrop">{{$t("public.rceive")}}</v-btn>
                <v-btn v-if="storeInviteLink[0].split('?')[1].split('&')[0].split('=')[1] != '' && airdropStatus == false && isInvited[1] == false" style="background:#808080">{{$t("public.not_available")}}</v-btn>
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
                            {{ storeInviteLink[0]}}
                        </div>
                    </div>
                    <div class="link-copy">
                        <v-btn v-clipboard:copy="storeInviteLink[0]" v-clipboard:success="onCopy">Copy</v-btn>
                    </div>
                    <div class="link-explain">
                        <span>
                            {{$t("airdrop.link_explain")}}
                        </span>
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
        <!-- 邀请成员布局容器main -->
        <div class="invite-members-connection-main">
            <!-- 邀请成员布局容器 -->
            <v-container class="invite-members-connection">
                <div class="subject">
                    <div class="title">{{$t("promo.invite_members.title")}}</div>
                    <div class="table">
                        <div class="head">
                            <span>{{$t("promo.invite_members.head1")}}</span>
                            <span>{{$t("promo.invite_members.head2")}}</span>
                        </div>
                        <template v-if="address!=''">
                            <div class="content" v-for="(item, index) of storeInviteList" :key="index">
                                <div class="content-s">
                                    <span class="index">{{ index + 1 > 9 ? index + 1 : "" + (index + 1) }}</span>
                                    <span class="address">{{ item }}</span>
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
            </v-container>
        </div>
        <!-- rules-connection布局容器main 通用样式 邀请规则-->
        <div class="rules-connection-main">
            <!-- rules-connection布局容器  通用样式 邀请规则-->
            <v-container class="rules-connection">
                <div class="subject">
                    <div class="rules">
                        <span class="rules-title">{{$t("promo.invite_rules.title")}}</span>
                        <div class="rules-text">
                            <span>{{$t("promo.invite_rules.text1")}}</span>
                            <span>{{$t("promo.invite_rules.text2")}}</span>
                            <span>{{$t("promo.invite_rules.text3")}}</span>
                        </div>
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
// 引入页面
import subjectMain from "@/components/subjectMain.vue"
import topMenuBar from "@/components/topMenuBar.vue"
// 倒计时组件
import baseCounter from "@/components/baseCounter.vue"
// 引入全局
import { mapState, mapActions, mapMutations } from "vuex";
// 引入we3js方法
import { abiObject, getAbi, web3 } from "utils/common";
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
            // 正在加载状态
            loadingState:false,
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
            getRandomBalance:"",
            // pimoon空投总数量
            pimoonAirdropCount: 0,
            // 我的邀请数量
			myInvitationCount: 0,
            // 邀请奖励数量
			invitationRewardsCount: 0,
        }
    },
    components: {
        topMenuBar,
        subjectMain,
        baseCounter,
        alert
    },
    watch: {
        // 地址
        address: {
            handler(newVal, oldVal) {
                // 判断地址是否为空
				if (newVal != "") {
                    // 更新邀请分享链接到全局
					this.updateInvitationLink(newVal)
                    this.myInvites(this.address)
				}
			},
			immediate: true,
        }
    },
    computed:{
        ...mapState([
            "address",
            "deadline",
            "storeMyTotalspacepi",
            "storeInviteLink",
            "isInvited",
            "storeInviteList",
            "storeSwapRatio",
            "tokenDecimals"
        ]),
        // 空投状态:false结束 true开始
        airdropStatus() {
            // 判断结束时间小于当前时间
            if (this.deadline < new Date().getTime()) {
                return false;
            }else{
                return true;
            }
        }
    },
    created() {
        //this.myInvites(this.address)
        this.getParticipateUpPresaleRandom();
        setTimeout(()=>{
            this.getPimoonAirdropTotalCount();
        },1500)
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
                this.updateInvitationLink(this.address);
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
        // 获取Pimoon空投总数量
        async getPimoonAirdropTotalCount(){
                // 声明变量:pimoon空投总数量
                let pimoonAirdropCount = 0;
                // 声明变量:我的邀请数量
                let myInvitationCount = new this.$BigNumber(0);
                // 循环:全局邀请列表
                console.log(this.storeInviteList)
                for (let i = 0; i < this.storeInviteList.length; i++) {
                    const userLockList = await PerSaleObj.methods.getUserLock(this.storeInviteList[i]).call();
                    // 判断当前用户大于0
                    if (Number(userLockList[0]) > 0) {
                        // 全部Token
						myInvitationCount = myInvitationCount.plus(new this.$BigNumber(userLockList[0]));
                        // pimoon空投总数量
                        pimoonAirdropCount += 1;
					}
                }
                // 邀请邀请百分比
                const invitePercentage = await PerSaleObj.methods.invitePercentage().call();
                // Presale friends空投总数量
                this.pimoonAirdropCount = pimoonAirdropCount;

                // 全局交换比率
                const storeSwapRatio = new this.$BigNumber(this.storeSwapRatio)
                //Token
                const tokenDecimals = 10 ** this.tokenDecimals;
                // 我的邀请数量
                myInvitationCount = myInvitationCount.dividedBy(storeSwapRatio).dividedBy(new this.$BigNumber(tokenDecimals)).toFixed(4);
                this.myInvitationCount = Object.is(Number(myInvitationCount), NaN)?0:myInvitationCount;

                //奖励总数量
                const rewardsCount = new this.$BigNumber(Number(this.myInvitationCount)).multipliedBy(new this.$BigNumber(invitePercentage)).dividedBy(new this.$BigNumber(100)).toString();
                // 邀请奖励数量
                this.invitationRewardsCount =  Object.is(Number(rewardsCount), NaN)?0:rewardsCount;
        },
        // 领取空投
        rceiveAirdrop(){
            this.loadingState = true;
            PerSaleObj.methods.airdrop().send({
                from: this.address,
                value: web3.utils.toWei("0.0025"),
            }).then(()=>{
                this.alert = {
                    status : true,
                    type:"success",
                    text:this.$t("alerts.receive_airdrop_success")
                }
                setTimeout(()=>{
                    this.alert = {
                        status: false,
                    }
                },1500);
                setTimeout(()=>{
                    this.loadingState = false;
                },2000);
            }).catch(()=>{
                this.alert = {
                    status : true,
                    type:"error",
                    text:this.$t("alerts.receive_airdrop_error")
                }
                setTimeout(()=>{
                    this.alert = {
                        status: false,
                    }
                },1500);
                setTimeout(()=>{
                    this.loadingState = false;
                },2000);
            });
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
.promo-container-main{
    background: #110C3F;
}
// airdrop布局容器
.promo-container{
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
        display: flex;
        justify-content: center;
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
// random布局容器main
.random-container-main{
    margin-top:100px
}
// rules-connection布局容器main
.rules-connection-main{}
// random-container
.random-container{
    max-width: 1300px;
    .random{
        display: flex;
        justify-content: center;
        .random-subject{
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            width: 984px;
            height: 82px;
            background: rgba(56, 29, 98, 0.1);
            border-radius: 8px;
            backdrop-filter: blur(10px);
            align-items:center;
            .text{
                font-size: 22px;
                font-family: Alibaba PuHuiTi-Regular, Alibaba PuHuiTi;
                font-weight: 400;
                color: #FFFFFF;
                line-height: 26px;
            }
            .text1{
                font-size: 22px;
                font-family: Alibaba PuHuiTi-Regular, Alibaba PuHuiTi;
                font-weight: 400;
                color: #814BF6;
                line-height: 26px;
            }
        }
    }
}
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
// promo-car布局容器
.promo-car-container{
    max-width: 1300px;
    .subject{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        width: 100%;
        background: rgba(56, 29, 98, 0.38);
        border-radius: 8px;
        backdrop-filter: blur(10px);
        height: 175px;
        align-items: center;
        position: relative;
        .car{
            display: grid;
            grid-template-columns: 1fr;
            grid-gap: 30px;
            .title{
                font-size: 18px;
                font-family: AlibabaPuHuiTi-2-85-Bold;
                font-weight: normal;
                color: #0FBFFF;
                line-height: 26px;
            }
            .text{
                font-size: 36px;
                font-family: AlibabaPuHuiTi-2-85-Bold;
                font-weight: normal;
                color: #FFFFFF;
                line-height: 26px;
            }
        }
        .car-line{
            position: absolute;
            width: 100%;
            height: 7px;
            background: linear-gradient(90deg, #54ACFC 0%, #814BF6 100%);
            box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);
            border-radius: 0px 0px 8px 8px;
            bottom: 0;

        }
    }
}
// rceive布局容器
.rceive-container{
    .v-btn{
        width: 272px;
        height: 56px;
        background: #814BF6;
        border-radius: 4px;
        font-size: 22px;
        font-family: AlibabaPuHuiTi-2-45-Light;
        color: #FFFFFF;
        line-height: 26px;
    }
}
// 邀请成员布局容器
.invite-members-connection{
    color:#0FBFFF;
    max-width: 1300px;
    .subject{
        display: grid;
        grid-gap: 50px;
        text-align:left;
        .title{
            font-size: 22px;
            font-family: AlibabaPuHuiTi-2-85-Bold;
            color: #FFFFFF;
            line-height: 26px;
        }
        .table{
            display: grid;
            .head{
                width: 100%;
                height: 77px;
                background: linear-gradient(84deg, #814BF6 0%, #0FBFFF 100%);
                border-radius: 8px 8px 0px 0px;
                display: grid;
                grid-template-columns: 1fr 1fr;
                align-items: center;
                justify-items: center;
                span{
                    font-size: 22px;
                    font-family: AlibabaPuHuiTi-2-85-Bold;
                    font-weight: normal;
                    color: #FFFFFF;
                    line-height: 26px;
                }
            }
            .content-s{
                height: 77px;
                display: grid;
                grid-template-columns: 1fr 1fr;
                align-items: center;
                justify-items: center;
                border-bottom: 1px solid #35016A;
                .index{
                    font-size: 30px;
                    font-family: Alibaba PuHuiTi-Bold;
                    font-weight: bold;
                    color: #FFFFFF;
                    line-height: 26px;
                }
                .address{
                    font-size: 22px;
                    font-family: Alibaba PuHuiTi-Regular;
                    font-weight: 400;
                    color: #FFFFFF;
                    line-height: 26px;
                }
            }
        }
    }
}

// 小型号到大型号的手机
@media screen and (max-width:600px){
    // promo布局容器main
    .promo-container-main{
        background: none;
    }
    // promo布局容器
    .promo-container{
        grid-template-columns: 1fr;
        margin-top: calc(100vw * -200 / 600);
        display: grid;
        height:auto;
        .m-left{
            position: relative;
            align-self: center;
            display: flex;
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
    // random布局容器main
    .random-container-main{
        margin-top:0
    }
    // random-container
    .random-container{
        .random{
            width: 100%;
            .random-subject{
                width: 100%;
                background: rgba(56, 29, 98, 0.2);
                height: 36px;
                .text{
                    font-size: 12px;
                    font-family: AlibabaPuHuiTi-2-55-Regular;
                    font-weight: normal;
                }
                .text1{
                    font-size: 12px;
                    font-family: AlibabaPuHuiTi-2-55-Regular;
                    font-weight: normal;
                }
            }
        }
    }
    // promo-car布局容器
    .promo-car-container{
        .subject{
            grid-template-columns: 1fr;
            height: auto;
            grid-gap: 30px;
            padding: 20px;
            border: 1px solid #814BF6;
            background: none;
            backdrop-filter: none;
            .car{
                display: grid;
                grid-template-columns: 1fr 1fr;
                .title{
                    display: flex;
                    justify-self: start;
                    color: #814BF6;
                    font-size: 12px;
                    text-align: left;
                }
                .text{
                    display: flex;
                    justify-self: end;
                    font-size: 18px;
                }
            }
            .car-line{
                display: none;
            }
        }
    }
    // rceive布局容器
    .rceive-container{
        .v-btn{
            width: 187px;
            height: 42px;
            font-size: 16px;
        }
    }
    // 邀请成员布局容器
    .invite-members-connection{
        .subject{
            grid-gap: 20px;
            .title{
                font-size: 16px;
                font-family: AlibabaPuHuiTi-2-85-Bold;
                font-weight: normal;
                color: #0FBFFF;
                line-height: 26px;
            }
            .table{
                .head{
                    height: 50px;
                    span{
                        font-size: 18px;
                    }
                }
                .content-s{
                    height: 50px;
                    .index{
                        font-size: 20px;
                    }
                    .address{
                        font-size: 20px;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        -o-text-overflow: ellipsis;
                        width: 200px;
                    }
                }
            }
        }
    }
}
// 小型号到中型号的平板
@media screen and (min-width:600px) and (max-width:960px){
    // promo布局容器main
    .promo-container-main{
        background: none;
    }
    // promo布局容器
    .promo-container{
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
    // random布局容器main
    .random-container-main{
        margin-top:0
    }
    // random-container
    .random-container{
        padding-left: 58px;
        padding-right: 58px;
    }
    // promo-car布局容器
    .promo-car-container{
        padding-left: 58px;
        padding-right: 58px;
        .subject{
            grid-template-columns: 1fr;
            height: auto;
            grid-gap: 30px;
            padding: 32px;
            border: 1px solid #814BF6;
            background: none;
            backdrop-filter: none;
            .car{
                display: grid;
                grid-template-columns: 1fr 1fr;
                .title{
                    display: flex;
                    justify-self: start;
                    color: #814BF6;
                }
                .text{
                    display: flex;
                    justify-self: end;
                }
            }
            .car-line{
                display: none;
            }
        }
    }
    // rceive布局容器
    .rceive-container{
        .v-btn{
            width: 187px;
            height: 63px;
            font-size: 22px;
        }
    }
    // 邀请成员布局容器
    .invite-members-connection{
        padding-left: 58px;
        padding-right: 58px;
        .subject{
            grid-gap: 35px;
            .title{
                font-size: 26px;
                font-family: AlibabaPuHuiTi-2-85-Bold;
                font-weight: normal;
                color: #0FBFFF;
                line-height: 26px;
            }
            .table{
                .head{
                    height: 60px;
                    span{
                        font-size: 20px;
                    }
                }
                .content-s{
                    height: 60px;
                    .index{
                        font-size: 22px;
                    }
                    .address{
                        font-size: 22px;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        -o-text-overflow: ellipsis;
                        width: 200px;
                    }
                }
            }
        }
    }
}
// 小型号到中型号的平板
@media screen and (min-width:960px) and (max-width:1264px){
    // promo布局容器
    .promo-container{
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
    // rules-connection布局容器
    .rules-connection{
        padding-left: 58px;
        padding-right: 58px;
    }
    // copy-connection布局容器
    .copy-connection{
        padding-left: 58px;
        padding-right: 58px;
    }
    // random-container
    .random-container{
        padding-left: 58px;
        padding-right: 58px;
    }
    // promo-car布局容器
    .promo-car-container{
        padding-left: 58px;
        padding-right: 58px;
        .subject{
            .car{
                .title{
                    font-size:calc(100vw * 18 / 1246);
                    line-height:calc(100vw * 26 / 1246);
                }
                .text{
                    font-size: calc(100vw * 36 / 1246);
                    line-height: calc(100vw * 26 / 1246);
                }
            }
        }
    }
    // 邀请成员布局容器
    .invite-members-connection{
        padding-left: 58px;
        padding-right: 58px;
        .table{
            .content-s{
                .address{
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    -o-text-overflow: ellipsis;
                    width: 400px;
                }
            }
        }
    }
}
// 桌面端
@media screen and (min-width:1264px) and (max-width:1904px){
    // promo布局容器
    .promo-container{
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
    // rules-connection布局容器
    .rules-connection{
        max-width: 1200px;
    }
    // copy-connection布局容器
    .copy-connection{
        max-width: 1200px;
    }
    // random-container
    .random-container{
        max-width: 1200px;
    }
    // promo-car布局容器
    .promo-car-container{
        max-width: 1200px;
    }
    // 邀请成员布局容器
    .invite-members-connection{
        max-width: 1200px;
        .table{
            .content-s{
                .address{
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    -o-text-overflow: ellipsis;
                    width: 400px;
                }
            }
        }
    }
}
// 4K 和超宽屏幕
@media screen and (min-width:1904px){}
</style>