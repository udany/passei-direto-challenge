<template>
    <div class="square">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<style>
    .square{
        width: 100%;
        position: relative;
    }
    .square:before{
        content:'';
        padding:50% 0; /* vertical value as  100% equals width */
        display:inline-block;
    }
    .square .content {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
    }
</style>
