<template>
    <div class="subjectMain">
        <!-- propaganda布局容器main -->
        <div class="propaganda-container-main">
            <!-- propaganda布局容器 -->
            <v-container class="propaganda-container">
                <div class="propaganda">
                    <div class="propaganda-img">
                        <v-img class="v-img" src="@/assets/ip.svg"></v-img>
                    </div>
                    <div class="propaganda-content">
                        <span class="title">{{$t("home.propaganda.ip.title")}}</span>
                        <span class="text">{{$t("home.propaganda.ip.text")}}</span>
                    </div>
                </div>
                <div class="propaganda">
                    <div class="m-propaganda-img">
                        <v-img class="v-img" src="@/assets/rocket.svg"></v-img>
                    </div>
                    <div class="propaganda-content">
                        <span class="title">{{$t("home.propaganda.rocket.title")}}</span>
                        <span class="text">{{$t("home.propaganda.rocket.text")}}</span>
                    </div>
                    <div class="propaganda-img rocket">
                        <v-img class="v-img"  src="@/assets/rocket.svg"></v-img>
                    </div>
                </div>
            </v-container>
        </div>
        <!-- completed布局容器main -->
        <div class="completed-container-main">
            <!-- completed布局容器 -->
            <v-container class="completed-container">
                <div class="title">{{$t("home.completed.title")}}</div>
                <div class="text">
                    <span>
                        {{$t("home.completed.text")}}
                    </span>
                </div>
                <div class="car left">
                    <div class="cartitle">
                        <div class="cartitle-s">
                            {{$t("home.completed.text1")}}
                        </div>
                        <div class="c-success">
                            <v-img  src="@/assets/success.png"></v-img>
                        </div>
                    </div>
                    <div class="cartitle">
                        <div class="cartitle-s">
                            {{$t("home.completed.text2")}}
                        </div>
                        <div class="c-success">
                            <v-img  src="@/assets/success.png"></v-img>
                        </div>
                    </div>
                    <div class="cartitle">
                        <div class="cartitle-s">
                            {{$t("home.completed.text3")}}
                        </div>
                        <div class="c-success">
                            <v-img  src="@/assets/success.png"></v-img>
                        </div>
                    </div>
                    <div class="cartitle">
                        <div class="cartitle-s">
                            {{$t("home.completed.text4")}}
                        </div>
                        <div class="c-success">
                            <v-img  src="@/assets/success.png"></v-img>
                        </div>
                    </div>
                    <div class="cartitle">
                        <div class="cartitle-s">
                            {{$t("home.completed.text5")}}
                        </div>
                        <div class="c-success">
                            <v-img  src="@/assets/success.png"></v-img>
                        </div>
                    </div>
                    <div class="cartitle">
                        <div class="cartitle-s">
                            {{$t("home.completed.text6")}}
                        </div>
                        <div class="c-success">
                            <v-img  src="@/assets/success.png"></v-img>
                        </div>
                    </div>
                    <div class="cartitle">
                        <div class="cartitle-s">
                            {{$t("home.completed.text7")}}
                        </div>
                        <div class="c-success">
                            <v-img  src="@/assets/success.png"></v-img>
                        </div>
                    </div>
                    <div class="cartitle">
                        <div class="cartitle-s">
                            {{$t("home.completed.text8")}}
                        </div>
                        <div class="c-success">
                            <v-img  src="@/assets/success.png"></v-img>
                        </div>
                    </div>
                    <div class="cartitle">
                        <div class="cartitle-s">
                            {{$t("home.completed.text9")}}
                        </div>
                        <div class="c-success">
                            <v-img  src="@/assets/success.png"></v-img>
                        </div>
                    </div>
                    <div class="cartitle">
                        <div class="cartitle-s">
                            {{$t("home.completed.text10")}}
                        </div>
                        <div class="c-success">
                            <v-img  src="@/assets/success.png"></v-img>
                        </div>
                    </div>
                    <div class="cartitle">
                        <div class="cartitle-s">
                            {{$t("home.completed.text11")}}
                        </div>
                        <div class="c-success">
                            <v-img  src="@/assets/success.png"></v-img>
                        </div>
                    </div>
                    <div class="cartitle">
                        <div class="cartitle-s">
                            {{$t("home.completed.text12")}}
                        </div>
                        <div class="c-success">
                            <v-img  src="@/assets/success.png"></v-img>
                        </div>
                    </div>
                </div>
                <div class="car btn" :style="completedBtnStyle">
                    <v-btn @click="completedMore">
                        {{$t("home.completed.button")}}
                    </v-btn>
                </div>
                <div class="car right" :style="completedStyle">
                    <template class="no">
                        <div class="cartitle">
                            <div class="cartitle-s">
                                {{$t("home.completed.text13")}}
                            </div>
                            <div class="c-success">
                                <v-img  src="@/assets/success.png"></v-img>
                            </div>
                        </div>
                        <div class="cartitle">
                            <div class="cartitle-s">
                                {{$t("home.completed.text14")}}
                            </div>
                            <div class="c-success">
                                <v-img  src="@/assets/success.png"></v-img>
                            </div>
                        </div>
                        <div class="cartitle">
                            <div class="cartitle-s">
                                {{$t("home.completed.text15")}}
                            </div>
                            <div class="c-success">
                                <v-img  src="@/assets/success.png"></v-img>
                            </div>
                        </div>
                        <div class="cartitle">
                            <div class="cartitle-s">
                                {{$t("home.completed.text16")}}
                            </div>
                            <div class="c-success">
                                <v-img  src="@/assets/success.png"></v-img>
                            </div>
                        </div>
                        <div class="cartitle">
                            <div class="cartitle-s">
                                {{$t("home.completed.text17")}}
                            </div>
                            <div class="c-success">
                                <v-img  src="@/assets/success.png"></v-img>
                            </div>
                        </div>
                        <div class="cartitle">
                            <div class="cartitle-s">
                                {{$t("home.completed.text18")}}
                            </div>
                            <div class="c-success">
                                <v-img  src="@/assets/success.png"></v-img>
                            </div>
                        </div>
                        <div class="cartitle">
                            <div class="cartitle-s">
                                {{$t("home.completed.text19")}}
                            </div>
                            <div class="c-success">
                                <v-img  src="@/assets/success.png"></v-img>
                            </div>
                        </div>
                        <div class="cartitle">
                            <div class="cartitle-s">
                                {{$t("home.completed.text20")}}
                            </div>
                            <div class="c-success">
                                <v-img  src="@/assets/success.png"></v-img>
                            </div>
                        </div>
                    </template>
                </div>
            </v-container>
        </div>
        <!-- pricingPlans布局容器main-title -->
        <div class="pricingPlans-container-main-title">
            <!-- PricingPlans布局容器-title -->
            <v-container class="pricingPlans-container-title">
                <div class="title">
                    {{$t("home.Pricing_Plans.title")}}
                </div>
                <div class="text">
                    <span>
                        {{$t("home.Pricing_Plans.text")}}
                    </span>
                </div>
            </v-container>
        </div>
        <!-- pricingPlans布局容器main -->
        <div class="pricingPlans-container-main">
            <!-- pricingPlans布局容器 -->
            <v-container class="pricingPlans-container">
                <div class="car">
                    <div class="car-content">
                        <div class="title">
                            {{$t("home.Pricing_Plans.q1.title")}}
                        </div>
                        <div class="text">
                            <div class="car-line-s"></div>
                            <span>
                                {{$t("home.Pricing_Plans.q1.text")}}
                            </span>
                        </div>
                    </div>
                    <div class="line"></div>
                    <div class="car-content">
                        <div class="title">
                            {{$t("home.Pricing_Plans.q2.title")}}
                        </div>
                        <div class="text">
                            <div class="car-line-s"></div>
                            <span>
                                {{$t("home.Pricing_Plans.q2.text")}}
                            </span>
                        </div>
                    </div>
                    <div class="line"></div>
                    <div class="car-content">
                        <div class="title">
                            {{$t("home.Pricing_Plans.q3.title")}}
                        </div>
                        <div class="text">
                            <div class="car-line-s"></div>
                            <span>
                                {{$t("home.Pricing_Plans.q3.text")}}
                            </span>
                        </div>
                    </div>
                    <div class="line"></div>
                    <div class="car-content">
                        <div class="title">
                            {{$t("home.Pricing_Plans.q4.title")}}
                        </div>
                        <div class="text">
                            <div class="car-line-s"></div>
                            <span>
                                {{$t("home.Pricing_Plans.q4.text")}}
                            </span>
                        </div>
                    </div>
                    <div class="line"></div>
                    <div class="car-content">
                        <div class="title">
                            {{$t("home.Pricing_Plans.q5.title")}}
                        </div>
                        <div class="text">
                            <div class="car-line-s"></div>
                            <span>
                                {{$t("home.Pricing_Plans.q5.text")}}
                            </span>
                        </div>
                    </div>
                    <div class="line"></div>
                    <div class="car-content">
                        <div class="title">
                            {{$t("home.Pricing_Plans.q6.title")}}
                        </div>
                        <div class="text">
                            <div class="car-line-s"></div>
                            <span>
                                {{$t("home.Pricing_Plans.q6.text")}}
                            </span>
                        </div>
                    </div>
                    <div class="car-line"></div>
                </div>
            </v-container>
        </div>
        <!-- join布局容器main -->
        <div class="join-container-main">
            <!-- join布局容器 -->
            <v-container class="join-container">
                <div class="join-img">
                    <v-img class="v-img"  src="@/assets/join.png"></v-img>
                </div>
                <div class="join-title">
                    <span>
                        {{$t("home.join.title")}}
                    </span>
                </div>
                <div class="join-text">
                    <span>
                        {{$t("home.join.text")}}
                    </span>
                </div>
                <div class="join-bnt">
                    <v-btn target="_blank" :href="$t('home.join.bnt_url')">
                        {{$t("home.join.bnt")}}
                    </v-btn>
                </div>
                <div class="join-line">
                    <div class="line"></div>
                </div>
                <div class="join-copyright">
                    COPYRIGHT © 2019.COMPANY PIMOON ALL RIGHTS RESERVED.
                </div>
            </v-container>
        </div>
        <!-- footer布局容器main -->
        <div class="footer-container-main">
            <!-- footer布局容器 -->
            <v-container class="footer-container">
                <div class="footer-subject">
                    <div class="copyright">
                        <div class="img">
                            <v-img class="v-img" src="@/assets/join.png"></v-img>
                        </div>
                        <div class="title">
                            {{$t("topMneBar.title")}}
                        </div>
                        <div class="copyright-text">
                            {{$t("copyright")}}
                        </div>
                    </div>
                    <div class="copyright-line">
                        <div class="line"></div>
                    </div>
                    <div class="links">
                        <!-- <div class="links-s">
                            <a target="_blank" :href="$t('links.weibo.url')">
                                <div class="links-img">
                                    <v-img  src="@/assets/weibo.png"></v-img>
                                </div>
                                <div class="links-title">
                                    {{$t("links.weibo.title")}}
                                </div>
                            </a>
                        </div>
                        <div class="links-line"></div> -->
                        <div class="links-s">
                            <a target="_blank" :href="$t('links.telegram.url')">
                                <div class="links-img">
                                    <v-img class="v-img" src="@/assets/telegram.png"></v-img>
                                </div>
                                <div class="links-title">
                                    {{$t('links.telegram.title')}}
                                </div>
                            </a>
                        </div>
                        <div class="links-line"></div>
                        <div class="links-s">
                            <a style="decoration:none;" target="_blank" :href="$t('links.twitter.url')">
                                <div class="links-img">
                                    <v-img class="v-img" src="@/assets/twitter.png"></v-img>
                                </div>
                                <div class="links-title">
                                    {{$t('links.twitter.title')}}
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </v-container>
        </div>
    </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
