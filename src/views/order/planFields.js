import { buildDynamicSelectOption,elementUploadFileApi,globalDownloadFileById } from "@/network/global";

export default  [
  { key: "keyWord", type: "FormInput", label: "关键字", searchable: true },
  { key: "id", type: "FormHide", label: "", formOption:{}},
  { key: "index", type: "index", label: "序号", tableOption:{width:60}},


    {
      "key": "projectCode",
      "label": "项目编号",
      formSection:'立项信息',  
      "type": "FormInput",
      "formOption": {
        rules:['required']
      },
      "tableOption": {}
    },
    {
      "key": "projectName",
      "label": "项目名称",
      formSection:'立项信息',  
      "type": "FormInput",
      "formOption": {
        rules:['required']

      },
      "tableOption": {}
    },
    {
      "key": "overallArea",
      "label": "总体规划面积",
      formSection:'立项信息',  
      "type": "FormDecimalNumber",
      "formOption": {
        rules:['required'],
        append:'㎡',
      },
      "tableOption": {}
    },
    {
      "key": "greenArea",
      "label": "绿地规划面积",
      formSection:'立项信息',  
      "type": "FormIntNumber",
      "formOption": {
        rules:['required'],
        append:'㎡',
      },
      "tableOption": {}
    },
    {
      "key": "waterArea",
      "label": "水体规划面积",
      formSection:'立项信息',  
      "type": "FormIntNumber",
      "formOption": {
        rules:['required'],
        append:'㎡',
      },
      "tableOption": {}
    },
    {
      "key": "capitalBudgeting",
      "label": "投资预算",
      formSection:'立项信息',  
      "type": "FormIntNumber",
      "formOption": {
        rules:['required'],
        append:'元',
      },
      "tableOption": {}
    },
    {
      "key": "buildType",
      "label": "建设类型",
      formSection:'立项信息',  
      "type": "FormSelect",
      options:[{
        value:'0',
        label:'新建',

      },{
        value:'1',
        label:'占绿恢复'
      },
    {
      value:'2',
      label:'改建'
    }],
      "formOption": {
      },
      "tableOption": {},
      searchOption:{}
    },
    {
      "key": "useLandDictId",
      "label": "用地性质",
      formSection:'立项信息',  
      "type": "FormDynamicSelect", 
      options:  buildDynamicSelectOption('project_use_land'), 
      "formOption": {},
      searchOption:{},
      tableOption:{
        key:'useLandDictLabel'
      },
    },
    {
      "key": "projectAttributeDictId",
      "label": "项目属性",
      formSection:'立项信息',  
      "type": "FormDynamicSelect", 
      options:  buildDynamicSelectOption('project_attribute'), 
      tableOption:{
        key:'projectAttributeDictLabel'
      },
      searchOption:{},
    },
    {
      "key": "projectTypeDictId",
      "label": "项目类别",
      formSection:'立项信息',  
      "type": "FormDynamicSelect", 
      options:  buildDynamicSelectOption('project_type'), 
      "formOption": {
        key:'projectTypeDictLabel'
      },
      searchOption:{},
    },
    {
      "key": "admId",
      "label": "行政区划",
      formSection:'立项信息',
      "type": "FormAdministrativeSelector",
      searchOption:{sort:2},
      "formOption": {
        rules:['required']
      },
    },
    {
      "key": "projectPosition",
      "label": "项目位置",
      formSection:'立项信息',
      "type": "FormSelectPoint",
      "formOption": {
        rules:['required']
      },
    },
    {
      "key": "deptId",
      "label": "责任单位",
      formSection:'立项信息',
      "type": "FormInnerOrgSelector",
      "formOption": {},
      "tableOption": {
        key:'deptName'
      }
    },
    {
      "key": "geogId",
      "label": "地理图层ID",
      formSection:'立项信息',
      "type": "FormDrawElement",
      "formOption": {},
    },
    {
      "key": "planStartTime",
      "label": "计划开工日期",
      formSection:'立项信息',
      "type": "FormDate",
      "formOption": {
        rules:['required']
      },
      "tableOption": {}
    },
    {
      "key": "planEndTime",
      "label": "计划竣工日期",
      formSection:'立项信息',
      "type": "FormDate",
      "formOption": {
        rules:['required']
      },
      "tableOption": {}
    },
   
    {
      "key": "planDate",
      "label": "计划制定日期",
      formSection:'立项信息',
      "type": "FormDate",
      "formOption": {
        rules:['required']
      },
    },
    {
      "key": "description",
      "label": "项目简介",
      formSection:'立项信息',
      "type": "FormTextarea",
      "formOption": {
        span:24,
        maxlength:500
      },
    },
    {
      "key": "planFileIds",
      "label": "附件",
      formSection:'立项信息',
      "type": "FormUpload",
      "formOption": {
        span: 24,
        // properties: {
          'list-type': 'table',
          accept:'*',
        // },
        extra: {
          btn_text: '上传',
          tip: '单个附件大小限制200Mb，最多上传20个附件',
          apiPromise: elementUploadFileApi,
          downloadApi:globalDownloadFileById,
        }
      },
    },
    {
      "key": "designUnit",
      "label": "设计单位",
      formSection:'设计信息',
      "type": "FormInput",
      "formOption": {
        rules:['required'],
        maxlength:50
      },
    },
    {
      "key": "designUser",
      "label": "设计人",
      formSection:'设计信息',
      "type": "FormInput",
      "formOption": {
        maxlength:50
      },
    },
    {
      "key": "designDate",
      "label": "设计完成时间",
      formSection:'设计信息',
      "type": "FormDate",
      "formOption": {

      },
    },
    {
      "key": "designFileIds",
      "label": "附件",
      formSection:'设计信息',
      "type": "FormUpload",
      "formOption": {
        span: 24,
        // properties: {
          'list-type': 'table',
          accept:'*',
        // },
        extra: {
          btn_text: '上传',
          tip: '单个附件大小限制200Mb，最多上传20个附件',
          apiPromise: elementUploadFileApi,
          downloadApi:globalDownloadFileById,
        }
      },
    },
    {
      "key": "approveStatus",
      "label": "报批是否已通过",
      formSection:'报批信息',
      "type": "FormRadio",
      options:[
        {
          value:'0',
          label:'无需报批'
        },
        {
          value:'1',
          label:'已通过'
        },
        {
          value:'2',
          label:'未通过'
        }
      ],
      "formOption": {
        defaultValue:'0',
        rules:['required'],
      },
      "tableOption": {
        label:'报批信息'
      },
      searchOption:{
        label:'报批信息',
        "type": "FormSelect",

      }
    },
    {
      "key": "approveOverallArea",
      "label": "批复总体规划面积",
      formSection:'报批信息',
      "type": "FormDecimalNumber",
      "formOption": {
        append:'㎡',
        properties:{
         hidden:'#{approveStatus}!=1',
        },
        rules:['required'],
      },
    },
    {
      "key": "approveGreenArea",
      "label": "批复绿地规划面积",
      formSection:'报批信息',
      "type": "FormDecimalNumber",
      "formOption": {
        append:'㎡',
        properties:{
          hidden:'#{approveStatus}!=1',
         },
        rules:['required'],
      },
    },
    {
      "key": "approveWaterArea",
      "label": "批复水体规划面积",
      formSection:'报批信息',
      "type": "FormDecimalNumber",
      "formOption": {
        append:'㎡',
        properties:{
          hidden:'#{approveStatus}!=1',
         },
        rules:['required']
      },
    },
    {
      "key": "approveCapitalBudgeting",
      "label": "批复投资预算",
      formSection:'报批信息',
      "type": "FormDecimalNumber",
      "formOption": {
        append:'㎡',
        properties:{
          hidden:'#{approveStatus}!=1',
         },
        rules:['required']
      },
    },
    {
      "key": "approveDate",
      "label": "报批通过日期",
      formSection:'报批信息',
      "type": "FormDate",
      "formOption": {
        rules:['required'],
        properties:{
          hidden:'#{approveStatus}!=1',
         },
      },
    },
    {
      "key": "approveFileIds",
      "label": "附件",
      formSection:'报批信息',
      "type": "FormUpload",
      "formOption": {
        properties:{
          hidden:'#{approveStatus}!=1',
         },
        span: 24,
      
          'list-type': 'table',
          accept:'*',
      
        extra: {
          btn_text: '上传',
          tip: '单个附件大小限制200Mb，最多上传20个附件',
          apiPromise: elementUploadFileApi,
          downloadApi:globalDownloadFileById,
        }
      },
    },
    {
      "key": "bidStatus",
      "label": "招投标是否已完成",
      formSection:'招投标信息',
      "type": "FormRadio",
      options:[
        {
          value:'0',
          label:'无需招投标'
        },
        {
          value:'1',
          label:'已通过'
        },
        {
          value:'2',
          label:'未通过'
        }
      ],
      "formOption": {
        defaultValue:'0',
        rules:['required'],
      }, 
      "tableOption": {
        label:'招投标信息'
      },
      "searchOption": {
        label:'招投标信息',
        "type": "FormSelect",
      }
    },
    {
      "key": "bidOpenDate",
      "label": "开标日期",
      formSection:'招投标信息',
      "type": "FormDate",
      "formOption": {
        rules:['required'],
        properties:{
          hidden:'#{bidStatus}!=1',
        },
        
      },
    },
    {
      "key": "projectContractorId",
      "label": "中标单位",
      formSection:'招投标信息',
      "type": "FormContractorSelector",
      "formOption": {
        rules:['required'],
        properties:{
          hidden:'#{bidStatus}!=1',
        },
        
      },
    },
    {
      "key": "bidMoney",
      "label": "中标金额",
      formSection:'招投标信息',
      "type": "FormIntNumber",
      "formOption": {
        rules:['required'],
        max:1000000000,
        properties:{
          hidden:'#{bidStatus}!=1',
        },
        
      },
    },
    {
      "key": "bidFileIds",
      "label": "附件",
      formSection:'招投标信息',
      "type": "FormUpload",
      "formOption": {
        'list-type': 'table',
        accept:'*',
        
        span: 24,
        properties: {
         
          hidden:'#{bidStatus}!=1',
        },
        extra: {
          btn_text: '上传',
          tip: '单个附件大小限制200Mb，最多上传20个附件',
          apiPromise: elementUploadFileApi,
          downloadApi:globalDownloadFileById,
        }
      },
    },
  
  

  
];

 