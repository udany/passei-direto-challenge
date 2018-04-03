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
                <a :href="a.length ? '#'+l : '#'" class="letter-link" :class="{disabled: !a.length}"
                   v-for="(a, l) in letters" :key="l">
                    {{l}}
                </a>
            </b-col>
        </b-row>

        <div v-for="(a, l) in letters" :key="l" v-if="a.length">
            <b-row>
                <b-col>
                    <h2 class="mb-0 mt-4">
                        <a :name="l">{{l}}</a>
                    </h2>
                </b-col>
            </b-row>

            <b-row>
                <b-col md="3" cols="6" class="mt-4" v-for="c in a" :key="c.id">
                    <collection-cover :value="c" icon="chevron-right" title="Chill mix"></collection-cover>
                </b-col>
            </b-row>
        </div>
    </div>
</template>

<script>
    import CollectionCover from '~/components/CollectionCover.vue'
    import Collection from 'Shared/entities/Collection'
    import Sorter from 'Shared/base/Sorter'
    import axios from 'axios';

    export default {
        head: () => ({
            title: "Collection List"
        }),
        data: () => ({
            currentLetter: "A",

            letters: {},
            collections: [],

            sorter: Sorter.fromAttribute(Collection.GetAttribute('name'), 1).caseInsensitive()
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
                return String.fromCharCode(n);
            },
            createLetterArrays() {
                let letters = {};

                for (let i = 65; i <= 90; i++) {
                    letters[this.nthLetter(i)] = [];
                }

                this.letters = letters;
            },
            fillLetterArrays() {
                for (let c of this.collections) {
                    let letter = c.name[0].toUpperCase();
                    this.letters[letter].push(c);
                }
            }
        },
        components: {
            CollectionCover
        },
        created() {
            if (this.collections.length && this.collections[0].constructor !== Collection) {
                this.collections = this.collections.map(d => new Collection(d));
            }

            this.collections = Sorter.sort(this.collections, this.sorter);

            this.createLetterArrays();
            this.fillLetterArrays();
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

    a.letter-link:hover {
        opacity: 1;
        transform: scale(1.1);
    }

    a.letter-link.disabled {
        cursor: default;
        opacity: .2;
    }
</style>
