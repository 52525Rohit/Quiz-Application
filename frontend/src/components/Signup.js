import React, { useRef, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import '../styles/Main.css';
import { useAuth } from '../hooks/useAuth';
import Toast from './Toast';
import PasswordInput from './PasswordInput';

export default function Signup() {
  const [searchParams] = useSearchParams();
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passRef = useRef(null);
  const confirmRef = useRef(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { signup } = useAuth();

  async function onSubmit(e) {
    e.preventDefault();
    setError(null);
    const fullName = nameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passRef.current?.value;
    const confirmPassword = confirmRef.current?.value;

    if (password !== confirmPassword) {
      setError('Passwords do not match...!');
      return;
    }

    try {
      await signup(fullName, email, password, confirmPassword);
      navigate(`/?email=${encodeURIComponent(email)}`, { state: { registered: true } });
    } catch (err) {
      setError(err.message || 'Something went wrong');
    }
  }

  return (
    <div className='container'>
      <h1 className='title text-light'>Quiz Application</h1>
      <h2 className='text-light' style={{ textAlign: 'center' }}>Sign Up</h2>

      <form id="form" onSubmit={onSubmit} style={{ flexDirection: 'column', alignItems: 'center', gap: '1em' }}>
        <input className='userid' ref={nameRef} type="text" placeholder='Full Name*' required />
        <input className='userid' ref={emailRef} type="email" defaultValue={searchParams.get('email') || ''} placeholder='Email*' required />
        <PasswordInput inputRef={passRef} placeholder='Password*' />
        <PasswordInput inputRef={confirmRef} placeholder='Confirm Password*' />
        <div className='start'>
          <button className='btn' type='submit'>Sign Up</button>
        </div>
      </form>

      <p className='text-light' style={{ textAlign: 'center' }}>
        Already have an account? <Link to='/'>Login</Link>
      </p>

      <Toast message={error} onClose={() => setError(null)} />
    </div>
  );
}
