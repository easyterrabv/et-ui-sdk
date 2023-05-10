<template>
    <main>
        <EtInput
            label="firstname"
            :input-attributes="{
                placeholder: 'Enter your firstname...',
                type: 'text',
                autocomplete: 'given-name'
            }"
        >
            First-name
        </EtInput>
    </main>
</template>

<script setup lang="ts">
import {EtInput} from "../components/index";
</script>

<style lang="scss" scoped></style>
