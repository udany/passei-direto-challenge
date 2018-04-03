<template>
    <square-cover v-if="value && value.getImageUrl" class="collection-cover" :image="value.getImageUrl()" :title="value.name" v-bind="$attrs" v-on="$listeners">
        <slot name="actions" slot="actions"></slot>
    </square-cover>
</template>

<script>
    import SquareCover from './SquareCover.vue'
    import Collection from 'Shared/entities/Collection'

    export default {
        props: {
            value: {
                type: Collection
            }
        },
        components: {
            SquareCover
        }
    }
</script>

<style>
</style>
