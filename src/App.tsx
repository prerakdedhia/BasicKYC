import React, { Component } from 'react';
import { connect } from 'react-redux';
import { historyInstance } from '.';
import './App.css';
import {
  sendKycData,
} from './kycSlice';

export interface IState { customerName: string, aadharNumber: number, aadharFrontImage: string, aadharBackImage: string, disableSubmit: boolean, errorMessage: string }
interface IAction { sendKycData: (data: IState) => void }
class App extends Component<IAction, IState> {

  defaultState = {
    aadharBackImage: '',
    aadharFrontImage: '',
    aadharNumber: 0,
    customerName: '',
    disableSubmit: true,
    errorMessage: ''
  }

  constructor(props: IAction) {
    super(props)
    this.state = this.defaultState;
  }

  aadharImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { files } = event.target;
    const localImageUrl = files !== null ? URL.createObjectURL(files[0]) : undefined;

    const filePath = files !== null ? files[0].name : '';

    // Allowing file type
    var allowedExtensions =
      /(\.jpg|\.jpeg|\.png)$/i;

    if (!allowedExtensions.exec(filePath)) {
      this.setState({ errorMessage: "Invalid file type. Please upload file with appropriate file type." }, () => { alert(this.state.errorMessage); this.validateData()} );
    }
    else
      this.setState({ [event.target.name]: localImageUrl, errorMessage: '' } as unknown as Pick<IState, keyof IState>, () => this.validateData());
  }

  onCustomerNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let aadharName = event.target.value;
    if (aadharName)
      this.setState({ customerName: event.target.value, errorMessage: '' }, () => this.validateData());
    else
      this.setState({ customerName: event.target.value, errorMessage: 'Please enter a valid Full name' }, () => { alert(this.state.errorMessage); this.validateData()} );
  }

  onAadharNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let aadharNumber = event.target.value;
    var regCheck = new RegExp('^[0-9]{12}$');
    if (regCheck.test(aadharNumber))
      this.setState({ aadharNumber: parseInt(aadharNumber), errorMessage: '' }, () => this.validateData());
    else
      this.setState({ errorMessage: "Please enter a valid 12 digit aadhar number only." }, () => { alert(this.state.errorMessage); this.validateData()} );
  }

  validateData() {
    if (this.state.errorMessage === '' && !(this.state.aadharFrontImage === '') && !(this.state.aadharBackImage === '' ))
      this.setState({ disableSubmit: false });
    else {
      this.setState({ disableSubmit: true });
    }
  }

  render() {

    return (
      <div style={{ display: "flex",justifyContent:'center',alignItems:'center' }}>
      <div className="main">
        <h1>KYC</h1>
        <form style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <label htmlFor="customerName">Customer Name</label>
          <input type="text" name="customerName" id="customerName" onBlur={this.onCustomerNameChange} placeholder="Please enter your Full name" />
          <label htmlFor="aadharNo">Aadhar Card Number</label>
          <input type="text" name="aadharNo" id="aadharNo" onBlur={this.onAadharNumberChange} placeholder="Please enter Aadhar card number" />
          <label htmlFor="aadharFrontImage">Aadhar Card Front Image</label>
          <input type="file" accept="image/*" name="aadharFrontImage" id="aadharFrontImage" onChange={this.aadharImageChange} />
          <label htmlFor="aadharBackImage">Aadhar Card Back Image</label>
          <input type="file" accept="image/*" name="aadharBackImage" id="aadharBackImage" onChange={this.aadharImageChange} />
          <button disabled={this.state.disableSubmit}
            onClick={(e) => {
              e.preventDefault()
              this.props.sendKycData(this.state)
              historyInstance.push("/details")
            }}>Submit</button>
          <label>
            <strong>Note:</strong>
            <ul>
              <li>Please enter Full name as per Aadhar card.</li>
              <li>Please enter only 12 digit Aadhar number.</li>
              <li>Upload file with file type as ".jpg", ".jpeg", ".png" only.</li>
            </ul>
          </label>
        </form>
        </div>
        </div>
    );
  }
}

export default connect(null, { sendKycData })(App);
