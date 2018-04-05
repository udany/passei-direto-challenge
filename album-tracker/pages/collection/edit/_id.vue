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


            <b-col md="6" v-if="!search">
                <b-button size="sm" variant="success" class="float-right" @click="toggleSearch">
                    Add Album <i class="fa fa-plus"></i>
                </b-button>

                <b>Albums:</b>

                <b-row class="clear">
                    <b-col cols="6" class="mt-4" v-for="a in item.albums" :key="a.id">
                        <album-cover :value="a" icon="">
                            <template slot="actions">
                                <b-button size="sm" variant="danger" @click="removeAlbum(a)">
                                    <i class="fa fa-minus"></i>
                                </b-button>
                            </template>
                        </album-cover>
                    </b-col>
                </b-row>
            </b-col>


            <b-col md="6" v-if="search">
                <b-button size="sm" variant="warning" class="float-right" @click="toggleSearch">
                    <i class="fa fa-chevron-left"></i> Back
                </b-button>

                <b>Album Search:</b>

                <b-input-group class="my-4">
                    <b-form-input size="sm" type="text" placeholder="Search"
                                  v-model="searchQuery" @keyup.native.enter="doSearch"/>
                    <b-input-group-append>
                        <b-button size="sm" variant="secondary" @click="doSearch">
                            <i class="fa fa-search"></i>
                        </b-button>
                        <b-button size="sm" variant="success" @click="spotifySearch">
                            <i class="fa fa-spotify"></i>
                        </b-button>
                    </b-input-group-append>
                </b-input-group>


                <b-row class="clear">
                    <b-col cols="6" class="mt-4" v-for="a in searchResults" :key="a.id" v-if="!hasAlbum(a.id)">
                        <album-cover :value="a" icon="plus" @action="addAlbum(a)"></album-cover>
                    </b-col>
                </b-row>


                <b-row class="clear" v-if="spotifyResults.length">
                    <b-col cols="6" class="mt-4" v-for="a in spotifyResults" :key="a.GetUId()">
                        <album-cover :value="a" icon="plus" @action="addAlbum(a)"></album-cover>
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
    import Album from "Shared/entities/Album";

    export default {
        head() {
            return {
                title: this.item ? this.item.name + ' | Edit' : 'Loading...'
            };
        },
        data: () => ({
            item: null,
            search: false,
            searchQuery: '',
            searchResults: [],
            spotifyResults: []
        }),
        async asyncData({params}) {
            if (!params.id) {
                return {item: new Collection()}
            } else {
                let {data} = await api.get(`/collection/${params.id}`);

                return {item: new Collection(data)}
            }
        },

        methods: {
            back() {
                this.$router.go(-1);
            },

            async save() {
                let {data} = await api.post(`/collection/${this.item.id}`, this.item);

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

            hasAlbum(id) {
                return !!this.item.albums.find(a => a.id === id);
            },

            removeAlbum(a) {
                this.item.albums.remove(a);
            },

            addAlbum(a) {
                this.item.albums.push(a);

                this.$toast.success('Album added!', {duration: 1000});

                this.toggleSearch();
            },


            toggleSearch() {
                this.search = !this.search;
            },

            async doSearch() {
                let {data} = await api.get(`/album/search`, {
                    params: {
                        q: this.searchQuery
                    }
                });

                this.searchResults = data.map(x => new Album(x));
            },

            async spotifySearch() {
                this.$toast.info('Searching Spotify...', {duration: 3000});

                let {data} = await api.get(`/spotify/search`, {
                    params: {
                        q: this.searchQuery
                    }
                });

                this.spotifyResults = data.map(x => new Album(x));
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
