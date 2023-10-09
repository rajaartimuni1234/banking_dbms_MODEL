import React from 'react';
import Form from './components/Form';
import UsersList from './components/UsersList';

const App = () => {
  return (
    <div>
      <p className=' text-purple-300 bg-slate-700'>
        raj munit
      </p>
      <Form />
       
       <UsersList />
    </div>
  )
}

export default App