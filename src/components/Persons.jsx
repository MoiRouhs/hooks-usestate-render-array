import React from 'react';
import { Person } from './Person';
import { useState } from 'react';
export const Persons = ({ persons, setPersons }) => {

    const [editingId, setEditingID] = useState(null);
    const [editedPerson, setEditedPerson ] = useState({ name:'', role:'', img:''});
    const [isEditing, setIsEditing ] = useState(false);
    const [personToDelete, setPersonToDelete] = useState(null);
    
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

    const handleDelete = (id)=>{
        //console.log('id:', id);
        setPersonToDelete(id);
    };

    const confirmDelete = (e)=>{
        setPersons(persons.filter(person => person.id !== personToDelete));
        setPersonToDelete(null);
    };

    const cancelDelete = (e)=>{
        setPersonToDelete(null);
    };

    const handleCreate = (e)=>{
        setPersons([...persons, { id: persons.length + 1, ...editedPerson }]);
        setEditedPerson({ name: '', role: '', img: ''});  
    };
    
    return (
        <div>
          <h2>IT Team</h2>
          <div className='container d-flex justify-content-center '>
            <div className='d-flex flex-row flex-wrap row-cols-1 row-cols-md-2 row-cols-lg-3'>
              {persons.map((person) => {
                  return (
                      <div key={person.id} >
                        <Person
                          id={person.id}
                          name={person.name}
                          role={person.role}
                          img={person.img}
                          handleEdit={()=>handleEdit(person.id)}
                          handleDelete={handleDelete}
                        />
                      </div>
                  );
              })}
            </div>
          </div>
          <div className='mt-4'>
            <h2>{isEditing ? 'Modificar Datos':'Nuevo Usuario'}</h2>
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
                <button
                  className='btn btn-primary'
                  onClick={isEditing ? handleSave : handleCreate }
                >
                  {isEditing ?'Guardar':'Crear'}
                </button>
              </div>
              <div id="deleteModal" className='modal fade' tabIndex='-1'>
                <div className='modal-dialog'>
                  <div className='modal-content'>
                    <div className='modal-header'>
                      <h4 className="modal-title">Confirmar eliminación</h4>
                      <button
                        type='button'
                        className='btn-close'
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        onClick={cancelDelete}
                      ></button>
                    </div>
                    <div className="modal-body">
                      <p>Estas seguro de eliminar a {persons.find(person => person.id === personToDelete)?.name}</p>
                    </div>
                    <div className="modal-footer">
                      <button
                        type='button'
                        className='btn btn-secondary'
                        data-bs-dismiss='modal'
                        onClick={cancelDelete}
                      >
                        Cancelar
                      </button>
                      <button
                        type='button'
                        className='btn btn-danger'
                        data-bs-dismiss="modal"
                        onClick={confirmDelete}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
}
