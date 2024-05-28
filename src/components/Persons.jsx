import React from 'react';
import { Person } from './Person';
import { useState } from 'react';
export const Persons = ({ persons, setPersons }) => {

    const [editingId, setEditingID] = useState(null);
    const [editedPerson, setEditedPerson ] = useState({ name:'', role:'', img:''});
    const [isEditing, setIsEditing ] = useState(false);
    
    const handleChange = (e)=>{
        const {name, value } = e.target;
        setEditedPerson(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleEdit = (id)=>{
        setEditingID(id);
        setIsEditing(true);
        const personToEdit = persons.find(person => person.id === id);
        setEditedPerson({...personToEdit});
    };

    const handleSave = (e)=>{
        setPersons(persons.map(person => person.id === editingId ? editedPerson: person ));
        setEditingID(null);
        setEditedPerson({ name:'', role:'', img:''});
        setIsEditing(false);
    };
    
    return (
        <div>
          <h2>IT Team</h2>
          <div className='container d-flex justify-content-center '>
            <div className='d-flex flex-row'>
              {persons.map((person) => {
                  return (
                      <div>
                        <Person
                          key={person.id}
                          name={person.name}
                          role={person.role}
                          img={person.img}
                          handleEdit={()=>handleEdit(person.id)}
                        />
                      </div>
                  );
              })}
            </div>
          </div>
          <div className='mt-4'>
            <h2>Modificar Datos</h2>
            <div className='d-flex flex-column mt-4'>
              <input
                name="name"
                type="text"
                placeholder="Nombre"
                value={editedPerson.name}
                onChange={handleChange}
                className='form-control mb-2'
              />
              <input
                name="role"
                type="text"
                placeholder="Role"
                value={editedPerson.role}
                onChange={handleChange}
                className='form-control mb-2'
              />
              <input
                name="img"
                type="text"
                placeholder="Url de la imagen"
                value={editedPerson.img}
                onChange={handleChange}
                className='form-control mb-2'
              />
              <div className="mt-2">
                <button className='btn btn-primary' onClick={handleSave}>Guardar</button>
              </div>
            </div>
          </div>
        </div>
    );
}
