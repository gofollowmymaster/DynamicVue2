import { buildDynamicSelectOption,elementUploadFileApi,globalDownloadFileById } from "@/network/global";

const equipmentFields=[
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
    key: "typeParentDictLabel",
    label: "设施大类",
    tableOption:true
  },
  {
    key: 'typeDictId',
    type: 'FormDynamicSelect',
    label: '设施小类',
    options:buildDynamicSelectOption('park_equipment_type'),
    tableOption: {
      key:'typeDictLabel'
    },
    formOption: {
      span: 4,
      rules: ['required']
    },
  },
  {
    key:'amount',
    label:'数量',
    type:'FormIntNumber',
    formOption: {
      span:24,
      rules: ['required'],
    },
    tableOption:true

  },

  {
    key: 'transferDate',
    type: 'FormDate',
    label: '移交日期',
    tableOption: {
    },
    formOption: {
      span:24,
      rules: ['required'],
    }
  },
  
]
const mainPlantFields = [
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
    formable:true,
  },
  {
    key: "plantSpecies",
    type: "FormInput",
    label: "植物种类",
    formOption: {
      span:24,
      rules: [
        'required'
      ],
    },
    tableOption:true
  },
  {
    key: 'plantSpecificationDictId',
    type: 'FormDynamicSelect',
    label: '植物规格',
    options:buildDynamicSelectOption('project_plant_specification'),
    tableOption: {
      key:'plantSpecificationDictLabel'
    },
    formOption: {
      span:24,
      rules: ['required']
    },
  },
  {
    key:'amount',
    label:'数量',
    type:'FormIntNumber',
    formOption: {
      span:24,
      rules: ['required'],
    },
    tableOption:true
  },

  {
    key: 'transferDate',
    type: 'FormDate',
    label: '移交日期',
    tableOption: {
    },
    formOption: {
      span:24,
      rules: ['required'],
    }
  },
  
]
 

