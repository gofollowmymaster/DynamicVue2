import eventHelper from '../utils/event-helper'
export default {
  methods: {
    setEditorEvents () {
      if (!this.$amapComponent.editor || !this.events) return
      const filters = ['addnode', 'adjust', 'removenode', 'end', 'move']
      const filterSet = {}
      Object.keys(this.events).forEach(key => {
        if (filters.indexOf(key) !== -1) filterSet[key] = this.events[key]
      })
      Object.keys(filterSet).forEach(key => {
        eventHelper.addListener(this.$amapComponent.editor, key, filterSet[key])
      })
    }
  }
}
