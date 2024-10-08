import * as React from 'react'

import PropTypes from 'prop-types'

export default class PortalConsumer extends React.Component {
  constructor(props) {
    super(props)
    this.key = undefined
  }

  async componentDidMount() {
    this.checkManager()
    // Delay updating to prevent React from going to infinite loop
    await Promise.resolve()
    this.key = this.props.manager.mount(this.props.children)
  }

  componentDidUpdate() {
    this.checkManager()
    this.props.manager.update(this.key, this.props.children)
  }

  componentWillUnmount() {
    this.checkManager()
    this.props.manager.unmount(this.key)
  }

  checkManager() {
    if (!this.props.manager) {
      throw new Error('There is no portal manager!')
    }
  }

  render() {
    return null
  }
}

PortalConsumer.propTypes = {
  manager: PropTypes.shape({
    mount: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired,
    unmount: PropTypes.func.isRequired
  }),
  children: PropTypes.node
}
