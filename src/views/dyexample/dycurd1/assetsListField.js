import { buildDynamicSelectOption, elementUploadFileApi, globalDownloadFileById } from '@/api/global'

export const assetsFields = [
    { key: 'keyWord', type: 'FormInput', label: '关键字', searchOption: true },
    { key: 'id', type: 'FormHide', label: '', formOption: {}},

    {key: 'treeNumber', label: '资产编号', tableOption: {
        width: 120, sort: 1
    }},
    {
        key: 'treeNameId',
        type: 'FormInput',
        label: '类别名称',
        tableOption: {
            sort: 2,
            key: 'treeName'
        },
        formOption: {
            rules: [
                'required'
            ]
  
        }
    },
    {
        key: 'sciName',
        type: 'FormInput',
        label: '学名',
        labelTip: '请输入学术名称',
        formOption: {
            properties: {
               
            },
            rules: ['required'],
            formTip: '输入学术名称'

        },
        tableOption: {
            sort: 2
        }
    },
  
    {
        key: 'latinSciName',
        type: 'FormInput',
        label: '拉丁学名',
        formOption: {
        }
    },
    {
        key: 'originalTreeNumber',
        type: 'FormInput',
        label: '原资产编号',   
        formOption: {
        }
    },
    {
        key: 'distribution',
        label: '分布特点',
        type: 'FormDynamicSelect',
        options: buildDynamicSelectOption('tree_manage_distribution'), 
        formOption: {
        }
    },
    {
        key: 'investNumber',
        type: 'FormNumber',
        label: '调查顺序号',
        formOption: {
            changeHandle(value, data, items, vm) {
               
            }
        }
    },
    {
        key: 'ownership',
        type: 'FormDynamicSelect',
        label: '权属',
 
        options: buildDynamicSelectOption('tree_manage_ownership'), 
        formOption: {
        }
    },
    {
        key: 'famousWood',
        type: 'FormDynamicSelect',
        label: '名木',
        options: buildDynamicSelectOption('tree_manage_famous_wood'), 
       
        tableOption: {
            colProperties:{
                width:80
            },
            sort: 6,
        },
        formOption: {
            rules: ['required']
        }
    },
    {
        key: 'age',
        type: 'FormNumberPlus',
        label: '树龄（年）',
        tableOption: {
            sort: 5
        },
        formOption: {
            // rules:['required'],
            expressProp: {
                required: '[\'99999010\',\'99999011\',\'99999012\'].includes(#{famousWood})'
            }
        }
    },
    {
        key: 'protectLev',
        type: 'FormDynamicSelect',
        label: '保护等级',
        searchOption: true,
        options: buildDynamicSelectOption('tree_manage_protect_lev'), 
   
        formOption: {
            rules: ['required'],
            expressProp: {
                disabled: '[\'99999010\',\'99999011\',\'99999012\'].includes(#{famousWood})',
                value: 'if([\'99999010\',\'99999011\',\'99999012\'].includes(#{famousWood})){  if(#{age}>=300){  return \'99999001\';  }  if(#{age}>=200){    return \'99999002\' ;  }   if(#{age}>=100){    return \'99999003\' ; }  }else{ return #{protectLev} ;  }'
     
            }
        },
        tableOption: {
            sort: 8
    
        }
    },
    {
        key: 'treeHigh',
        type: 'FormNumberPlus',
        label: '树高（米）',
        formOption: {
            rules: ['required']
        }
    },
    {
        key: 'crownWidth',
        type: 'FormNumberPlus',
        label: '平均面积(米)',
        formOption: {
            rules: ['required']
        }
    },
    {
        key: 'bust',
        type: 'FormNumberPlus',
        label: '胸（地）围(厘米)',
        formOption: {
            rules: ['required']
        }
    },
    {
        key: 'crownWidthNorthSouth',
        type: 'FormNumberPlus',
        label: '面积-南北向(米)',
        formOption: {
   
        }
    },
    {
        key: 'crownWidthEastWest',
        type: 'FormNumberPlus',
        label: '面积- 东西向(米)',
        formOption: {
   
        }
    },
    {
        key: 'treeDesc',
        type: 'FormTextarea',
        label: '设备性状描述',
        formOption: {
            col : 5
        }
    },

    {
        key: 'pics',
        label: '资产照片',
        type: 'FormUpload',
        formOption: {
            col : 5,
            'list-type': 'picture-card',
            accept: 'img',
            btn_text: '上传',
            tip: '支持格式：.jpg  .png  .gif ，单个文件不能超过20MB，最多上传5张',
            apiPromise: elementUploadFileApi
        }
    },

    {
        key: 'district',
        type: 'FormInput',
        formSection: '地理位置',
        label: '行政区划',
        searchOption: true,
        tableOption: {
            sort: 8
        },
        formOption: {
            rules: ['required']
        }
    },
    
    {
        label: '详细地址',
        formSection: '地理位置',
        type:'FormSelectPoint',
        key: 'address',
        formOption: {
            rules: ['required']
        }
    },

    {
        key: 'growingPlace',
        type: 'FormDynamicSelect',
        formSection: '地理位置',
        label: '使用场所',
        options: buildDynamicSelectOption('tree_manage_growing_place'),
        formOption: {
        }
 
    },
    {
        key: 'slope',
        type: 'FormNumberPlus',
        formSection: '地理位置',
        label: '坡度(度)',
        formOption: {
        }
 
    },
    {
        key: 'slopeDirection',
        type: 'FormNumberPlus',
        formSection: '地理位置',
        label: '坡向',
        formOption: {
        }
 
    },

    {
        key: 'altitude',
        type: 'FormNumberPlus',
        formSection: '地理位置',
        label: '海拔(米)',
        formOption: {
        }
    },
    {
        key: 'slopePosition',
        type: 'FormNumberPlus',
        formSection: '地理位置',
        label: '坡位',
        formOption: {
        }
    },

    {
        key: 'growthSituation',
        type: 'FormDynamicSelect',
        formSection: '使用信息',
        label: '使用态势',
        searchOption: true,
        options: buildDynamicSelectOption('tree_manage_growth_situation'), 
        formOption: {
            rules: ['required']
        },
        tableOption: {
            sort: 7
 
        }
    },

    {
        key: 'growthStatus',
        type: 'FormDynamicSelect',
        formSection: '使用信息',
        label: '使用现状',
        options: buildDynamicSelectOption('tree_manage_growth_status'), 
        formOption: {
        }
 
    },

    {
        key: 'growthEnvironment',
        type: 'FormDynamicSelect',
        formSection: '使用信息',
        label: '使用环境',
        options: buildDynamicSelectOption('tree_manage_growth_environment'),
        formOption: {
            rules: ['required']
        }
 
    },
    {
        key: 'soilType',
        type: 'FormInput',
        formSection: '使用信息',
        label: '场地类型',
        formOption: {

        }
    },
    {
        key: 'soilThickness',
        type: 'FormNumberPlus',
        formSection: '使用信息',
        label: '土层厚度（厘米）',
        formOption: {
        }
    },
     
    {
        key: 'manageUserPhone',
        type: 'FormInput',
        label: '管理人电话',
        formSection: '管理信息',
        formOption: {
            rules: ['required', /^[\d|-]{9,12}$/],
            disabled: true,
            span:24

        }
    },
    {
        key: 'maintenanceDesc',
        type: 'FormTextarea',
        label: '管养方案',
        formSection: '管理信息',
        formOption: {
            col : 5
        }
    },
    {
        key: 'files',
        label: '附件',
        type: 'FormUpload',
        formSection: '管理信息',
        formOption: {
            col : 5,
            'list-type': 'table',
            accept: '*',
            limit: 200,
            btn_text: '上传',
            tip: '单个附件大小限制20Mb，最多上传200个附件',
            apiPromise: elementUploadFileApi,
            downloadApi: globalDownloadFileById,
            limitSize: 5
        }
    }
    
]

