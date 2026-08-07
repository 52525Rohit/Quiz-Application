import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetResultAction } from '../Redux/result_reducer';
import { resetAllAction } from '../Redux/question_reducer';

export default function LogoutButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onLogout() {
    dispatch(resetResultAction());
    dispatch(resetAllAction());
    navigate('/');
  }

  return (
    <button className='btn logout-btn' onClick={onLogout}>Logout</button>
  );
}
