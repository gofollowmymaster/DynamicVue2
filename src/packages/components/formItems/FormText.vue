<template>

    <div  class="full-height">
        <div class="full-height" v-if="!getTextModel" :style="item.textStyle||{}" >
            {{ value||item.content || '-' }}
        </div>
    </div>
</template>

<script>
import FormMixin from './mixin'

export default {
  name: 'FormText',
  mixins: [FormMixin],
  computed: {

  }
}
</script>

<style scoped lang="less">

</style>
