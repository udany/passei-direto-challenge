<template>
    <square class="album-cover">
        <div class="bck" :style="{backgroundImage: 'url(/mock/collection/'+id+'.jpg)'}"></div>
        <div class="title p-2">
            <slot name="title">
                <h4 class="m-0">{{title ? title : id}}</h4>
            </slot>
        </div>

        <div class="main-action">
            <i class="fa" :class="'fa-'+icon"></i>
        </div>

        <div class="actions">
            <slot name="actions">
                <b-button size="sm" variant="primary" type="submit">
                    <i class="fa fa-search"></i>
                </b-button>
            </slot>
        </div>
    </square>
</template>

<script>
    import Square from './Square.vue'

    export default {
        props: {
            id: {
                type: Number
            },
            icon: {
                type: String,
                default: 'link'
            },
            title: {
                type: String,
                default: ''
            }
        },
        components: {
            Square
        }
    }
</script>

<style>
    .album-cover {
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
        cursor: pointer;
        overflow: hidden;
    }

    /* Background */
    .album-cover .bck {
        background-color: #000;
        background-size: cover;
        background-position: center center;

        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;

        opacity: 1;
        transition: opacity .2s;
    }
    .album-cover:hover .bck {
        opacity: .5;
    }

    /* Title */
    .album-cover .title {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;

        background: linear-gradient(to top, rgba(0, 0, 0, .7) 0%, rgba(0, 0, 0, .1) 80%, rgba(0, 0, 0, 0) 100%);

        opacity: .9;
        transition: opacity .5s;
    }

    .album-cover .title > * {
        text-shadow: 0 0 5px rgba(0, 0, 0, 1);
    }

    .album-cover:hover .title {
        opacity: 1;
    }

    /* Action */
    .album-cover .main-action {
        position: absolute;
        left: 0;
        right: 0;
        top: 50%;

        font-size: 3em;
        margin-top: -.65em;
        text-align: center;

        opacity: 0;
        transform: scale(1.2);
        transition: opacity .1s, transform .1s;
    }
    .album-cover:hover .main-action {
        opacity: 1;
        transform: scale(1);
    }

    /* Actions */
    .album-cover .actions {
        position: absolute;
        right: 0;
        top: 0;

        opacity: 0;
        transform: translateY(-1em);
        transition: opacity .1s, transform .1s;
    }
    .album-cover:hover .actions {
        opacity: 1;
        transform: translateY(0);
    }
</style>
