<template>
    <div class="container-fluid m-0">
        <b-row>
            <b-col class="p-4 collection-header">
                <div class="bck" style="background-image: url(/mock/collection/0.jpg)"></div>

                <h5 class="mt-0 ml-4 back-link">
                    <a href="#" class="color-neutral" @click.prevent="back">
                        <i class="fa fa-chevron-left"></i>
                        Back
                    </a>
                </h5>

                <div class="container content pb-0 pt-5 pb-md-5">
                    <b-row>
                        <b-col lg="2" md="3">
                            <simple-cover image="/mock/collection/0.jpg"></simple-cover>
                        </b-col>
                        <b-col>
                            <h1 class="mt-4 mt-md-0 ">Chill Mix</h1>

                            <p>An enthralling set designed to chill you out like you've never before been chilled.</p>
                        </b-col>
                    </b-row>
                </div>
            </b-col>
        </b-row>

        <div class="container">

            <b-row>
                <b-col md="3" cols="6" class="mt-4">
                    <album-cover :id="0" title="Appetite for Destruction" artist="Guns 'n Roses"></album-cover>
                </b-col>
                <b-col md="3" cols="6" class="mt-4">
                    <album-cover :id="1" title="Back to Black" artist="Amy Winehouse"></album-cover>
                </b-col>
                <b-col md="3" cols="6" class="mt-4">
                    <album-cover :id="2" title="The Dark Knight OST" artist="Hans Zimmer"></album-cover>
                </b-col>
                <b-col md="3" cols="6" class="mt-4">
                    <album-cover :id="3" title="Jinsei × Boku" artist="ONE OK ROCK"></album-cover>
                </b-col>
            </b-row>

        </div>
    </div>
</template>

<script>
    import SimpleCover from '~/components/SimpleCover.vue'
    import AlbumCover from '~/components/AlbumCover.vue'

    export default {
        head: () => ({
            title: "Back to Black"
        }),
        data: () => ({
            currentLetter: "A"
        }),
        methods: {
            back() {
                this.$router.go(-1);
            }
        },
        components: {
            SimpleCover,
            AlbumCover
        }
    }
</script>

<style>
    .collection-header {
        position: relative;
        overflow: hidden;
    }

    .collection-header > .bck {
        background-color: #000;
        background-size: cover;
        background-position: center center;

        position: absolute;
        left: -50px;
        right: -50px;
        top: -50px;
        bottom: -50px;

        opacity: .8;
        filter: blur(10px);
    }

    .collection-header .content {
        position: relative;
    }
    .collection-header .content > * {
        color: #fff;
        text-shadow: 0 0 10px rgba(0, 0, 0, .4);
    }
    .collection-header .content p {
        color: #ccd3d8;
    }
    .collection-header .content .simple-cover {
        box-shadow: 0 0 30px rgba(0, 0, 0, .4);
    }

    .collection-header .back-link {
        position: absolute;
        left: 0;
        right: 0;
        z-index: 1;
    }
</style>