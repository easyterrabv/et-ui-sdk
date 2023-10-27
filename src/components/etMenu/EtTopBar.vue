<template>
    <nav class="et-sdk-top-bar-nav">
        <div class="et-sdk-top-bar-nav--main">
            <slot></slot>
        </div>
        <div class="et-sdk-top-bar-nav--addon">
            <slot name="end"></slot>
        </div>
    </nav>
</template>

<script setup lang="ts"></script>

<style>
.et-sdk-top-bar-nav {
    display: flex;
    flex-direction: row;

    width: 100%;
    height: var(--et-sdk-top-bar-height);

    padding: 15px 30px;

    background-color: var(--et-sdk-dark-800);
}

.et-sdk-top-bar-nav--main {
    display: flex;
    flex-grow: 1;
    place-items: center;
}

.et-sdk-top-bar-nav--addon {
    display: flex;
    place-items: center;
}
</style>
