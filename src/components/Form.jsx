import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';

const Form = (props) => {
  return (

    <Row className="show-grid" className="text-center">
    <form onSubmit={(event) => props.handleUserFormSubmit(event)} style={{ color: "rgb(30, 203, 37)" }}><b>
    Username:<span>   </span> </b>
   <label>
     <input
       className="form-control"
       name="username"
       type="text"
       placeholder="Username"
       required
       value={props.formData.username}
       onChange={props.handleFormChange}
     />
   </label>
   <span>   </span>
     <input
       type="submit"
       value="Submit"
       className="btn btn-primary"
     />

</form>
</Row>
)};
export default Form;