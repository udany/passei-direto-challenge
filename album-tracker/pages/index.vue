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
                <square-cover :id="0" icon="chevron-right" title="Chill mix"></square-cover>
            </b-col>
            <b-col md="3" cols="6" class="mt-4">
                <square-cover :id="1" icon="chevron-right" title="Cozy by the fire"></square-cover>
            </b-col>
            <b-col md="3" cols="6" class="mt-4">
                <square-cover :id="2" icon="chevron-right" title="Party Hard"></square-cover>
            </b-col>
            <b-col md="3" cols="6" class="mt-4">
                <square-cover :id="3" icon="chevron-right" title="Countryside harkens"></square-cover>
            </b-col>
        </b-row>

        <b-row>
            <b-col>
                <h2 class="mb-0 mt-4">Popular Albums</h2>
            </b-col>
        </b-row>

        <b-row>
            <b-col md="3" cols="6" class="mt-4">
                <square-cover :id="0" icon="chevron-right" title="Chill mix"></square-cover>
            </b-col>
            <b-col md="3" cols="6" class="mt-4">
                <square-cover :id="1" icon="chevron-right" title="Cozy by the fire"></square-cover>
            </b-col>
            <b-col md="3" cols="6" class="mt-4">
                <square-cover :id="2" icon="chevron-right" title="Party Hard"></square-cover>
            </b-col>
            <b-col md="3" cols="6" class="mt-4">
                <square-cover :id="3" icon="chevron-right" title="Countryside harkens"></square-cover>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import AppLogo from '~/components/AppLogo.vue'
    import SquareCover from '~/components/SquareCover.vue'

    export default {
        components: {
            AppLogo,
            SquareCover
        }
    }
</script>

<style>
</style>
