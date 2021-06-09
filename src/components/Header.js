import PropTypes from 'prop-types';
import Button from './Button'
const Header = ({title, showAddTaskForm, showAdd}) => {
  
    //  console.log(showAddTaskForm.showAddTask)
  
   return (
     <header className='header'>
       {/* add css inline style */}
       {/* <h1 style={headingStyle}> {title} </h1> */}
       <h1 > {title} </h1>
       <Button onClick={showAddTaskForm} color={showAdd ?'red': 'green'} text={showAdd ? 'Close' : 'Add'} />
       {/* <Button color='red' text='red' />
       <Button color='black' text='black' /> */}
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
 