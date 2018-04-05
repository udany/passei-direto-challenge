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
                            <th style="width: 50px">
                                #
                            </th>
                            <th>
                                Title
                            </th>
                            <th style="width: 100px" class="text-right">
                                <i class="fa fa-clock-o"></i>
                            </th>
                            <th style="width: 25px">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="t in item.tracks" :key="t.GetUId()" class="discreet-form">
                            <template v-if="t === currentTrack">
                                <td class="p-1">
                                    <input class="px-2 py-1" v-model.number="t.number" placeholder="#" />
                                </td>
                                <td class="p-1">
                                    <input class="px-2 py-1" v-model="t.name" placeholder="Title" />
                                </td>
                                <td class="p-1">
                                    <input class="px-2 py-1" v-model.number="t.duration" placeholder="Dur." />
                                </td>
                            </template>
                            <template v-else>
                                <td>
                                    {{t.number}}
                                </td>
                                <td>
                                    {{t.name}}
                                </td>
                                <td>
                                    {{t.getDurationString()}}
                                </td>
                            </template>

                            <td class="text-center">
                                <a href="#" class="color-neutral" @click.prevent="editTrack()" v-if="t === currentTrack">
                                    <i class="fa fa-check"></i>
                                </a>
                                <a href="#" class="color-neutral" @click.prevent="editTrack(t)" v-else>
                                    <i class="fa fa-edit"></i>
                                </a>
                                &nbsp;
                                <a href="#" @click.prevent="removeTrack(t)" class="color-neutral">
                                    <i class="fa fa-trash"></i>
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>


                <b-button variant="success" size="sm" @click="addTrack">
                    Add Track <i class="fa fa-plus"></i>
                </b-button>
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
    import AlbumTrack from "Shared/entities/AlbumTrack";

    export default {
        head() {
            return {
                title: this.item ? this.item.name + ' | Edit' : 'Loading...'
            };
        },
        data: () => ({
            item: null,
            currentTrack: null
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

            addTrack() {
                let track = new AlbumTrack({number: this.item.tracks.length + 1});

                this.item.tracks.push(track);
                this.currentTrack = track;
            },

            editTrack(t) {
                this.currentTrack = t;
            },

            removeTrack(t) {
                if (confirm('Sure?')) {
                    this.item.tracks.remove(t);
                }
            }
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
