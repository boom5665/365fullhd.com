<template>
    <client-only>
        <Player _type="series" :_id="_id" :_slug="_slug" :_ep="_ep" :_movieObj="movieObj" />
    </client-only>
</template>

<script>
import { mapState } from "vuex";
export default {
    layout: "play",
    async asyncData({ params, $axios, store }) {
        const res = await $axios.$post("movie/detailmovie", {
            movie_id: parseInt(params.id),
        });
        const movieObj = res.result[0];
        store.commit("setWebTitle", movieObj.full_name);
        return { movieObj };
    },
 head() {
        return {
           titleTemplate: (titleChunk) => {
                return titleChunk ? this.movieObj.name_th + ` | ${titleChunk} ` : this.movieObj.name_th;
            },
            meta: [
                {
                    hid: "description",
                    name: "description",
                    content: this.SEODescription.replace("{{category}}", this.movieObj.name_th) || "mugquwas open graph meta description",
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
                    content: this.SEODescription.replace("{{category}}", this.movieObj.name_th) || "mugquwas open graph meta description",
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
