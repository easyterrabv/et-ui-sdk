<template>
    <div
        @dragover="handleDragOver"
        @dragleave="handleDragLeave"
        @drop="handleDrop"
        @mouseup.left="handleClick"
        class="et-sdk-input-file-drop"
        :class="{
            'et-sdk-input-file-drop__processing': isProcessing
        }"
    >
        <input
            ref="fileInput"
            type="file"
            class="hidden"
            @change="handleFileInputChange"
        />
        <template v-if="!isProcessing">
            <div class="et-sdk-input-file-drop--icon">
                <EtIconPlus v-if="!isDragging"></EtIconPlus>
                <EtIconArrowDown v-if="isDragging"></EtIconArrowDown>
            </div>
            <p class="et-sdk-input-file-drop--text">
                <span v-if="!isDragging"
                    >Drag and drop files here or click to upload</span
                >
                <span v-if="isDragging">Release to upload</span>
            </p>
        </template>
        <template v-else>
            <EtIconSpinner
                pulse
                class="et-sdk-input-file-drop--icon"
            ></EtIconSpinner>
            <p class="et-sdk-input-file-drop--text">Processing Upload</p>
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

<style>
.et-sdk-input-file-drop {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    justify-content: center;
    height: 160px;
    border: 2px dashed var(--et-sdk-dark-200);
    border-radius: 8px;
    padding: 16px;
    cursor: pointer;
}

.et-sdk-input-file-drop:not(.et-sdk-input-file-drop__processing):hover {
    border-color: var(--et-sdk-dark-300);
}

.et-sdk-input-file-drop:not(.et-sdk-input-file-drop__processing):hover
    .et-sdk-input-file-drop--icon {
    color: var(--et-sdk-dark-600);
}

.et-sdk-input-file-drop__processing {
    cursor: wait;
}

.et-sdk-input-file-drop--icon {
    color: var(--et-sdk-dark-200);
    width: 24px;
    height: 24px;
    margin-bottom: 8px;
}

.et-sdk-input-file-drop--text {
    font-size: var(--et-sdk-font-size-small);
}
</style>
