import React, { useState, useContext, useEffect, useCallback } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Col, Row } from 'react-bootstrap';
import servicesEventozz from '../../services/events';

export const EventDetails = ({ eventzz, handleClose }) => {
  const eventId = eventzz.id;

  // const loadEvent = useCallback(async () => {
  //   const accessToken = localStorage.getItem("accessToken");
  //   const response = await servicesEventozz.findEvent({ accessToken, eventId })
  //   console.log(response);
  // }, [eventId])

  useEffect(() => {
    if (eventId) {
      // loadEvent();
    }
  }, [eventId])

  return (
    <Row>
      <Col xs={12}>
        <div className='login-form'>
          <h2>Já sou cliente</h2>


        </div>
      </Col>
    </Row>
  );
};
