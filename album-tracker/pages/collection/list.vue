<template>
    <div class="container my-4">
        <b-row>
            <b-col>
                <h1 class="my-4">
                    <b-button variant="success" class="float-right mt-2">
                        <i class="fa fa-plus"></i>
                    </b-button>
                    Collections
                </h1>
            </b-col>
        </b-row>

        <letter-sorter :data="collections" :sorters="[sorter]" property="name">
            <b-col  md="3" cols="6" class="mt-4"
                    slot="item" slot-scope="data">
                <collection-cover :value="data.item" icon="chevron-right"></collection-cover>
            </b-col>
        </letter-sorter>
    </div>
</template>

<script>
    import CollectionCover from '~/components/CollectionCover.vue'
    import LetterSorter from '~/components/LetterSorter.vue'

    import Collection from 'Shared/entities/Collection'
    import Sorter from 'Shared/base/Sorter'

    import api from '~/plugins/api';

    export default {
        head: () => ({
            title: "Collection List"
        }),
        data: () => ({
            collections: [],
            sorter: Sorter.fromAttribute(Collection.GetAttribute('name'), 1).caseInsensitive()
        }),
        async asyncData ({ params }) {
            let { data } = await api.get(`/collection`);

            return { collections: data }
        },
        methods: {
        },
        components: {
            CollectionCover,
            LetterSorter
        },
        created() {
            if (this.collections.length && this.collections[0].constructor !== Collection) {
                this.collections = this.collections.map(d => new Collection(d));
            }
        }
    }
</script>

<style>
</style>
