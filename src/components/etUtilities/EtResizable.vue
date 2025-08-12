<template>
    <div
        class="et-sdk-resizable"
        :style="{ width: innerWidth + 'px', height: innerHeight + 'px' }"
    >
        <slot></slot>
        <div
            class="et-sdk-resizable--handle et-sdk-resizable--handle-top-left"
            v-if="resizeDirections.includes('top-left')"
            @mousedown="(event) => startResize(event, 'top-left')"
        ></div>
        <div
            class="et-sdk-resizable--handle et-sdk-resizable--handle-top-right"
            v-if="resizeDirections.includes('top-right')"
            @mousedown="(event) => startResize(event, 'top-right')"
        ></div>
        <div
            class="et-sdk-resizable--handle et-sdk-resizable--handle-bottom-right"
            v-if="resizeDirections.includes('bottom-right')"
            @mousedown="(event) => startResize(event, 'bottom-right')"
        ></div>
        <div
            class="et-sdk-resizable--handle et-sdk-resizable--handle-bottom-left"
            v-if="resizeDirections.includes('bottom-left')"
            @mousedown="(event) => startResize(event, 'bottom-left')"
        ></div>
    </div>
</template>

<script lang="ts">
export default {
    props: {
        width: {
            type: Number,
            required: false,
            default: 200
        },
        height: {
            type: Number,
            required: false,
            default: 200
        },
        resizeDirections: {
            type: Array,
            required: false,
            default: () => [
                "top-left",
                "top-right",
                "bottom-right",
                "bottom-left"
            ]
        }
    },
    data() {
        return {
            innerWidth: this.width,
            innerHeight: this.height,
            isResizing: false,
            startX: 0,
            startY: 0,
            resizeDirection: ""
        };
    },
    watch: {
        width() {
            this.innerWidth = this.width;
        },
        height() {
            this.innerHeight = this.height;
        }
    },
    methods: {
        startResize(
            event: MouseEvent,
            direction: "top-left" | "top-right" | "bottom-right" | "bottom-left"
        ) {
            this.isResizing = true;
            this.startX = event.clientX;
            this.startY = event.clientY;
            this.resizeDirection = direction;

            document.addEventListener("mousemove", this.resize);
            document.addEventListener("mouseup", this.stopResize);
            this.$emit("resizestart");
        },
        resize(event: MouseEvent) {
            if (!this.isResizing) {
                return;
            }

            const deltaX = event.clientX - this.startX;
            const deltaY = event.clientY - this.startY;

            switch (this.resizeDirection) {
                case "top-left":
                    this.innerWidth -= deltaX;
                    this.innerHeight -= deltaY;
                    break;
                case "top-right":
                    this.innerWidth += deltaX;
                    this.innerHeight -= deltaY;
                    this.startY = event.clientY;
                    break;
                case "bottom-right":
                    this.innerWidth += deltaX;
                    this.innerHeight += deltaY;
                    this.startX = event.clientX;
                    this.startY = event.clientY;
                    break;
                case "bottom-left":
                    this.innerWidth -= deltaX;
                    this.innerHeight += deltaY;
                    this.startX = event.clientX;
                    break;
            }
        },
        stopResize() {
            this.isResizing = false;
            document.removeEventListener("mousemove", this.resize);
            document.removeEventListener("mouseup", this.stopResize);
            this.$emit("resizestop");
        }
    },
    beforeUnmount() {
        try {
            document.removeEventListener("mousemove", this.resize);
            document.removeEventListener("mouseup", this.stopResize);
        } catch (e) {
            console.warn("Failed to remove resize event listeners:", e);
        }
    },
    emits: ["resizestop", "resizestart"]
};
</script>

<style>
.et-sdk-resizable {
    border: 1px dashed var(--et-sdk-dark-200);
    overflow: hidden;
    position: relative;
}

.et-sdk-resizable--handle {
    position: absolute;
    background-color: var(--et-sdk-dark-200);
    width: 10px;
    height: 10px;
}

.et-sdk-resizable--handle-top-left {
    top: 0;
    left: 0;
    cursor: nwse-resize;
}

.et-sdk-resizable--handle-top-right {
    top: 0;
    right: 0;
    cursor: nesw-resize;
}

.et-sdk-resizable--handle-bottom-right {
    bottom: 0;
    right: 0;
    cursor: nwse-resize;
}

.et-sdk-resizable--handle-bottom-left {
    bottom: 0;
    left: 0;
    cursor: nesw-resize;
}
</style>
