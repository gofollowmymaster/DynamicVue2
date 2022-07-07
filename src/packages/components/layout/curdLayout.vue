<template>
  <div class="layout-wrapper   " :class="[mode + '-curd',scene+'-curd']">
    <aside class="left-section">
      <slot name="left"></slot>
    </aside>
    <main class="main-section flex1  ">
      <section class="top-section">
        <slot name="top"></slot>
      </section>
      <div class="middle-gap "></div>
      <article class="bottom-section">
        <slot name="bottom"></slot>
      </article>
    </main>
  </div>
</template>
<script>
export default {
  name: 'curdLayout',
  props: {
    mode: { type: String, default: 'tb' },
    scene: { type: String, default: 'component' }
  },
  computed: {},
  data: function () {
    return {}
  },
  created () {},

  methods: {}
}
</script>

<style lang="less" scoped>
.layout-wrapper {
  padding: 0px 0px 12px 0px;
  .left-section {
    display: none;
  }
  .top-section {
    padding: 0px 24px 12px;
  }
  .middle-gap {
    height: 1px;
    width: calc(100% - 48px);
    margin: 0 auto;
    background-color: var(--main-color);
  }

  .main-section {
    padding: 24px 0px 12px;
    .bottom-section {
      padding: 24px 24px 0px;
    }
  }
}

.layout-wrapper.ltb-curd {
  display: flex;
  .left-section {
    width: 320px;
    padding: 24px;
    height: 100%;
    position: sticky;
    top: 12px;
    display: block;
  }
  .middle-gap {
    height: 1px;
    background-color: rgba(149, 54, 179, 0.15);
  }
  .main-section {
    padding: 24px 24px 12px 0px;
    .bottom-section {
      padding: 24px 0 0;
    }
  }
}

.layout-wrapper.component-curd {

    .top-section {
    padding: 0px ;
  }
  .middle-gap {
    display: none;
  }
  .main-section {
    padding: 0px;
    .bottom-section {
      padding: 0;
    }
  }
}
</style>
