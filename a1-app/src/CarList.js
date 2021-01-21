import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './App.css';

class CarList extends Component {

  // Class properties 

  state = { cars: [] };

  url = "https://quiet-cliffs-34687.herokuapp.com/api/cars";

  componentDidMount() {

    // Get all
    fetch(this.url)
      .then(response => {
        // Optional...
        //this.setState({ httpStatusCode: response.status, httpStatusOk: response.ok });
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
        this.setState({ cars: responseData });
        // Optional...
        console.log(responseData);
        //console.log(responseData.data);
      })
      .catch(error => {
        // Handles an error thrown above, as well as network general errors
        console.log(error)
      });

  }

  render() {
    document.title = 'Car list';

    return (
      <div>
        <h4>Car List:</h4>
        <p>
          <Link className='btn btn-default' to='/cars/create'>
            Add a new cars
            </Link>
            </p>
        <table className='table table-striped'>
          <TableHeader />
          <TableBody cars={this.state.cars} />
        </table>
      </div>
    );
  }
}

export default CarList;

const TableHeader = () => {
  return (
    <thead>
      <tr>
        
        <th>Car Make</th>
        <th>Car Model</th>        
        <th>Car year</th>
        <th>country</th>
        <th>color</th>
        <th>VIN</th>
        <th>MSRP</th>
        <th>photo</th>
        <th>purchase Date</th>
        <th>Purchaser's Name</th>
        <th>Purchaser Email'Id</th>
        <th>price Paid</th>

        <th></th>
      </tr>
    </thead>
  );
}

// Function component
// Its purpose is to render the HTML table body element
const TableBody = (props) => {

  // Using the array of objects, create a new array of React elements
  let rows = props.cars.map((car, index) => {
    return (
      <TableRow car={car} key={index} />
    );
  });

  return <tbody>{rows}</tbody>
}

// Function component
// Its purpose is to render a single HTML table row
const TableRow = props => {

  // For coding convenience (below), create a very short variable name
  const u = props.car;

  // Alternative declaration syntax...
  //const { u } = this.props;

  // Render the row
  return (
    <tr>
      <td>{u.CarMake}</td>
      <td>{u.Carmodel}</td>
      <td>{u.Caryear}</td>
      <td>{u.country}</td>
      <td>{u.color}</td>
      <td>{u.VIN}</td>
      <td>{u.MSRP}</td>
      <td>{u.photo}</td>
      <td>{u.purchase_Date}</td>
      <td>{u.Purchaser_name}</td>
      <td>{u.Purchase_Email_address}</td>
      <td>{u.Price_paid}</td>
     
      <td><Link className='btn btn-default' to={`/cars/detail/${u._id}`}>Details</Link>&nbsp;&nbsp;
            <Link className='btn btn-warning' to={`/cars/edit/${u._id}`}>Edit</Link>&nbsp;&nbsp;
            <Link className='btn btn-danger' to={`/cars/delete/${u._id}`}>Delete</Link></td>
    </tr>
  );
}
