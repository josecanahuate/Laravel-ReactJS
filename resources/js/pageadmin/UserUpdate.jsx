import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Config from '../Config';
import SideBar from "./SideBar";

const UserUpdate = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const {name, setName} = useState("");
    const {aprobado, setAprobado} = useState(false);

    useEffect(()=>{
        const getUserById = async() =>{
            Config.getUserById(id)
            .then(({data})=>{
                setName(data.name)
                setAprobado(data.aprobado)
            })
        };
        getUserById();
    }, []);

    const submitUpdate = async (ev) => {
    ev.preventDefault()
    await Config.getUserUpdate({aprobado}, id)  
    navigate('/admin/user')
    }

  return (
    <div className="container bg-light">
    <div className="row">
      <SideBar/>
      <div className="col-sm-9 mt-3 mb-3">
        <div className="card">
            <div className="card-header">
                EDITAR USUARIO
            </div>
          <div className="card-body">
            <form onSubmit={submitUpdate}>
                <div className="col-sm-12">
                    <label htmlFor="name">Nombre:</label>
                    <input type="text" className='form-control' value={name} onChange={(e)=>setName(e.target.value)} name="name"/>
                </div>

                <div className="col-sm-12 mt-3">
                    <div className='form-check form-switch'>
                    <input type="checkbox" role='switch' id='aprobado' className='form-check-input' checked={aprobado} onChange={(e)=>setAprobado(!aprobado)} name="aprobado"/>
                    <label className='form-check-label' htmlFor="aprobado">Aprobado</label>
                    </div>
                </div>
                <div className='btn-group mt-3'>
            <Link to={-1} className="btn btn-secondary" >Go Back</Link>
            <button type='submit' className='btn btn-primary'>Actualizar Usuario</button>
            </div>

            </form>




          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default UserUpdate
