import React, { useState, useEffect } from 'react';
import { Row } from 'react-bootstrap';
import { EventCard } from '../EventCard';

export const EventzzContainer = ({ events = [] }) => {
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    setDisplay(true);
  }, []);

  return (
    <>
      {display && (
        <div id="eventozz-to-participate" className='cryptocurrency-platform-area'>
          <div className='container-fluid'>
            <div className='section-title'>
              <h2>Eventozz</h2>
            </div>
            <Row className="box-events">
              {
                events.map(item => {
                  return <EventCard event={item} />
                })
              }
            </Row>
          </div>
        </div>
      )}
    </>
  );
};
