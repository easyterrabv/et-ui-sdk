<template>
    <div class="et-sdk-drawer-menu-group">
        <slot />
    </div>
</template>

<style>
.et-sdk-drawer-menu-group {
    border-radius: 10px;
    background-color: var(--et-sdk-dark-200);
    padding: 10px 0;
    margin-top: -10px;
    margin-bottom: -10px;

    display: flex;
    flex-direction: column;
    gap: 15px;
}
</style>
