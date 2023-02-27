import React from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { MenuWrapper, MenuItem } from './SelectionMenu.styled';

export const SelectionMenu = ({
  anchorEl,
  isOpen,
  onClose,
  menuItemData,
  dataType,
  selectedData,
}) => {
  return (
    <MenuWrapper
      id='demo-positioned-menu'
      anchorEl={anchorEl}
      open={isOpen}
      onClose={onClose}
      aria-labelledby='demo-positioned-button'
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: 'center',
        horizontal: 'left',
      }}
    >
      {menuItemData.map((item) => (
        <MenuItem
          key={nanoid()}
          onClick={onClose}
          type={dataType}
          itemData={item}
          selectedData={selectedData}
        >
          {item}
        </MenuItem>
      ))}
    </MenuWrapper>
  );
};