<template>
    <div class="alert">
        <v-alert dense :type="type"  v-if="status!=false">
            {{text}}
        </v-alert>
    </div>
</template>
<script>
export default {
    data() {
        return {

        };
    },
    props: {
        text: {
            type: String,
            default: "warning",
        },
        type: {
            type: String,
            default: "warning",
        },
        status:{
            type: Boolean,
            default: false,
        },
    },
    computed: {},
    watch: {},
    components: {},
    created() {},
    mounted() {},
    methods: {},
};
</script>

<style scoped lang="less">
.alert{
    display: flex;
    justify-content: center;
    width: 100%;
    align-items: center;
    position: fixed;
    top: 0;
    z-index: 9;
    .v-alert{
        position: absolute;
        top: 12px;
        @keyframes alert{
            0%{
                opacity: 0;
            }
            50%{
                opacity: 0.5;
            }
            100%{
                opacity: 1;
            }
            50%{
                opacity: 0.5;
            }
            0%{
                opacity: 0;
            }
        }
        -webkit-animation-name: alert;
        -webkit-animation-duration: 0.3s;
        -webkit-animation-iteration-count: 1;
        -webkit-animation-delay: 0;
    }
}
</style>
