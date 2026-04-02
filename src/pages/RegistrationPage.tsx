import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Store, User, Eye, EyeOff, AlertCircle, Loader2 } from 'lucide-react';
import { OnboardingService, type OnboardingRequest } from '../services/onboardingService';
import './RegistrationPage.css';
import axios from 'axios';

const RegistrationPage = () => {
  const navigate = useNavigate();
  
  // Form State
  const [formData, setFormData] = useState({
    companyName: '',
    ruc: '',
    companyEmail: '',
    companyAddress: '',
    companyPhone: '',
    ownerFirstName: '',
    ownerLastName: '',
    ownerEmail: '',
    ownerPassword: '',
    confirmPassword: '',
    acceptTerms: false
  });

  // Errors State
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [globalError, setGlobalError] = useState<string | null>(null);
  
  // UI State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  // Validation Logic
  const validateField = (name: string, value: string | boolean) => {
    let error = '';
    
    switch (name) {
      case 'companyName':
      case 'ruc':
      case 'companyAddress':
      case 'companyPhone':
      case 'ownerFirstName':
      case 'ownerLastName':
        if (!value || (typeof value === 'string' && value.trim() === '')) error = 'Este campo es requerido';
        break;
      case 'companyEmail':
      case 'ownerEmail':
        if (!value) {
          error = 'El email es requerido';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value as string)) {
          error = 'No es un email válido';
        }
        break;
      case 'ownerPassword':
        if (!value) {
          error = 'La contraseña es requerida';
        } else if ((value as string).length < 6) {
          error = 'Mínimo 6 caracteres';
        } else if (!/[A-Z]/.test(value as string)) {
          error = 'Debe contener al menos 1 mayúscula';
        } else if (!/[0-9]/.test(value as string)) {
          error = 'Debe contener al menos 1 número';
        }
        break;
      case 'confirmPassword':
        if (value !== formData.ownerPassword) {
          error = 'Las contraseñas no coinciden';
        }
        break;
      case 'acceptTerms':
        if (value === false) {
          error = 'Debes aceptar los términos';
        }
        break;
    }
    
    return error;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: val
    }));

    // Clear global error when user types
    if (globalError) setGlobalError(null);

    // Validate on change for better UX
    const errorMsg = validateField(name, val);
    setErrors(prev => ({
      ...prev,
      [name]: errorMsg
    }));
    
    // Special case for password matching
    if (name === 'ownerPassword' && formData.confirmPassword) {
      const matchError = val !== formData.confirmPassword ? 'Las contraseñas no coinciden' : '';
      setErrors(prev => ({ ...prev, confirmPassword: matchError }));
    }
  };

  // Run full validation to enable/disable button
  useEffect(() => {
    let isValid = true;
    for (const key of Object.keys(formData)) {
      const error = validateField(key, formData[key as keyof typeof formData]);
      if (error) {
        isValid = false;
        break;
      }
    }
    // Also ensuring no active errors
    const hasActiveErrors = Object.values(errors).some(err => err !== '');
    setIsFormValid(isValid && !hasActiveErrors);
  }, [formData, errors]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    
    setIsSubmitting(true);
    setGlobalError(null);

    try {
      // Prepare request data (omit confirmPassword and acceptTerms)
      const requestData: OnboardingRequest = {
        companyName: formData.companyName,
        ruc: formData.ruc,
        companyEmail: formData.companyEmail,
        companyAddress: formData.companyAddress,
        companyPhone: formData.companyPhone,
        ownerFirstName: formData.ownerFirstName,
        ownerLastName: formData.ownerLastName,
        ownerEmail: formData.ownerEmail,
        ownerPassword: formData.ownerPassword
      };

      const response = await OnboardingService.registerSalon(requestData);
      
      // Save data locally
      localStorage.setItem('token', response.token);
      localStorage.setItem('companyId', response.companyId);
      
      // Redirect to next step with state data for the Confirmation Screen
      navigate('/step3', {
        state: {
          companyName: response.companyName || requestData.companyName,
          ruc: requestData.ruc,
          companyEmail: requestData.companyEmail,
          fullName: response.fullName,
          ownerEmail: response.email,
          token: response.token
        }
      });
      
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        setGlobalError(error.response.data?.message || 'Error en el registro. Intente nuevamente.');
      } else {
        setGlobalError('Ha ocurrido un error de conexión');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="registration-wrapper">
      <div className="reg-bg-shape reg-shape-1"></div>
      <div className="reg-bg-shape reg-shape-2"></div>

      <div className="registration-card animate-fade-in">
        <div className="registration-header">
          <h1>Registro de Salón</h1>
          <p>Potencia tu negocio en pocos minutos.</p>
        </div>

        <form className="registration-body" onSubmit={handleSubmit}>
          
          {/* SECCIÓN 1: DATOS DEL SALÓN */}
          <div className="form-grid">
            <div className="section-title">
              <Store size={20} /> Detalles del Negocio
            </div>

            <div className="form-group full-width">
              <label>Nombre del Salón *</label>
              <div className="input-wrapper">
                <input 
                  type="text" 
                  name="companyName" 
                  placeholder="Ej: Salón Elegance"
                  value={formData.companyName}
                  onChange={handleChange}
                  className={errors.companyName ? 'has-error' : ''}
                />
              </div>
              {errors.companyName && <span className="error-text"><AlertCircle size={14}/> {errors.companyName}</span>}
            </div>

            <div className="form-group">
              <label>RUC / NIT *</label>
              <div className="input-wrapper">
                <input 
                  type="text" 
                  name="ruc" 
                  placeholder="Identificador fiscal"
                  value={formData.ruc}
                  onChange={handleChange}
                  className={errors.ruc ? 'has-error' : ''}
                />
              </div>
              {errors.ruc && <span className="error-text"><AlertCircle size={14}/> {errors.ruc}</span>}
            </div>

            <div className="form-group">
              <label>Email del Negocio *</label>
              <div className="input-wrapper">
                <input 
                  type="email" 
                  name="companyEmail" 
                  placeholder="info@salon.com"
                  value={formData.companyEmail}
                  onChange={handleChange}
                  className={errors.companyEmail ? 'has-error' : ''}
                />
              </div>
              {errors.companyEmail && <span className="error-text"><AlertCircle size={14}/> {errors.companyEmail}</span>}
            </div>

            <div className="form-group full-width">
              <label>Dirección *</label>
              <div className="input-wrapper">
                <input 
                  type="text" 
                  name="companyAddress" 
                  placeholder="Av. Principal 123, Ciudad"
                  value={formData.companyAddress}
                  onChange={handleChange}
                  className={errors.companyAddress ? 'has-error' : ''}
                />
              </div>
              {errors.companyAddress && <span className="error-text"><AlertCircle size={14}/> {errors.companyAddress}</span>}
            </div>

            <div className="form-group full-width">
              <label>Teléfono *</label>
              <div className="input-wrapper">
                <input 
                  type="text" 
                  name="companyPhone" 
                  placeholder="+54 9 11 1234 5678"
                  value={formData.companyPhone}
                  onChange={handleChange}
                  className={errors.companyPhone ? 'has-error' : ''}
                />
              </div>
              {errors.companyPhone && <span className="error-text"><AlertCircle size={14}/> {errors.companyPhone}</span>}
            </div>
          </div>

          {/* SECCIÓN 2: DATOS DEL DUEÑO */}
          <div className="form-grid">
            <div className="section-title">
              <User size={20} /> Datos del Administrador
            </div>

            <div className="form-group">
              <label>Nombre *</label>
              <div className="input-wrapper">
                <input 
                  type="text" 
                  name="ownerFirstName" 
                  placeholder="Tu nombre"
                  value={formData.ownerFirstName}
                  onChange={handleChange}
                  className={errors.ownerFirstName ? 'has-error' : ''}
                />
              </div>
              {errors.ownerFirstName && <span className="error-text"><AlertCircle size={14}/> {errors.ownerFirstName}</span>}
            </div>

            <div className="form-group">
              <label>Apellido *</label>
              <div className="input-wrapper">
                <input 
                  type="text" 
                  name="ownerLastName" 
                  placeholder="Tu apellido"
                  value={formData.ownerLastName}
                  onChange={handleChange}
                  className={errors.ownerLastName ? 'has-error' : ''}
                />
              </div>
              {errors.ownerLastName && <span className="error-text"><AlertCircle size={14}/> {errors.ownerLastName}</span>}
            </div>

            <div className="form-group full-width">
              <label>Email Personal *</label>
              <div className="input-wrapper">
                <input 
                  type="email" 
                  name="ownerEmail" 
                  placeholder="El email para tu cuenta de acceso"
                  value={formData.ownerEmail}
                  onChange={handleChange}
                  className={errors.ownerEmail ? 'has-error' : ''}
                />
              </div>
              {errors.ownerEmail && <span className="error-text"><AlertCircle size={14}/> {errors.ownerEmail}</span>}
            </div>

            <div className="form-group">
              <label>Contraseña *</label>
              <div className="input-wrapper">
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="ownerPassword" 
                  placeholder="Mínimo 6 chars, 1 Mayus, 1 Num"
                  value={formData.ownerPassword}
                  onChange={handleChange}
                  className={errors.ownerPassword ? 'has-error' : ''}
                />
                <button 
                  type="button" 
                  className="icon-right" 
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.ownerPassword && <span className="error-text"><AlertCircle size={14}/> {errors.ownerPassword}</span>}
            </div>

            <div className="form-group">
              <label>Confirmar Contraseña *</label>
              <div className="input-wrapper">
                <input 
                  type={showConfirmPassword ? "text" : "password"} 
                  name="confirmPassword" 
                  placeholder="Repite la contraseña"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={errors.confirmPassword ? 'has-error' : ''}
                />
                <button 
                  type="button" 
                  className="icon-right" 
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  tabIndex={-1}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.confirmPassword && <span className="error-text"><AlertCircle size={14}/> {errors.confirmPassword}</span>}
            </div>
          </div>

          <div className="terms-group">
            <input 
              type="checkbox" 
              id="acceptTerms" 
              name="acceptTerms"
              checked={formData.acceptTerms}
              onChange={handleChange}
            />
            <label htmlFor="acceptTerms">
              He leído y acepto los <a href="#">Términos y Condiciones</a> y la Política de Privacidad de BeautyFlow.
            </label>
          </div>

          {globalError && (
            <div className="global-error animate-fade-in stagger-1">
              <AlertCircle size={20} />
              <span>{globalError}</span>
              {globalError.toLowerCase().includes('email') && (
                 <div style={{ marginLeft: 'auto' }}>
                   <Link to="/login" style={{color: '#991b1b', textDecoration: 'underline'}}>Iniciar Sesión</Link>
                 </div>
              )}
            </div>
          )}

          <div className="registration-footer">
            <button 
              type="submit" 
              className="btn btn-primary btn-submit"
              disabled={!isFormValid || isSubmitting}
            >
              {isSubmitting ? (
                <><Loader2 className="spinner" size={20} /> Procesando...</>
              ) : (
                'Crear mi Salón'
              )}
            </button>

            <div className="login-link">
              ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
