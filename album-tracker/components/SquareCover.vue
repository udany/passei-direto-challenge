<template>
    <square class="square-cover">
        <div class="bck" :style="{backgroundImage: 'url('+image+')'}"></div>
        <div class="bck blur" :style="{backgroundImage: 'url('+image+')'}"></div>

        <div class="title p-2 pt-4" v-if="showDetails">
            <slot name="title">
                <h4 class="m-0">{{title}}</h4>
            </slot>
        </div>

        <div class="main-action" @click="mainAction">
            <i class="fa" :class="'fa-'+icon"></i>
        </div>

        <div class="actions" @click.stop="">
            <slot name="actions"></slot>
        </div>
    </square>
</template>

<script>
    import Square from './Square.vue'

    export default {
        props: {
            image: {
                type: String
            },
            icon: {
                type: String,
                default: 'chevron-right'
            },
            title: {
                type: String,
                default: ''
            },
            showDetails: {
                type: Boolean,
                default: true
            }
        },
        methods: {
            mainAction() {
                this.$emit('action');
            }
        },
        components: {
            Square
        }
    }
</script>

<style>
    .square-cover {
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
        cursor: pointer;
        overflow: hidden;
    }

    /* Background */
    .square-cover .bck {
        background-color: #000;
        background-size: cover;
        background-position: center center;

        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;

        opacity: 1;
        transition: all .5s;
    }

    .square-cover:hover .bck {
        opacity: 0;
    }

    .square-cover .bck.blur {
        transform: scale(1);
        filter: blur(5px);
        opacity: 0;
    }

    .square-cover:hover .bck.blur {
        transform: scale(1.1);
        opacity: 1;
    }

    /* Title */
    .square-cover .title {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;

        background: linear-gradient(to top, rgba(0, 0, 0, .9) 0%, rgba(0, 0, 0, .2) 80%, rgba(0, 0, 0, 0) 100%);

        opacity: .9;
        transition: opacity .5s;
    }

    .square-cover .title > * {
        text-shadow: 0 0 10px rgba(0, 0, 0, 1);
    }

    .square-cover:hover .title {
        opacity: 1;
    }

    /* Action */
    .square-cover .main-action {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;

        font-size: 3em;
        text-align: center;
        text-shadow: 0 0 15px rgba(0, 0, 0, .5);

        opacity: 0;
        transform: scale(.8);
        transition: opacity .5s, transform .5s;
    }
    .square-cover .main-action i.fa {
        position: absolute;
        left: 0;
        right: 0;
        top: 50%;
        margin-top: -.65em;
    }

    .square-cover:hover .main-action {
        opacity: 1;
        transform: scale(1);
    }

    /* Actions */
    .square-cover .actions {
        position: absolute;
        right: 0;
        top: 0;

        opacity: 0;
        transform: translateY(-1em);
        transition: opacity .1s, transform .1s;
    }

    .square-cover:hover .actions {
        opacity: 1;
        transform: translateY(0);
    }
</style>
