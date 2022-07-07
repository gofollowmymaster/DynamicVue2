<template>

    <div :style="item.style||{}"
         :class="`form-unqiue-${item.key} `"
         class="form-input-box form-item-box">
        <div  v-if="!getTextModel" :style="item.textStyle||{}" >
            <span class="text">{{ item.content || '-' }}</span>
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
