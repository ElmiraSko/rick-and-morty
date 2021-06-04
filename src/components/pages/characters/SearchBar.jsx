// @flow
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
       onReset= {(values) => {
        nameHandler(JSON.stringify(values.name))
       }}
     >
       {() => (
         <Form>
           <label>Имя: </label>
           <Field type="text" name="name" />
           <button type="submit"> Поиск </button>
           <button type="reset"> Очистить </button>
         </Form>
       )}
     </Formik><br />
     </div>
  )    
}