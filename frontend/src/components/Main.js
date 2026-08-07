import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../styles/Main.css'
import Toast from './Toast';
import LogoutButton from './LogoutButton';

export default function Main() {
  const location = useLocation();
  const userId = useSelector(state => state.result.userId);
  const [notice, setNotice] = useState(location.state?.loggedIn ? `Welcome, ${userId}! Login successful.` : null);

  return (
    <div className='container'>
      <LogoutButton />
      <h1 className='title text-light'>Quiz Application</h1>
      <ol>
        <li>You will be asked 10 questions one after another.</li>
        <li>10 points is awarded for the correct answer.</li>
        <li>Each question has three options. You can choose only one options.</li>
        <li>You can review and change answers before the quiz finish.</li>
        <li>The result will be declared at the end of the quiz.</li>
      </ol>
      <div className='start'>
         <Link className='btn' to={'/quiz'}>StartQuiz</Link>
      </div>

      <Toast message={notice} type='success' onClose={() => setNotice(null)} />
    </div>
  )
}
