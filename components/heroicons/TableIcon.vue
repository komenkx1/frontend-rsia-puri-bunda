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
      d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
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
