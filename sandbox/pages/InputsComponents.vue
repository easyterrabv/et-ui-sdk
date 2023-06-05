<template>
    <EtContent>
        <EtCard class="mt-4">
            <template #header>
                Basic inputs
            </template>

            <EtFormGroup>
                <template #label>Simple Input</template>
                <EtInput/>
            </EtFormGroup>

            <EtFormGroup class="mt-4">
                <template #label>Simple Input small size</template>
                <EtInput :size="UI_SIZING.S"/>
            </EtFormGroup>
        </EtCard>

        <EtCard class="mt-4">
            <template #header>
                Grouped inputs
            </template>

            <EtFormGroup>
                <template #label>Simple Input</template>
                <EtInputGroupAddon>
                    Addon
                </EtInputGroupAddon>
                <EtInput placeholder="Input"/>
            </EtFormGroup>

            <EtFormGroup class="mt-4">
                <template #label>Simple Input</template>
                <EtInput placeholder="First Input"/>
                <EtInputGroupAddon>
                    With a addon in between
                </EtInputGroupAddon>
                <EtInput placeholder="Second Input"/>
            </EtFormGroup>
        </EtCard>
    </EtContent>
</template>

<script lang="ts">
import {defineComponent} from "vue-demi";
import {UI_SIZING} from "../../src/enums";

import EtContent from "src/layouts/Content.vue";
import EtCard from "src/components/EtCard.vue";

import EtInput from "src/components/etForm/EtInput.vue";
import EtInputGroup from "src/components/etForm/EtInputGroup.vue";
import EtInputGroupAddon from "src/components/etForm/EtInputGroupAddon.vue";

import EtFormGroup from "src/components/etForm/EtFormGroup.vue";

export default defineComponent({
    computed: {
        UI_SIZING() {
            return UI_SIZING
        }
    },
    components: {
        EtContent,
        EtCard,
        EtFormGroup,
        EtInput,
        EtInputGroup,
        EtInputGroupAddon
    }
})

</script>