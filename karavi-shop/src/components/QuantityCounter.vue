<template>
  <div style="display:flex;gap:8px;align-items:center;">
    <button class="btn-outline" @click="$emit('update:modelValue', Math.max(1, modelValue - 1))">-</button>
    <input class="input" style="width:64px;text-align:center;" :value="modelValue" @input="onInput" />
    <button class="btn-outline" @click="$emit('update:modelValue', modelValue + 1)">+</button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ modelValue: number }>();
const emit = defineEmits<{ (e:'update:modelValue', value:number):void }>();
function onInput(e: Event) {
  const val = Number((e.target as HTMLInputElement).value);
  emit('update:modelValue', isNaN(val) ? 1 : Math.max(1, val));
}
</script>
