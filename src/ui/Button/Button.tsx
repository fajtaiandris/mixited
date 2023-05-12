import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cx from 'classix';
import React, { FC } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary';
type ButtonType = 'button' | 'submit' | 'reset';

interface Props {
  text?: string;
  icon?: IconDefinition;
  isPushedIn?: boolean;
  isDisabled?: boolean;
  className?: string;
  variant?: ButtonVariant;
  type?: ButtonType;
  onClick?: () => void;
}

export const Button: FC<Props> = ({
  text,
  icon,
  isPushedIn = false,
  isDisabled = false,
  className,
  variant = 'primary',
  type = 'button',
  onClick,
}) => {
  const getStyle = () => {
    switch (variant) {
      case 'primary':
        return cx('bg-neutral-400 px-2 text-neutral-600', isPushedIn && 'bg-neutral-500 text-neutral-700');
      case 'secondary':
        return cx(
          'rounded px-2 text-white shadow',
          isDisabled && 'disabled cursor-default bg-gray-500',
          !isDisabled && 'bg-gray-700',
        );
      case 'tertiary':
        return cx(
          'rounded font-semibold',
          isDisabled && 'disabled cursor-default text-gray-500',
          !isDisabled && 'text-pink-500 hover:text-pink-600 ',
        );
      default:
        return '';
    }
  };

  return (
    <button className={cx(getStyle(), className)} onClick={onClick} disabled={isDisabled} type={type}>
      {icon && <FontAwesomeIcon icon={icon} className={cx(!!text && 'mr-2')} />}
      {text}
    </button>
  );
};
