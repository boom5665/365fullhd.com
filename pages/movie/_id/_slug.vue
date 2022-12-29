<template>
    <client-only>
        <Player _type="movie" :_id="_id" :_slug="_slug" :_movieObj="movieObj" />
    </client-only>
</template>

<script>
import { mapState } from "vuex";
export default {
    layout: "play",
    name: "movieSlug",
    async asyncData({ params, $axios }) {
        const res = await $axios.$post("movie/detailmovie", {
            movie_id: parseInt(params.id),
        });
        const movieObj = res.result[0];
        return { movieObj };
    },
    head() {
        return {
            titleTemplate: (titleChunk) => {
                return titleChunk ? this.movieObj.full_name + ` | ${titleChunk}  ` : this.movieObj.full_name;
            },
            meta: [
                {
                    hid: "description",
                    name: "description",
                    content:  this.movieObj.full_name + " | ฉายปี : " + this.movieObj.year + " | คะแนน : " + this.movieObj.ratescore + " ดูฟรี พากย์ไทย ซับไทย ระบบ HD FULLHD  "
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
                    content: this.movieObj.full_name + " | ฉายปี : " + this.movieObj.year + " | คะแนน : " + this.movieObj.ratescore + " ดูฟรี พากย์ไทย ซับไทย ระบบ HD FULLHD " || "mugquwas open graph meta description",
                },
                {
                    property: "og:url",
                    name: "og:url",
                    content: "https://movie365.com",
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
    computed: {
        _id() {
            return parseInt(this.$route.params.id);
        },
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
    mounted() {
        this.playCount();
    },
    methods: {
        playCount() {
            const self = this;
            this.$axios.$post("clipsclicker", {
                movie_id: self._id,
                movie_type: 1,
            });
        },
    },
};
</script>
