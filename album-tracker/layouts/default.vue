<template>
    <div>
        <b-navbar toggleable="md" type="dark" id="main-nav">

            <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

            <b-navbar-brand to="/">Album Tracker</b-navbar-brand>

            <b-collapse is-nav id="nav_collapse">
                <!-- Left Side -->
                <b-navbar-nav>

                    <b-nav-item to="/album/list">Albums</b-nav-item>
                    <b-nav-item to="/collection/list">Collections</b-nav-item>

                </b-navbar-nav>

                <!-- Right side -->
                <b-navbar-nav class="ml-auto">

                    <!-- Search -->
                    <b-nav-form @submit.prevent="search">
                        <b-input-group>
                            <b-form-input size="sm" type="text" placeholder="Search" v-model="searchQuery"/>
                            <b-input-group-append>
                                <b-button size="sm" variant="secondary" type="submit">
                                    <i class="fa fa-search"></i>
                                </b-button>
                            </b-input-group-append>
                        </b-input-group>
                    </b-nav-form>

                </b-navbar-nav>

            </b-collapse>
        </b-navbar>
        <nuxt/>
    </div>
</template>

<script>
    export default {
        head: () => ({
            titleTemplate: "Album Tracker - %s"
        }),
        data: () => ({
            searchQuery: ''
        }),
        methods: {
            search() {
                this.$router.push({
                    path: "/search",
                    query: {
                        q: this.searchQuery
                    }
                })
            }
        }
    };
</script>

<style>
    #main-nav {
        z-index:100;
        background-color: #292f35;
    }
</style>
