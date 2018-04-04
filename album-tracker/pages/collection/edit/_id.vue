<template>
    <div class="container my-4" v-if="item">
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
                    <b-form-input v-model="item.name"
                            placeholder="Name">
                    </b-form-input>
                </b-form-group>


                <b-form-group label="Description:">
                    <textarea ref="ta" v-model="item.description" class="form-control" placeholder="Describe this collection"></textarea>
                </b-form-group>

                <b-form-group label="Cover:">

                    <b-row>
                        <b-col cols="6">
                            <simple-cover :image="item.getImageUrl()"></simple-cover>
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

        <b-row>
            <b-col class="mt-4 text-right">
                <b-button variant="success" @click="save">
                    Save <i class="fa fa-check"></i>
                </b-button>
            </b-col>
        </b-row>

    </div>
</template>

<script>
    import SimpleCover from '~/components/SimpleCover.vue'
    import AlbumCover from '~/components/AlbumCover.vue'
    import FileUploader from '~/components/FileUploader.vue'

    import api from '~/plugins/api';
    import Collection from "Shared/entities/Collection";

    export default {
        head() {
            return {
                title: this.item ? this.item.name + ' | Edit' : 'Loading...'
            };
        },
        data: () => ({
            item: null
        }),
        async asyncData({params}) {
            let {data} = await api.get(`/collection/${params.id}`);

            return {item: new Collection(data)}
        },
        methods: {
            back() {
                this.$router.go(-1);
            },
            play() {

            },
            async save() {
                let {data} = await api.post(`/collection/${this.item.id}`, this.item);

                if (data.id) {
                    this.$toast.success('Saved', {duration: 1000});

                    this.back();
                }
            }
        },
        components: {
            SimpleCover,
            AlbumCover,
            FileUploader
        },
        created() {
            if (this.item && !(this.item instanceof Collection)) {
                this.item = new Collection(this.item);
            }
        }
    }
</script>

<style>
</style>
