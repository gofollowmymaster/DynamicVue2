import { buildDynamicSelectOption,elementUploadFileApi,globalDownloadFileById } from "@/network/global";

export const oldtreeFields= [
  { key: "keyWord", type: "FormInput", label: "关键字", searchable: true },
  { key: "id", type: "FormHide", label: "", formOption:{}},
  { key: "index", type: "index", label: "序号", tableOption:{width:60}},

  {key:'treeNumber',label:'固定资产编号',tableOption:{
    width:120,sort:1
  }},
  {
    key: "treeNameId",
    type: "FormInput",
    label: "资产类型名称",
    tableOption: {
      sort:2,
      key:'treeName'
    },
    formOption: {
      rules: [
        'required'
      ],
      valueLink:{
        '@*any*@': [
          {
            linkKey: 'sciName',
            linkValue: function (data) {
              debugger
              return data[0].sciName
            }
          },
          {
            linkKey: 'latinSciName',
            linkValue: function (data) {
              debugger
              return data[0].sciName
            }
          }
        ]
      },
  
    },
  },
  {
    key: "sciName",
    type: "FormInput",
    label: "学名",
    formOption: {
      properties:{
        disabled:true
      },
      rules:['required'],
      // formTip:'asdsadasdasd',

    },
    tableOption: {
      sort:2
    },
  },
  
  {
    key: "latinSciName",
    type: "FormInput",
    label: "品牌",
    formOption: {
      properties:{
        disabled:true
      }
    },
  },
  {
    key: "originalTreeNumber",
    type: "FormInput",
    label: "原固定资产编号",   
    formOption: {
    },
  },
  {
    key: "distribution",
    label: "分布特点",
    type: 'FormDynamicSelect',
    options:  buildDynamicSelectOption('tree_manage_distribution'), 
    formOption: {
    },
  },
  {
    key: "investNumber",
    type: "FormIntNumber",
    label: "调查顺序号",
    formOption:{
      changeHandle(value,data,items,vm){
        debugger
      }
    }
  },
  {
    key: "ownership",
    type: "FormDynamicSelect",
    label: "权属",
 
    options: buildDynamicSelectOption('tree_manage_ownership'), 
    formOption:{
    },
  },
  {
    key: "famousWood",
    type: "FormDynamicSelect",
    label: "等级",
    options: buildDynamicSelectOption('tree_manage_famous_wood'), 

    // options: [
    //   {
    //     value:1,
    //     label:'等级'
    //   },
    //   {
    //     value:2,
    //     label:'古资产'
    //   },
    //   {
    //     value:3,
    //     label:'固定资产'
    //   },
      // key: 'id',
      // value: 'dictValue',
      // label: 'dictLabel',
      // apiPromise: () => {
      //   return selectDictDataInfoApi({
      //     dictType: 'tree_manage_famous_wood'
      //   }).then((res) => res.data || [])
      // }
    // ],
    tableOption: {
      sort:6,
      template(row,){
          return {
            component:'ColDictTag',
            dictInfoKey:'famousWoodDictData',
          }
      }
    },
    formOption:{
      rules:['required']
    }
  },
{
  key: "age",
  type: "FormDecimalNumber",
  label: "使用年数（年）",
  tableOption: {
    sort:5
  },
  formOption:{
    // rules:['required'],
    properties:{
      required:"['99999010','99999011','99999012'].includes(#{famousWood})"
    }
  }
},
{
  key: "protectLev",
  type: "FormDynamicSelect",
  label: "等级",
  searchable:true,
  options: buildDynamicSelectOption('tree_manage_protect_lev'), 
   
  formOption:{
    rules:['required'],
    properties:{
      disabled:"['99999010','99999011','99999012'].includes(#{famousWood})",
      value:"if(['99999010','99999011','99999012'].includes(#{famousWood})){  if(#{age}>=300){  return '99999001';  }  if(#{age}>=200){    return '99999002' ;  }   if(#{age}>=100){    return '99999003' ; }  }else{ return #{protectLev} ;  }"
     
    },
    // formDataUpdateHandle(value,formData){
    //   debugger
    // }
    
  },
  tableOption: {
    sort:8,
    template(row){
      return {
        component: 'ColDictTag',
        dictInfoKey:'protectLevDictData',
      }
    }
  },
},
{
  key: "treeHigh",
  type: "FormDecimalNumber",
  label: "资产高（米）",
  formOption:{
    rules:['required']
  }
},
{
  key: "crownWidth",
  type: "FormDecimalNumber",
  label: "平均占地(米)",
  formOption:{
    rules:['required']
  }
},
{
  key: "bust",
  type: "FormDecimalNumber",
  label: "数量",
  formOption:{
    rules:['required']
  }
},
{
  key: "crownWidthNorthSouth",
  type: "FormDecimalNumber",
  label: "占地-南北向(米)",
  formOption:{
   
  }
},
{
  key: "crownWidthEastWest",
  type: "FormDecimalNumber",
  label: "占地- 东西向(米)",
  formOption:{
   
  }
},
{
  key: "treeDesc",
  type: "FormTextarea",
  label: "资产性状描述",
  formOption:{
    wraperProperties: {
      class: ['grid-col-24']
    },
  }
},

{
  key: 'pics',
  label: '固定资产照片',
  type: 'FormUpload',
  formOption: {
    wraperProperties: {
      class: ['grid-col-24']
    },
    properties: {
      'list-type': 'picture-card',
      accept:'img',
    },
    extra: {
      btn_text: '上传',
      tip: '支持格式：.jpg  .png  .gif ，单个文件不能超过20MB，最多上传5张',
      apiPromise: elementUploadFileApi,
    }
  }
},

{
  key: "district",
  type: "FormAdministrativeSelector",
  formSection:'地理位置',
  label: "行政区划",
  searchable:true,
  tableOption: {
    key:'districtName',
    sort:8,
  },
  formOption:{
    rules:['required']
  }
},

 
{
  label: '经纬度',
  key: 'lonLat',
  formSection:'地理位置',
  type: 'FormSelectPoint',
  formOption: {
    valueLink: {
      '@*any*@': [
        {
          linkKey: 'address',
          linkValue: function (data) {
            return data.formattedAddress
          }
        }
      ]
    }
  }
},
{
  label: '详细地址',
  formSection:'地理位置',
  key: 'address',
  formOption: {
    drawType:'marker',
    rules: ['required'],
    properties: {
      disabled:true
    },
    
  }
},

 

{
  key: "growingPlace",
  type: "FormDynamicSelect",
  formSection:'地理位置',
  label: "使用场所",
  options:  buildDynamicSelectOption('tree_manage_growing_place'),
  formOption:{
  },
 
},
{
  key: "slope",
  type: "FormDecimalNumber",
  formSection:'地理位置',
  label: "坡度(度)",
  formOption:{
  },
 
},
{
  key: "slopeDirection",
  type: "FormDecimalNumber",
  formSection:'地理位置',
  label: "坡向",
  formOption:{
  },
 
},

{
  key: "altitude",
  type: "FormDecimalNumber",
  formSection:'地理位置',
  label: "海拔(米)",
  formOption:{
  },
},
{
  key: "slopePosition",
  type: "FormDecimalNumber",
  formSection:'地理位置',
  label: "坡位",
  formOption:{
  },
},

{
  key: "growthSituation",
  type: "FormDynamicSelect",
  formSection:'使用信息',
  label: "使用状况",
  searchable:true,
  options: buildDynamicSelectOption('tree_manage_growth_situation'), 
  formOption:{
    rules:['required']
  },
  tableOption:{
    sort:7,
    template(row){
      return {
        component: 'ColDictTag',
        dictInfoKey:'growthSituationDictData',
      }
    }
  }
},


{
  key: "growthStatus",
  type: "FormDynamicSelect",
  formSection:'使用信息',
  label: "使用现状",
  options: buildDynamicSelectOption('tree_manage_growth_status'), 
  formOption:{
  },
 
},

{
  key: "growthEnvironment",
  type: "FormDynamicSelect",
  formSection:'使用信息',
  label: "使用环境",
  options: buildDynamicSelectOption('tree_manage_growth_environment'),
  formOption:{
    rules:['required']
  },
 
},
{
  key: "soilType",
  type: "FormInput",
  formSection:'使用信息',
  label: "土壤类型",
  formOption:{

  },
},
{
  key: "soilThickness",
  type: "FormDecimalNumber",
  formSection:'使用信息',
  label: "土层厚度（厘米）",
  formOption:{
  },
},
{
  key: "unit",
  type: "FormInnerOrgSelector",
  formSection:'管理信息',
  label: "管理单位",
  formOption:{
    rules: ['required']
  },
  tableOption: {
    sort: 9,
    key:'manageUserName'
  },
},
{
  key: 'manageUser',
  type: 'FormInnerOrgSelPersonSelector',
  label: '管理人',
  formSection: '管理信息',

  formOption: {
    // 验证规则单独存放
    rules: ['required'],
    valueLink:{
      '@*any*@': [
        {
          linkKey: 'manageUserPhone',
          linkValue: function (data) {
            return data[0].phoneNum
          }
        }
      ]
    }
  }
},
{
  key: 'manageUserPhone',
  type: 'FormInput',
  label: '管理人电话',
  formSection: '管理信息',
  formOption: {
    // rules: ['required', /^[\d|-]{9,12}$/],
    properties: {
      disabled:true
    }
  },
},
{
  key: 'maintenanceDesc',
  type: 'FormTextarea',
  label: '管养方案',
  formSection: '管理信息',
  formOption: {
    wraperProperties:{
      class:['grid-col-24']
    },
    rules: [],
  },
},
{
  key: 'files',
  label: '附件',
  type: 'FormUpload',
  formSection:'管理信息',
  formOption: {
    wraperProperties: {
      class: ['grid-col-24']
    },
    properties: {
      'list-type': 'table',
      accept:'*',
      limit:200
    },
    extra: {
      btn_text: '上传',
      tip: '单个附件大小限制20Mb，最多上传200个附件',
      apiPromise: elementUploadFileApi,
      downloadApi:globalDownloadFileById,
      limitSize:5
    }
  }
},
{
  key: 'qrCode',
  label: '二维码',
  type: 'QrCodeImg',
  tableOption:{
      template(){
        return      {  component: 'ColQrcode',}    
      }
  },
  detailOption:{
    wraperProperties: {
      class: ['grid-col-24']
    },
  }
}
];

export const manageLogFields=[
  { key: "keyWord", type: "FormInput", label: "关键字", searchable: true },   
  { key: "treeNumber", type: "FormInput", label: "固定资产", searchable: false,tableOption:{} },   

  { key: "type", type: "FormSelect", label: "类型", searchable: false,tableOption:{} },   

]