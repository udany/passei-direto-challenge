<template>
    <div class="container my-4">
        <b-row>
            <b-col>
                <h1 class="my-4">
                    <b-button variant="success" class="float-right mt-2" @click="add">
                        <i class="fa fa-plus"></i>
                    </b-button>
                    Albums
                </h1>
            </b-col>
        </b-row>

        <letter-sorter :data="albums" :sorters="[sorter]" property="name">
            <b-col  md="3" cols="6" class="mt-4"
                    slot="item" slot-scope="data">
                <album-cover :value="data.item" icon="chevron-right"></album-cover>
            </b-col>
        </letter-sorter>
    </div>
</template>

<script>
    import AlbumCover from '~/components/AlbumCover.vue'
    import LetterSorter from '~/components/LetterSorter.vue'

    import Album from 'Shared/entities/Album'
    import Sorter from 'Shared/base/Sorter'

    import api from '~/plugins/api';

    export default {
        head: () => ({
            title: "Album List"
        }),
        data: () => ({
            albums: [],
            sorter: Sorter.fromAttribute(Album.GetAttribute('name'), 1).caseInsensitive()
        }),
        async asyncData ({ params }) {
            let { data } = await api.get(`/album`);

            return { albums: data }
        },
        methods: {
            add() {
                this.$router.push(`/album/edit/0`);
            }
        },
        components: {
            AlbumCover,
            LetterSorter
        },
        created() {
            this.albums = this.albums.map(d => new Album(d));
        }
    }
</script>

<style>
</style>
