<template>
    <nav
        class="w-full h-14 bg-gray-800 px-4 py-2 flex flex-row text-white align-middle"
    >
        <div class="flex-grow flex place-items-center">
            <slot></slot>
        </div>
        <div class="flex place-items-center">
            <slot name="end"></slot>
        </div>
    </nav>
</template>
