import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleAuth = async (formData) => {
    try {
      if (isLogin) {
        await login(formData);
      } else {
        await register(formData);
      }
      navigate('/');
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };

  return (
    <div className="auth-page">
      {isLogin ? (
        <LoginForm
          onSubmit={handleAuth}
          switchToRegister={() => setIsLogin(false)}
        />
      ) : (
        <RegisterForm
          onSubmit={handleAuth}
          switchToLogin={() => setIsLogin(true)}
        />
      )}
    </div>
  );
};

export default AuthPage;