export default {
    name:"subjectMain",
    data() {
        return {
            completedStyle:"",
            completedBtnStyle:""
        };
    },
    props: {},
    computed: {
        ...mapState(["locale"]),
    },
    watch: {
    },
    components: {},
    created() {},
    mounted() {
    },
    methods: {
        // completed查看更多
        completedMore(){
            this.completedStyle = "display: grid";
            this.completedBtnStyle = "display: none;";
        }
    },
};
</script>
<style scoped lang="less">
.subjectMain{
    background: #110E27;
}
// propaganda布局容器main
.propaganda-container-main{}
// propaganda布局容器
.propaganda-container{
    max-width: 1300px;
    .propaganda{
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 50px;
        align-items: center;
        .m-propaganda-img{
            display: none;
        }
        .v-img{
            width: 450px;
            height: 450px;
        }
        .propaganda-content{
            display: grid;
            grid-template-columns: 1fr;
            text-align: left;
            .title{
                font-size: 30px;
                font-family: AlibabaPuHuiTi-2-85-Bold;
                color: #FFFFFF;
                line-height: 44px;
            }
            .text{
                margin-top:50px;
                font-size: 22px;
                color: rgba(255, 255, 255, 0.6);
                line-height: 36px;
                font-family: AlibabaPuHuiTi-2-45-Light;
            }
        }

    }
}
// completed布局容器main
.completed-container-main{}
// completed布局容器
.completed-container{
    max-width: 1300px;
    .title{
        font-size: 40px;
        font-family: AlibabaPuHuiTi-2-85-Bold;
        color: #FFFFFF;
        line-height: 44px;
    }
    .text{
        display: flex;
        justify-content: center;
        font-size: 22px;
        font-family: AlibabaPuHuiTi-2-45-Light;
        color: rgba(255, 255, 255, 0.6);
        line-height: 36px;
        margin-top:40px;
        span{
            width: 692px;
        }
    }
    .left{
        display: grid;
        float: left;
    }
    .right{
        display: grid;
        float: right;
        .no{
            grid-gap: 20px;
            display: grid;
        }
    }
    .car{
        margin-top:50px;
        grid-template-columns: 1fr;
        grid-gap: 20px;
        .cartitle{
            padding:5px;
            padding-left: 13px;
            padding-right: 13px;
            text-align: left;
            border: 1px solid #814BF6;
            display: flex;
            width: 573px;
            position: relative;
            align-items: center;
            .cartitle-s{
                float: left;
                width: 493px;
                font-size: 22px;
                color: #FFFFFF;
                line-height: 36px;
                font-family: AlibabaPuHuiTi-2-45-Light;
            }
            
            .c-success{
                float: right;
                width: 23px;
                height: 23px;
                position: absolute;
                right: 13px;
                background:none;
            }
        }
    }
    .btn{
        display: none;
        padding-top:16px;
        padding-bottom:8px;
        .v-btn{
            background: rgba(129, 75, 246, 0.38);
            border-radius: 8px;
            font-size: 16px;
            line-height: 26px;
            color: #FFFFFF;
            font-family: AlibabaPuHuiTi-2-65-Medium;
        }
    }
}
// pricingPlans布局容器main-title
.pricingPlans-container-main-title{
    background-image:url("../assets/pricing-plans.png");
    background-position: center;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    width: 100%;
    height: 600px;
    background-size:cover;

}
// PricingPlans布局容器-title
.pricingPlans-container-title{
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 50px;
    max-width: 1300px;
    // margin-top: -300px;
    .title{
        height: 56px;
        font-size: 40px;
        color: #fff;
        font-family: AlibabaPuHuiTi-2-85-Bold;
        line-height: 44px;
    }
    .text{
        font-size: 22px;
        font-family: AlibabaPuHuiTi-2-45-Light;
        color: rgba(255, 255, 255, 0.6);
        line-height: 36px;
        display: flex;
        justify-content: center;
        span{
            width: 748px;
        }
    }
}
// pricingPlans布局容器main
.pricingPlans-container-main{
}
// pricingPlans布局容器
.pricingPlans-container{
    max-width: 1300px;
    .car{
        width: 100%;
        
        border-radius: 8px;
        border: 1px solid rgba(129, 75, 246, 0.5);
        border-bottom:0;
        position: relative;
        display: grid;
        grid-template-columns: 1fr;
        backdrop-filter: blur(10px);
        padding-top: 26px;
        padding-bottom: 26px;
        padding-right: 50px;
        padding-left: 50px;
        .car-line{
            width: 100%;
            height: 7px;
            background: linear-gradient(270deg, #54ACFC 0%, #814BF6 100%);
            border-radius: 0px 0px 8px 8px;
            position: absolute;
            bottom: 0;
        }
        .car-content{
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            padding-top: 30px;
            padding-bottom: 30px;
            align-items: flex-start;
            .title{
                font-size: 30px;
                font-family: AlibabaPuHuiTi-2-65-Medium;
                color: #FFFFFF;
                line-height: 30px;
                white-space: nowrap;
            }
            .text{
                display: flex;
                .car-line-s{
                    width: 49px;
                    height: 3px;
                    background: #814BF6;
                    border-radius: 100px;
                    margin-top:15px;
                    margin-left:15px ;
                    margin-right:15px ;
                }
                span{
                    width: 950px;
                    font-size: 22px;
                    font-family: AlibabaPuHuiTi-2-45-Light;
                    color: #FFFFFF;
                    line-height: 30px;
                    text-align: left;

                }
            }
        }
        .line{
            height: 0px;
            opacity: 0.2;
            border: 1px solid #814BF6;
        }

    }
}
//  join布局容器main
.join-container-main{
    background: linear-gradient(180deg, #110E27 0%, #814BF6 250%);
}
// join布局容器
.join-container{
    max-width: 1300px;
    padding-top: 100px;
    padding-bottom: 100px;
    .join-img{
        display: grid;
        justify-items: center;
        .v-img{
            width: 182px;
            height: 182px;
        }
    }
    .join-title{
        font-size: 40px;
        font-family: AlibabaPuHuiTi-2-85-Bold;
        color: #FFFFFF;
        line-height: 44px;
        display: flex;
        justify-content: center;
        margin-top: 50px;
        span{
            width: 500px;
        }
    }
    .join-text{
        font-size: 16px;
        font-family: AlibabaPuHuiTi-2-65-Medium;
        color: rgba(255, 255, 255, 0.6);
        line-height: 30px;
        margin-top: 30px;
    }
    .join-bnt{
        margin-top: 50px;
        .v-btn{
            width: 250px;
            height: 60px;
            background: #814BF6;
            border-radius: 4px;
            font-size: 20px;
            font-family: AlibabaPuHuiTi-2-45-Light;
            color: #FFFFFF;
        }
    }
    .join-line{
        display: flex;
        justify-content: center;
        margin-top: 50px;
        .line{
            width: 411px;
            height: 0px;
            opacity: 0.5;
            border: 1px solid #814BF6;
        }
    }
    .join-copyright{
        display: none;
    }
}
// footer布局容器main
.footer-container-main{}
// footer布局容器
.footer-container{
    max-width: 1300px;
    color: #814BF6;
    padding-bottom: 100px;
    padding-top: 100px;
    .footer-subject{
        display: flex;
        grid-gap: 50px;
        align-items:center;
        grid-template-columns: 1fr 1fr 1fr;
        .copyright{
            display: grid;
            grid-template-columns: 1fr;
            align-items:center;
            justify-items: center;
            grid-gap: 25px;
            .img{
                display: center;
                .v-img{
                    width: 103px;
                    height: 103px;
                }
            }
            .title{
                font-size: 36px;
                font-family: AlibabaPuHuiTi-2-85-Bold;
                color: #FFFFFF;
            }
            .copyright-text{
                width: 256px;
                font-size: 14px;
                font-family: AlibabaPuHuiTi-2-45-Light;
                color: rgba(255, 255, 255, 0.6);
                line-height: 30px;
            }
        }
        .copyright-line{
            display: flex;
            justify-content: center;
            .line{
                width: 2px;
                height: 264px;
                background:#381D62;
                border: 1px solid #381D62;
                margin-left: 100px;
                margin-right: 100px;
            }
        }
        .links{
            display: flex;
            align-items:center;
            width: 100%;
            .links-s{
                width: 50%;
                display: grid;
                grid-template-columns: 1fr;
                a{
                    text-decoration:none
                }
                .links-img{
                    display: grid;
                    justify-content: center;
                    .v-img{
                        width: 60px;
                        height: 60px;
                    }
                }
                .links-title{
                    margin-top:20px;
                    font-size: 14px;
                    font-family: AlibabaPuHuiTi-2-45-Light;
                    color: #814BF6;
                    line-height: 30px;
                }
            }
            .links-line{
                width: 1px;
                height: 66px;
                background:#381D62;
            }
        }
    }
}
// 小型号到大型号的手机
@media screen and (max-width:600px){
    // propaganda布局容器main
    .propaganda-container-main{
        
    }
    // propaganda布局容器
    .propaganda-container{
        .propaganda{
            display: grid;
            grid-template-columns: 1fr;
            grid-gap: 0;
            border: 1px solid rgba(129, 75, 246, 0.38);
            border-radius: 8px;
            margin-top: 50px;
            align-items:center;
            justify-items: center;
            .propaganda-img{
                .v-img{
                    width: 250px;
                    height: 250px;
                }
            }
            .m-propaganda-img{
                display: flex;
                justify-content: center;
                .v-img{
                    width: 250px;
                    height: 250px;
                }
            }
            .rocket{
                display: none;
            }
            .m-propaganda-img{
                display: flex;
                justify-content: center;
                .v-img{
                    width: 250px;
                    height: 250px;
                }
            }
            .propaganda-content{
                text-align: center;
                padding-left: 16px;
                padding-right: 16px;
                .title{
                    font-size: 24px;
                    line-height: 30px;
                    color: #0FBFFF;
                }
                .text{
                    margin-top:20px;
                    font-size: 22px;
                    line-height: 26px;
                    color: rgba(15, 191, 255, 0.6);
                    padding-bottom: 24px;
                }
            }
        }
    }
    // completed布局容器main
    .completed-container-main{
        
    }
    // completed布局容器
    .completed-container{
        .title{
            font-size: 24px;
            line-height: 44px;
            color: #0FBFFF;
            font-family: AlibabaPuHuiTi-2-85-Bold;
        }
        .text{
            margin-top:8px;
            font-family: AlibabaPuHuiTi-2-45-Light;
            font-size: 18px;
            color: rgba(15, 191, 255, 0.6);
            line-height: 30px;
        }
        .left{
            float: auto;
        }
        .right{
            margin-top: 8px;
            float: auto;
            display: none;
            .no{
                grid-gap: 8px;
                display: none;
            }
        }
        .car{
            grid-gap: 8px;
            width: 100%;
            .cartitle{
                padding:17px;
                padding-left: 12px;
                padding-right: 12px;
                border-radius: 8px;
                border: 1px solid rgba(129, 75, 246, 0.6);
                width: 100%;
                .cartitle-s{
                    width: 100%;
                    z-index: 1;
                    font-size: 14px;
                    line-height: 20px;
                    color: #0FBFFF;
                }
                .success{
                    width: 48px;
                    height: 48px;
                    opacity: 0.1;
                }
            }
        }
        .btn{
            display: flex;
            .v-btn{
                width: 100%;
            }
        }
    }
    // pricingPlans布局容器main-title
    .pricingPlans-container-main-title{

        height: 500px;
        background-size: 100%;
    }
    // PricingPlans布局容器-title
    .pricingPlans-container-title{
        display: grid;
        grid-template-columns: 1fr;
        grid-gap: 10px;
        margin-top: -200px;
        .title{
            height: 33px;
            font-size: 24px;
            color: #0FBFFF;
        }
        .text{
            font-size: 12px;
            color: rgba(15, 191, 255, 0.6);
            line-height: 16px;
            margin-top:6px;
            span{
                width: 100%;
            }
        }
    }
    // pricingPlans布局容器main
    .pricingPlans-container-main{

    }
    // pricingPlans布局容器
    .pricingPlans-container{
        .car{
            padding-top: 14px;
            padding-bottom: 14px;
            padding-right: 25px;
            padding-left: 25px;
            .car-content{
                grid-template-columns: 1fr;
                .title{
                    font-size: 18px;
                    color: #0FBFFF;
                    line-height: 30px;
                }
                .text{
                    display: block;
                    .car-line-s{
                        display: none;
                    }
                    span{
                        width: 100%;
                        font-size: 14px;
                        color: rgba(15, 191, 255, 0.6);
                        line-height: 16px;
                    }
                }
            }
        }
    }
    // join布局容器
    .join-container{
        padding-bottom: 10px;
        .join-title{
            font-size: 24px;
            line-height: 28px;
            margin-top: 25px;
        }
        .join-text{
            font-size: 12px;
            line-height: 16px;
            margin-top: 15px;
        }
        .join-bnt{
            margin-top: 25px;
            .v-btn{
                width: 218px;
                height: 39px;
                font-size: 18px;
                line-height: 30px;
            }
        }
        .join-line{
            margin-top: 25px;
            .line{
                width: 100%;
            }
        }
        .join-copyright{
            display: block;
            margin-top:10px;
            font-size: 10px;
            color: rgba(255, 255, 255, 0.6);
            font-family: AlibabaPuHuiTi-2-45-Light;
            line-height: 30px;
        }
    }
    // footer布局容器main
    .footer-container-main{

    }
    // footer布局容器
    .footer-container{
        padding-bottom: 50px;
        .footer-subject{
            display: grid;
            grid-template-columns: 1fr;
            .copyright{
                display: none;
            }
            .copyright-line{
                display: none;
            }
            .links{
                display: grid;
                grid-template-columns: 1fr 1fr;
                .links-s{
                    width: auto;
                    display: grid;
                    justify-items: center;
                    grid-template-columns: 1fr;
                    .links-img{
                        .v-img{
                            width: 30px;
                            height: 30px;
                        }
                    }
                    .links-title{
                        font-size: 15px;
                        line-height: 15px;
                    }
                }
            }
            .links-line{
                display: none;
            }
        }
    }
}
// 小型号到中型号的平板
@media screen and (min-width:600px) and (max-width:960px){
    // propaganda布局容器main
    .propaganda-container-main{

    }
    // propaganda布局容器
    .propaganda-container{
        padding-left: 58px;
        padding-right: 58px;
        grid-gap: 0;
        .propaganda{
            display: grid;
            grid-template-columns: 1fr;
            align-items: center;
            grid-gap: 0;
            border: 2px solid rgba(129, 75, 246, 0.38);
            border-radius: 8px;
            margin-top: 60px;
            justify-items: center;
            .propaganda-img{
                justify-content: center;
                .v-img{
                    width: 500px;
                    height: 500px;
                }
            }
            .rocket{
                display: none;
            }
            .m-propaganda-img{
                display: block;
                justify-content: center;
                .v-img{
                    width: 500px;
                    height: 500px;
                }
            }
            .propaganda-content{
                text-align: center;
                padding-left: 32px;
                padding-right: 32px;
                .title{
                    font-size: 40px;
                    line-height: 55px;
                    color: #0FBFFF;
                }
                .text{
                    margin-top:20px;
                    font-size: 28px;
                    line-height: 40px;
                    color: rgba(15, 191, 255, 0.6);
                    padding-bottom: 100px;
                }
            }
        }
    }
    // completed布局容器
    .completed-container{
        padding-left: 58px;
        padding-right: 58px;
        .title{
            color: #0FBFFF;
        }
        .text{
            color: rgba(15, 191, 255, 0.6);
            margin-top:20px;
            padding-bottom: 40px;
        }
        .left{
            float: none;
        }
        .right{
            float: none;
            display: none;
            .no{
                display: none;
            }
        }
        .car{
            margin-top:20px;
            .cartitle{
                width: 100%;
                padding:10px;
                .cartitle-s{
                    width: 400px;
                    min-width: 500px;
                    max-width: 400px;
                    color: #0FBFFF;
                }
                .success{
                    width: 48px;
                    height: 48px;
                    opacity: 0.1;
                }
            }
        }
        .btn{
            display: flex;
            padding-top:16px;
            padding-bottom:8px;
            .v-btn{
                width: 100%;
            }
        }
    }
    // pricingPlans布局容器main-title
    .pricingPlans-container-main-title{
        height: 600px;

    }
    // PricingPlans布局容器-title
    .pricingPlans-container-title{
        grid-gap: 10px;
        padding-left: 58px;
        padding-right: 58px;
        margin-top: -200px;
        .title{
            height: 46px;
            font-size: 30px;
            line-height: 34px;
            color: #0FBFFF;
        }
        .text{
            font-size: 18px;
            line-height: 25px;
            color: rgba(15, 191, 255, 0.6);
            span{
                width: 100%;
            }
        }
    }
    // pricingPlans布局容器main
    .pricingPlans-container-main{

    }
    // pricingPlans布局容器
    .pricingPlans-container{
        padding-left: 58px;
        padding-right: 58px;
        .car{
            padding-right: 30px;
            padding-left: 30px;
            .car-line{
                height: 14px;
            }
            .car-content{
                grid-template-columns: 1fr;
                padding-top: 20px;
                padding-bottom: 20px;
                .title{
                    font-size: 28px;
                    line-height: 28px;
                    color: #0FBFFF;
                }
                .text{
                    display: block;
                    margin-top: 15px;
                    .car-line-s{
                        display: none;
                    }
                    span{
                        width: 400px;
                        font-size: 20px;
                        line-height: 28px;
                        color: rgba(15, 191, 255, 0.6);
                    }
                }
            }
        }
    }
    // join布局容器
    .join-container{
        padding-left: 58px;
        padding-right: 58px;
        padding-top: 50px;
        padding-bottom: 20px;
        .join-img{
            justify-content: center;
            .v-img{
                width: 200px;
                height: 200px;
            }
        }
        .join-text{
            margin-top: 20px;
            font-size: 20px;
        }
        .join-bnt{
            margin-top: 25px;
            .v-btn{
                width: 50%;
                font-size: 18px;
            }
        }
        .join-line{
            .line{
                width: 100%;
            }
        }
        .join-copyright{
            display: block;
            margin-top:20px;
            font-size: 15px;
            color: rgba(255, 255, 255, 0.6);
            font-family: AlibabaPuHuiTi-2-45-Light;
            line-height: 35px;
        }
    }
    // footer布局容器
    .footer-container{
        .footer-subject{
            display: grid;
            grid-template-columns: 1fr;
            .copyright{
                display: none;
            }
            .copyright-line{
                display: none;
            }
            .links{
                display: grid;
                grid-template-columns: 1fr 1fr;
                width: auto;
                justify-items: center;
                .links-line{
                    display: none;
                }
            }
        }
    }
}
// 小型号到中型号的平板
@media screen and (min-width:960px) and (max-width:1264px){
    // propaganda布局容器
    .propaganda-container{
        padding-left: 58px;
        padding-right: 58px;
        .propaganda{
            .v-img{
                width: 400px;
                height: 400px;
            }
            .propaganda-content{
                .title{
                    font-size: 20px;
                    line-height: 35px;
                }
                .text{
                    margin-top:30px;
                    font-size: 18px;
                    line-height: 30px;
                }
            }
        }
    }
    // completed布局容器
    .completed-container{
        padding-left: 58px;
        padding-right: 58px;
        .title{
            font-size: 30px;
            line-height: 35px;
        }
        .text{
            margin-top:20px;
            font-size: 20px;
            line-height: 30px;
        }
        .car{
            .cartitle{
                width: calc(100vw * 525 / 1264);
                .cartitle-s{
                    font-size: 18px;
                    line-height: 30px;
                    width: calc(100vw * 450 / 1264);
                }
            }
        }
    }
    // pricingPlans布局容器main-title
    .pricingPlans-container-main-title{

        height: 700px;
    }
    // PricingPlans布局容器-title
    .pricingPlans-container-title{
        padding-left: 58px;
        padding-right: 58px;
        grid-gap: 10px;
        margin-top: -250px;
        .title{
            font-size: 30px;
            height: 46px;
            line-height: 34px;
        }
        .text{
            font-size: 18px;
            line-height: 30px;
            span{
                width: 600px;
            }
        }
    }
    // pricingPlans布局容器
    .pricingPlans-container{
        padding-left: 58px;
        padding-right: 58px;
        .car{
            .car-content{
                .title{
                    font-size: 28px;
                    line-height: 28px;
                }
                .text{
                    .car-line-s{
                        margin-top:13px;
                    }
                    span{
                        width: 550px;
                        font-size: 20px;
                        line-height: 28px;
                    }
                }
            }
        }
    }
    // join布局容器
    .join-container{
        padding-left: 58px;
        padding-right: 58px;
    }
    // footer布局容器
    .footer-container{
        padding-left: 58px;
        padding-right: 58px;
    }
}
// 桌面端
@media screen and (min-width:1264px) and (max-width:1904px){
    // propaganda布局容器
    .propaganda-container{
        max-width: 1200px;
        .propaganda{
            .propaganda-content{
                .title{
                    font-size: 25px;
                    line-height: 40px;
                }
                .text{
                    margin-top:30px;
                    font-size: 20px;
                    line-height: 30px;
                }
            }
        }
    }
    // completed布局容器
    .completed-container{
        max-width: 1200px;
    }
    // pricingPlans布局容器main-title
    .pricingPlans-container-main-title{
        height: 800px;
    }
    // PricingPlans布局容器-title
    .pricingPlans-container-title{
        max-width: 1200px;
        grid-gap: 25px;
        .title{
            font-size: 30px;
            height: 46px;
            line-height: 34px;
        }
        .text{
            font-size: 18px;
            line-height: 30px;
            span{
                width: 648px;
            }
        }
    }
    // pricingPlans布局容器
    .pricingPlans-container{
        max-width: 1200px;
    }
    // join布局容器
    .join-container{
        max-width: 1200px;
    }
    // footer布局容器
    .footer-container{
        max-width: 1200px;
    }


}
// 4K 和超宽屏幕
@media screen and (min-width:1904px){
}
</style>