export const manageLogFields = [
    { key: 'keyWord', type: 'FormInput', label: '关键字', searchOption: true },   
    { key: 'treeNumber', type: 'FormInput', label: '资产', searchOption: false, tableOption: {} },   

    { key: 'type', type: 'FormSelect', label: '类型', searchOption: false, tableOption: {} }   

]

export const maintainFields = [
    { key: 'id', type: 'FormHide', label: '', formOption: {}},
    {
        label: '资产名称',
        key: 'treeManageId',
        type: 'FormassetsSelector',
        formOption: {
        }
    },
 
    {
        label: '资产编号',
        key: 'treeNumber',
        type: 'FormInput',
        formOption: {
        }
    },
    {
        label: '管理单位',
        key: 'unitName',
        tableOption: { sort: 5 },
        formOption: {
        }
    },
    {
        label: '管理人员',
        key: 'manageUserName',
        type: 'FormInput',
        formOption: {
        },
        tableOption: { sort: 7 }
    
    },
 
    {
        label: '管理人员联系方式',
        key: 'manageUserPhone',
        tableOption: { sort: 8 },

        formOption: {
        }
    },
    {
        label: '养护人员',
        key: 'userId',
        type: 'FormInput',
        formOption: {
        },
        tableOption: {
            sort: 3,
            key: 'userName'
        }
    },
   
    {
        label: '养护类型',
        key: 'cureType',
        type: 'FormDynamicSelect',
        options: buildDynamicSelectOption('tree_cure_type'), 
        searchOption: true,
        tableOption: {
            sort: 3
        },
        formOption: {
        }
    },
    {
        label: '养护时间',
        key: 'cureTime',
        type: 'FormDateTime',
        tableOption: {
            sort: 4
        },
        formOption: {
            key: 'cureTime'
        }
    },
    {
        label: '养护时间',
        key: 'handleTime',
        type: 'FormDateTimeRange',
        searchOption: {
            wraperProperties: {
                class: ['grid-col-6', 'grid-col-lg-6', 'grid-col-sm-6', 'grid-col-ss-12', 'grid-col-xs-12', 'grid-col-pp-24']
            }
        }
    },
  
    {
        key: 'createUserName',
        label: '创建人',
        detailable: true
    },
    {
        key: 'createTime',
        label: '创建时间',
        detailable: true

    },
    {
        key: 'lastUpdateTime',
        label: '更新时间',
        detailable: true
    },
    {
        label: ' 养护内容',
        key: 'context',
        type: 'FormTextarea',
        tableOption: {
            width: 180,
            sort: 3
        },
        formOption: {
            wraperProperties: {
                class: ['grid-col-24']
            }
        }
    },
    {
        key: 'filesBefore',
        label: '养护前照片',
        type: 'FormUpload',
        formSection: '附件信息',
        formOption: {
            wraperProperties: {
                class: ['grid-col-24']
            },
            properties: {
                // disabled: true,
                'list-type': 'picture-card',
                accept: 'img'
            },
            extra: {
                btn_text: '上传',
                tip: '单个附件大小限制20Mb，最多上传200个附件'
            }
        }
    },
 
    {
        key: 'filesAfter',
        label: '养护后照片',
        type: 'FormUpload',
        formSection: '附件信息',
        formOption: {
            wraperProperties: {
                class: ['grid-col-24']
            },
            properties: {
                // disabled: true,
                'list-type': 'picture-card',
                accept: 'img'
            },
            extra: {
                btn_text: '上传',
                tip: '单个附件大小限制20Mb，最多上传200个附件'
            }
        }
    },
    {
        label: '更新时间',
        key: 'lastUpdateTime',
        tableOption: { sort: 9 }
    }
  
]

