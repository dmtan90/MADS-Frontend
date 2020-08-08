import _ from 'lodash'

const treeService = {
  _initSensorParameterData: function (entity, selectedNodes, hiddenEntities, selectableEntities, editingEntity) {
    let that = this
    let leafEntityType = _.includes(hiddenEntities, 'SensorParameter') ? 'Sensor' : 'SensorParameter'
    let childrenPresent = (entity.type !== leafEntityType && entity.entities && _.size(entity.entities)) > 0
    let isEntitySelected = _.find(selectedNodes, (node) => {
      return (node.id === entity.id || node.id === entity.uuid) && (_.toLower(node.type) === _.toLower(entity.type))
    })

    let isSelectable = _.includes(selectableEntities, entity.type) &&
      !(editingEntity && editingEntity.id === entity.id && editingEntity.type === entity.type)

    if (childrenPresent) {
      _.map(entity.entities, function (childEntity) {
        return that._initSensorParameterData(childEntity, selectedNodes, hiddenEntities, selectableEntities, editingEntity)
      })

      return _.assign(entity, {
        options: {
          label: entity.name,
          classes: [entity.type],
          expanded: true,
          selected: isEntitySelected ? true : false,
          hoverOptions: this._hoverOptions(entity.type),
          visible: true,
          selectable: isSelectable,
          icon: this._entityTypeIcon(entity.type),
          isLeafNode: false
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
          selectable: isSelectable,
          icon: this._entityTypeIcon(entity.type),
          isLeafNode: true
        },
        entities: []
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
      case 'SensorParameter':
        icon = '/assets/img/mads-common-icons.svg#sensor-parameter'
        break
    }

    return icon
  },

  initData: function (entity, options) {
    return this._initSensorParameterData(entity, options.selectedNodes, options.hiddenEntities, options.selectableEntities, options.editingEntity)
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
