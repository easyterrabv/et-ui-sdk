<template>
    <div class="et-sdk-data-grid__content-container">
        <slot></slot>
    </div>
</template>

<style>
.et-sdk-data-grid__content-container {
    min-width: 100%;
    width: 100%;
    max-width: 100%;

    overflow-x: auto;

    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-content: stretch;
}

.et-sdk-data-grid__content-container::-webkit-scrollbar {
    width: 0;
    height: 0;
}
</style>