export const   protectFields = [
    { key: 'id', type: 'FormHide', label: '', formOption: {}},
    {
        label: '资产名称',
        key: 'treeManageId',
        type: 'FormassetsSelector',
        formOption: {
      
        }
    },
 
    {
        label: '资产编号',
        key: 'treeNumber',
        type: 'FormInput',
 
        formOption: {
 
        }
    }, 
 
    {
        label: '管理单位',
        key: 'unitName',
        tableOption: { sort: 6 },
        formOption: {
     
        }
    },
    {
        label: '管理人员',
        key: 'manageUserName',
        type: 'FormInput',
        formOption: {
    
        },
        tableOption: { sort: 7 }
    
    },
 
    {
        label: '管理人员联系方式',
        key: 'manageUserPhone',
        tableOption: {},
        formOption: {
            rules: ['required'],
            properties: {
                disabled: true
            }
        }
    },
    {
        label: '保护人员',
        key: 'userId',
        type: 'FormInput',
        formOption: {
            rules: ['required']
      
        },
        tableOption: {
            sort: 4,
            key: 'userName'

        }
    },
 
    {
        label: '保护类型',
        key: 'protectType',
        type: 'FormDynamicSelect',
        options: buildDynamicSelectOption('tree_protect_type'), 
        searchOption: {
            key: 'cureType'
        },
        tableOption: {
            sort: 3
        },
        formOption: {
            rules: ['required']
        }
    },
    {
        label: '保护时间',
        key: 'cureTime',
        type: 'FormDateTime',
        tableOption: {
            sort: 4
        },
        formOption: {
            key: 'time',
            rules: ['required']
        }
    },
    {
        label: '保护时间',
        key: 'handleTime',
        type: 'FormDateTimeRange',
        searchOption: {
            wraperProperties: {
                class: ['grid-col-6', 'grid-col-lg-6', 'grid-col-sm-6', 'grid-col-ss-12', 'grid-col-xs-12', 'grid-col-pp-24']
            }
        }
    },
  
    {
        key: 'createUserName',
        label: '创建人',
        detailable: true
    },
    {
        key: 'createTime',
        label: '创建时间',
        detailable: true

    },
    {
        key: 'lastUpdateTime',
        label: '更新时间',
        detailable: true
    },
    {
        label: ' 保护内容',
        key: 'context',
        type: 'FormTextarea',
        formOption: {
            wraperProperties: {
                class: ['grid-col-24']
            },
            rules: ['required']
        }
    },
    {
        key: 'filesBefore',
        label: '养护前照片',
        type: 'FormUpload',
        formSection: '附件信息',
        formOption: {
            wraperProperties: {
                class: ['grid-col-24']
            },
            properties: {
                // disabled: true,
                'list-type': 'picture-card',
                accept: 'img'
            },
            extra: {
                btn_text: '上传',
                tip: '单个附件大小限制20Mb，最多上传200个附件'
     
            }
        }
    },
 
    {
        key: 'filesAfter',
        label: '养护后照片',
        type: 'FormUpload',
        formSection: '附件信息',
        formOption: {
            wraperProperties: {
                class: ['grid-col-24']
            },
            properties: {
                // disabled: true,
                'list-type': 'picture-card',
                accept: 'img'
            },
            extra: {
                btn_text: '上传',
                tip: '单个附件大小限制20Mb，最多上传200个附件'
            }
        }
    },
    {
        label: '更新时间',
        key: 'lastUpdateTime',
        tableOption: { sort: 9 }
    }
  
]

