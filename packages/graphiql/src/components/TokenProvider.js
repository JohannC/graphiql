/**
 *  Copyright (c) 2019 GraphQL Contributors.
 *
 *  This source code is licensed under the MIT license found in the
 *  LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';

/**
 * TokenProvider
 *
 * What a nice round shiny toggle button and a little input text to insert a bearer token inside your GraphQL Request.
 */
export class TokenProvider extends React.Component {
  static propTypes = {
    addToken: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.state={addToken: !!props.addToken};
  }

  render() {
    let tokenInput;
    let switchActionName;
    if (!this.state.addToken){
        switchActionName = <div className="switch-action-name">Add Bearer Token</div>
    } else {
        switchActionName =<div className="switch-action-name">Token</div>
        tokenInput = <input type="text" name="token"/>
    }

    return (
      <div className="toolbar">
        <label className="switch">
          <input type="checkbox" onClick={this._onClick}/>
          <span className="slider round"></span>
        </label>
        {switchActionName}
        {tokenInput}
      </div>
    );
  }

  _onClick = () => {
    this.setState({addToken: !this.state.addToken})
  };

  _onOptionSelected = operation => {
    this.setState({ optionsOpen: false });
    this.props.onRun(operation.name && operation.name.value);
  };

  _onOptionsOpen = downEvent => {
    let initialPress = true;
    const downTarget = downEvent.target;
    this.setState({ highlight: null, optionsOpen: true });

    let onMouseUp = upEvent => {
      if (initialPress && upEvent.target === downTarget) {
        initialPress = false;
      } else {
        document.removeEventListener('mouseup', onMouseUp);
        onMouseUp = null;
        const isOptionsMenuClicked =
          downTarget.parentNode.compareDocumentPosition(upEvent.target) &
          Node.DOCUMENT_POSITION_CONTAINED_BY;
        if (!isOptionsMenuClicked) {
          // menu calls setState if it was clicked
          this.setState({ optionsOpen: false });
        }
      }
    };

    document.addEventListener('mouseup', onMouseUp);
  };
}
