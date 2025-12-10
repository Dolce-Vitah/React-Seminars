import React, { useState, useRef } from 'react';
import axios from 'axios';
import axiosClient from '../api/axiosClient';

const AxiosDemo: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchData = async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();
    
    setLoading(true);
    setError(null);
    setData(null);

    try {
      await new Promise(r => setTimeout(r, 1000));

      const response = await axiosClient.get('/users', {
        signal: abortControllerRef.current.signal
      });
      
      setData(response.data);
    } catch (err: any) {
      if (axios.isCancel(err)) {
        setError('Запрос был отменен пользователем');
      } else {
        setError(err.message || 'Ошибка загрузки');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', marginTop: '20px' }}>
      <h3>Axios + AbortController Demo</h3>
      <div style={{ marginBottom: '10px' }}>
        <button onClick={fetchData} disabled={loading}>
          {loading ? 'Загрузка...' : 'Загрузить пользователей (Axios)'}
        </button>
        <button onClick={handleCancel} disabled={!loading} style={{ marginLeft: '10px' }}>
          Отменить загрузку
        </button>
      </div>
      
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {data && <div>Получено {data.length} пользователей через Axios</div>}
    </div>
  );
};

export default AxiosDemo;