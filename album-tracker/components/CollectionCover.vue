<template>
    <square-cover class="collection-cover" :image="'/mock/collection/'+id+'.jpg'" :title="title" v-bind="$attrs">
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
            }
        },
        components: {
            SquareCover
        }
    }
</script>

<style>
</style>
