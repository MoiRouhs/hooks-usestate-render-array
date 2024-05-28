import React from 'react'

export const Person = ({id, name, role, img, handleEdit }) => {
  return (
    <div className="col">
      <div className="card" style={{width: "18rem"}}>
        <img src={img} className="card-img-top" alt={name}/>
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <p className="card-text">{role}</p>
          </div>
        <div className='mb-4'>
          <button className='btn btn-success me-2' onClick={handleEdit}>Editar</button>
          <button className='btn btn-danger'>Eliminar</button>
        </div>
      </div>
    </div>
  );
};
