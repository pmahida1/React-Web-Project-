import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import './App.css';

class UserCreate extends Component {

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = { CarMake: '',
  Carmodel: '',
  Caryear: '',
  country: '',
  color: '',
  VIN: '',
  MSRP: '',
  photo: '',
  purchase_Date: '',
  Purchaser_name: '',
  Purchase_Email_address: '',
  Price_paid:''  
          };

  url = "https://quiet-cliffs-34687.herokuapp.com/api/cars";

  handleChange(e) {
    // https://medium.com/@tmkelly28/handling-multiple-form-inputs-in-react-c5eb83755d15
    // Bottom line, new ES6 feature, bracket notation, computed property names
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#Computed_property_names
    this.setState({ [e.target.name]: e.target.value });
    //console.log(`Name: ${this.state.name}, Job: ${this.state.job}`);

    // Can also do data validation in here
  }

  componentDidMount() {
    this.input.focus();
  }

  handleSubmit(e) {

    // Turn off default form handling
    //e.preventDefault();

    const newCar = {'carmake': this.state.CarMake,  'carmodel': this.state.Carmodel,  'caryear': this.state.Caryear,  'country': this.state.country,  'color': this.state.color,  'VIN': this.state.VIN,  'MSRP': this.state.MSRP,  'photo': this.state.photo, 'purchase_date': this.state.purchase_Date, 'Purchaser_name': this.state.Purchaser_name, 'Purchase email id': this.state.Purchase_Email_address, 'price Paid': this.state.Price_paid};

    fetch(this.url, {
      method: 'POST',
      headers: { "Content-Type": 'application/json' },
      body: JSON.stringify(newCar)
    })
      .then(response => {
        if (response.ok) {
          // Parse the response body as JSON
          return response.json();
        } else if (response.status >= 400 && response.status < 500) {
          // Error caused by the requestor
          throw Error(`HTTP ${response.status}, ${response.statusText}`);
        } else {
          // Some other situation
          throw Error(`HTTP ${response.status}, ${response.statusText}`);
        }
      })
      .then(responseData => {
        // "responseData" is an object
        // Study the shape of the data in the reqres.in service
        // Optional...
        console.log(responseData);
        // The identifier "id" can be used to redirect
        this.props.history.push(`/cars/detail/${responseData._id}`);
      })
      .catch(error => {
        // Handles an error thrown above, as well as network general errors
        console.log(error)
      });

  }

  render() {
    document.title = 'Add car';

    // Determine the button state
    const isDisabled = false;//this.state.name.length === 0 || this.state.job.length === 0;

    return (
      <div>
        <h4>Add a new car to the reqres.in service</h4>
        {/* <form onSubmit={this.handleSubmit}> */}
        <div className="form-horizontal">
          <p>Enter new car data, and click/tap the Add User button</p>
          <hr />
          <div className="form-group">
            <label htmlFor="carmake" className='control-label col-md-2'>CarMake</label>
            <div className="col-md-6">
              <input name="carMake" className="form-control" ref={(i) => { this.input = i; }} onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="carmodel" className='control-label col-md-2'>carmodel</label>
            <div className="col-md-6">
              <input name="carmodel" className="form-control" onChange={this.handleChange} />
            </div>
          </div>
<div className="form-group">
            <label htmlFor="caryear" className='control-label col-md-2'>caryear</label>
            <div className="col-md-6">
              <input name="caryear" className="form-control" onChange={this.handleChange} />
            </div>
          </div>
<div className="form-group">
            <label htmlFor="country" className='control-label col-md-2'>country</label>
            <div className="col-md-6">
              <input name="country" className="form-control" onChange={this.handleChange} />
            </div>
          </div>
<div className="form-group">
            <label htmlFor="color" className='control-label col-md-2'>color</label>
            <div className="col-md-6">
              <input name="color" className="form-control" onChange={this.handleChange} />
            </div>
          </div>
<div className="form-group">
            <label htmlFor="VIN" className='control-label col-md-2'>VIN</label>
            <div className="col-md-6">
              <input name="VIN" className="form-control" onChange={this.handleChange} />
            </div>
          </div>

<div className="form-group">
            <label htmlFor="MSRP" className='control-label col-md-2'>MSRP</label>
            <div className="col-md-6">
              <input name="MSRP" className="form-control" onChange={this.handleChange} />
            </div>
          </div>
<div className="form-group">
            <label htmlFor="photo" className='control-label col-md-2'>photo</label>
            <div className="col-md-6">
              <input name="photo" className="form-control" onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group">
          <div className="form-group">  
            <div className="col-md-offset-2 col-md-6">
              <button disabled={isDisabled} onClick={this.handleSubmit} className="btn btn-primary">Add Car</button>&nbsp;&nbsp;
              <Link className='btn btn-default' to='/cars'>Cancel</Link>
            </div>
          </div>
        </div>
        {/* </form> */}
      </div>
      </div>
    );
  }
}

export default withRouter(UserCreate);
