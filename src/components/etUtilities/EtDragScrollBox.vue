<template>
    <div
        class="et-drag-scroll-box"
        ref="scrollContainer"
        @mousedown="startDrag"
        @mousemove="drag"
        @mouseup="stopDrag"
    >
        <div class="et-drag-scroll-box-content" ref="content">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue-demi";
export default defineComponent({
    data() {
        return {
            isDragging: false,
            startY: 0,
            scrollTop: 0
        };
    },
    methods: {
        startDrag(event) {
            this.isDragging = true;
            this.startY = event.clientY;
            this.scrollTop = this.$refs.scrollContainer.scrollTop;
        },
        drag(event) {
            if (!this.isDragging) return;
            const deltaY = event.clientY - this.startY;
            this.scrollTo(this.scrollTop - deltaY);
        },
        stopDrag() {
            this.isDragging = false;
        },
        scrollTo(pos) {
            this.$refs.scrollContainer.scrollTop = pos;
        }
    }
});
</script>
