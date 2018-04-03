<template>
    <div>
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
                <slot name="item" v-for="item in a" :item="item">

                </slot>
            </b-row>
        </div>
    </div>
</template>

<script>
    import Sorter from 'Shared/base/Sorter'

    // Build letter list
    let letterList = [];
    letterList.push('#');
    for (let i = 65; i <= 90; i++) {
        letterList.push(String.fromCharCode(i));
    }

    export default {
        name: 'LetterSorter',
        data: () => ({
            letters: {}
        }),
        props: {
            data: {
                type: Array
            },
            sorters: {
                type: Array
            },
            property: {
                type: [String, Function]
            }
        },
        methods: {
            createLetterArrays() {
                let letters = {};

                for (let letter of letterList) {
                    letters[letter] = [];
                }

                this.letters = letters;
            },
            fillLetterArrays() {
                let data = Sorter.sort(this.data, this.sorters);

                for (let item of data) {
                    let letter = item[this.property][0].toUpperCase();
                    if (this.letters.hasOwnProperty(letter)) {
                        this.letters[letter].push(item);
                    }else {
                        this.letters['#'].push(item);
                    }
                }
            }
        },
        components: {
        },
        created() {
            this.createLetterArrays();
            if (this.data && this.data.length) {
                this.fillLetterArrays();
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

    a.letter-link:hover {
        opacity: 1;
        transform: scale(1.1);
    }

    a.letter-link.disabled {
        cursor: default;
        opacity: .2;
    }
</style>
