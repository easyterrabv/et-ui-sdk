<template>
    <div
        @dragover="handleDragOver"
        @dragleave="handleDragLeave"
        @drop="handleDrop"
        @mouseup.left="handleClick"
        class="group et-input-file-drop flex flex-col w-full items-center justify-center h-40 border-2 border-dashed border-default-light rounded-md p-4"
        :class="{
            'hover:border-default cursor-pointer': !isProcessing,
            'cursor-wait': isProcessing
        }"
    >
        <input
            ref="fileInput"
            type="file"
            class="hidden"
            @change="handleFileInputChange"
        />
        <template v-if="!isProcessing">
            <div class="text-text-light w-6 h-6 mb-2 group-hover:text-text">
                <EtIconPlus v-if="!isDragging"></EtIconPlus>
                <EtIconArrowDown v-if="isDragging"></EtIconArrowDown>
            </div>
            <p class="text-sm text-text">
                <span v-if="!isDragging"
                    >Drag and drop files here or click to upload</span
                >
                <span v-if="isDragging">Release to upload</span>
            </p>
        </template>
        <template v-else>
            <EtIconSpinner
                pulse
                class="text-text-light w-6 h-6 mb-2"
            ></EtIconSpinner>
            <p class="text-sm text-text">Processing Upload</p>
        </template>
    </div>
</template>

<script lang="ts">
import EtIconPlus from "../etIcon/EtIconPlus.vue";
import EtIconArrowDown from "../etIcon/EtIconArrowDown.vue";
import EtIconSpinner from "../etIcon/EtIconSpinner.vue";
import { defineComponent } from "vue";

export default defineComponent({
    components: {
        EtIconPlus,
        EtIconArrowDown,
        EtIconSpinner
    },
    data() {
        return {
            isDragging: false as boolean,
            isProcessing: false as boolean
        };
    },
    methods: {
        handleClick() {
            if (this.isProcessing || this.isDragging) {
                return;
            }
            (this.$refs.fileInput as any).click();
        },
        handleDragOver(event: MouseEvent) {
            if (this.isProcessing) {
                return;
            }
            event.preventDefault();
            this.isDragging = true;
        },
        handleDragLeave(event: MouseEvent) {
            if (this.isProcessing) {
                return;
            }
            event.preventDefault();
            this.isDragging = false;
        },
        handleDrop(event: DragEvent) {
            if (this.isProcessing) {
                return;
            }
            event.preventDefault();
            this.isDragging = false;

            // Handle file upload logic here
            const files = event.dataTransfer?.files as FileList;
            this.handleFiles(files || []);
        },
        handleFileInputChange(event: Event) {
            const target = event.target as HTMLInputElement;
            const files = target.files as FileList;
            this.handleFiles(files);
        },
        handleFiles(files: FileList) {
            let emitValue = files as FileList | null;
            if (!files || files.length == 0) {
                emitValue = null;
            }
            this.$emit("files", files);
        },
        setProcessing(state: boolean = false) {
            this.isProcessing = state;
        }
    },
    emits: {
        files: (files: FileList) => files instanceof FileList || null
    }
});
</script>
