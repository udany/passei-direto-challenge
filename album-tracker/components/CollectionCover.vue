<template>
    <square-cover v-if="value && value.getImageUrl" class="collection-cover" :image="value.getImageUrl()" :title="value.name" v-bind="$attrs" v-on="$listeners"
                  @action="mainAction">
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
        },
        methods: {
            mainAction() {
                if (this.$listeners['action']) {
                    this.$listeners['action']();
                } else {
                    const {value} = this;
                    this.$router.push(`/collection/${value.id}`);
                }
            }
        }
    }
</script>

<style>
</style>
