import { buildDynamicSelectOption,elementUploadFileApi,globalDownloadFileById } from "@/network/global";


const subProjectFields = [
  {
    type: 'index',
    key: 'index',
    label: '序号',
    tableOption: {
      width: 60
    },
  },
  {
    type: 'FormHide',
    key: 'id',
    formable:true
  },
  {
    key: "projectChildName",
    type: "FormInput",
    label: "子工程名称",
    formOption: {
      span: 24,
      rules: [
        'required'
      ],
    },
  },
  {
    key: 'startTime',
    type: 'FormDate',
    label: '开工日期',
    tableOption: {
      sort:3
    },
    formOption: {
      span: 24,
      rules: ['required']
    },
  },

  {
    key: 'endTime',
    type: 'FormDate',
    label: '竣工日期',
    tableOption: {
    },
    formOption: {
      span: 24,
      rules: ['required'],
    }
  },
  {
    key: 'remark',
    type: 'FormTextarea',
    label: '备注',
    tableable: true,
    formOption: {
      span: 24,
      rules: ['required']
    },
  },
  {
    key: 'createTime',
    type: 'FormDateTime',
    label: '记录日期',
    tableOption: {
    },
  },
  {
    key: 'updateTime',
    type: 'FormDateTime',
    label: '更新日期',
    tableOption: {
    },
  },
]
 

export default  [
  { key: "keyWord", type: "FormInput", label: "关键字", searchable: true },
  { key: "projectLibraryId", type: "FormHide", label: "",formSection:'项目建设信息', formOption:{}},
  { key: "id", type: "FormHide", label: "",formSection:'项目建设信息', formOption:{}},
  { key: "index", type: "index", label: "序号", tableOption:{width:60}},
  {
    "key": "admId",
    "label": "行政区划",
    "type": "FormAdministrativeSelector",
    searchOption:{sort:2},
  },
  {
    "key": "projectCode",
    "label": "项目编号",
    "type": "FormInput",
    "tableOption": {}
  },
  {
    "key": "projectName",
    "label": "项目名称",
    "type": "FormInput",
    "tableOption": {}
  },
  {
    "key": "overallArea",
    "label": "总体规划面积",
    "type": "FormDecimalNumber",
    "tableOption": {}
  },
  {
    key:'overallAreaLastMonth',
    "label": "上月完成面积(m²)",
    "tableOption": {}
  },
  {
    key:'overallAreaYear',
    "label": "当年累计完成面积(m²)",
    "tableOption": {}
  },
  {
    key:'overallAreaAmount',
    "label": "总体累计完成面积(m²)",
    "tableOption": {}
  },
  {
    key:'progress',
    "label": "项目总进度",
    "tableOption": {}
  },
        
  {
    "key": "capitalBudgeting",
    "label": "投资预算",
    "type": "FormIntNumber",
    "tableOption": {}
  },
  {
    key:'invested',
    "label": "已投入总资金(元)",
    "tableOption": {}
  },



  {
    "key": "projectContractorId",
    "label": "承建商",
    "type": "FormContractorSelector",
    formSection:'项目建设信息',
    "formOption": {
      rules:['required']
    },
    // "tableOption": {
    //   key:'projectContractorName'
    // }
  },
  {
    "key": "startTime",
    "label": "实际开工日期",
    formSection:'项目建设信息',
    "type": "FormDate",
    "formOption": {
      rules:['required']
    },
    "tableOption": {},
    searchOption:{
      wraperProperties:{
        class:['grid-col-6','grid-col-sm-8','grid-col-ss-10','grid-col-xs-16','grid-col-pp-24'],
        'label-width':'120px'
      }
    },
  },
      
  {
    "key": "planStartTime",
    "label": "计划开工日期",
    "type": "FormDate",
    "tableOption": {}
  },
  {
    "key": "planEndTime",
    "label": "计划竣工日期",
    "type": "FormDateRange",
    "tableOption": {},
    searchOption:{
      wraperProperties:{
        class:['grid-col-6','grid-col-sm-8','grid-col-ss-10','grid-col-xs-16','grid-col-pp-24'],
        'label-width':'120px'
      }
    },
  },

  {
    "key": "fileIds",
    "label": "附件",
    formSection:'项目建设信息',
    "type": "FormUpload",
    "formOption": {
      wraperProperties: {
        class: ['grid-col-24']
      },
      properties: {
        'list-type': 'table',
        accept:'*',
        
      },
      extra: {
        btn_text: '上传',
        tip: '单个附件大小限制200Mb，最多上传20个附件',
        apiPromise: elementUploadFileApi,
        downloadApi:globalDownloadFileById,
      }
    },
  },
  {
    "key": "buildingChild",
    "label": "子项目列表",
  formSection:'子项目信息',
    "type": "FormCurd",
    "formOption": {

      wraperProperties: {
        class: ['grid-col-24', ],
        // 'label-width':'0px'
      },

      extra:{
        fields:subProjectFields,
        entityLabel:'主要植物'
      }
    },
  },
  {
    key:'progressTable',
    type:'slot',
    formSection:'进度信息',
    detailOption:{
      wrapertype:'el-form-item',
      wraperProperties: {
        class: ['grid-col-24', ],
        'label-width':'0px'
      },
    }
  }
    
  

      
    
   
     
  
  

  
];

 