<template>
  <main class="actions-wrap" :class="[mode+'-action']">
    <template v-for="(item) in actionsOrdered">
      <span class="action-btn " :key="item.key||item.label"   v-permission="item.permission">
        <el-popover
          v-if="item.actionPop"
          width="auto"
          v-model="popoverVisible[item.label]"
          trigger="manual"
        >
          <component
            :is="item.actionPop.component || 'popConfirm'"
            v-bind="item.actionPop.properties"
            @cancel="popoverVisible[item.label] = false"
            @confirm="popConfirm(item, $event)"
          >
          </component>
          <component
            class="mx6 action-btn-inner"
            slot="reference"
            :is="item.component"

            v-bind="item.properties"
            @click="openPop(item)"

          >{{item.label}}</component>
        </el-popover>
        <component
          v-else
          :is="item.component"
          class="mx5 action-btn-inner"

          v-bind="item.properties"
          @click="doAction(item)"
        >{{item.label}} </component>
      </span>
    </template>

  </main>
</template>
<script>
import actionMixin from './actionMixin'
import { isObjEmpty } from '../utils/tool'
export default {
  name: 'DynamicActions',
  mixins: [actionMixin],
  props: {
    actions: {
      type: [Object, Array],
      default () {
        return {}
      }
    },
    actionData: {
      type: [Object, Array, String, Boolean, Number],
      default () {
        return {}
      }
    },
    actionBarWraper: {
      type: [Object]
    },
    mode: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      popoverVisible: {},
      actionsOrdered: []
    }
  },
  computed: {
    actionAndData () {
      return { actions: this.actions, actionData: this.actionData }
    }
  },
  watch: {
    actionAndData: {
      handler ({ actions, actionData }) {
        actions = Object.entries(actions)
          .map(([key, value]) => {
            return { ...value, actionKey: key }
          }).filter(action => {
            return action?.actionType
          }).map((action) => {
            return action.hasBuild ? action : this.$generateActionOption(action.actionType, action)
          })
        actions = actions
          .sort((a, b) => a.sort - b.sort)
          .filter((action) => {
            if (typeof action.isShow === 'function') {
              return action.isShow(actionData) !== false
            }
            return true
          })
        this.actionsOrdered = actions
      },
      immediate: true,
      deep: true
    }
  },
  mounted () {},

  methods: {
    popConfirm (action, data) {
      debugger
      this.popoverVisible[action.label] = false
      const actionData = {
        ...(action.actionDataKey
          ? this.actionData[action.actionDataKey]
          : this.actionData),
        ...data
      }
      this.doAction(action, actionData) // ?????????????????????
    },
    doAction (action, actionData = null) {
      debugger
      actionData =
        actionData ||
        (action.actionDataKey
          ? this.actionData[action.actionDataKey]
          : this.actionData)
      if (action.isLoadData !== false && isObjEmpty(actionData)) {
        this.$message({ type: 'warning', message: '???????????????????????????' })
        return
      }

      if (action.msgBox) {
        const {
          title,
          showCancelButton,
          confirmButtonText,
          cancelButtonText,
          message
        } = action.msgBox
        this.$msgbox({
          title: title || '??????',
          message: message || '??????????????????????',
          showCancelButton: showCancelButton || true,
          confirmButtonText: confirmButtonText || '??????',
          cancelButtonText: cancelButtonText || '??????',
          beforeClose: (operate, instance, done) => {
            debugger
            if (operate === 'confirm') {
              this.actionHandle(action, actionData)
              done()
            } else {
              done()
            }
          }
        }).then((operate) => {})
        return
      }
      this.actionHandle(action, actionData)
    },
    actionHandle (action, actionData) {
      if (typeof action.actionHook === 'function') {
        action.actionHook(action, actionData)
      }
      if (action.isLoadData === false) {
        actionData = {}
      }
      this.actionHandles(action, actionData)
    },

    openPop (action) {
      this.$set(this.popoverVisible, action.label, true)
      this.activeAction = action
      // action.popoverVisible=true
    }
  }
}
</script>
<style lang="css"  scoped>

.actions-wrap .action-btn:last-of-type {
  border-right: none;
}

.actions-wrap .action-btn:first-of-type:last-of-type .action-btn-inner {
  margin-right: 0;
}
.actions-wrap .action-btn:first-of-type:first-of-type .action-btn-inner {
  margin-left: 0;
}

</style>
