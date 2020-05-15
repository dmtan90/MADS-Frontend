import _ from 'lodash'

const renderCollapsExpandIcon = (h, node, context) => {
  const { listeners } = context
  const clickHandler = listeners['on-expand-collapse-click']

  let icon = node.expanded ? 'collapse-expand' : 'collapse-expand'

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
            'expanded': node.expanded,
            'collapsed': !node.expanded
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

const renderAddSiblingNodeOption = (h, node, context) => {
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
        click: e => clickHandler && clickHandler(e, node)
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

const renderAddChildNodeOption = (h, node, context) => {
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
        click: e => clickHandler && clickHandler(e, node)
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

const renderLeafNodeLabel = (h, node, context) => {
  let isSensorTypeNode = (node.type === 'Sensor')

  let children = [
    h('span', node.label),
    renderAddSiblingNodeOption(h, node, context)
  ]

  if (!isSensorTypeNode) {
    children = _.concat(children, renderAddChildNodeOption(h, node, context))
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
        }
      }, children)
    ]
  )
}

const renderNodeLabel = (h, node, context) => {
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
        }
      }, [
        h('span', node.label),
        renderAddSiblingNodeOption(h, node, context),
        renderAddChildNodeOption(h, node, context)
      ]),
      renderCollapsExpandIcon(h, node, context)
    ]
  )
}

const renderLeafNode = (h, node, context) => {
  let nodeClasses = node.classes

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
      renderLeafNodeLabel(h, node, context)
    ]
  )
}

const renderNode = (h, node, context) => {
  let nodeClasses = node.classes

  nodeClasses = _.reduce(nodeClasses, (nodeClassObj, nodeClass) => {
    nodeClassObj[_.lowerCase(nodeClass)] = true
    return nodeClassObj
  }, {})

  return h(
    'div',
    {
      class: _.merge({
        'tree-node': true,
        'expanded': node.expanded,
        'collapsed': !node.expanded
      }, nodeClasses)
    },
    [
      renderNodeLabel(h, node, context),
      h(
        'div',
        {
          class: {
            'tree-node-children': true
          }
        },
        renderChildren(h, node.children, context)
      )
    ]
  )
}

const renderChildren = (h, children, context) => {
  return _.map(children, (node) => {
    let isLeafNode = node.isLeaf

    if (isLeafNode) {
      return renderLeafNode(h, node, context)
    } else {
      return renderNode(h, node, context)
    }
  })
}

export default {
  functional: true,
  render (createElement, context) {
    const { props } = context
    return renderNode(createElement, props.data, context)
  }
}
