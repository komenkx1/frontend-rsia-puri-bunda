<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :class="(size) ? (size === 'sm') ? 'h-4 w-4' : (size === 'md') ? 'h-6 w-6' : 'h-8 w-8' : 'h-6 w-6'"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    stroke-width="2"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M10 19l-7-7m0 0l7-7m-7 7h18"
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
