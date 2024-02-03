<template>
    <button
      :type="type"
      :title="title"
      :class="className"
      :disabled="loading || disabled"
      @click="handleClick"
    >
      <span class="absolute left-0 inset-y-0 flex items-center pl-3">
        <component :is="icon" v-if="!loading" :size="iconSize" />
        <SpinnerIcon v-else :variant="(color === 'gray') ? 'text-indigo-500 dark:text-indigo-300' : 'text-white'" />
      </span>
      <slot />
    </button>
  </template>
  
  <script>
  export default {
    props: {
      type: {
        type: String,
        default: 'button'
      },
      color: {
        type: String,
        default: 'gray'
      },
      title: {
        type: String,
        default: 'Title'
      },
      loading: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      icon: {
        type: String,
        default: () => null
      },
      iconSize: {
        type: String,
        default: 'sm'
      },
      addClass: {
        type: String,
        default: () => null
      }
    },
    computed: {
      className () {
        let dataClass = `
          group
          relative
          flex
          justify-center
          ${(this.iconSize === 'sm') ? 'pt-2' : (this.iconSize === 'md') ? 'pt-3' : ''}
          pb-2
          ${(!this.icon) ? 'pl-4' : 'pl-12'}
          pr-4
          rounded-md
          shadow-sm
          text-sm
          leading-4
          font-medium
          focus:outline-none
          focus:ring-2
          focus:ring-offset-2
        `
        if (this.color === 'gray') {
          dataClass += `
            border border-gray-300
            dark:border-gray-700
            hover:bg-gray-50
            dark:hover:bg-gray-700
            focus:ring-indigo-500
          `
          if (this.loading || this.disabled) {
            dataClass += `
              text-gray-500
              cursor-not-allowed
            `
          } else {
            dataClass += `
              text-gray-700
              dark:text-gray-300
            `
          }
        } else if (this.color === 'light') {
          dataClass += `
            bg-white
            dark:bg-gray-800
            text-gray-700
            dark:text-gray-300
            border border-gray-300
            dark:border-gray-700
            hover:bg-gray-50
            dark:hover:bg-gray-700
            focus:ring-indigo-500
          `
        } else {
          dataClass += `
            text-white
            border border-transparent
            focus:ring-${this.color}-500
          `
          if (this.loading || this.disabled) {
            dataClass += `
              bg-${this.color}-500
              hover:bg-${this.color}-500
              cursor-not-allowed
            `
          } else {
            dataClass += `
              bg-${this.color}-600
              hover:bg-${this.color}-700
            `
          }
        }
  
        dataClass += ' ' + this.addClass
  
        return dataClass
      }
    },
    methods: {
      handleClick (val) {
        this.$emit('handleClick', val)
      }
    }
  }
  </script>
  