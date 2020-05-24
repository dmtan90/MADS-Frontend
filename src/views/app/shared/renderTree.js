import _ from 'lodash'

const renderCollapsExpandIcon = (h, node, context) => {
  const { listeners } = context
  const clickHandler = listeners['on-expand-collapse-click']

  let icon = 'collapse-expand'

  return h(
    'div', {
      class: {
        'icon-container': true
      },
      on: {
        click: e => clickHandler && clickHandler(e, node)
      }
    },
    [
      h(
        'svg',
        {
          class: {
            'icon': true,
            'expanded': node.options ? node.options.expanded : false,
            'collapsed': node.options ? !node.options.expanded : true
          }
        },
        [
          h(
            'use',
            {
              attrs: {
                'xlink:href': `/assets/img/mads-common-icons.svg#${icon}`
              }
            }
          )
        ]
      )
    ]
  )
}

const renderAddSiblingNodeOption = (h, node, context, parentNode) => {
  const { listeners } = context
  const clickHandler = listeners['on-add-sibling-entity']

  return h('div', {
    class: {
      'add-sibling-node-container': true
    }
  }, [
    h('div', {
      class: {
        'add-sibling-node': true
      },
      on: {
        click: e => clickHandler && clickHandler(e, { node: node, parentNode: parentNode })
      }
    }, [
      h(
        'svg',
        {
          class: {
            'icon': true
          }
        },
        [
          h(
            'use',
            {
              attrs: {
                'xlink:href': '/assets/img/mads-common-icons.svg#plus'
              }
            }
          )
        ]
      ),
      h('span', 'Sister Entity'),
      h('div', {
        class: {
          'arrow-left': true
        }
      })
    ])
  ])
}

const renderAddChildNodeOption = (h, node, context, parentNode) => {
  const { listeners } = context
  const clickHandler = listeners['on-add-child-entity']

  return h('div', {
    class: {
      'add-child-node-container': true
    }
  }, [
    h('div', {
      class: {
        'add-child-node': true
      },
      on: {
        click: e => clickHandler && clickHandler(e, { node: node, parentNode: parentNode })
      }
    }, [
      h(
        'svg',
        {
          class: {
            'icon': true
          }
        },
        [
          h(
            'use',
            {
              attrs: {
                'xlink:href': '/assets/img/mads-common-icons.svg#plus'
              }
            }
          )
        ]
      ),
      h('span', 'Child Entity'),
      h('div', {
        class: {
          'arrow-up': true
        }
      })
    ])
  ])
}

const renderLeafNodeLabel = (h, node, context, parentNode) => {
  const { listeners } = context
  const clickHandler = listeners['on-node-click']

  let isHoverSiblingOption = node.options ? node.options.hoverOptions.sibling : false
  let isHoverChildOption = node.options ? node.options.hoverOptions.child : false

  let children = [
    h('span', node.options ? node.options.label : '')
  ]

  if (isHoverSiblingOption) {
    children = _.concat(children, renderAddSiblingNodeOption(h, node, context, parentNode))
  }

  if (isHoverChildOption) {
    children = _.concat(children, renderAddChildNodeOption(h, node, context, parentNode))
  }

  return h(
    'div',
    {
      class: {
        'tree-node-label': true
      }
    },
    [
      h('div', {
        class: {
          'tree-node-text': true
        },
        on: {
          click: e => clickHandler && clickHandler(e, { node: node, parentNode: parentNode })
        }
      }, children)
    ]
  )
}

const renderNodeLabel = (h, node, context, parentNode) => {
  const { listeners } = context
  const clickHandler = listeners['on-node-click']

  let isHoverSiblingOption = node.options ? node.options.hoverOptions.sibling : false
  let isHoverChildOption = node.options ? node.options.hoverOptions.child : false

  let children = [
    h('span', node.options ? node.options.label : '')
  ]

  if (isHoverSiblingOption) {
    children = _.concat(children, renderAddSiblingNodeOption(h, node, context, parentNode))
  }

  if (isHoverChildOption) {
    children = _.concat(children, renderAddChildNodeOption(h, node, context, parentNode))
  }

  return h(
    'div',
    {
      class: {
        'tree-node-label': true
      }
    },
    [
      h('div', {
        class: {
          'tree-node-text': true
        },
        on: {
          click: e => clickHandler && clickHandler(e, { node: node, parentNode: parentNode })
        }
      }, children),
      renderCollapsExpandIcon(h, node, context)
    ]
  )
}

const renderLeafNode = (h, node, context, parentNode) => {
  let nodeClasses = node.options ? node.options.classes : []

  nodeClasses = _.reduce(nodeClasses, (nodeClassObj, nodeClass) => {
    nodeClassObj[_.lowerCase(nodeClass)] = true
    return nodeClassObj
  }, {})

  return h(
    'div',
    {
      class: _.merge({
        'tree-node': true,
        'leaf': true
      }, nodeClasses)
    },
    [
      renderLeafNodeLabel(h, node, context, parentNode)
    ]
  )
}

const renderNode = (h, node, context, parentNode = null) => {
  let nodeClasses = node.options ? node.options.classes : []

  nodeClasses = _.reduce(nodeClasses, (nodeClassObj, nodeClass) => {
    nodeClassObj[_.lowerCase(nodeClass)] = true
    return nodeClassObj
  }, {})

  return h(
    'div',
    {
      class: _.merge({
        'tree-node': true,
        'expanded': node.options ? node.options.expanded : false,
        'collapsed': node.options ? !node.options.expanded : true
      }, nodeClasses)
    },
    [
      renderNodeLabel(h, node, context, parentNode),
      h(
        'div',
        {
          class: {
            'tree-node-children': true
          }
        },
        renderChildren(h, node.children, context, node)
      )
    ]
  )
}

const renderChildren = (h, children, context, parentNode) => {
  return _.map(children, (node) => {
    if (node.children) {
      return renderNode(h, node, context, parentNode)
    } else {
      return renderLeafNode(h, node, context, parentNode)
    }
  })
}

export default {
  functional: true,
  render (createElement, context) {
    const { props } = context
    if (!_.isEmpty(props.data)) {
      return renderNode(createElement, props.data, context)
    }
  }
}
