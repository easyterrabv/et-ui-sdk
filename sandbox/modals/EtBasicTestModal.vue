<template>
    <EtModal>
        <template #header>
            Testing Modal
        </template>

        <strong>
            This is a basic modal
        </strong>

        <p>
            Just a header, some text and two close buttons, one in the footer and one in the top right corner
        </p>

        <template #footer="{close}">
            <EtButtonDefault @click="close">Close</EtButtonDefault>
        </template>
    </EtModal>
</template>

<script setup lang="ts">
import EtButtonDefault from "../../src/components/etButton/EtButtonDefault.vue";
import EtModal from "../../src/components/etModal/EtModal.vue";
</script>