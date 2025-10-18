import { Component } from "react";

class DenemeClass extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div style={{ backgroundColor: "orange", padding: "2rem" }}>
        {this.props.isim}
      </div>
    );
  }
}

export default DenemeClass;
