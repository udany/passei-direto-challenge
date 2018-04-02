<template>
    <square-cover class="album-cover" :image="'/mock/album/'+id+'.jpg'" v-bind="$attrs" v-on="$listeners"
                  @action="mainAction">
        <template slot="title">
            <h5 class="m-0">{{title}}</h5>

            <span class="m-0">{{artist}}</span>
        </template>
        <slot name="actions" slot="actions">
            <b-button size="sm" variant="success" type="submit">
                <i class="fa fa-plus"></i>
            </b-button>
        </slot>
    </square-cover>
</template>

<script>
    import SquareCover from './SquareCover.vue'

    export default {
        props: {
            id: {
                type: Number
            },
            title: {
                type: String,
                default: ''
            },
            artist: {
                type: String,
                default: ''
            }
        },
        methods: {
            mainAction() {
                if (this.$listeners['action']) {
                    this.$listeners['action']();
                } else {
                    const {id} = this;
                    this.$router.push(`/album/${id}`);
                }
            }
        },
        components: {
            SquareCover
        }
    }
</script>

<style>
</style>
