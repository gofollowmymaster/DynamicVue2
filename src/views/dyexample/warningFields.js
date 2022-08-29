import {
    elementUploadFileApi
} from '@/api/global'

export const warningFields = [  
    { key: 'id', type: 'FormHide', formOption: true },
    {
        label: '关键字',
        key: 'keyWord',
        type: 'FormInput',
        searchOption: true
    },
    {
        label: ' 设备ID',
        key: 'equipmentId',
        formSection: '基本信息',
        type: 'FormInput',
        formOption: {
        },
        tableOption: {
            sort: 4
        }
    },
    {
        label: '设备名称',
        formSection: '基本信息',
        key: 'equipmentName',
        tableOption: { sort: 5 },
        formOption: true
    },

    {
        label: '告警信息',
        key: 'giveAnAlarmMessage',
        formSection: '基本信息',
        formOption: {
        }
    },
    {
        label: '设备类型',
        key: 'equipmentType',
        formSection: '基本信息',
        type: 'FormInput',
        formOption: {
        }
    },

    {
        label: '告警类型',
        key: 'giveAnAlarmType',
        formSection: '基本信息',
        tableOption: { sort: 6 },
        formOption: {
        }
    },
    {
        label: '位置',
        key: 'position',
        formSection: '基本信息',
        formOption: {}
    },
 
    {
        label: '固定资产编号',
        key: 'assetNumber',
        formSection: '基本信息',
        type: 'FormInput',
        tableOption: {
            sort: 1
        },
        formOption: {
        }
    },
    {
        label: '资产类型名称',
        key: 'assetsName',
        type: 'FormInput',
        formSection: '基本信息',
        tableOption: {
            sort: 2
        },
        formOption: {
        }
    },
    {
        label: '告警时间',
        key: 'giveAnAlarmTime',
        formSection: '基本信息',
        type: 'FormTextarea',
        formOption: {

        }
    },
    {
        label: '其它告警信息',
        key: 'otherGiveAnAlarmMessage',
        type: 'FormTextarea',
        formSection: '基本信息',

        formOption: {

        }
    },
    {
        key: 'filesBefore',
        label: '告警图片',
        type: 'FormUpload',
        formSection: '基本信息',
        formOption: {

            properties: {
                // disabled: true,
                'list-type': 'picture-card',
                accept: 'img',
                limit: 5
            },
            btn_text: '上传',
            // tip: '单个附件大小限制20Mb，最多上传200个附件',
            apiPromise: elementUploadFileApi
        }
    },

    {
        key: 'filesAfter',
        label: '告警视频',
        type: 'FormUpload',
        formSection: '基本信息',
        formOption: {

            properties: {
                'list-type': 'picture-card',
                accept: 'video'
            },
            btn_text: '上传',
            // tip: '单个附件大小限制20Mb，最多上传200个附件',
            apiPromise: elementUploadFileApi,
            limitSize: 5
        }
    }

]

