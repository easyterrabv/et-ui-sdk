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
import { defineComponent } from "vue";
export default defineComponent({
    data() {
        return {
            isMouseDown: false,
            isDragging: false,
            startY: 0,
            scrollTop: 0
        };
    },
    watch: {
        isDragging() {
            if (this.isDragging) {
                this.$emit("dragStart");
                return;
            }
            this.$emit("dragStop");
        }
    },
    methods: {
        startDrag(event: MouseEvent) {
            this.isMouseDown = true;
            this.startY = event.clientY;
            this.scrollTop = (this.$refs.scrollContainer as any).scrollTop;
        },
        drag(event: MouseEvent) {
            if (!this.isMouseDown) return;
            this.isDragging = true;
            const deltaY = event.clientY - this.startY;
            this.scrollTo(this.scrollTop - deltaY);
        },
        stopDrag() {
            this.isMouseDown = false;
            this.isDragging = false;
            this.$emit("dragStop");
        },
        scrollTo(pos: number) {
            (this.$refs.scrollContainer as any).scrollTop = pos;
        }
    },
    emits: ["dragStart", "dragStop"]
});
</script>
