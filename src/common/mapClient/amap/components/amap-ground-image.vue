<script>
import registerMixin from '../mixins/register-component'
// import AMap from 'AMap'

export default {
    name: 'ElAmapGroundImage',
    mixins: [registerMixin],
    props: [
        'vid',
        'clickable',
        'opacity',
        'url',
        'bounds',
        'visible',
        'events',
        'onceEvents'
    ],
    data() {
        return {
            converters: {},
            handlers: {
                visible(flag) {
                    if (flag === false) {
                        this.setMap(null)
                    } else {
                        this.setMap(this.$amap)
                    }
                }
            }
        }
    },
    destroyed() {
        this.$amapComponent.setMap(null)
    },
    methods: {
        __initComponent(options) {
            this.$amapComponent = new AMap.ImageLayer(options)
        }
    }
}
</script>