export const transFields = [
    { key: 'id', type: 'FormHide', label: '', formOption: {}},
    {
        label: '资产名称',
        key: 'treeManageId',
        type: 'FormassetsSelector',
        formOption: {}
    },

    {
        label: '资产编号',
        key: 'treeNumber',
        type: 'FormInput',

        formOption: {}
    },

    {
        label: '管理单位',
        key: 'unitName-old',
        formOption: {}
    },
    {
        label: '管理人员',
        key: 'manageUserName-old',
        type: 'FormInput',
        formOption: {}
    },

    {
        label: '管理人员联系方式',
        key: 'manageUserPhone-old',
        formOption: {
            rules: ['required']
        }
    },
    {
        label: '行政区划',
        key: 'district-old',
        formOption: {
            rules: ['required']
        }
    },
    {
        label: '详细地址',
        key: 'address-old',
        formOption: {
            rules: ['required']
        }
    },
    {
        label: '经纬度',
        key: 'lonLat-old',
        formOption: {
            rules: ['required'],
            properties: {
                disabled: true
            }
        }
    },

    {
        key: 'createUserName',
        label: '创建人',
        detailable: true
    },
    {
        key: 'createTime',
        label: '创建时间',
        detailable: true
    },
    {
        key: 'lastUpdateTime',
        label: '更新时间',
        detailable: true
    },

    {
        label: '行政区划',
        key: 'district',
        type: 'FormInput',
        formSection: '转移后信息',
        formOption: {
            key: 'district'
        }
    },
    {
        label: '经纬度',
        key: 'lonLat',
        formSection: '转移后信息',
        type: 'FormSelectPoint',

        formOption: {}
    },
    {
        label: '详细地址',
        key: 'address',
        formSection: '转移后信息',
        formOption: {},
        tableOption: {
            label: '转移后地点',
            sort: 5
        }
    },

    {
        label: '管理单位',
        key: 'unit',
        type: 'FormInput',
        formSection: '转移后信息',

        tableOption: { sort: 9 },
        formOption: {}
    },
    {
        label: '管理人',
        key: 'manageUser',
        type: 'FormInput',
        formSection: '转移后信息',
        formOption: {}
    },

    {
        label: '管理人员联系方式',
        key: 'manageUserPhone',
        formSection: '转移后信息',
        formOption: {}
    },

    {
        label: ' 转移单位',
        key: 'removeUnit',
        type: 'FormInput',
        formSection: '转移信息',

        formOption: {},
        tableOption: {
            sort: 6
        }
    },
    {
        label: '转移人',
        key: 'removeManageUser',
        type: 'FormInput',
        formSection: '转移信息',
        formOption: {},
        tableOption: {
            sort: 7
        }
    },

    {
        label: '转移人电话',
        key: 'removeUserPhone',
        formSection: '转移信息',
        tableOption: {
            sort: 8
        },
        formOption: {}
    },
    {
        label: '转移时间',
        key: 'removeTime',
        formSection: '转移信息',
        type: 'FormDateTime',
        tableOption: {
            sort: 4
        },
        formOption: {}
    },
    {
        label: '转移时间',
        key: 'handleTime',
        type: 'FormDateTimeRange',
        searchOption: {
            wraperProperties: {
                class: [
                    'grid-col-6',
                    'grid-col-lg-6',
                    'grid-col-sm-6',
                    'grid-col-ss-12',
                    'grid-col-xs-12',
                    'grid-col-pp-24'
                ]
            }
        }
    },

    {
        label: '转移情况说明',
        key: 'removeDesc',
        formSection: '转移信息',
        type: 'FormTextarea',
        tableOption: {
            sort: 3,
            label: '转移情况'
        },
        formOption: {
            wraperProperties: {
                class: ['grid-col-24']
            }
        }
    },

    {
        key: 'filesBefore',
        label: '转移前照片',
        type: 'FormUpload',
        formSection: '附件信息',
        formOption: {
            wraperProperties: {
                class: ['grid-col-24']
            },
            properties: {
                // disabled: true,
                'list-type': 'picture-card',
                accept: 'img'
            },
            extra: {
                btn_text: '上传',
                tip: '单个附件大小限制20Mb，最多上传200个附件'
            }
        }
    },

    {
        key: 'filesAfter',
        label: '转移后照片',
        type: 'FormUpload',
        formSection: '附件信息',
        formOption: {
            wraperProperties: {
                class: ['grid-col-24']
            },
            properties: {
                // disabled: true,
                'list-type': 'picture-card',
                accept: 'img'
            },
            extra: {
                btn_text: '上传',
                tip: '单个附件大小限制20Mb，最多上传200个附件'
            }
        }
    }
]