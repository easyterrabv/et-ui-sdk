<template>
    <ul
        :class="[
            'border-2 rounded-lg inline-block', // <ul> styling
            '[&>li]:leading-[40px] [&>li]:px-4', // <li> text styling
            '[&>li:not(:last-child)]:border-b-2' // <li> border
        ]"
    >
        <slot></slot>
    </ul>
</template>
