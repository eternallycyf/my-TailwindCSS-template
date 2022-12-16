import React from 'react';
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom';


const About = props => {
  let navigate = useNavigate()

  return (
    <>
      <Button onClick={() => navigate('/login')}>to login</Button>
    </>
  )
}
export default About