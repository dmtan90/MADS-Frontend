import _ from 'lodash'

const renderWidgets = (createElement, context) => {
  const { props } = context
  const { widgets, isEditMode, layout, colWidth, colHeight } = props

  let widgetsTemplate = _.map(widgets, (widget) => {
    let { x, y, w, h, i } = widget.widget_settings

    return createElement('grid-item', {
      props: {
        x: x,
        y: y,
        w: w,
        h: h,
        i: i
      }
    }, [
      createElement('line-chart', {
        props: {
          visualSettings: widget.visual_properties,
          series: widget.series,
          ref: widget.label,
          width: w,
          height: h,
          colWidth: colWidth,
          colHeight: colHeight
        }
      })
    ])
  })

  return createElement('grid-layout', {
    props: {
      layout: layout,
      'col-num': 12,
      'row-height': 50,
      'is-draggable': true,
      'is-resizable': true,
      'is-mirrored': false,
      'vertical-compact': true,
      'margin': [0, 0],
      'use-css-transforms': true
    }
  }, [
    widgetsTemplate
  ])
}

export default {
  functional: true,
  render (createElement, context) {
    return renderWidgets(createElement, context)
  }
}
