<template>
    <div id="footer">
        <b-container class="h-100">
            <div class="d-flex align-items-center justify-content-between h-100">
                <nuxt-link to="/">
                    <nuxt-img format="webp" :src="logo" width="150" height="61" :alt="SEOTitle" />
                </nuxt-link>
                <div class="back-to-top" @click="scrollToTop()"><b-icon-arrow-up class="icon" /></div>
            </div>
        </b-container>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    computed: {
        ...mapState({
            SEOTitle: (state) => state.SEOTitle,
            logo: (state) => state.logo,
        }),
    },
    methods: {
        scrollToTop() {
            window.scrollTo({ top: 0, behavior: "smooth" });
        },
    },
};
</script>