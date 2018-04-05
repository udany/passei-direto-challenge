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
                <h2 class="m-0">Popular Collections</h2>
            </b-col>
        </b-row>

        <b-row>
            <b-col md="3" cols="6" class="mt-4" v-for="c in collections">
                <collection-cover :value="c"></collection-cover>
            </b-col>
        </b-row>

        <b-row>
            <b-col>
                <h2 class="mb-0 mt-4">Popular Albums</h2>
            </b-col>
        </b-row>

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
</template>

<script>
    import AlbumCover from '~/components/AlbumCover.vue'
    import CollectionCover from '~/components/CollectionCover.vue'

    import api from '~/plugins/api';
    import Collection from "Shared/entities/Collection";

    export default {
        head: () => ({
            title: "Home"
        }),
        data: () => ({
            collections: []
        }),
        async asyncData () {
            let { data } = await api.get(`/collection`);

            return { collections: data }
        },
        components: {
            AlbumCover,
            CollectionCover
        },
        created() {
            if (this.collections.length) {
                this.collections = this.collections.map(d => new Collection(d));
            }
        }
    }
</script>

<style>
</style>
