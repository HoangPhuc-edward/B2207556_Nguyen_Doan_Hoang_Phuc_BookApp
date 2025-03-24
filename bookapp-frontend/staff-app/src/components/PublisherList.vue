<script>

export default {
    props: {
        publishers: { type: Array, default: [] },
        activeIndex: { type: Number, default: -1 },
    },
    emits: ["update:activeIndex"],
    methods: {
        updateActiveIndex(index) {
            this.$emit("update:activeIndex", index);
        }
    }
}
</script>

<template>
    <ul class="list-group">
        <li class="list-group-item" v-for="(publisher, index) in publishers" :class="{ active: index === activeIndex }"
            :key="publisher._id" @click="updateActiveIndex(index)">
            <h6>{{ publisher.TenNXB }}</h6>
            <p>{{ publisher.DiaChi }}</p>
        </li>
    </ul>
</template>