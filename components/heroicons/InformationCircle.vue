<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :class="
      (size) ?
        (size === 'sm') ? 'h-4 w-4' :
        (size === 'md') ? 'h-6 w-6' :
        (size === 'lg') ? 'h-8 w-8' :
        (size === '100') ? 'h-40 w-40' :
        'h-6 w-6' :
        'h-6 w-6'
    "
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
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
