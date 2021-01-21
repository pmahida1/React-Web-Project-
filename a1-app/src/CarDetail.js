import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './App.css';

class CarDetail extends Component {

  // Class properties 

  state = { car: {}, httpStatusCode: 0, httpStatusOk: false };

  url = `https://quiet-cliffs-34687.herokuapp.com/api/cars/${this.props.id}`;

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

  render() {
    document.title = `Car ${this.props.id} detail`;

    // For coding convenience, create a shortcut object
    const u = this.state.car;
    console.log(u.CarMake);
    console.log(u.Carmodel);
    console.log(u.Caryear);
    return (
      <div>
        <h4>Detail about car {u.CarMake} {u.Carmodel} from the reqres.in service</h4>

        {/* <p>HTTP response status code was {this.state.httpStatusCode}</p> */}
        {this.state.httpStatusOk ? (
          <div className="row">
            <div className="col-md-6">
              <dl className="dl-horizontal">
               <dt>Identifier</dt><dd>{u._id}</dd>
                <dt>Car Make</dt><dd>{u.CarMake}</dd>
                <dt>Car Model</dt><dd>{u.Carmodel}</dd>                      
                <dt>Car year</dt><dd>{u.Caryear}</dd>                      
  <dt>country</dt><dd>{u.country}</dd>
  <dt>color</dt><dd>{u.color}</dd>
  <dt>VIN</dt><dd>{u.VIN}</dd>
  <dt>MSRP</dt><dd>{u.MSRP}</dd>
  <dt>photo</dt><dd>{u.photo}</dd>
  <dt>purchase Date</dt><dd>{u.purchase_Date}</dd>
  <dt>Purchaser's Name</dt><dd>{u.Purchaser_name}</dd>
  <dt>Purchaser Email'Id</dt><dd>{u.Purchase_Email_address}</dd>
  <dt>pricePaid</dt><dd>{u.Price_paid}</dd>
              </dl>
            </div>
            
          </div>

        ) : (
          <p>Requested car was not found</p>
          )}

        <hr />
        <p><Link className='btn btn-warning' to={`/cars/edit/${u._id}`}>Edit</Link>&nbsp;&nbsp;
        <Link className='btn btn-default' to='/cars'>Show list of cars</Link></p>
      </div>
    );
  }
}

export default CarDetail;
