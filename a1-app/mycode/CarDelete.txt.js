import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import './App.css';

class CarDelete extends Component {

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = { car: {}, httpStatusCode: 0, httpStatusOk: false };

  url = `https://quiet-cliffs-34687.herokuapp.com/api/cars/${this.props.id}`;

  componentDidMount() {

    // Get the requested object
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

    // Delete
    fetch(this.url, { method: 'DELETE' })
      .then(response => {
        if (response.ok) {
          // Parse the response body as JSON
          return response.status;
        } else if (response.status >= 400 && response.status < 500) {
          // Error caused by the requestor
          throw Error(`HTTP ${response.status}, ${response.statusText}`);
        } else {
          // Some other situation
          throw Error(`HTTP ${response.status}, ${response.statusText}`);
        }
      })
      .then(responseData => {
        // "responseData" is an integer (probably 204)
        // Study the shape of the data in the reqres.in service
        // Optional...
        console.log(responseData);
        // Redirect
        this.props.history.push('/cars');
      })
      .catch(error => {
        // Handles an error thrown above, as well as network general errors
        console.log(error)
      });
  }

  render() {
    document.title = `Delete car ${this.props._id}`;

    // For coding convenience, create a shortcut object
    const u = this.state.car;

    return (
      <div>
        <h4>Delete car {u.CarMake} {u.Carmodel} from the reqres.in service</h4>

        {this.state.httpStatusOk ? (
          <div className="row">
            <div className="col-md-6">
              <dl className="dl-horizontal">
                <dt>Identifier</dt><dd>{u._id}</dd>
                <dt>Car Make</dt><dd>{u.CarMake}</dd>
                <dt>Car Model</dt><dd>{u.Carmodel}</dd> 
                <dt>Car Year</dt><dd>{u.Caryear}</dd>
  <dt>country</dt><dd>{u.country}</dd>
  <dt>color</dt><dd>{u.color}</dd>
  <dt>VIN</dt><dd>{u.VIN}</dd>
  <dt>MSRP</dt><dd>{u.MSRP}</dd>
  <dt>photo</dt><dd>{u.photo}</dd>
  <dt>purchase_date</dt><dd>{u.purchase_Date}</dd>
  <dt>purchaser name</dt><dd>{u.Purchaser_name}</dd>
  <dt>purchase email id</dt><dd>{u.Purchase_Email_address}</dd>
  <dt>price paid</dt><dd>{u.Price_paid}</dd>
                
              </dl>
            </div>
            <div className="col-md-2">
              <img src={u.avatar} alt="" className="img-responsive" />
            </div>
          </div>

        ) : (
            <p>Requested car was not found</p>
          )}

        <hr />
        <p>Confirm that this car should be deleted, or cancel to return to the list of cars</p>
        <p><button onClick={this.handleSubmit} className="btn btn-danger">Confirm delete</button>&nbsp;&nbsp;
        <Link className='btn btn-default' to='/cars'>Cancel</Link></p>
      </div>
    );
  }
}

export default withRouter(CarDelete);
