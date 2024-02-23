import React from 'react';

import { GoBook } from 'react-icons/go';
import { Link, useLocation } from 'react-router-dom';

import { Nav, NavGroup, NavItem } from '@/components/Nav';
import { useAccount } from '@/spa/account/account.service';

export const SettingsNav = () => {
  const { pathname } = useLocation();
  const { isAdmin } = useAccount();
  const isActive = (to: string) => pathname.startsWith(to);
  return (
    <Nav>
      <NavGroup title="Paramètres">
        <NavItem
          as={Link}
          to="/admin/settings/users"
          isActive={isActive('/admin/settings/users')}
          icon={GoBook}
        >
          Gestion des utilisateurs
        </NavItem>
        {(!isAdmin  && (
          <NavItem
            as={Link}
            to="/admin/template"
            isActive={isActive('/admin/template')}
            icon={GoBook}
          >
            Gestion des templates
          </NavItem>
        )) ||
          null}
        {(isAdmin /** A vérifier */ && (
          <NavItem
            as={Link}
            to="/admin/settings/company"
            isActive={isActive('/admin/settings/company')}
            icon={GoBook}
          >
            Gestion des sociétés
          </NavItem>
        )) ||
          null}
       
        {(isAdmin && (
          <NavItem
            as={Link}
            to="/admin/settings/language"
            isActive={isActive('/admin/settings/language')}
            icon={GoBook}
          >
            Gestion des langues
          </NavItem>
        )) ||
          null}
      </NavGroup>
    </Nav>
  );
};
