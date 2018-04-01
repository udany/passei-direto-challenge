<template>
    <div class="container mt-4">
        <b-row>
            <b-col>
                <h1>
                    Welcome to Album Tracker!
                </h1>
            </b-col>
        </b-row>

        <b-row>
            <b-col md="3" class="mt-4">
                <square>
                    <h2 class="ml-4 mt-4">Test</h2>
                </square>
            </b-col>
            <b-col md="3" class="mt-4">
                <square></square>
            </b-col>
            <b-col md="3" class="mt-4">
                <square></square>
            </b-col>
            <b-col md="3" class="mt-4">
                <square></square>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import AppLogo from '~/components/AppLogo.vue'
    import Square from '~/components/Square.vue'

    export default {
        components: {
            AppLogo,
            Square
        }
    }
</script>

<style>
</style>
