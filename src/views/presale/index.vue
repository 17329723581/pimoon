<template>
    <!-- 容器 -->
    <v-app class="app-container">
        <!-- 顶部菜单栏 -->
        <topMenuBar></topMenuBar>
        <start v-if="timingStatus==0"></start>
        <end v-else></end>
        <subjectMain></subjectMain>
    </v-app>
</template>
<script>
// 引入页面
import subjectMain from "@/components/subjectMain.vue"
import topMenuBar from "@/components/topMenuBar.vue"
import start from "@/views/presale/start"
import end from "@/views/presale/end"
// 引入全局
import { mapState } from "vuex";
export default {
    data(){
        return {
            //timingStatus:0,
        }
    },
    components: {
        topMenuBar,
        subjectMain,
        start,
        end
    },
    computed: {
        ...mapState(["deadline"]),
        // 时间状态
        timingStatus(){
            // 获取正在时间戳
            const getIsTime = new Date().getTime();
            // 判断正在时间是否大于或等于结束时间 返回状态 0未结束 1已结束
            if(getIsTime >= this.deadline)
            {
                return 1;
            }else{
                return 0;
            }
        }
    },
    watch: {
    },
    methods: {
    },
    created() {
    }
};
</script>
<style scoped lang="less">
@import "@/styles/app";
</style>