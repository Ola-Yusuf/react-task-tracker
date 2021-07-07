import PropTypes from 'prop-types';
import Button from './Button'
import {useLocation} from 'react-router-dom'

const Header = ({title, showAddTaskForm, showAdd}) => {
  const location = useLocation()
  
   return (
     <header className='header'>
       {/* add css inline style */}
       {/* <h1 style={headingStyle}> {title} </h1> */}
       <h1 > {title} </h1>
       {
          location.pathname === '/' &&
          <Button onClick={showAddTaskForm} color={showAdd ?'red': 'green'} text={showAdd ? 'Close' : 'Add'} />
        }
       
     </header>
   )
 }

 Header.defaultProps = {
   title: 'Task Tracker',
 }
 
 Header.propTypes = {
   title: PropTypes.string.isRequired,
 }

 //css in js
//  const headingStyle = {
//     color: 'red', 
//     backgroundColor:'black',
//  }

 export default Header
 