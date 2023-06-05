<template>
    <div class="relative inline-block">
        <div @click="togglePopover">
            <slot name="toggle"></slot>
        </div>
        <EtBox
            class="absolute right-0 z-10 mt-2 transition ease-out duration-75 transform rounded-md"
            :class="{
                'opacity-0 scale-80': !visible,
                'opacity-100 scale-100': visible,
                'w-full': fitToggle
            }"
        >
            <slot></slot>
        </EtBox>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue-demi";
import EtBox from "src/components/EtBox.vue";

export default defineComponent({
    props: {
        fitToggle: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    components: {
        EtBox
    },
    data() {
        return {
            visible: false
        };
    },
    methods: {
        togglePopover() {
            this.visible = !this.visible;
        }
    }
});
</script>
