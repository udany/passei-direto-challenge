<template>
    <square-cover class="album-cover" :image="value.getImageUrl()" v-bind="$attrs" v-on="$listeners"
                  @action="mainAction" v-if="value">
        <template slot="title">
            <h5 class="m-0">{{value.name}}</h5>

            <span class="m-0">{{value.artist}}</span>
        </template>
        <slot name="actions" slot="actions">
            <!--<b-button size="sm" variant="success" type="submit">-->
                <!--<i class="fa fa-plus"></i>-->
            <!--</b-button>-->
        </slot>
    </square-cover>
</template>

<script>
    import SquareCover from './SquareCover.vue'
    import Album from 'Shared/entities/Album'

    export default {
        props: {
            value: {
                type: Album
            }
        },
        components: {
            SquareCover
        },
        methods: {
            mainAction() {
                if (this.$listeners['action']) {
                    this.$listeners['action']();
                } else {
                    const {value} = this;
                    this.$router.push(`/album/${value.id}`);
                }
            }
        }
    }
</script>

<style>
</style>
