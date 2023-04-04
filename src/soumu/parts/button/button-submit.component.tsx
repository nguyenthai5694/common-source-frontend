import React from 'react';
import { clearAllToast } from 'soumu/parts/toast/toast.service';
import { Button, ButtonProps } from './button.component';

export function ButtonSubmit(props: ButtonProps) {
  const newProps: ButtonProps = {
    ...props,
    onClick: () => {
      clearAllToast();
      props.onClick && props.onClick();
    },
  };

  return <Button {...newProps} />
}