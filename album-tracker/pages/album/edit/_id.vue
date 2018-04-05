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

                <b-form-group label="Album Title:">
                    <b-form-input v-model="item.name"
                            placeholder="Title">
                    </b-form-input>
                </b-form-group>


                <b-form-group label="Album Artist:">
                    <b-form-input v-model="item.artist"
                            placeholder="Artist">
                    </b-form-input>
                </b-form-group>

                <b-form-group label="Album Cover:">

                    <b-row>
                        <b-col cols="6">
                            <simple-cover :image="item.getImageUrl()" v-if="item.hasImage || item.tempImage"></simple-cover>
                        </b-col>
                        <b-col>
                            <file-uploader class="btn-sm" :url="'http://127.0.0.1:3001/upload/'" @upload-finish="uploadedImage"></file-uploader>

                            <p class="text-center text-muted mt-2">
                                You may drag a file to the button
                            </p>
                        </b-col>
                    </b-row>

                </b-form-group>
            </b-col>
            <b-col md="6">
                <b>Tracks:</b>

                <!-- Tracks -->
                <table class="table">
                    <thead>
                        <tr>
                            <th style="width: 25px">
                                #
                            </th>
                            <th>
                                Title
                            </th>
                            <th style="width: 25px" class="text-right">
                                <i class="fa fa-clock-o"></i>
                            </th>
                            <th style="width: 25px">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                1
                            </td>
                            <td>
                                Rehab
                            </td>
                            <td>
                                3:34
                            </td>
                            <td class="text-center">
                                <a href="#" @click.prevent="" class="color-neutral">
                                    <i class="fa fa-edit"></i>
                                </a>
                                &nbsp;
                                <a href="#" @click.prevent="" class="color-neutral">
                                    <i class="fa fa-trash"></i>
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                2
                            </td>
                            <td>
                                You Know I'm No Good
                            </td>
                            <td>
                                4:17
                            </td>
                            <td class="text-center">
                                <a href="#" @click.prevent="" class="color-neutral">
                                    <i class="fa fa-edit"></i>
                                </a>
                                &nbsp;
                                <a href="#" @click.prevent="" class="color-neutral">
                                    <i class="fa fa-trash"></i>
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                3
                            </td>
                            <td>
                                Me & Mr Jones
                            </td>
                            <td>
                                2:32
                            </td>
                            <td class="text-center">
                                <a href="#" @click.prevent="" class="color-neutral">
                                    <i class="fa fa-edit"></i>
                                </a>
                                &nbsp;
                                <a href="#" @click.prevent="" class="color-neutral">
                                    <i class="fa fa-trash"></i>
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                4
                            </td>
                            <td>
                                Just Friends
                            </td>
                            <td>
                                3:12
                            </td>
                            <td class="text-center">
                                <a href="#" @click.prevent="" class="color-neutral">
                                    <i class="fa fa-edit"></i>
                                </a>
                                &nbsp;
                                <a href="#" @click.prevent="" class="color-neutral">
                                    <i class="fa fa-trash"></i>
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
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
    import Album from "Shared/entities/Album";

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
            if (!params.id) {
                return {item: new Album()}
            } else {
                let {data} = await api.get(`/album/${params.id}`);

                return {item: new Album(data)}
            }
        },

        methods: {
            back() {
                this.$router.go(-1);
            },

            async save() {
                let {data} = await api.post(`/album/${this.item.id}`, this.item);

                if (data.id) {
                    this.$toast.success('Saved', {duration: 1000});

                    this.back();
                }
            },

            uploadedImage(fu) {
                if (fu.response && fu.response.status) {
                    this.item.tempImage = fu.response.data;
                }
            },
        },
        components: {
            SimpleCover,
            AlbumCover,
            FileUploader
        },
        created() {
            if (this.item && !(this.item instanceof Album)) {
                this.item = new Album(this.item);
            }
        }
    }
</script>

<style>
</style>
