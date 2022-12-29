<template>
    <div>
       <h2>หนังยอดนิยม</h2>
        <vue-glide :breakpoints="{ 400: { perView: 1 }, 700: { perView: 2 }, 1000: { perView: 3 }, 1200: { perView: 4 } }" v-model="active" v-bind="carouselOptions" v-if="movieList.length > 0">
            <template slot="control">

                <button  class="arrow-left" data-glide-dir="<"><div class="mr-3" ><b-icon-arrow-left style="width: 24px; height: 36px" aria-hidden="true" /></div></button>
                <button class="arrow-right"  data-glide-dir=">"><div ><b-icon-arrow-right style="width: 24px; height: 36px" aria-hidden="true" /></div></button>
            </template>
            <vue-glide-slide v-for="(value, index) in movieList" :key="index"> <SingleMovieBlock :_obj="value" /></vue-glide-slide>
        </vue-glide>
    </div>
</template>

<script>
export default {
    data() {
        return {
            carouselOptions: {
                // autoplay: 3000,
                perView: 5,
                focusAt: "center",
                type: "carousel",
                perTouch: 5,
                // animationDuration: 100,
            },

            active: 0,
            movieList: [],
        };
    },

    mounted() {
        this.getMovies();
    },
    methods: {
        getMovies() {
            const self = this;
            this.loadingList = true;
            this.$axios
                .$post("moviehot", {
                })
                .then(function (response) {
                    if (response.code == 200) {
                        // console.log(response.result);
                        self.movieList = response.result;
                        self.maxPage = response.page_total;
                    }
                    self.loadingList = false;
                });
        },
    },
};
</script>


<style scoped>
.text-prev {
    position: relative;
    display: flex;
    justify-content: flex-end;
}
.arrow-right {
    background: transparent;
    border: none;
    font-size: 50px;
    color: white;
    position: absolute;
    right: 0px;
    top: 40%;
}
.arrow-left {
    background: transparent;
    border: none;
    font-size: 50px;
    color: white;
    position: absolute;
    left: 0px;
    top: 40%;
}

</style>
