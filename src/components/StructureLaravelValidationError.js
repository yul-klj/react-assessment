import React, { Component } from "react";

const StructureLaravelValidationError = props => {
  const { errors } = props.errorData;

    const errorItems = Object.keys(errors.errors).map( (key, i) => {
      const error = errors.errors[key][0];
      return (
        <li>
          {key}:<br/>
          {error}
        </li>
      )
    })

    return (
      <ul>
        {errorItems}
      </ul>
    )
}

export default StructureLaravelValidationError