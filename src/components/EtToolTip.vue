<template>
    <span class="et-sdk-tooltip-wrapper">
        <slot></slot>
        <span class="et-sdk-tooltip-wrapper--tooltip no-wrap">
            <slot name="tooltip"></slot>
        </span>
    </span>
</template>

<style>
.et-sdk-tooltip-wrapper {
    position: relative;
}

.et-sdk-tooltip-wrapper:hover > .et-sdk-tooltip-wrapper--tooltip {
    display: initial;
}

.et-sdk-tooltip-wrapper--tooltip {
    display: none;

    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);

    background-color: var(--et-sdk-dark-600);
    color: var(--et-sdk-dark-50);
    border-radius: 99999px;
    line-height: initial;
    margin-top: 6px;
    padding: 4px 16px;
    font-size: var(--et-sdk-font-size-tiny);
    box-shadow: var(--et-sdk-shadow-normal);

    z-index: 1000;
}

.et-sdk-tooltip-wrapper--tooltip:after {
    content: "";
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-width: 4px;
    border-style: solid;
    border-color: transparent transparent var(--et-sdk-dark-600) transparent;
}
</style>
