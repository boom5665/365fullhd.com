<template>
    <client-only>
        <MovieList :_title="typeObj.name_th" :_type="_slug" :_ismovie="true" />
    </client-only>
</template>

<script>
import { mapState } from "vuex";
export default {
    name: "movieTypeSlug",
    layout: "movie",
    async asyncData({ params, $axios }) {
        const res = await $axios.$get("movie/listtype?slug=" + params.slug);
        const typeObj = res.result[0];
        return { typeObj };
    },
    head() {
        return {
            titleTemplate: (titleChunk) => {
                return titleChunk ? this.typeObj.name_th + ` | ${titleChunk} ` : this.typeObj.name_th;
            },
            meta: [
                {
                    hid: "description",
                    name: "description",
                    content: this.SEODescription.replace("{{category}}", this.typeObj.name_th) || "mugquwas open graph meta description",
                },
                {
                    name: "keywords",
                    content: ["ดูหนัง", "ดูหนังออนไลน์", "ดูซีรี่ย์"],
                },
                {
                    property: "og:title",
                    name: "og:title",
                    content: this.SEOTitle,
                },
                {
                    property: "og:description",
                    name: "og:description",
                    content: this.SEODescription.replace("{{category}}", this.typeObj.name_th) || "mugquwas open graph meta description",
                },
                {
                    property: "og:url",
                    name: "og:url",
                    content: "https://www.movie365",
                },
                {
                    property: "og:site_name",
                    name: "og:site_name",
                    content: "movie365",
                },
                {
                    property: "og:image",
                    name: "og:image",
                    content: this.logo,
                },
            ],
            link: [{ rel: "icon", type: "image/x-icon", href: this.icon }],
        };
    },
    data() {
        return {};
    },
    computed: {
        _slug() {
            return this.$route.params.slug;
        },
        ...mapState({
            descriptionFooter: (state) => state.descriptionFooter,
            logo: (state) => state.logo,
            icon: (state) => state.icon,
            slogan: (state) => state.slogan,
            SEOTitle: (state) => state.SEOTitle,
            SEODescription: (state) => state.SEODescription,
            adsBottom: (state) => state.adsBottom,
        }),
    },
    mounted() {},
    methods: {},
};
</script>

<style>
</style>
