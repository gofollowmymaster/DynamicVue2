<template>

    <div  >
        <div  v-if="!getTextModel" :style="item.textStyle||{}" >
            <span class="text">{{ value||item.content || '-' }}</span>
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