export const warningProcessedFields = [
    { key: 'id', type: 'FormHide', formOption: true },
    {
        label: '关键字',
        key: 'keyWord',
        type: 'FormInput',
        searchOption: true
    },
    {
        label: '告警时间',
        key: 'warningTimeRange',
        type: 'FormDateRange',
        searchOption: {
            sort: 11
        }
    },
    {
        label: '处理时间',
        key: 'handleTimeRange',
        type: 'FormDateRange',
        searchOption: {
            sort: 12
        }
    },

    {
        label: ' 设备ID',
        key: 'equipmentId',
        formSection: '基本信息',
        type: 'FormInput',
        formOption: {
        },
        tableOption: {
            sort: 4
        }
    },
    {
        label: '设备名称',
        formSection: '基本信息',
        key: 'equipmentName',
        tableOption: { sort: 5 }
    },

    {
        label: '告警信息',
        key: 'giveAnAlarmMessage',
        formSection: '基本信息',
        formOption: {
        },
        tableOption: {
            sort: 5
        }

    },
    {
        label: '设备类型',
        key: 'equipmentType',
        formSection: '基本信息',
        type: 'FormInput',
        formOption: {
        }
    },

    {
        label: '告警类型',
        key: 'giveAnAlarmType',
        formSection: '基本信息',
        tableOption: { sort: 6 },
        formOption: {
        },
        searchOption: true
    },
    {
        label: '位置',
        key: 'position',
        formSection: '基本信息',
        formOption: {},
        tableOption: {
            sort: 7,
            label: '设备位置'
        }
    },
 
    {
        label: '固定资产编号',
        key: 'fixedAssetsNumber',
        formSection: '基本信息',
        type: 'FormInput',
        tableOption: {
            sort: 1
        },
        formOption: {
        }
    },
    {
        label: '资产类型名称',
        key: 'fixedAssetsName',
        type: 'FormInput',
        formSection: '基本信息',
        tableOption: {
            sort: 2
        },
        formOption: {
        }
    },
    {
        label: '告警时间',
        key: 'giveAnAlarmTime',
        formSection: '基本信息',
        type: 'FormTextarea',
        formOption: {
        },
        tableOption: {
            sort: 9
        }
    },
    {
        label: '其它告警信息',
        key: 'otherGiveAnAlarmMessage',
        type: 'FormTextarea',
        formSection: '基本信息',

        formOption: {

        }
    },
    {
        key: 'filesBefore',
        label: '告警图片',
        type: 'FormUpload',
        formSection: '基本信息',
        formOption: {

            properties: {
                // disabled: true,
                'list-type': 'picture-card',
                accept: 'img'
            },
            btn_text: '上传',
            tip: '单个附件大小限制20Mb，最多上传200个附件',
            apiPromise: elementUploadFileApi
        }
    },

    {
        key: 'filesAfter',
        label: '告警视频',
        type: 'FormUpload',
        formSection: '基本信息',
        formOption: {

                // disabled: true,
            'list-type': 'picture-card',
            accept: 'video',
            'auto-load':false,
            btn_text: '上传',
            tip: '单个附件大小限制20Mb，最多上传200个附件',
            apiPromise: elementUploadFileApi
        }
    },
    {
        label: '处理方式',
        key: 'treatmentMethod',
        type: 'FormRadio',
        formSection: '处理信息',
        searchOption: {
            type: 'FormSelect'
        },
        options: [
            {
                value: 3,
                label: '不予处理'
            },
            {
                value: 2,
                label: '处理'
            },
            {
                value: 1,
                label: '转事件'
            }
        ],
        formOption: {
        },
        tableOption: {
            sort: 10
        }
    },
    {
        label: '不予处理原因',
        key: 'unhandleReason',
        type: 'FormTextarea',
        formSection: '处理信息',
        formOption: {
            expressProp: {
                hidden: '#{treatmentMethod}!=3'
            }
        }
    },
    {
        label: '处理人',
        key: 'userName',
        type: 'FormTextarea',
        formSection: '处理信息',

        formOption: {
            expressProp: {
                hidden: '#{treatmentMethod}!=3'
            }
        },
        tableOption: {
            sort: 11
        }
    },

    {
        label: '处理结果',
        key: 'handleResult',
        type: 'FormTextarea',
        formSection: '处理信息',
        formOption: {
            expressProp: {
                hidden: '#{treatmentMethod}!=2'
            }
        },
        tableOption: {
            sort: 13
        }
    },
    {
        label: '处理图片',
        key: 'imgs',
        type: 'FormTextarea',
        formSection: '处理信息',
        formOption: {
            expressProp: {
                hidden: '#{treatmentMethod}!=2'
            }
        }
    },
    {
        label: '处理视频',
        formSection: '处理信息',

        key: 'videos',
        type: 'FormTextarea',
        formOption: {
            expressProp: {
                hidden: '#{treatmentMethod}!=2'
            }
        }
    },

    {
        label: '处理时间',
        formSection: '处理信息',
        key: 'handleTime',
        type: 'FormDateTime',
        formOption: {
            expressProp: {
                hidden: '#{treatmentMethod}==1'
            }
        },
        tableOption: {
            sort: 12
        }
    },
    {
        label: '事件编号',
        formSection: '处理信息',

        key: 'eventNumber',
        type: 'FormInput',
        formOption: {
            expressProp: {
                hidden: '#{treatmentMethod}!=1'
            }
        }
    }
]
 
export const handleFields = [
    { key: 'fixedAssetsGiveAnAlarmId', type: 'FormHide', formOption: true },
    { key: 'treatmentMethod', type: 'FormHide', formOption: true },
    {
        label: '处理结果',
        key: 'message',
        type: 'FormInput',
        formOption: {

            rules: ['required']
        }
    },
    {
        key: 'pic',
        label: '上传图片',
        type: 'FormUpload',
        formOption: {

            'list-type': 'picture-card',
            accept: 'img',
            'auto-load':false,
            btn_text: '上传',
            // tip: '支持格式：.jpg  .png  .gif ，单个文件不能超过20MB，最多上传5张',
            apiPromise: elementUploadFileApi
        }
    },
    {
        key: 'videos',
        label: '上传视频',
        type: 'FormUpload',
        formOption: {
            accept: 'video',
            'auto-load':false,
            btn_text: '上传',
            apiPromise: elementUploadFileApi
        }
    },
    {
        label: '处理人',
        key: 'userId',
        type: 'FormInput',
        formOption: {

            rules: ['required'],
            changeHandle(data, vm) {
                vm.updateFormData({
                    userIdPhone: data[0].phoneNum
                })
            }

        }
    },
    {
        label: '上报人联系方式',
        key: 'userIdPhone',
        formOption: {

            properties: {
                disabled: true
            },
            rules: ['required']
        }
    },

    {
        label: '处理时间',
        type: 'FormDateTime',
        key: 'handleTime',
        formOption: {

        }
    }

]

export const unhandleFields = [
    { key: 'fixedAssetsGiveAnAlarmId', type: 'FormHide', formOption: true },
    { key: 'treatmentMethod', type: 'FormHide', formOption: true },

    {
        label: '原因',
        key: 'message',
        type: 'FormInput',
        formOption: {
            rules: ['required']
        }
    },

    {
        label: '处理人',
        key: 'userId',
        type: 'FormInput',
        formOption: {
            rules: ['required']
        }
    },

    {
        label: '处理时间',
        type: 'FormDateTime',
        key: 'handleTime',
        formOption: {
        }
    }

]