export default  [
  { key: "keyWord", type: "FormInput", label: "关键字", searchable: true },
      
      { key: "projectLibraryId", type: "FormHide", label: "",formSection:'验收信息', formOption:{}},
  { key: "id", type: "FormHide", label: "",formSection:'验收信息', formOption:{}},

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
      "key": "projectContractorId",
      "label": "承建商",
      "type": "FormContractorSelector",
      formSection:'验收信息',
      "formOption": {
        rules:['required']
      },
      // "tableOption": {
      //   key:'projectContractorName'
      // }
    },
    {
      "key": "designGreenArea",
      "label": "设计绿地面积",
      formSection:'验收信息',
      "type": "FormDecimalNumber",
      "tableOption": {
        "label": "设计绿地面积(m²)",
      },
      "formOption":{
        append:'m²',
        rules:['required']
      }
    },
    {
      "key": "endGreenArea",
      "label": "竣工绿地面积",
      formSection:'验收信息',
      "type": "FormDecimalNumber",
      "tableOption": {
        "label": "竣工绿地面积(m²)",
      },
      "formOption":{
        append:'m²',
        rules:['required']
      }
    },
    {
      "key": "designGreenCoverArea",
      "label": "设计绿化覆盖面积",
      formSection:'验收信息',
      "type": "FormDecimalNumber",
      "tableOption": {
      "label": "设计绿化覆盖面积(m²)",
      },
      "formOption":{
        append:'m²',
        rules:['required']
      }
    },
    {
      "key": "endGreenCoverArea",
      "label": "竣工绿化覆盖面积",
      formSection:'验收信息',
      "type": "FormDecimalNumber",
      "tableOption": {
      "label": "竣工绿化覆盖面积(m²)",
      },
      "formOption":{
        append:'m²',
        rules:['required']
      }
    },

     
    {
      key:'designGreenRate',
      "label": "设计绿地率",
      formSection:'验收信息',
      type:'FormRateInput',
      "tableOption": {},
      "formOption":{
        rules:['required']
      }
    },
         
    {
      "key": "endGreenRate",
      "label": "竣工绿地率",
      formSection:'验收信息',
      "type": "FormRateInput",
      "tableOption": {},
      "formOption":{
        rules:['required']
      }
    },
    {
      "key": "designWaterArea",
      "label": "设计水体面积",
      formSection:'验收信息',
      "type": "FormDecimalNumber",
      "tableOption": {
      "label": "设计水体面积(m²)",
      },
      "formOption":{
        append:'m²',
        rules:['required']
      }
    },
    {
      "key": "endWaterArea",
      "label": "竣工水体面积",
      formSection:'验收信息',
      "type": "FormDecimalNumber",
      "tableOption": {
        "label": "竣工水体面积(m²)",
      },
      "formOption":{
        append:'m²',
        rules:['required']
      }
    },
    {
      "key": "requirementFlag",
      "label": "是否符合设计要求",
      formSection:'验收信息',
      "type": "FormRadio",
      options:[{
        value:true,
        label:'是'
      },{
        value:false,
        label:'否'
      },],
      "formOption": {
        rules:['required']
      },
      "tableOption": {
      }
    },
    {
      "key": "acceptanceConclusion",
      "label": "验收结论",
      formSection:'验收信息',
      "type": "FormInput",
      "tableOption": {

      },
      "formOption": {
        rules:['required']
      },
    },
    {
      "key": "transferEndTime",
      "label": "实际竣工日期",
      formSection:'验收信息',
      "type": "FormDate",
      "formOption": {
        rules:['required']
      },
      searchOption:{
        wraperProperties:{
          class:['grid-col-6','grid-col-sm-8','grid-col-ss-10','grid-col-xs-16','grid-col-pp-24'],
          'label-width':'120px'
        }
      },
    },
       
   
    {
      "key": "acceptanceTime",
      "label": "完成验收日期",
      formSection:'验收信息',
      "type": "FormDate",
      "tableOption": {},
      formOption:{
        rules:['required']
      },
      searchOption:{
        wraperProperties:{
          class:['grid-col-6','grid-col-sm-8','grid-col-ss-10','grid-col-xs-16','grid-col-pp-24'],
          'label-width':'120px'
        }
      },
    },

    {
      "key": "projectEvaluate",
      "label": "工程评价",
      formSection:'验收信息',
      "type": "FormProjectEvaluate",
      "formOption":{
      }
    },
    {
      "key": "projectContractorEvaluate",
      "label": "承建商评价",
      formSection:'验收信息',
      "type": "FormProjectEvaluate",
      "formOption":{
      }
    },

    
    {
      "key": "fileIds",
      "label": "附件",
      formSection:'验收信息',
      "type": "FormUpload",
      "formOption": {
        span: 24,
        properties: {
          'list-type': 'table',
          accept:'*',
          
        },
        extra: {
          btn_text: '上传',
          tip: '程图纸建议打包上传，单个附件大小限制200 Mb，最多上传20个附件',
          apiPromise: elementUploadFileApi,
          downloadApi:globalDownloadFileById,
        }
      },
    },
    
    {
      "key": "transferArea",
      "label": "移交总面积",
      formSection:'移交信息',
      "type": "FormDecimalNumber",
      "tableOption": {
      "label": "移交总面积(m²)",
      },
      "formOption":{
        append:'m²',
        rules:['required']
      }
    },
    {
      "key": "transferGreenArea",
      "label": "移交绿地面积",
      formSection:'移交信息',
      "type": "FormDecimalNumber",
      "tableOption": {
        "label": "移交绿地面积(m²)",
      },
      "formOption":{
        append:'m²',
        rules:['required']
      }
    },
    {
      "key": "transferWaterArea",
      "label": "移交水体面积",
      formSection:'移交信息',
      "type": "FormDecimalNumber",
      "tableOption": {
        "label": "移交水体面积(m²)",
      },
      "formOption":{
        append:'m²',
        rules:['required']
      }
    },
    {
      key: 'remark',
      type: 'FormTextarea',
      label: '备注',
      formSection:'移交信息',
      formOption: {
        span: 24,
      },
    },

    

      {
        "key": "plantList",
        "label": "主要植物",
        formSection:'移交信息',
        "type": "FormCurd",
        "formOption": {
          span: 24,
 
          extra:{
            fields:mainPlantFields,
            entityLabel:'主要植物'
          }
        },
      },
      {
        key:'equipmentList',
        type:'FormCurd',
        label:'附属设施',
        formSection:'移交信息',
        formOption:{
          span: 24,
          extra:{
            fields:equipmentFields,
            entityLabel:'附属设施'
          }
 
        }
      }
     
  

      
    
   
     
  
  

  
];

 