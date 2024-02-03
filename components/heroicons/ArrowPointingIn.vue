<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :class="(size) ? (size === 'sm') ? 'h-4 w-4' : (size === 'md') ? 'h-6 w-6' : 'h-8 w-8' : 'h-6 w-6'"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    class="w-6 h-6"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25"
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
