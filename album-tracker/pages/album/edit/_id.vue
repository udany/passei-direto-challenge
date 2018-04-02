<template>
    <div class="container my-4">
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
                <simple-cover image="/mock/collection/0.jpg"></simple-cover>
            </b-col>
            <b-col md="6">
                <h1>
                    Back to Black
                </h1>
                <h4>
                    Amy Winehouse
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
                        <tr>
                            <td>
                                1
                            </td>
                            <td class="text-sm">
                                <i class="fa fa-play mt-1"></i>
                            </td>
                            <td>
                                Rehab
                            </td>
                            <td>
                                3:34
                            </td>
                        </tr>
                        <tr>
                            <td>
                                2
                            </td>
                            <td class="text-sm">
                                <i class="fa fa-play mt-1"></i>
                            </td>
                            <td>
                                You Know I'm No Good
                            </td>
                            <td>
                                4:17
                            </td>
                        </tr>
                        <tr>
                            <td>
                                3
                            </td>
                            <td class="text-sm">
                                <i class="fa fa-play mt-1"></i>
                            </td>
                            <td>
                                Me & Mr Jones
                            </td>
                            <td>
                                2:32
                            </td>
                        </tr>
                        <tr>
                            <td>
                                4
                            </td>
                            <td class="text-sm">
                                <i class="fa fa-play mt-1"></i>
                            </td>
                            <td>
                                Just Friends
                            </td>
                            <td>
                                3:12
                            </td>
                        </tr>
                    </tbody>
                </table>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import SimpleCover from '~/components/SimpleCover.vue'
    import AlbumCover from '~/components/AlbumCover.vue'

    export default {
        head: () => ({
            title: "Back to Black | Edit"
        }),
        data: () => ({
            currentLetter: "A"
        }),
        methods: {
            back() {
                this.$router.go(-1);
            },
            play() {

            }
        },
        components: {
            SimpleCover,
            AlbumCover
        }
    }
</script>

<style>
</style>
