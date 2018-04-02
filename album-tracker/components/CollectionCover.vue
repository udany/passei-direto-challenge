<template>
    <square-cover class="collection-cover" :image="'/mock/collection/'+id+'.jpg'" v-bind="$attrs" v-on="$listeners">
        <slot name="actions" slot="actions"></slot>
    </square-cover>
</template>

<script>
    import SquareCover from './SquareCover.vue'

    export default {
        props: {
            id: {
                type: Number
            }
        },
        components: {
            SquareCover
        }
    }
</script>

<style>
</style>
