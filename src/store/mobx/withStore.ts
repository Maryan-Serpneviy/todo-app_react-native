import { ComponentType, ComponentProps } from 'react'
import { observer, inject } from 'mobx-react'

export function withStore(Component: ComponentType<ComponentProps<any>>, store = 'store') {
    return inject(store)(observer(Component))
}