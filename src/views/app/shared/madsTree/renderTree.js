import _ from 'lodash'

let childrenKey = 'children'

const renderAddSiblingNodeOption = (createElement, node, context, parentNode) => {
  const { listeners } = context
  const clickHandler = listeners['on-add-sibling-node']

  return createElement('div', {
    class: {
      'add-sibling-node-container': true
    }
  }, [
    createElement('div', {
      class: {
        'add-sibling-node': true
      },
      on: {
        click: e => clickHandler && clickHandler(e, { node: node, parentNode: parentNode })
      }
    }, [
      createElement(
        'svg',
        {
          class: {
            'icon': true
          }
        },
        [
          createElement(
            'use',
            {
              attrs: {
                'xlink:href': '/assets/img/mads-common-icons.svg#plus'
              }
            }
          )
        ]
      ),
      createElement('span', 'Sibling Entity'),
      createElement('div', {
        class: {
          'arrow-left': true
        }
      })
    ])
  ])
}

const renderAddChildNodeOption = (createElement, node, context, parentNode) => {
  const { listeners } = context
  const clickHandler = listeners['on-add-child-node']

  return createElement('div', {
    class: {
      'add-child-node-container': true
    }
  }, [
    createElement('div', {
      class: {
        'add-child-node': true
      },
      on: {
        click: e => clickHandler && clickHandler(e, { node: node, parentNode: parentNode })
      }
    }, [
      createElement(
        'svg',
        {
          class: {
            'icon': true
          }
        },
        [
          createElement(
            'use',
            {
              attrs: {
                'xlink:href': '/assets/img/mads-common-icons.svg#plus'
              }
            }
          )
        ]
      ),
      createElement('span', 'Child Entity'),
      createElement('div', {
        class: {
          'arrow-up': true
        }
      })
    ])
  ])
}

const getCollapseExpandIcon = (node, context) => {
  const { props } = context
  const { treeView } = props

  if (treeView === 'file') {
    return node.options.expanded ? 'minus' : 'plus'
  } else {
    return 'collapse-expand'
  }
}

const renderCollapsExpandIcon = (createElement, node, context) => {
  const { listeners } = context

  const clickHandler = listeners['on-expand-collapse-click']

  let icon = getCollapseExpandIcon(node, context)

  return createElement(
    'div', {
      class: {
        'icon-container': true
      },
      on: {
        click: e => clickHandler && clickHandler(e, node)
      }
    },
    [
      createElement(
        'svg',
        {
          class: {
            'icon': true,
            'expanded': node.options ? node.options.expanded : false,
            'collapsed': node.options ? !node.options.expanded : true
          }
        },
        [
          createElement(
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

const renderNodeCheckBox = (createElement, node, context) => {
  const { listeners, props } = context
  const { options, isAnyNodeChecked } = props
  const { singleSelect } = options

  const changeHandler = listeners['on-node-select']

  return createElement(
    'b-form-checkbox',
    {
      attrs: {
        checked: node.options.selected,
        disabled: singleSelect && isAnyNodeChecked && !node.options.selected
      },
      on: {
        change: e => changeHandler && changeHandler(e, node)
      }
    }
  )
}

const renderNodeLabel = (createElement, node, context, parentNode) => {
  const { listeners, props } = context
  const { options } = props
  const clickHandler = listeners['on-node-click']
  const mouseOverHandler = listeners['on-node-mouse-over']
  const mouseLeaveHandler = listeners['on-node-mouse-leave']
  const dragStartHandler = listeners['on-node-drag-start']

  let isHoverSiblingOption = node.options ? node.options.hoverOptions.sibling : false
  let isHoverChildOption = node.options ? node.options.hoverOptions.child : false

  let children = [
    createElement('span', { class: { 'label': true }, attrs: { draggable: node.type === 'SensorParameter' } },
      [
        createElement('svg', {
          class: {
            'icon': true
          }
        },
        [
          createElement('use', {
            attrs: {
              'xlink:href': node.options.icon
            }
          })
        ]),
        node.options.label
      ])
  ]

  if (options.showHoverOptions) {
    if (isHoverSiblingOption) {
      children = _.concat(children, renderAddSiblingNodeOption(createElement, node, context, parentNode))
    }

    if (isHoverChildOption) {
      children = _.concat(children, renderAddChildNodeOption(createElement, node, context, parentNode))
    }
  }

  return createElement(
    'div',
    {
      class: {
        'tree-node-label': true
      },
      on: {
        click: e => clickHandler && clickHandler(e, { node: node, parentNode: parentNode }),
        mouseover: e => mouseOverHandler && mouseOverHandler(e, { node: node, parentNode: parentNode }),
        mouseleave: e => mouseLeaveHandler && mouseLeaveHandler(e, { node: node, parentNode: parentNode }),
        dragstart: e => dragStartHandler && dragStartHandler(e, { node: node, parentNode: parentNode })
      }
    },
    [
      children
    ]
  )
}

const renderNode = (createElement, node, context, parentNode) => {
  node = _.merge(node, { parentId: parentNode ? parentNode.id : null })

  const { props } = context
  const { options } = props

  let nodeClasses = node.options ? node.options.classes : []

  nodeClasses = _.reduce(nodeClasses, (nodeClassObj, nodeClass) => {
    nodeClassObj[_.lowerCase(nodeClass)] = true
    return nodeClassObj
  }, {})

  let children = [
    renderNodeLabel(createElement, node, context, parentNode)
  ]

  if (node[childrenKey] && _.size(node[childrenKey]) > 0) {
    children = _.concat(
      children,
      renderCollapsExpandIcon(createElement, node, context)
    )
  }

  if (options.selectable && node.options.selectable) {
    children = _.concat(
      renderNodeCheckBox(createElement, node, context),
      children
    )
  }

  return createElement(
    'div', {
      class: _.merge({
        'tree-node': true,
        'leaf': !(node[childrenKey] && _.size(node[childrenKey]) > 0)
      }, nodeClasses)
    },
    children
  )
}

const renderChildren = (createElement, children, context, parentNode) => {
  let branchChildren = _.map(children, (node) => {
    if (node[childrenKey] && node.options.expanded) {
      return createElement(
        'div',
        {
          class: {
            'tree-node-container': true,
            'single': _.size(children) === 1
          }
        },
        [
          renderNode(createElement, node, context, parentNode),
          renderChildren(createElement, node[childrenKey], context, node)
        ]
      )
    } else {
      return createElement(
        'div',
        {
          class: {
            'tree-node-container': true,
            'single': _.size(children) === 1
          }
        },
        [
          renderNode(createElement, node, context, parentNode)
        ]
      )
    }
  })

  return createElement(
    'div',
    {
      class: {
        'tree-node-children': true
      }
    },
    branchChildren
  )
}

const renderTree = (createElement, context) => {
  const { props } = context
  const { data, treeView, options } = props

  childrenKey = options.childrenKey

  if (!_.isEmpty(data)) {
    return createElement(
      'div',
      {
        class: {
          'vue-tree': true,
          [treeView]: true
        }
      },
      [
        renderChildren(createElement, [data], context, null)
      ]
    )
  }
}

export default {
  functional: true,
  render (createElement, context) {
    return renderTree(createElement, context)
  }
}
