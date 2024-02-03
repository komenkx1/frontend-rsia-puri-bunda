<template>
    <div>
        <label :for="idInput" class="block mb-2 text-sm font-medium text-gray-900">{{ label }}</label>
        <input 
        :type="type" 
        :id="idInput" 
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
        :placeholder="placeholder" 
        :required="required" 
        :value="value"  
        @input="$emit('update:value', $event.target.value)">
    </div>
</template>
<script>
export default {
    props:{
        required:{
            default:false,
            type:Boolean
        },
        type:{
            default:"text",
            type:String
        },
        label:{
            default:"Input Label",
            type:String
        },
        idInput:{
            default:"",
            type:String
        },
        placeholder:"",
        value: String,
    }
}
</script>