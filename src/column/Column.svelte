<script lang="ts">
    import { onMount } from 'svelte';
    export let left;
    export let width;
    export let backgroundColor = undefined;




    function stylesWithBackgroundColor() {
        if (backgroundColor) {
            return `background-color:${backgroundColor};border-right: #fff 1px solid;`
        } else {
            return ''
        }
    }
</script>

<div class="column" style="left:{left}px;width:{width}px;{stylesWithBackgroundColor()}"></div>
<style>
    .column {
        position: absolute;
        height: 100%;
        box-sizing: border-box;
    }
    
    .column {
        border-right: #efefef 1px solid;
    }
</style>