import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  'aria-label'?: string;
}

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  href,
  onClick,
  disabled = false,
  type = 'button',
  fullWidth = false,
  icon,
  iconPosition = 'left',
  'aria-label': ariaLabel,
}: ButtonProps) => {
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3',
    lg: 'px-8 py-4 text-lg',
  };

  const variantStyles = {
    primary: 'bg-black text-white hover:bg-gray-800 focus:ring-2 focus:ring-black focus:ring-offset-2',
    secondary: 'bg-white text-black border border-black hover:bg-gray-100 focus:ring-2 focus:ring-black focus:ring-offset-2',
    accent: 'bg-aura-gold text-black hover:bg-opacity-90 focus:ring-2 focus:ring-aura-gold focus:ring-offset-2',
  };

  const commonStyles = `
    inline-flex items-center justify-center
    font-medium transition-all duration-200 rounded-none
    ${sizeStyles[size]}
    ${variantStyles[variant]}
    ${fullWidth ? 'w-full' : ''}
    ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
    ${className}
  `;

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="mr-2" aria-hidden="true">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="ml-2" aria-hidden="true">{icon}</span>}
    </>
  );

  if (href) {
    return (
      <motion.div
        whileHover={{ scale: disabled ? 1 : 1.02 }}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
      >
        <Link 
          to={href} 
          className={commonStyles}
          aria-label={ariaLabel}
          aria-disabled={disabled}
        >
          {content}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      type={type}
      className={commonStyles}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      aria-label={ariaLabel}
    >
      {content}
    </motion.button>
  );
};

export default Button;