<template>
    <div class="container my-4">
        <b-row>
            <b-col>
                <h1 class="my-4">
                    Collections
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
            <b-col>
                <h2 class="mb-0 mt-4">B</h2>
            </b-col>
        </b-row>

        <b-row>
            <b-col>
                <h2 class="mb-0 mt-4">C</h2>
            </b-col>
        </b-row>

        <b-row>
            <b-col md="3" cols="6" class="mt-4" v-for="c in collections" :key="c.id">
                <collection-cover :value="c" icon="chevron-right" title="Chill mix"></collection-cover>
            </b-col>
        </b-row>

        <b-row>
            <b-col>
                <h2 class="mb-0 mt-4">D</h2>
            </b-col>
        </b-row>

        <b-row>
            <b-col>
                <h2 class="mb-0 mt-4">E</h2>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import CollectionCover from '~/components/CollectionCover.vue'
    import Collection from 'Shared/entities/Collection'
    import axios from 'axios';

    export default {
        head: () => ({
            title: "Collection List"
        }),
        data: () => ({
            currentLetter: "A",
            collections: []
        }),
        async asyncData ({ params }) {
            let data;
            if (process.server) {
                data = require('~/static/mock/collections.json');
            } else {
                let result = await axios.get(`http://localhost:3000/mock/collections.json`);
                data = result.data;
            }

            return { collections: data }
        },
        methods: {
            nthLetter(n) {
                return String.fromCharCode(n + 64);
            }
        },
        components: {
            CollectionCover
        },
        created() {
            if (this.collections.length && this.collections[0].constructor !== Collection) {
                this.collections = this.collections.map(d => new Collection(d));
            }
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
