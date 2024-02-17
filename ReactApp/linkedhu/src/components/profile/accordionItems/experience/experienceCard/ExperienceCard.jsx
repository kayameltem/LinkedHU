import React from 'react'
import { Card } from 'react-bootstrap';
import ExperienceModal from './ExperienceModal';

const ExperienceCard = () => {
    return (
        <div>
          <Card>
            <Card.Body className="d-flex  align-items-center row-lg-3 justify-content-center">
              <ExperienceModal />
            </Card.Body>
          </Card>
        </div>
      );
    };

export default ExperienceCard