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
            <b-col md="3" cols="6" class="mt-4">
                <collection-cover :id="0" title="Chill mix"></collection-cover>
            </b-col>
            <b-col md="3" cols="6" class="mt-4">
                <collection-cover :id="1" title="Cozy by the fire"></collection-cover>
            </b-col>
            <b-col md="3" cols="6" class="mt-4">
                <collection-cover :id="2" title="Party Hard"></collection-cover>
            </b-col>
            <b-col md="3" cols="6" class="mt-4">
                <collection-cover :id="3" title="Countryside harkens"></collection-cover>
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

    export default {
        head: () => ({
            title: "Home"
        }),
        components: {
            AlbumCover,
            CollectionCover
        }
    }
</script>

<style>
</style>
