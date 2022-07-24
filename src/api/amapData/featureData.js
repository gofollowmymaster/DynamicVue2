
import paths from './paths'

// paths=[[],[],[],[]]
// [[106.561805,29.55996],[106.561859,29.56016],[106.5624,29.560244],[106.562685,29.560347],[106.562888,29.560515],[106.563049,29.560674],[106.563312,29.560716],[106.563538,29.560725],[106.563682,29.560725],[106.563843,29.56086],[106.563902,29.560921],[106.564063,29.560926],[106.564117,29.560893],[106.564165,29.560954],[106.564283,29.56107],[106.564423,29.561136],[106.564498,29.561112],[106.564643,29.561154],[106.564804,29.561201],[106.565099,29.561266],[106.565265,29.561318],[106.565335,29.561336],[106.565361,29.56128]]

export const featureData = {

    earlywaring: [{
        id: 36,
        name: '预警',
        type: 'earlywaring',
        subContent: '预警',
        path: paths[6]
    }
    ],
    flower: [{
        id: 36,
        name: '郁金香摆台',
        type: 'flower',
        center: [106.562154, 29.558835]
    },
    {
        id: 361,
        name: '金菊造型',
        type: 'flower',
        center: [106.564154, 29.558835]
    },
    {
        id: 362,
        name: '路边花廊',
        type: 'flower',
        center: [106.559154, 29.555835]
    },

    {
        id: 363,
        name: '行道杜鹃花',
        type: 'flower',
        center: [106.557154, 29.558835]
    },
    {
        id: 364,
        name: '小菊花摆台',
        type: 'flower',
        center: [106.559154, 29.556835]
    },

    {
        id: 365,
        name: '行道杜鹃花',
        type: 'flower',
        center: [106.564154, 29.559835]
    },
    {
        id: 366,
        name: '路边花廊',
        type: 'flower',
        center: [106.560454, 29.555835]
    },
    {
        id: 367,
        name: '金菊造型',
        type: 'flower',
        center: [106.558254, 29.558835]
    },
    {
        id: 368,
        name: '路边花廊',
        type: 'flower',
        center: [106.559654, 29.556835]
    },
    {
        id: 369,
        name: '金菊造型',
        type: 'flower',
        center: [106.563154, 29.559835]
    },
    {
        id: 370,
        name: '路边花廊',
        type: 'flower',
        center: [106.559254, 29.561835]
    },
    {
        id: 371,
        name: '金菊造型',
        type: 'flower',
        center: [106.567154, 29.558835]
    },
    {
        id: 372,
        name: '路边花廊',
        type: 'flower',
        center: [106.566154, 29.555835]
    }
    ],
    'green-chair': [{
        id: 36,
        name: '厂区座椅',
        type: 'green-chair',
        center: [106.563587, 29.558338]
    }
    ],
    'flower-shelf': [{
        id: 36,
        name: '花架',
        type: 'flower-shelf',
        center: [106.5551, 29.557795]
    }
    ],
    'fitness-device': [{
        id: 36,
        name: '健身器材',
        type: 'fitness-device',
        center: [106.563258, 29.564551]
    }],
    'landscape-pieces': [{
        id: 36,
        name: '园艺小品',
        type: 'landscape-pieces',
        center: [106.557675, 29.55878]
    }],

    'green-path': [{
        id: 36,
        name: '厂区小道',
        type: 'green-path',
        center: [106.556843, 29.559891]
    }
    ],

    focusregion: [{
        id: 39,
        name: '关注区域',
        type: 'focusregion',
        subContent: '预警',
        path: paths[4]
    }],
    // 'library': [{
    //   id:40,
    //   name:'政府投资',
    //   type:'library',
    //   subContent:'政府投资',
    //   path: paths[9]
    // }],
    // 'socialUnit': [{
    //   id:41,
    //   name:'社会单位投资',
    //   type:'socialUnit',
    //   subContent:'社会单位投资',
    //   path: paths[1]
    // }],
    square: [
        {
            id: 2,
            name: '中山小学广场',
            type: 'square',
            path: paths[5]
        }
    ],
    // managegrid:[

    //   {
    //     id:1,
    //     name:'养护网格(奥园)',
    //     type:'managegrid',
    //     path: paths[0]
    //   },
    //   {
    //     id:2,
    //     name:'养护网格(梅园)',
    //     type:'managegrid',
    //     path: paths[1]
    //   }
    // ],
    // patrolgrid:[
    //   {
    //     id:3,
    //     name:'巡查网格1',
    //     type:'patrolgrid',
    //     subContent:'巡查网格sub',
    //     path: paths[2]
    //   },
    //   {
    //     id:4,
    //     name:'巡查网格1',
    //     type:'patrolgrid',
    //     subContent:'巡查网格',
    //     path: paths[3]
    //   }
    // ],
    // administrationgrid:[
    //   {
    //     id:4,
    //     name:'行政网格1',
    //     type:'administrationgrid',
    //     subContent:'行政网格',
    //     path: paths[4]
    //   },
    // ],

    managebidder: [
        {
            id: 5,
            name: '养护标段1',
            type: 'managebidder',
            subContent: '养护标段',
            path: paths[0]
        },
        {
            id: 501,
            name: '养护标段2',
            type: 'managebidder',
            subContent: '养护标段',
            path: paths[1]
        }

    ],
    manageblock: [
        {
            id: 6,
            name: '养护地块1',
            type: 'manageblock',
            subContent: '养护地块',
            path: paths[2]
        },
        {
            id: 601,
            name: '养护地块2',
            type: 'manageblock',
            subContent: '养护地块',
            path: paths[3]
        }
    ],
    greenblock: [{
        id: 7,
        name: '通远门公园',
        type: 'greenblock',
        path: paths[7]
    }],
    // comprehensivecapital:[
    //   {
    //     id:7,
    //     name:'综合性公园1',
    //     type:'comprehensivecapital',
    //     path: paths[7]
    //   }
    // ],
    // specialcapital:[
    //   {
    //     id:8,
    //     name:'专类公园1',
    //     type:'specialcapital',
    //     path: paths[12]
    //   }
    // ],
    // pleasance:[
    //   {
    //     id:9,
    //     name:'游园1',
    //     type:'pleasance',
    //     path: paths[9]
    //   }
    // ],
    // ecologicalcapital:[
    //   {
    //     id:10,
    //     name:'生态公园1',
    //     type:'ecologicalcapital',
    //     path: paths[10]
    //   }
    // ],
    // communitycapital:[
    //   {
    //     id:11,
    //     name:'社区公园1',
    //     type:'communitycapital',
    //     path: paths[11]
    //   }
    // ],
    // streettree:[
    //   {
    //     id:12,
    //     name:'不动产1',
    //     type:'streettree',
    //     path: paths[8]
    //   }

    maintainperson: [
        {
            id: 13,
            name: '周善知',
            type: 'maintainperson',
            subContent: '养护人员',
            center: [106.560615, 29.561696]
        }
    ],
    maintainpersonoffline: [
        {
            id: 13,
            name: '张晓明',
            type: 'maintainpersonoffline',
            subContent: '养护人员',
            center: [106.560958, 29.564294]
        }
    ],
    patrolperson: [
        {
            id: 15,
            name: '巡查人员乙',
            type: 'patrolperson',
            subContent: '巡查人员',
            center: [106.565567, 29.555464]
        }
    ],
    patrolpersonoffline: [
        {
            id: 14,
            name: '巡查人员甲',
            type: 'patrolpersonoffline',
            subContent: '巡查人员',
            center: [106.563244, 29.55692]
        }
    ],
    // manageperson:[
    //   {
    //     id:16,
    //     name:'管理人员',
    //     type:'manageperson',
    //     subContent:'管理人员',
    //     center:[106.56445384025574,29.644696712493896,]
    //   },
    // ],
    caronline: [
        {
            id: 17,
            name: '车辆',
            type: 'caronline',
            subContent: '车辆1',
            center: [106.564856, 29.555534]
        }

    ],
    caroffline: [
        {
            id: 1227,
            name: '车辆',
            type: 'caroffline',
            subContent: '车辆2',
            center: [106.562, 29.559647]
        }
    ],
    maintainevent: [
        {
            id: 18,
            name: '养护事件',
            type: 'maintainevent',
            subContent: '养护事件',
            center: [106.55789, 29.556601]
        }
    ],
    greenevent: [
        {
            id: 19,
            name: '占绿毁绿事件',
            type: 'greenevent',
            center: [106.562181, 29.563469]
        }

    ],
    emergencyevent: [
        {
            id: 20,
            name: '应急事件',
            type: 'emergencyevent',
            center: [106.567846, 29.560502]
        }

    ],
    otherevent: [
        {
            id: 21,
            name: '其他事件',
            type: 'otherevent',
            center: [106.568758, 29.555677]
        }

    ],

    // assetslevel1:[
    //   {
    //     id:23,
    //     name:'一级',
    //     type:'assetslevel1',
    //     subContent:'一级1',
    //     center:[106.55575275421143,29.644986391067505]
    //   },

    // ],
    // assetslevel2:[
    //   {
    //     id:24,
    //     name:'二级',
    //     type:'assetslevel2',
    //     subContent:'二级1',
    //     center:[106.5562355518341,29.64462161064148]
    //   },

    // ],
    // assetslevel3:[
    //   {
    //     id:25,
    //     name:'三级',
    //     type:'assetslevel3',
    //     subContent:'三级',
    //     center:[106.56017303466797,29.64512586593628]
    //   },

    // ],
    // assetsother:[
    //   {
    //     id:26,
    //     name:'后备资源',
    //     type:'assetsother',
    //     subContent:'后备资源',
    //     center:[106.55817303466797,29.64522586593628]
    //   },
    // ],
    cameradeviceonline: [
        {
            id: 27,
            name: '路口摄像头',
            type: 'cameradeviceonline',
            subContent: '摄像头',
            center: [106.560847, 29.560129]
        }
    ],
    cameradeviceoffline: [
        {
            id: 28,
            name: '摄像头-A',
            type: 'cameradeviceoffline',
            subContent: '摄像头',
            center: [106.561992, 29.561242]
        }
    ],
    leandeviceon: [
        {
            id: 29,
            name: '资产倾倒设备',
            type: 'leandeviceon',
            subContent: '资产倾倒设备',
            center: [106.562035, 29.561279]
        }
    ],
    soildevice: [
        {
            id: 30,
            name: '温湿度监测仪',
            type: 'soildevice',
            subContent: '温湿度监测仪',
            center: [106.565297, 29.559487]
        }
    ],
    spraydeviceonline: [
        {
            id: 31,
            name: '灌溉设备230',
            type: 'spraydeviceonline',
            subContent: '灌溉设备',
            center: [106.557787, 29.562249]
        },
        {
            id: 301,
            name: '灌溉设备231',
            type: 'spraydeviceonline',
            subContent: '灌溉设备',
            isOpen: true,
            center: [106.563819, 29.559356]
        }
    ],
    spraydeviceoffline: [
        {
            id: 32,
            name: '灌溉设备12',
            type: 'spraydeviceoffline',
            subContent: '灌溉设备',
            center: [106.56092, 29.562324]
        }
    ]
    // 'recreationalaidevice':[
    //   {
    //     id:33,
    //     name:'游乐设施',
    //     type:'recreationalaidevice',
    //     subContent:'游乐设施',
    //     center:[106.555898,29.562735]
    //   },
    // ],
    // 'serviceaidevice':[
    //   {
    //     id:34,
    //     name:'服务设施',
    //     type:'serviceaidevice',
    //     subContent:'服务设施',
    //     center:[106.555898,29.562735]
    //   },
    // ],
    // 'pestcontrol': [{
    //   id:35,
    //     name:'防治',
    //     type:'pestcontrol',
    //     subContent:'防治',
    //     center:[106.552905,29.563005]
    //   },
    // ],

    // 'manageaidevice': [{
    //   id:37,
    //     name:'管理设施',
    //     type:'manageaidevice',
    //     subContent:'管理设施',
    //     center:[106.554182,29.559823]
    //   },
    // ],
    // 'baseaidevice': [{
    //   id:38,
    //   name:'基础配套设施',
    //   type:'baseaidevice',
    //   subContent:'基础配套设施',
    //   center:[106.554182,29.562823]
    // }]
}
