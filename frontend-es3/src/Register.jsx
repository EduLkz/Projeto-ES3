import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Dropdown from 'react-dropdown';
import { registerUser } from './api/apiCalls';

export default function Register() {

  
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({ mode: "all" })
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordConfInput, setPasswordConfInput] = useState('');
  const [checkpass, setCheckPass] = useState(true);
    
  const onSubmit = (data) => {
    delete data.passwordConfirm;

    if (!selectedValue) {
      setIsTouched(true);
      return;
    }

    console.log(JSON.stringify(data));
    tryRegister(data)
  }

  const tryRegister = async(body) => {
    //try{
      const result = await registerUser(body);
      console.log(result)
    // }catch(err){
    //   console.log(err);
      
    // }
  }

  useEffect (() => {
    setCheckPass(passwordInput === passwordConfInput)
  }, [passwordInput, passwordConfInput])

  const options = ['Cliente', 'Entregador']

  const [selectedValue, setSelectedValue] = useState(null)
  const [isTouched, setIsTouched] = useState(false)

  const handleDropdown = (selected) => {
    setValue("user_type", String(options.indexOf(selected.value)))
    setSelectedValue(String(options.indexOf(selected.value)))
    setIsTouched(true)
  }

  return (
    <div className='register'>
      <h3>Cadastro</h3>
      <form onSubmit={handleSubmit(onSubmit)} className='registerForm'>
        <div className='formInput'>
          <label htmlFor='nome'>Nome:</label>
          <input { ...register("nome", {required: true}) }/>
        </div>
        {errors.nome && <span>Este campo é necessario</span>}
        
        <div className='formInput'>
          <label htmlFor='email'>Email:</label>
          <input { ...register("email", {required: true}) } type='email' />
        </div>
        {errors.email && <span>Este campo é necessario</span>}
        
        <div className='formInput'>
          <label htmlFor='cel'>Telefone:</label>
          <input { ...register("cel", {required: true}) } type='tel' />
        </div>
        {errors.cel && <span>Este campo é necessario</span>}
        
        <div className='formInput'>
          <label htmlFor='password'>Senha:</label>
          <input { ...register("password", {required: true}) } type='password' onChange={(e) => setPasswordInput(e.target.value)}/>
        </div>
        {errors.password && <span>Este campo é necessario</span>}
        
        <div className='formInput'>
          <label htmlFor='passwordConfirm'>Confirmar senha:</label>
          <input { ...register("passwordConfirm", {required: true}) } type='password' onChange={(e) => setPasswordConfInput(e.target.value)}/>
        </div>
        {
            errors.passwordConfirm ? <span>Este campo é necessario</span> : 
            !checkpass ? <span>Senhas divergem</span> : <></>
        }

        <div className='formInput'>
          <label htmlFor='user_type'>Tipo de Usuario:</label>
          <Dropdown options={options} onChange={ handleDropdown } value={watch("dropdown")} required
            className="custom-dropdown-root"
            controlClassName="custom-dropdown-control"
            placeholderClassName="custom-dropdown-placeholder"
            menuClassName="custom-dropdown-menu"
            arrowClassName="custom-dropdown-arrow"
          />
        </div>
        {
          isTouched && !selectedValue && (
            <span>Campo obrigatório!</span>
        )}

        {
          selectedValue === '0' &&
          <>
            <div className='formInput'>
              <label htmlFor='endereco'>Endereço:</label>
              <input { ...register("endereco", {required: true}) } type='text' />
            </div>
            {errors.endereco && <span>Este campo é necessario</span>}
          </>
        }

        <button type='submit' className='loginButtons'>
           Registrar </button>
      </form>
            
    </div>
  )
}