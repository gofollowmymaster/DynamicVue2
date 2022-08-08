import formTypeActionMap from '../components/formItems/formTypeActionMap'

export const presetRules = {
    required: {
        message: '请[action][label]',
        trigger: 'change',
        required: true
    },
    email: {
        type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']
    },
    url: { type: 'url', message: '请输入正确的网址', trigger: ['blur', 'change'] },
    integer: { type: 'integer', message: '请输入正确的[label]', trigger: ['blur', 'change'] },
    regexp: { type: 'regexp', message: '请[action]正确的[label]', trigger: ['blur', 'change'] },
    customRegexp: {
        validator: (rule, value, callback) => {
            if (!rule.regexp.test(value)) {
                callback(new Error(rule.message))
                return
            }
            callback()
        },
        message: '请[action]正确的[label]',
        trigger: ['blur', 'change']
    }

}

export function getRule(rule, formItemType, label) {
    if (typeof rule === 'string') {
        const ruleObj = presetRules[rule]
        return { ...ruleObj, message: buildErrorMessage(ruleObj.message, formTypeActionMap[formItemType], label) }
    }
    if (rule instanceof RegExp) {
        const ruleObj = presetRules.customRegexp
        return { ...ruleObj, regexp: rule, message: buildErrorMessage(ruleObj.message, formTypeActionMap[formItemType], label) }
    }
    if (typeof rule === 'object') {
        return rule
    }

    return { validator: rule, trigger: 'blur', required: true }
}

function buildErrorMessage(template, action = '完善', label) {
    template = template.replace(/\[label\]/, label)
    return template.replace(/\[action\]/, action)
}
 
