<template>
    <div class="container my-4">
        <b-row>
            <b-col>
                <h1 class="my-4">
                    Welcome to Album Tracker!
                </h1>
            </b-col>
        </b-row>


        <b-row>
            <b-col>
                <h2 class="m-0">Latest Collections</h2>
            </b-col>
        </b-row>

        <b-row>
            <b-col md="3" cols="6" class="mt-4" v-for="c in collections" :key="c.id">
                <collection-cover :value="c"></collection-cover>
            </b-col>
        </b-row>


        <b-row>
            <b-col>
                <h2 class="mb-0 mt-4">Latest Albums</h2>
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
        async asyncData () {
            let { data: collections } = await api.get(`/collection`);

            let { data: albums } = await api.get(`/album`);

            collections = collections.splice(-4);
            albums = albums.splice(-4);

            return { collections, albums };
        },
        components: {
            AlbumCover,
            CollectionCover
        },
        created() {
            this.collections = this.collections.map(d => new Collection(d));
            this.albums = this.albums.map(d => new Album(d));
        }
    }
</script>

<style>
</style>
