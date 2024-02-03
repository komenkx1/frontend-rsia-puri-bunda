<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :class="(size) ? (size === 'sm') ? 'h-4 w-4' : (size === 'md') ? 'h-6 w-6' : 'h-8 w-8' : 'h-6 w-6'"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M8 13v-1m4 1v-3m4 3V8M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
    />
  </svg>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: () => null
    }
  }
}
</script>
