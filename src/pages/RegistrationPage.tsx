import React, { useState, useMemo, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Store, User, Eye, EyeOff, AlertCircle, Check, ChevronLeft, ChevronRight, ShieldCheck, Edit3 } from 'lucide-react';
import { OnboardingService, type OnboardingRequest } from '../services/onboardingService';
import PasswordStrengthMeter from '../components/PasswordStrengthMeter';
import ScissorsSpinnerSVG from '../components/svg/ScissorsSpinnerSVG';
import ScissorsAnimatedSVG from '../components/svg/ScissorsAnimatedSVG';
import CombSVG from '../components/svg/CombSVG';
import NailPolishSVG from '../components/svg/NailPolishSVG';
import SalonBuddy from '../components/SalonBuddy';
import BeautyProgress from '../components/BeautyProgress';
import ClickSparkleStyles from '../components/svg/ClickSparkleStyles';
import './RegistrationPage.css';
import axios from 'axios';

function validateField(name: string, value: string | boolean, ownerPassword: string = '') {
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
      if (!value) error = 'El email es requerido';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value as string)) error = 'No es un email válido';
      break;
    case 'ownerPassword':
      if (!value) error = 'La contraseña es requerida';
      else if ((value as string).length < 6) error = 'Mínimo 6 caracteres';
      else if (!/[A-Z]/.test(value as string)) error = 'Debe contener al menos 1 mayúscula';
      else if (!/[0-9]/.test(value as string)) error = 'Debe contener al menos 1 número';
      break;
    case 'confirmPassword':
      if (value !== ownerPassword) error = 'Las contraseñas no coinciden';
      break;
    case 'acceptTerms':
      if (value === false) error = 'Debes aceptar los términos';
      break;
  }
  return error;
}

const STEP_FIELDS: Record<number, string[]> = {
  1: ['companyName', 'ruc', 'companyEmail', 'companyAddress', 'companyPhone'],
  2: ['ownerFirstName', 'ownerLastName', 'ownerEmail'],
  3: ['ownerPassword', 'confirmPassword', 'acceptTerms'],
  4: [],
};

const STEP_LABELS = ['Tu Salón', 'Tu Equipo', 'Seguridad', 'Revisar'];
const STEP_ICONS = [Store, User, ShieldCheck, Check];
const STEP_HINTS: Record<number, { title: string; desc: string }> = {
  1: { title: 'Datos del negocio', desc: 'Contanos sobre tu salón. Nombre, dirección y contacto para que tus clientes te encuentren.' },
  2: { title: 'Datos del administrador', desc: 'Información de la persona que gestionará el salón. Vas a ingresar con estos datos.' },
  3: { title: 'Seguridad de la cuenta', desc: 'Creá una contraseña segura para proteger tu cuenta. Incluye mayúscula y número.' },
  4: { title: 'Revisión final', desc: 'Verificá que todos los datos sean correctos antes de crear tu salón.' },
};

const RegistrationPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    companyName: '', ruc: '', companyEmail: '', companyAddress: '', companyPhone: '',
    ownerFirstName: '', ownerLastName: '', ownerEmail: '',
    ownerPassword: '', confirmPassword: '', acceptTerms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [completedFields, setCompletedFields] = useState<Set<string>>(new Set());
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');

  const TOTAL_STEPS = 4;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
    if (globalError) setGlobalError(null);
    const errorMsg = validateField(name, val, formData.ownerPassword);
    const fieldCompleted = !errorMsg && (typeof val === 'boolean' ? val === true : val.trim() !== '');
    setErrors(prev => ({ ...prev, [name]: errorMsg }));
    setCompletedFields(prev => {
      const next = new Set(prev);
      if (fieldCompleted) next.add(name); else next.delete(name);
      return next;
    });
    if (name === 'ownerPassword' && formData.confirmPassword) {
      const matchError = val !== formData.confirmPassword ? 'Las contraseñas no coinciden' : '';
      setErrors(prev => ({ ...prev, confirmPassword: matchError }));
      if (!matchError && formData.confirmPassword) setCompletedFields(prev => new Set(prev).add('confirmPassword'));
    }
  };

  const handleFocus = useCallback((name: string) => setFocusedField(name), []);
  const handleBlur = useCallback(() => setFocusedField(null), []);

  const stepIsComplete = useCallback((step: number) => {
    const fields = STEP_FIELDS[step];
    return fields.every(f => completedFields.has(f));
  }, [completedFields]);

  const allStepsComplete = useMemo(() => {
    for (let s = 1; s <= 3; s++) {
      if (!stepIsComplete(s)) return false;
    }
    return Object.values(errors).every(e => e === '');
  }, [stepIsComplete, errors]);

  const hasAnyErrors = useMemo(() => Object.values(errors).some(e => e !== ''), [errors]);

  const goNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setDirection('forward');
      setCurrentStep(prev => prev + 1);
    }
  };

  const goBack = () => {
    if (currentStep > 1) {
      setDirection('backward');
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleCreateClick = async () => {
    if (!allStepsComplete || isSubmitting) return;
    setIsSubmitting(true);
    setGlobalError(null);
    try {
      const requestData: OnboardingRequest = {
        companyName: formData.companyName, ruc: formData.ruc,
        companyEmail: formData.companyEmail, companyAddress: formData.companyAddress,
        companyPhone: formData.companyPhone, ownerFirstName: formData.ownerFirstName,
        ownerLastName: formData.ownerLastName, ownerEmail: formData.ownerEmail,
        ownerPassword: formData.ownerPassword,
      };
      const response = await OnboardingService.registerSalon(requestData);
      sessionStorage.setItem('token', response.token);
      sessionStorage.setItem('companyId', response.companyId);
      navigate('/step3', {
        state: { companyName: response.companyName || requestData.companyName, ruc: requestData.ruc, companyEmail: requestData.companyEmail, fullName: response.fullName, ownerEmail: response.email, token: response.token },
      });
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        const { status, data } = error.response;
        if (status === 409) setGlobalError('Este email ya está registrado. Inicia sesión para acceder a tu cuenta.');
        else if (status === 422) setGlobalError((data as Record<string, unknown>)?.message as string || 'Datos inválidos. Revisa los campos del formulario.');
        else if (status === 429) setGlobalError('Demasiados intentos. Intenta de nuevo en unos minutos.');
        else setGlobalError((data as Record<string, unknown>)?.message as string || 'Error en el registro. Intente nuevamente.');
      } else if (axios.isAxiosError(error) && error.code === 'ECONNABORTED') {
        setGlobalError('La conexión está tardando demasiado. Verifica tu internet.');
      } else {
        setGlobalError('Ha ocurrido un error de conexión');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const completedSteps = [1, 2, 3].filter(s => stepIsComplete(s)).length;
  const progressValue = Math.min(completedSteps / 3, 1);

  const renderStepIndicator = () => (
    <div className="step-indicator">
      {[1, 2, 3, 4].map(s => {
        const Icon = STEP_ICONS[s - 1];
        const isDone = s <= 3 ? stepIsComplete(s) : allStepsComplete;
        return (
          <div key={s} className={`step-dot ${currentStep === s ? 'active' : ''} ${isDone ? 'done' : ''}`}>
            <div className="step-dot-circle">
              {isDone ? <Check size={14} /> : <Icon size={14} />}
            </div>
            <span className="step-dot-label">{STEP_LABELS[s - 1]}</span>
          </div>
        );
      })}
    </div>
  );

  const renderInput = (name: string, label: string, placeholder: string, opts: Record<string, unknown> = {}) => (
    <div className={`form-group ${opts.fullWidth ? 'full-width' : ''} ${completedFields.has(name) ? 'group-complete' : ''}`}>
      <label>{label} *</label>
      <div className="input-wrapper">
        <input
          type={opts.type as string || 'text'}
          name={name}
          placeholder={placeholder}
          value={formData[name as keyof typeof formData] as string}
          onChange={handleChange}
          onFocus={() => handleFocus(name)}
          onBlur={handleBlur}
          autoComplete={opts.autoComplete as string || 'off'}
          autoCapitalize={opts.autoCapitalize as string || 'off'}
          spellCheck={opts.spellCheck as boolean ?? false}
          className={`${errors[name] ? 'has-error' : ''} ${completedFields.has(name) ? 'field-complete' : ''}`}
        />
        {completedFields.has(name) && !errors[name] && name !== 'ownerPassword' && (
          <span className="field-check"><Check size={16} /></span>
        )}
      </div>
      {errors[name] && <span className="error-text"><AlertCircle size={14} /> {errors[name]}</span>}
    </div>
  );

  const renderStepContent = () => {
    const animClass = direction === 'forward' ? 'step-slide-in' : 'step-slide-in-reverse';
    return (
      <div key={currentStep} className={`step-content-wrapper ${animClass}`}>
        {currentStep === 1 && (
          <div className="form-grid">
            <div className="section-title"><Store size={20} /> Detalles del Negocio</div>
            {renderInput('companyName', 'Nombre del Salón', 'Ej: Salón Elegance', { fullWidth: true, autoComplete: 'organization', autoCapitalize: 'words', spellCheck: true })}
            {renderInput('ruc', 'RUC / NIT', 'Identificador fiscal', { autoComplete: 'tax-id', autoCapitalize: 'characters' })}
            {renderInput('companyEmail', 'Email del Negocio', 'info@salon.com', { type: 'email', autoComplete: 'email' })}
            {renderInput('companyAddress', 'Dirección', 'Av. Principal 123, Ciudad', { fullWidth: true, autoComplete: 'street-address', autoCapitalize: 'sentences', spellCheck: true })}
            {renderInput('companyPhone', 'Teléfono', '+54 9 11 1234 5678', { fullWidth: true, type: 'tel', autoComplete: 'tel' })}
          </div>
        )}
        {currentStep === 2 && (
          <div className="form-grid">
            <div className="section-title"><User size={20} /> Datos del Administrador</div>
            {renderInput('ownerFirstName', 'Nombre', 'Tu nombre', { autoComplete: 'given-name', autoCapitalize: 'words', spellCheck: true })}
            {renderInput('ownerLastName', 'Apellido', 'Tu apellido', { autoComplete: 'family-name', autoCapitalize: 'words', spellCheck: true })}
            {renderInput('ownerEmail', 'Email Personal', 'El email para tu cuenta de acceso', { fullWidth: true, type: 'email', autoComplete: 'email' })}
          </div>
        )}
        {currentStep === 3 && (
          <div className="form-grid">
            <div className="section-title"><ShieldCheck size={20} /> Seguridad de Cuenta</div>
            <div className={`form-group ${completedFields.has('ownerPassword') ? 'group-complete' : ''}`}>
              <label>Contraseña *</label>
              <div className="input-wrapper">
                <input type={showPassword ? 'text' : 'password'} name="ownerPassword" placeholder="Mínimo 6 chars, 1 Mayus, 1 Num"
                  value={formData.ownerPassword} onChange={handleChange} onFocus={() => handleFocus('ownerPassword')} onBlur={handleBlur}
                  autoComplete="new-password" autoCapitalize="off" spellCheck={false}
                  className={`${errors.ownerPassword ? 'has-error' : ''} ${completedFields.has('ownerPassword') ? 'field-complete' : ''}`} />
                <button type="button" className="icon-right" onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
                {formData.ownerPassword.length > 0 && (
                  <span className="password-scissors" title="✂️ Las tijeras cortan tu contraseña"><ScissorsAnimatedSVG size={16} /></span>
                )}
              </div>
              {errors.ownerPassword && <span className="error-text"><AlertCircle size={14} /> {errors.ownerPassword}</span>}
              <PasswordStrengthMeter password={formData.ownerPassword} />
            </div>
            <div className={`form-group ${completedFields.has('confirmPassword') ? 'group-complete' : ''}`}>
              <label>Confirmar Contraseña *</label>
              <div className="input-wrapper">
                <input type={showConfirmPassword ? 'text' : 'password'} name="confirmPassword" placeholder="Repite la contraseña"
                  value={formData.confirmPassword} onChange={handleChange} onFocus={() => handleFocus('confirmPassword')} onBlur={handleBlur}
                  autoComplete="new-password" autoCapitalize="off" spellCheck={false}
                  className={`${errors.confirmPassword ? 'has-error' : ''} ${completedFields.has('confirmPassword') ? 'field-complete' : ''}`} />
                <button type="button" className="icon-right" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}>
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
                {completedFields.has('confirmPassword') && !errors.confirmPassword && (
                  <span className="field-check" style={{ right: '2.5rem' }}><Check size={16} /></span>
                )}
              </div>
              {errors.confirmPassword && <span className="error-text"><AlertCircle size={14} /> {errors.confirmPassword}</span>}
            </div>
            <div className="terms-group">
              <input type="checkbox" id="acceptTerms" name="acceptTerms" checked={formData.acceptTerms} onChange={handleChange} />
              <label htmlFor="acceptTerms">He leído y acepto los <a href="#">Términos y Condiciones</a> y la Política de Privacidad de BeautyFlow.</label>
            </div>
          </div>
        )}
        {currentStep === 4 && (
          <div className="review-step">
            <div className="section-title"><Check size={20} /> Revisa tus datos</div>
            <div className="review-card glass-panel">
              <h4>🏪 {formData.companyName || 'Salón'}
                <button type="button" className="review-edit" onClick={() => { setDirection('backward'); setCurrentStep(1); }}><Edit3 size={14} /> Editar</button>
              </h4>
              <div className="review-grid">
                <div><span>RUC:</span> {formData.ruc}</div>
                <div><span>Email:</span> {formData.companyEmail}</div>
                <div><span>Dirección:</span> {formData.companyAddress}</div>
                <div><span>Teléfono:</span> {formData.companyPhone}</div>
              </div>
            </div>
            <div className="review-card glass-panel">
              <h4>👤 {formData.ownerFirstName} {formData.ownerLastName}
                <button type="button" className="review-edit" onClick={() => { setDirection('backward'); setCurrentStep(2); }}><Edit3 size={14} /> Editar</button>
              </h4>
              <div className="review-grid">
                <div style={{ gridColumn: '1/-1' }}><span>Email:</span> {formData.ownerEmail}</div>
              </div>
            </div>
            <div className="review-card glass-panel">
              <h4>🔐 Seguridad
                <button type="button" className="review-edit" onClick={() => { setDirection('backward'); setCurrentStep(3); }}><Edit3 size={14} /> Editar</button>
              </h4>
              <p className="review-pw-ok">✓ Contraseña configurada</p>
            </div>
            {globalError && (
              <div className="global-error animate-fade-in">
                <AlertCircle size={20} />
                <span>{globalError}</span>
                {globalError.toLowerCase().includes('email') && (
                  <div style={{ marginLeft: 'auto' }}><Link to="/login" style={{ color: '#991b1b', textDecoration: 'underline' }}>Iniciar Sesión</Link></div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="registration-wrapper">
      <ClickSparkleStyles />
      <div className="reg-bg-shape reg-shape-1"></div>
      <div className="reg-bg-shape reg-shape-2"></div>
      <div className="deco-float deco-comb" aria-hidden="true"><CombSVG size={28} /></div>
      <div className="deco-float deco-nail" aria-hidden="true"><NailPolishSVG size={24} /></div>
      <div className="deco-float deco-scissors-float" aria-hidden="true"><ScissorsAnimatedSVG size={22} /></div>

      <div className="registration-card animate-fade-in">
        <SalonBuddy
          focusedField={focusedField !== null}
          hasErrors={hasAnyErrors}
          progress={progressValue}
        />

        <div className="registration-header">
          <Link to="/" className="back-to-landing" title="Volver al inicio">
            <ChevronLeft size={18} /> <span>Volver</span>
          </Link>
          <h1>Registro de Salón</h1>
          <p>Paso {currentStep} de {TOTAL_STEPS}: {STEP_LABELS[currentStep - 1]}</p>
        </div>

        <BeautyProgress completed={completedSteps} total={3} />
        {renderStepIndicator()}

        <div className="step-hint">
          <strong>{STEP_HINTS[currentStep].title}</strong>
          <br />
          {STEP_HINTS[currentStep].desc}
        </div>

        <form className="registration-body">
          {renderStepContent()}

          <div className="step-nav">
            {currentStep > 1 ? (
              <button type="button" className="btn btn-outline" onClick={goBack}>
                <ChevronLeft size={18} /> Anterior
              </button>
            ) : <div />}

            {currentStep < TOTAL_STEPS ? (
              <button type="button" className="btn btn-primary" onClick={goNext} disabled={currentStep <= 3 && !stepIsComplete(currentStep)}>
                Siguiente <ChevronRight size={18} />
              </button>
            ) : (
              <button type="button" className={`btn btn-primary btn-submit ${allStepsComplete ? 'btn-ready' : ''}`} disabled={!allStepsComplete || isSubmitting} onClick={handleCreateClick}>
                {isSubmitting ? <><ScissorsSpinnerSVG size={20} /> Procesando...</> : <>Crear mi Salón ✨</>}
              </button>
            )}
          </div>

          <div className="login-link">
            ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
