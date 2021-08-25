import React from 'react';
import { useSelector } from 'react-redux';

const Alert = () => {
  const text = useSelector((state) => state.app.alert);
  return (
    <div className="alert alert-warning" role="alert">
      {text}
    </div>
  );
};

export default Alert;
