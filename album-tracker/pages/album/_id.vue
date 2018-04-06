<template>
    <div class="container my-4" v-if="item">
        <b-row>
            <b-col>
                <h4 class="mb-0 mt-4">
                    <a href="#" class="color-neutral" @click.prevent="back">
                        <i class="fa fa-chevron-left"></i>
                        Back
                    </a>
                </h4>
            </b-col>
        </b-row>

        <b-row class="mt-4">
            <b-col md="6">
                <album-cover :value="item" :showDetails="false" icon="play" @action="play"></album-cover>

                <p class="my-2 text-right">
                    <a href="#" class="color-neutral" @click.prevent="edit">
                        <i class="fa fa-pencil"></i>&nbsp;
                        Edit
                    </a>

                    &nbsp;&middot;&nbsp;

                    <a href="#" class="color-neutral" @click.prevent="remove" style="color: #bd0000">
                        <i class="fa fa-remove"></i>
                        Remove
                    </a>
                </p>
            </b-col>
            <b-col md="6">
                <h1>
                    {{item.name}}
                </h1>
                <h4>
                    {{item.artist}}
                </h4>

                <!-- Tracks -->
                <table class="table">
                    <thead>
                        <tr>
                            <th style="width: 25px">
                                #
                            </th>
                            <th style="width: 25px">
                                &nbsp;
                            </th>
                            <th>
                                Title
                            </th>
                            <th style="width: 25px" class="text-right">
                                <i class="fa fa-clock-o"></i>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="t in item.tracks" :key="t.id">
                            <td>
                                {{t.number}}
                            </td>
                            <td class="text-sm">
                                <a href="#" class="color-neutral" @click.prevent="t.sound.toggle"
                                   v-if="t.sound">
                                    <i class="fa fa-play mt-1"
                                       :class="{
                                       'fa-spin': t.sound.isLoading(),
                                       'fa-spinner': t.sound.isLoading(),
                                       'fa-play': t.sound.isStopped(),
                                       'fa-stop': t.sound.isPlaying()
                                       }"></i>
                                </a>
                            </td>
                            <td>
                                {{t.name}}
                            </td>
                            <td>
                                {{t.getDurationString()}}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import AlbumCover from '~/components/AlbumCover.vue';

    import api from '~/plugins/api';
    import Album from "Shared/entities/Album";

    export default {
        head() {
            return {
                title: this.item ? this.item.name : 'Loading...'
            };
        },
        data: () => ({
            item: null
        }),
        async asyncData({params}) {
            let {data} = await api.get(`/album/${params.id}`);

            return {item: new Album(data)}
        },

        components: {
            AlbumCover
        },

        methods: {
            back() {
                this.$router.go(-1);
            },
            edit() {
                this.$router.push(`/album/edit/${this.$route.params.id}`);
            },
            play() {

            }
        },
        created() {
            if (this.item) {
                this.item = new Album(this.item);
            }
        }
    }
</script>

<style>
</style>
