<template>
    <div class="w-full">
        <MenuLeft>

            <template #menu>
                <EtMenuSection>
                    <EtMenuItem>
                        Buttons
                    </EtMenuItem>
                    <EtMenuItem>
                        Forms
                    </EtMenuItem>
                </EtMenuSection>
            </template>

            <EtButton text="hello!" />
        </MenuLeft>
    </div>
</template>

<script setup lang="ts">
import MenuLeft from "../src/layouts/menuLeft.vue";

import EtButton from "../src/components/EtButton.vue";
import EtMenuSection from "../src/components/EtMenuSection.vue";
import EtMenuItem from "../src/components/EtMenuItem.vue";
</script>