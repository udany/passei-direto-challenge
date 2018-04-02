<template>
    <square class="simple-cover">
        <div class="bck" :style="{backgroundImage: 'url('+image+'?cover)'}"></div>
    </square>
</template>

<script>
    import Square from './Square.vue'

    export default {
        props: {
            image: {
                type: String
            },
        },
        components: {
            Square
        }
    }
</script>

<style>
    .simple-cover {
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
        overflow: hidden;
    }

    /* Background */
    .simple-cover .bck {
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
</style>
