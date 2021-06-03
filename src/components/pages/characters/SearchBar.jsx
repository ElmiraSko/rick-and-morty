import React from 'react';
import { Formik, Field, Form } from "formik";

export default function SearchBar(props) {
  const nameHandler=props.nameH

  return(
    <div>
      <h4>Фильтрация:</h4>
    <Formik
       initialValues={{name: ''}}     
       onSubmit={(values) => {
        nameHandler(JSON.stringify(values.name))  
       }}
     >
       {() => (
         <Form>
           <label>Name: </label>
           <Field type="text" name="name" />
           <button type="submit"> 
            Поиск
           </button>
         </Form>
       )}
     </Formik><br />
     </div>
  )    
}