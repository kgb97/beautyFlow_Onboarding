import { useMemo } from 'react';

interface PasswordStrengthMeterProps {
  password: string;
}

function getStrength(password: string): { score: number; label: string; color: string; width: string } {
  let score = 0;
  if (password.length >= 6) score++;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { score, label: 'Débil', color: '#ef4444', width: '33%' };
  if (score <= 3) return { score, label: 'Media', color: '#f59e0b', width: '66%' };
  return { score, label: 'Fuerte', color: '#10b981', width: '100%' };
}

const PasswordStrengthMeter = ({ password }: PasswordStrengthMeterProps) => {
  const strength = useMemo(() => getStrength(password), [password]);

  if (!password) return null;

  return (
    <div className="password-strength" style={{ marginTop: '0.5rem' }}>
      <div style={{ height: 4, background: '#f1f5f9', borderRadius: 4, overflow: 'hidden' }}>
        <div
          style={{
            height: '100%',
            width: strength.width,
            background: strength.color,
            borderRadius: 4,
            transition: 'all 0.3s ease',
          }}
        />
      </div>
      <span
        style={{
          fontSize: '0.75rem',
          fontWeight: 600,
          color: strength.color,
          marginTop: '0.15rem',
          display: 'block',
        }}
      >
        {strength.label}
      </span>
    </div>
  );
};

export default PasswordStrengthMeter;
