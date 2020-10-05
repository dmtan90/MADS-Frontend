import _ from 'lodash'

const dataTypeMap = {
  'integer': 'number',
  'string': 'text',
  'boolean': 'checkbox',
  'color': 'color'
}

const renderObject = (createElement, context, setting, parentKey, isHeader = false) => {
  const { listeners } = context
  const inputHandler = listeners['on-file-upload']

  let settingsTemplate = _.map((setting.properties), (property) => {
    let key = parentKey + '.' + property.key
    return renderSetting(createElement, context, property, key)
  })

  if (setting.key === 'icon') {
    let fileUploadElement = createElement('b-form-file', {
      class: {
        'setting-input': true,
        [setting.data_type]: true
      },
      on: {
        input: e => inputHandler && inputHandler(e, parentKey + '.text')
      }
    })

    settingsTemplate.unshift(fileUploadElement)
  }

  return createElement('div', {
    class: {
      'settings-wrap': true,
      [setting.data_type]: true
    }
  },
  [
    createElement('div', {
      class: {
        'setting-header': isHeader,
        'header': true
      }
    }, [
      [setting.key]
    ]),
    settingsTemplate
  ])
}

const renderInput = (createElement, context, setting, key) => {
  const { listeners, props } = context
  const { visualProp } = props

  const inputHandler = listeners['on-setting-upate']

  let inputTemplate = ''
  if (setting.data_type !== 'boolean') {
    inputTemplate = createElement('b-form-input', {
      class: {
        'setting-input': true,
        [setting.data_type]: true
      },
      attrs: {
        type: dataTypeMap[setting.data_type],
        value: _.get(visualProp, key)
      },
      on: {
        input: e => inputHandler && inputHandler(e, key)
      }
    })
  } else {
    inputTemplate = createElement('b-form-checkbox', {
      class: {
        'setting-input': true,
        [setting.data_type]: true
      },
      attrs: {
        checked: _.get(visualProp, key)
      }
    })
  }

  return createElement('div', {
    class: {
      'setting': true
    }
  },
  [
    createElement('span', {
      class: {
        'setting-key': true
      }
    }, [
      setting.key
    ]),
    inputTemplate
  ])
}

const renderSetting = (createElement, context, setting, key, isHeader = false) => {
  let settingTemplate = ''
  switch (setting.data_type) {
    case 'list':
    case 'object':
      settingTemplate = renderObject(createElement, context, setting, key, isHeader)
      break
    case 'string':
    case 'integer':
    case 'boolean':
    case 'color':
      settingTemplate = renderInput(createElement, context, setting, key)
      break
  }

  return settingTemplate
}

const settings = (createElement, context) => {
  const { props } = context
  const { settings } = props

  return _.map(settings, (setting) => {
    let key = setting.key
    let settingTemplate = renderSetting(createElement, context, setting, key, true)
    return settingTemplate
  })
}

export default {
  functional: true,
  render (createElement, context) {
    return settings(createElement, context)
  }
}
