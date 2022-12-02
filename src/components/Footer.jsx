import React from 'react';
import { Button, Card } from 'react-bootstrap';

const Footer = () => {
    return (
        
    <Card className="text-center">
      
      <Card.Footer >
     <span>Code by || Carlos Bratini</span>
     <br />
     <span><a href="https://www.linkedin.com/in/carlos-bratini-008962246/" target="_blank"><i class='bx bxl-linkedin-square bx-md' ></i></a></span>
     <span><a href="https://github.com/Bratini89" target="_blank"><i class='bx bxl-github bx-md' ></i></a></span>
     </Card.Footer>
      
    </Card>
        
    );
};

export default Footer;