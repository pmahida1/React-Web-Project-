import moment from 'moment';
import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import './App.css';

class UserEdit extends Component {

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Class properties 

  state = { car: {}, CarMake: '', Carmodel: '', Caryear:  '', country: '', color: '', VIN: '', MSRP:'' , photo: '', purchase_Date: '', Purchaser_name: '', Purchase_Email_address: '', Price_paid: '0000' };


  url = `https://quiet-cliffs-34687.herokuapp.com/api/cars/${this.props.id}`;

  handleChange(e) {
   // if (e.target.name === 'price_paid') {
        //let priceInput = e.target.value;

        //allow user to enter prices as $###, $###.##, ###, ###.##
        //0 or 1 dollar sign Followed by any number of digits Followed by 0 or 1 . or Followed by 0 or 2
   // }

    this.setState({ [e.target.name]: e.target.value });
}

  componentDidMount() {

    // Get one
    fetch(this.url)
      .then(response => {
        // Optional...
        this.setState({ httpStatusCode: response.status, httpStatusOk: response.ok });
        if (response.ok) {
          // Parse the response body as JSON
          return response.json();
        } else if (response.status === 404) {
          // Not found 
          throw Error('HTTP 404, Not found');
        } else {
          // Some other situation
          throw Error(`HTTP ${response.status}, ${response.statusText}`);
        }
      })
      .then(responseData => {
        // "responseData" is an object; here, we're interested in its "data" property
        // Study the shape of the data in the reqres.in service
        this.setState({ car: responseData });
        // Optional...
        //console.log(responseData.data);
      })
      .catch(error => {
        // Handles an error thrown above, as well as network general errors
        console.log(error)
      });

  }

  handleSubmit(e) {
    // For coding convenience
    const newCar = { '_id': this.state.car._id,'CarMake': this.state.car.CarMake,  'CarModel': this.state.car.Carmodel,  
    'Caryear': this.state.car.Caryear,  'country': this.state.country,  'color': this.state.car.color,  'VIN': this.state.car.VIN,  
    'MSRP': this.state.car.MSRP,  'photo': this.state.car.photo, 'purchase_Date': moment(new Date()), 
    'Purchaser_name': this.state.Purchaser_name, 'Purchase_Email_address': this.state.Purchase_Email_address, 
    'Price_paid': this.state.Price_paid};

    // Edit existing
    fetch(this.url, {
      method: 'PUT',
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
        this.props.history.push(`/cars/detail/${this.props.id}`);
      })
      .catch(error => {
        // Handles an error thrown above, as well as network general errors
        console.log(error)
      });

  }

  render() {
    document.title = `Car ${this.props.id} edit`;

    // Determine the button state
    //const isDisabled =  this.state.country.length === 0 ||this.state.Purchaser_name.length === 0 ||
     //this.state.Purchase_Email_address.length === 0 || this.state.Price_paid.length === 0 ;

    // For coding convenience, create a shortcut object
    const u = this.state.car;
    if (this.input && this.state.country.length === 0 &&
      this.state.purchaser_name.length === 0 && 
      this.state.purchaser_email.length === 0 &&
      this.state.price_paid.length === 0) {
this.input.focus();
}
   
    //data has been formated so it has  old data to edit
    return (
      <div>
        <h4>Edit car {u.CarMake} {u.Carmodel} from the reqres.in service</h4>

        {this.state.httpStatusOk ? (
          <div className="form-horizontal">
            <p>Edit car data, and click/tap the Save button</p>
            <hr />
          
<div className="form-group">
            <label htmlFor="country" className='control-label col-md-2'>country</label>

            <div className="col-md-6">
              <input name="country" value={u.country} className="form-control" onChange={this.handleChange} />
            </div>
          </div>

<div className="form-group">
            <label htmlFor="Purchaser_name" className='control-label col-md-2'>Purchaser name</label>
            <div className="col-md-6">
              <input name="Purchaser_name" value={u.Purchaser_name} className="form-control" onChange={this.handleChange} />
            </div>
          </div>
<div className="form-group">
            <label htmlFor="Purchase_Email_address" className='control-label col-md-2'>Purchase Email address</label>
            <div className="col-md-6">
              <input name="Purchase_Email_address" value={u.Purchase_Email_address} className="form-control" onChange={this.handleChange} />
            </div>
          </div>
<div className="form-group">
            <label htmlFor="Price_paid" className='control-label col-md-2'>price paid</label>
            <div className="col-md-6">
              <input name="Price_paid" value={u.Price_paid} className="form-control" onChange={this.handleChange} />
            </div>
          </div>
            <div className="form-group">
              <div className="col-md-offset-2 col-md-6">
                <button onClick={this.handleSubmit} className="btn btn-primary">Save</button>&nbsp;&nbsp;
                <Link className='btn btn-default' to='/users'>Cancel</Link>
              </div>

            </div>
          </div>

        ) : (
            <div>
              <p>Requested user with identifier {this.props.id} was not found</p>
              <hr />
              <p><Link className='btn btn-default' to='/cars'>Show list of users</Link></p>
            </div>
          )}

      </div>
    );
  }
}

export default withRouter(UserEdit);
