import styles from './style.module.css';
import { Button as AriaButton, ButtonProps } from 'react-aria-components';

type Props = ButtonProps & {
  varient?: 'primaryOutline' | 'secondaryOutline' | 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large' | 'extraLarge';
  children: JSX.Element | string;
};

const Button = (props: Props) => {
  const gradients = {
    primary: '/buttons/primary.svg',
    secondary: '/buttons/secondary.svg',
    primaryOutline: '/buttons/primaryOutline.svg',
    secondaryOutline: '/buttons/secondaryOutline.svg',
  };

  const sizes = {
    small: 'px-2 py-1 text-sm',
    medium: 'px-3 py-2 text-base',
    large: 'px-4 py-3 text-lg',
    extraLarge: 'px-7 py-6 text-2xl',
  };
  const { varient, size, children, ...rest } = props;

  return (
    <AriaButton
      {...rest}
      className={
        styles.button +
        ' ' +
        (size ? sizes[size] : sizes.small) +
        ' relative focus:outline-none overflow-visible py-2 active:outline-none focus-within:outline-none aria-pressed:outline-none outline-none'
      }
      style={{
        borderImageSource: `url(${gradients[varient ? varient : 'primary']})`,
      }}
    >
      {children}
    </AriaButton>
  );
};

export default Button;
