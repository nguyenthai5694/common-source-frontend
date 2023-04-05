import React from 'react'
import { FormControlChildProps } from 'common/form'

export interface CustomSelectProps extends FormControlChildProps {
  value?: string;

  size?: 'l' | 'm' | 's';

  width?: number | string;

  options: ({ value: string, label: string } | any)[];

  onChange?: (name?: any, option?: any) => void;

  /**
   * Default: false
   */
  multi?: boolean;
}

/**
 * @deprecated use select.component.tsx instead
 */
export function CustomSelect({
  name,
  size = 'l',
  width = 520,
  options,
  onChange,
  multi,
  formik,
}: CustomSelectProps) {
  return (
    <div>
      <div style={{ width }}>

      </div>
    </div>
  )
}

