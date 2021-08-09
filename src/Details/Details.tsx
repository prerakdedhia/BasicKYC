
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../app/store';
import { IDetailsState } from '../kycSlice';

interface IProps { state: RootState }
class Details extends Component<IProps, IDetailsState> {


  render() {

    return (
      <div style={{ display: "flex",justifyContent:'center',alignItems:'center' }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px", padding: "30px" }} className="main">
        <h1>KYC Details</h1>
        <label>Customer Name: {this.props.state.kyc.data.customerName}</label>
        <label>Aadhar Number: {this.props.state.kyc.data.aadharNumber}</label>
        <label>Aadhar Card Front Image</label>
        <img src={`${this.props.state.kyc.data.aadharFrontImage}`} alt="Aadhar Card Front Image" height="200" width="200" />
        <label>Aadhar Card Back Image</label>
        <img src={`${this.props.state.kyc.data.aadharBackImage}`} alt="Aadhar Car Back Image" height="200" width="200" />

        </div>
        </div>
    );
  }
}
function mapStateToProps(state: RootState) {

  return { state: state }
}

export default connect(mapStateToProps, {})(Details);


