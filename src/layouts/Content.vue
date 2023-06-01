<template>
    <div class="flex flex-col grow h-full max-h-full">
        <slot name="header"></slot>
        <div v-if="$slots.default" class="p-4 h-full max-h-full overflow-auto">
            <slot></slot>
        </div>
    </div>
</template>
