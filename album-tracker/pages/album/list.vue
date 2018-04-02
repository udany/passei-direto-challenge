<template>
    <div class="container my-4">
        <b-row>
            <b-col>
                <h1 class="my-4">
                    Albums
                </h1>
            </b-col>
        </b-row>

        <b-row>
            <b-col class="letter-links text-center">
                <a href="#" @click.prevent="currentLetter = nthLetter(n)" class="letter-link" v-for="n in 25" :key="nthLetter(n)" :class="{active: currentLetter === nthLetter(n)}">
                    {{nthLetter(n)}}
                </a>
            </b-col>
        </b-row>

        <b-row>
            <b-col>
                <h2 class="mb-0 mt-4">A</h2>
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
            <b-col md="3" cols="6" class="mt-4">
                <square-cover :id="2" icon="chevron-right" title="Party Hard"></square-cover>
            </b-col>
            <b-col md="3" cols="6" class="mt-4">
                <square-cover :id="2" icon="chevron-right" title="Party Hard"></square-cover>
            </b-col>
        </b-row>

        <b-row>
            <b-col>
                <h2 class="mb-0 mt-4">B</h2>
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
    import SquareCover from '~/components/SquareCover.vue'

    export default {
        head: () => ({
            title: "Album List"
        }),
        data: () => ({
            currentLetter: "A"
        }),
        methods: {
            nthLetter(n) {
                return String.fromCharCode(n + 64);
            }
        },
        components: {
            SquareCover
        }
    }
</script>

<style>
    .letter-links {

    }

    a.letter-link {
        color: #dbe1ec;
        display: inline-block;
        padding: .5em;
        font-size: 1.5em;

        opacity: .7;
        transform: scale(1);
        transition: all .3s;
    }

    a.letter-link.active, a.letter-link:hover {
        opacity: 1;
        transform: scale(1.1);
    }
</style>
