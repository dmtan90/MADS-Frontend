import _ from 'lodash'

const canvasService = {

  graphObject: null,
  components: [],

  traverseGraph: function (node, index) {
    this.visitedNodes[node.id] = true
    this.components[index] = _.concat(this.components[index], node)

    _.forEach(this.nodeLinks[node.id], (link) => {
      let linkTargetId = link.target.id
      let linkTarget = this.graphObject[linkTargetId]

      this.traverseGraph(linkTarget, index)
    })
  },

  findGraphConnectedComponents: function (graphObject) {
    this.graphObject = graphObject
    this.components = []

    this.nodeLinks = {}
    this.visitedNodes = {}

    _.forEach(graphObject, (cell) => {
      if (cell.type !== 'link') {
        this.nodeLinks[cell.id] = []
        this.visitedNodes[cell.id] = false
      }
    })

    _.forEach(graphObject, (cell) => {
      if (cell.type === 'link') {
        let linkSourceId = cell.source.id
        this.nodeLinks[linkSourceId] = _.concat(this.nodeLinks[linkSourceId], cell)
      }
    })

    _.forEach(graphObject, (cell) => {
      if (cell.entityType === 'input' && !this.visitedNodes[cell.id]) {
        let index = _.size(this.components)
        this.components[index] = []
        this.traverseGraph(cell, index)
      }
    })

    _.forEach(this.components, (component, index) => {
      _.forEach(component, (node) => {
        let links = this.nodeLinks[node.id]
        this.components[index] = _.concat(this.components[index], links)
      })
    })

    return this.components
  }
}

export default canvasService
