<template>
    <!-- 普通输入框 -->
    <section    class="">
        <RightEditor v-model="val"
                  :placeholder="getPlaceholder(item)"
                  :disabled="getDisabled"
                  v-bind="bindOptions"
                  v-if="!getTextModel"/>
        <div v-else :style="item.textStyle || {}" class="form-input-text" v-html="val">
        </div>
    </section>
</template>

<script>
import FormMixin from './mixin'

export default {
  name: 'FormRichEditor',
  mixins: [FormMixin],
  data () {
    return {}
  },
  computed: {

  }
}
</script>

<style scoped lang="css">

</style>
