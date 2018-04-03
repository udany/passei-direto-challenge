<template>
    <div class="container my-4">
        <b-row>
            <b-col>
                <h4 class="mb-0 mt-4">
                    <a href="#" class="color-neutral" @click.prevent="back">
                        <i class="fa fa-chevron-left"></i>
                        Back
                    </a>
                </h4>
            </b-col>
        </b-row>

        <b-row class="mt-4">
            <b-col md="6">
                <!-- Main Info -->

                <b-form-group label="Name:">
                    <b-form-input
                            value="Chill Mix"
                            placeholder="Name">
                    </b-form-input>
                </b-form-group>


                <b-form-group label="Description:">
                    <textarea ref="ta" v-model="desc" class="form-control" placeholder="Describe this collection"></textarea>
                </b-form-group>

                <b-form-group label="Cover:">

                    <b-row>
                        <b-col cols="6">
                            <simple-cover image="/mock/collection/0.jpg"></simple-cover>
                        </b-col>
                        <b-col>
                            <file-uploader class="btn-sm" :url="'http://127.0.0.1:3001/upload/'"></file-uploader>

                            <p class="text-center text-muted mt-2">
                                You may drag a file to the button
                            </p>
                        </b-col>
                    </b-row>

                </b-form-group>
            </b-col>
            <b-col md="6">

                <b-button size="sm" variant="success" class="float-right">
                    Add Album <i class="fa fa-plus"></i>
                </b-button>

                <b>Albums:</b>

                <b-row class="clear">

                    <b-col cols="6" class="mt-4">
                        <album-cover :id="0" title="Appetite for Destruction" artist="Guns 'n Roses"></album-cover>
                    </b-col>
                    <b-col cols="6" class="mt-4">
                        <album-cover :id="1" title="Back to Black" artist="Amy Winehouse"></album-cover>
                    </b-col>
                    <b-col cols="6" class="mt-4">
                        <album-cover :id="2" title="The Dark Knight OST" artist="Hans Zimmer"></album-cover>
                    </b-col>
                    <b-col cols="6" class="mt-4">
                        <album-cover :id="3" title="Jinsei × Boku" artist="ONE OK ROCK"></album-cover>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import SimpleCover from '~/components/SimpleCover.vue'
    import AlbumCover from '~/components/AlbumCover.vue'
    import FileUploader from '~/components/FileUploader.vue'

    export default {
        head: () => ({
            title: "Back to Black | Edit"
        }),
        data: () => ({
            desc: "An enthralling set designed to chill you out like you've never before been chilled."
        }),
        methods: {
            back() {
                this.$router.go(-1);
            },
            play() {

            }
        },
        components: {
            SimpleCover,
            AlbumCover,
            FileUploader
        }
    }
</script>

<style>
</style>
