import { YEARSPACE } from "@/common/constant/index.js"
import { buildDynamicSelectOption, elementUploadFileApi, globalDownloadFileById } from "@/network/global";
import { yearProgressListApi } from "@/network/orderManage"

export const
	fields = [

		{
			"key": "year",
			"label": "年度",
			type: 'FormDynamicSelect',
			options: {
				key: 'value',
				value: 'value',
				label: 'label',
				apiPromise: (formData) => {
					// projectLibraryId
					debugger
					return yearProgressListApi(formData.id).then((res) => {
						debugger
						res.data.sort((prev, next) => {
							return prev - next
						})

						return res.data.map((year) => {
							return {
								value: year,
								label: year,
							}
						})
					})
				}
			},
			"searchOption": {
				defaultValue: YEARSPACE.slice(-1)[0].value,
				sort: 1,
			}
		},
		{
			"key": "keyword",
			"label": "关键字",
			"searchOption": {
				sort: 2
			}
		},
		{
			"key": "admId",
			"label": "行政区划",
			type: 'FormAdministrativeSelector',
			"searchOption": {
				sort: 2
			}
		},

 
		{
			"key": "projectCode",
			"label": "项目编号",
			"formOption": {},
			"tableOption": {
				width: 140
			}
		},

		{
			"key": "projectName",
			"label": "项目名称",
			"type": "FormInput",
			"formOption": {},
			"tableOption": {
				width: 140
			}
		},
		{
			"key": "buildType",
			"label": "建设类型",
			"type": "FormSelect",
			options: [{
				value: '0',
				label: '新建',

			}, {
				value: '1',
				label: '占绿恢复'
			},
			{
				value: '2',
				label: '改建'
			}],
			searchOption: {
				sort: 4
			},
			"formOption": {},
			"tableOption": {}
		},
		{
			"key": "useLandDictId",
			"label": "用地性质",
			"type": "FormDynamicSelect",
			options: buildDynamicSelectOption('project_use_land'),
			searchOption: {
				sort: 5
			},
			"formOption": {},
			"tableOption": {
				key: 'useLandDictLabel',
				width: 90
			}
		},

		{
			"key": "projectAttributeDictId",
			"label": "项目属性",
			"type": "FormDynamicSelect",
			options: buildDynamicSelectOption('project_attribute'),
			searchOption: {
				sort: 6
			},
			"formOption": {},
			"tableOption": {
				key: 'projectAttributeDictLabel',
				width: 90
			}
		},

		{
			"key": "projectTypeDictId",
			"label": "项目类别",
			"type": "FormDynamicSelect",
			options: buildDynamicSelectOption('project_type'),
			searchOption: {
				sort: 6
			},
			"formOption": {},
			"tableOption": {
				width: 90,
				key: 'projectTypeDictLabel',
			}
		},

		{
			"key": "projectStatus",
			"label": "项目状态",
			"type": "FormSelect",
			options: [
				{
					value: 0,
					label: '计划'
				},
				{
					value: 1,
					label: '在建'
				},
				{
					value: 2,
					label: '移交'
				},
				{
					value: 3,
					label: '完成'
				},
			],
			searchOption: {
				sort: 3
			},
			"formOption": {},
			"tableOption": {

			}
		},
		{
			"key": "buildingArea",
			"label": "年度计划总体面积（m²)",
			"type": "FormInput",
			"formOption": {},
			"tableOption": {
				width: '120px'
			}
		},
		{
			"key": "buildingTotalArea",
			"label": "年度建设总体面积（m²)",
			"type": "FormInput",
			"formOption": {},
			"tableOption": {
				width: '120px'
			}
		},
		{
			"key": "buildingAreaRatio",
			"label": "完成率",
			"type": "FormInput",
			"formOption": {},
			"tableOption": {}
		},
		{
			"key": "buildingGreenArea",
			"label": "年度计划绿地面积（m²)",
			"type": "FormInput",
			"formOption": {},
			"tableOption": {
				width: '120px'
			}
		},
		{
			"key": "buildingGreenTotalArea",
			"label": "年度建设绿地面积（m²)",
			"type": "FormInput",
			"formOption": {},
			"tableOption": {
				width: '120px'
			}
		},
		{
			"key": "buildingGreenAreaRatio",
			"label": "完成率",
			"type": "FormInput",
			"formOption": {},
			"tableOption": {}
		},
		{
			"key": "buildingWaterArea",
			"label": "年度计划水体面积（m²）",
			"type": "FormInput",
			"formOption": {},
			"tableOption": {
				width: '120px'
			}
		},
		{
			"key": "buildingWaterTotalArea",
			"label": "年度建设水体面积（m²）",
			"type": "FormInput",
			"formOption": {},
			"tableOption": {
				width: '120px'
			}
		},
		{
			"key": "buildingWaterAreaRatio",
			"label": "完成率",
			"type": "FormInput",
			"formOption": {},
			"tableOption": {}
		},
		{
			"key": "buildingMoney",
			"label": "年度投资预算（元）",
			"type": "FormInput",
			"formOption": {},
			"tableOption": {
				width: '120px'
			}
		},
		{
			"key": "buildingTotalMoney",
			"label": "年度已用资金（元）",
			"type": "FormInput",
			"formOption": {},
			"tableOption": {
				width: '120px'
			}
		},
		{
			"key": "buildingMoneyRatio",
			"label": "完成率",
			"type": "FormInput",
			"formOption": {},
			"tableOption": {}
		},

		{
			"key": "id",
			"type": "FormHide",
			"formOption": {},
			// tableOption:true
		},





	]

export const modifyFields = [
	{
		"key": "year",
		"label": "年度",
		// type:"FormSelect",
		formOption: {
			rules: ['required'],
			properties: {
				disabled: true,
			},
			span: 24,
		}
	},
	{
		"key": "id",
		"type": "FormHide",
		formOption: {
			rules: ['required'],
			properties: {
				disabled: true,
			},
			span: 24,
		}
	},
	{
		key: 'projectName',
		label: '项目名称',
		formOption: {
			rules: ['required'],
			span: 24,
			properties: {
				disabled: true,
			},
		}
	},
	{
		"key": "buildingArea",
		"label": "年度计划总体面积",
		type: 'FormDecimalNumber',
		formOption: {
			rules: ['required'],
			span: 24,
			append: '㎡'
		}
	},
	{
		"key": "buildingGreenArea",
		"label": "年度计划绿地面积",
		type: 'FormDecimalNumber',
		formOption: {
			rules: ['required'],
			span: 24,
			append: '㎡'
		}
	},
	{
		"key": "buildingWaterArea",
		"label": "年度计划水体面积",
		type: 'FormDecimalNumber',
		formOption: {
			rules: ['required'],
			span: 24,
			append: '㎡'
		}
	},
	{
		"key": "buildingMoney",
		"label": "年度投资预算",
		type: 'FormDecimalNumber',
		formOption: {
			rules: ['required'],
			span: 24,
			append: '元'
		}
	},


]