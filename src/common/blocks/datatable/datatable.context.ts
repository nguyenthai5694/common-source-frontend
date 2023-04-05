import { createContext } from 'react'
import { DatatableContextProps } from './datatable.type'

export const DatatableContext = createContext<DatatableContextProps>(null);