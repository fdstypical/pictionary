import React from 'react';
import './style.styl';

import Logo, { LogoColors } from '@/components/Logo';

export interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = ({}) => (
  <aside className="base-sidebar">
    <div className="base-sidebar__logo">
      <Logo to="/" color={LogoColors.light} />
    </div>
  </aside>
);

export default Sidebar;
