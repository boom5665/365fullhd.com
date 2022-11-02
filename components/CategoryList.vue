<template>
    <div class="category-list-container">
        <div class="category-header">หมวดหมู่</div>
        <ul class="category-list">
            <li class="category-single" v-for="(value, index) in types" :key="'type' + index">
                <nuxt-link :to="'/' + _type + '/type/' + value.name_slug">{{ value.name_th }}</nuxt-link>
            </li>
            <li class="category-single" v-for="(value, index) in categories" :key="'cate' + index">
                <nuxt-link :to="'/' + _type + '/category/' + value.name_slug">{{ value.name_th }}</nuxt-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        _type: {
            type: String,
            required: false,
            default: "movie",
        },
    },
    data() {
        return {
            categories: [],
            types: [],
        };
    },
    created() {
        this.getType();
        this.getCategory();
    },
    methods: {
        async getType() {
            const data = await this.$axios.$get(this._type + "/listtype");
            if (data.code == 200) this.types = data.result;
        },
        async getCategory() {
            const data = await this.$axios.$get(this._type + "/listcate");
            if (data.code == 200) this.categories = data.result;
        },
    },
};
</script>