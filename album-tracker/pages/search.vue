<template>
    <div class="container my-4">
        <b-row>
            <b-col>
                <h1 class="my-4">
                    Search for "{{$route.query.q}}"
                </h1>
            </b-col>
        </b-row>


        <b-row>
            <b-col>
                <h2 class="m-0">Collections</h2>
            </b-col>
        </b-row>

        <b-row>
            <b-col md="3" cols="6" class="mt-4" v-for="c in collections" :key="c.id">
                <collection-cover :value="c"></collection-cover>
            </b-col>
        </b-row>


        <b-row>
            <b-col>
                <h2 class="mb-0 mt-4">Albums</h2>
            </b-col>
        </b-row>

        <b-row>
            <b-col md="3" cols="6" class="mt-4" v-for="a in albums" :key="a.id">
                <album-cover :value="a"></album-cover>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import AlbumCover from '~/components/AlbumCover.vue'
    import CollectionCover from '~/components/CollectionCover.vue'

    import api from '~/plugins/api';
    import Collection from "Shared/entities/Collection";
    import Album from "Shared/entities/Album";

    export default {
        head: () => ({
            title: "Home"
        }),
        data: () => ({
            albums: [],
            collections: []
        }),
        async asyncData (context) {
            let q = context.route.query.q;

            let { data: collections } = await api.get(`/collection/search`, {
                params: {
                    q
                }
            });

            let { data: albums } = await api.get(`/album/search`, {
                params: {
                    q
                }
            });

            return { collections, albums };
        },
        components: {
            AlbumCover,
            CollectionCover
        },
        watch: {
            "$route.query.q": function () {
                this.search(this.$route.query.q);
            }
        },
        methods: {
            async search(q) {
                let { data: collections } = await api.get(`/collection/search`, {
                    params: {
                        q
                    }
                });

                let { data: albums } = await api.get(`/album/search`, {
                    params: {
                        q
                    }
                });

                this.collections = collections.map(c => new Collection(c));
                this.albums = albums.map(a => new Album(a));
            }
        },
        created() {
            this.collections = this.collections.map(d => new Collection(d));
            this.albums = this.albums.map(d => new Album(d));
        }
    }
</script>

<style>
</style>
