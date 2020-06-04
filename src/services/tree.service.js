import _ from 'lodash'

const treeService = {
  _initSensorParameterData: function (entity, selectedNodes) {
    let that = this
    let childrenPresent = (entity.type !== 'Sensor' && entity.entities && _.size(entity.entities)) > 0
    let isEntitySelected = _.find(selectedNodes, (node) => {
      return (node.id === entity.id) && (node.type === entity.type)
    })

    if (childrenPresent) {
      _.map(entity.entities, function (childEntity) {
        return that._initSensorParameterData(childEntity, selectedNodes)
      })

      return _.assign(entity, {
        options: {
          label: entity.name,
          classes: [entity.type],
          expanded: true,
          selected: isEntitySelected ? true : false,
          hoverOptions: this._hoverOptions(entity.type),
          visible: true,
          selectable: entity.type !== 'Organisation',
          icon: this._entityTypeIcon(entity.type)
        }
      })
    } else {
      return _.assign(entity, {
        options: {
          label: entity.name,
          classes: [entity.type],
          selected: isEntitySelected ? true:  false,
          hoverOptions: this._hoverOptions(entity.type),
          visible: true,
          selectable: entity.type !== 'Organisation',
          icon: this._entityTypeIcon(entity.type)
        }
      })
    }
  },

  _initAssetPropertyData: function (entity) {
    let that = this
    let isAssetType = entity.type === 'Asset'
    let childrenPresent = (entity.type !== 'Sensor' && entity.entities && _.size(entity.entities)) > 0
    if (childrenPresent && !isAssetType) {
      return _.assign(entity, {
        options: {
          label: entity.name,
          classes: [entity.type],
          expanded: true,
          selected: false,
          hoverOptions: this._hoverOptions(entity.type),
          visible: true,
          selectable: (entity.type !== 'Organisation') && (entity.type !== 'Sensor')
        }
      },
      {
        children: _.map(entity.entities, function (childEntity) {
          return that._initAssetPropertyData(childEntity)
        })
      })
    } else if (childrenPresent && isAssetType) {
      let that = this
      return _.assign(entity, {
        options: {
          label: entity.name,
          classes: [entity.type],
          expanded: true,
          selected: false,
          hoverOptions: this._hoverOptions(entity.type),
          visible: true,
          selectable: true
        }
      },
      {
        children: _.map(entity.properties, function (property) {
          return _.assign((property, {
            options: {
              label: property,
              classes: ['Parameter'],
              selected: false,
              hoverOptions: that._hoverOptions('Parameter'),
              visible: true,
              selectable: false
            }
          }))
        })
      })
    }
  },

  _hoverOptions (type) {
    let hoverOptions = {
      sibling: false,
      child: false
    }

    switch (type) {
      case 'Project':
        hoverOptions = _.merge(hoverOptions, { child: true })
        break
      case 'Asset':
        hoverOptions = _.merge(hoverOptions, { sibling: true, child: true })
        break
      case 'Sensor':
        hoverOptions = _.merge(hoverOptions, { sibling: true })
        break
    }

    return hoverOptions
  },

  _entityTypeIcon (type) {
    let icon = ''
    switch (type) {
      case 'Organisation':
        icon = '/assets/img/mads-common-icons.svg#globe'
        break
      case 'Project':
        icon = '/assets/img/mads-role-manager-icons.svg#projects'
        break
      case 'Asset':
        icon = '/assets/img/mads-entity-manager-icons.svg#assets'
        break
      case 'Sensor':
        icon = '/assets/img/mads-entity-manager-icons.svg#sensors'
        break
    }

    return icon
  },

  initData: function (entity, type = 'sensor-parameter', selectedNodes) {
    if (type === 'sensor-parameter') {
      return this._initSensorParameterData(entity, selectedNodes)
    } else {
      return this._initAssetPropertyData(entity)
    }
  },

  initOptions: function (options = {}) {
    return _.merge({
      childrenKey: 'entities',
      selectable: false,
      showHoverOptions: false,
      singleSelect: false
    }, options)
  }
}

export default treeService
