import React from 'react';

function boxModelValueGetter(WrappedComponent) {
    const args = [...arguments];
	
    return class extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				height: 0,
				width: 0,
				borderWidth: 0,
				borderTopWidth: 0,
				borderBottomWidth: 0,
				borderRightWidth: 0,
				borderLeftWidth: 0,
				padding: 0,
				paddingTop: 0,
				paddingBottom: 0,
				paddingRight: 0,
				paddingLeft: 0,
				margin: 0,
				marginTop: 0,
				marginBottom: 0,
				marginRight: 0,
				marginLeft: 0
			};
		}
		
	getStyleObj($el) {
        const styleObj = window.getComputedStyle($el, null);
			
		return styleObj;
    }
		
    setBoxValueStates($el) {
        const styleObj = this.getStyleObj($el);

        args.forEach(el => {
            if (this.state[el] !== undefined) {
                this.setState({
                [el]: styleObj[el]
            });
            }
            
            else {
                console.error(`${el} is not a valid argument, please provide valid arguments`);
            }
        });
    }

    componentDidMount() {
      let $el = ReactDOM.findDOMNode(this.wrappedComponent);
      this.setBoxValueStates($el);
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
					boxValues={this.state}
          ref={el => (this.wrappedComponent = el)}
        />
      );
    }
  };
}

export default boxModelValueGetter;