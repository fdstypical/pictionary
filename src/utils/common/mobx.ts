import { ComponentType } from 'react';
import { inject, observer } from 'mobx-react';

export const watch = (component: ComponentType<any>, ...stores: string[]) => inject(...stores)(observer(component));
