import { NavigateFunction } from "react-router-dom";
import { Menu } from "@/stores/sideMenuSlice";
import { slideUp, slideDown } from "@/utils/helper";

interface Location {
  pathname: string;
  search: string;
  forceActiveMenu?: string;
}

export interface FormattedMenu extends Menu {
  active?: boolean;
  activeDropdown?: boolean;
  subMenu?: FormattedMenu[];
  modalTrigger?: string;
  modalLink?: string;
}

// Setup side menu
const findActiveMenu = (subMenu: Menu[], location: Location, workspaceId?: string): boolean => {
  let match = false;
  subMenu.forEach((item) => {
    let normalizedPath = item.pathname;
    if (normalizedPath && workspaceId) {
      normalizedPath = normalizedPath.replace(/:workspaceId/g, workspaceId);
    }

    if (
      ((location.forceActiveMenu !== undefined &&
        normalizedPath === location.forceActiveMenu) ||
        (location.forceActiveMenu === undefined &&
          normalizedPath === location.pathname + location.search)) &&
      !item.ignore
    ) {
      match = true;
    } else if (!match && item.subMenu) {
      match = findActiveMenu(item.subMenu, location, workspaceId);
    }
  });
  return match;
};

const nestedMenu = (menu: Array<Menu | string>, location: Location, workspaceId?: string) => {
  const formattedMenu: Array<FormattedMenu | string> = [];
  menu.forEach((item) => {
    if (typeof item !== "string") {
      
      let workspacePathname = item.pathname;
      if (workspacePathname && workspaceId) {
        workspacePathname = workspacePathname.replace(":workspaceId", workspaceId);
      }

      const menuItem: FormattedMenu = {
        ...item,
        pathname: workspacePathname,
        active: false,
        activeDropdown: false,
      };
      menuItem.active =
        ((location.forceActiveMenu !== undefined &&
          menuItem.pathname === location.forceActiveMenu) ||
          (location.forceActiveMenu === undefined &&
            menuItem.pathname === location.pathname + location.search) ||
          (menuItem.subMenu && findActiveMenu(menuItem.subMenu, location, workspaceId))) &&
        !menuItem.ignore;

      if (menuItem.subMenu) {
        menuItem.activeDropdown = findActiveMenu(menuItem.subMenu, location, workspaceId);

        // Nested menu
        const subMenu: Array<FormattedMenu> = [];
        nestedMenu(menuItem.subMenu, location, workspaceId).map(
          (menu) => typeof menu !== "string" && subMenu.push(menu)
        );
        menuItem.subMenu = subMenu;
      }

      formattedMenu.push(menuItem);
    } else {
      formattedMenu.push(item);
    }
  });

  return formattedMenu;
};

const linkTo = (
  menu: FormattedMenu, 
  navigate: NavigateFunction, 
  handleModal?: (trigger: string, link?: string) => void 
) => {
  if (menu.subMenu) {
    menu.activeDropdown = !menu.activeDropdown;
  } else {
    if (menu.modalTrigger && handleModal) {
      handleModal(menu.modalTrigger, menu.modalLink);
      return;
    }

    if (menu.pathname !== undefined && menu.pathname !== "#") {
      navigate(menu.pathname);
    }
  }
};

const enter = (el: HTMLElement) => {
  slideDown(el, 300);
};

const leave = (el: HTMLElement) => {
  slideUp(el, 300);
};

export { nestedMenu, linkTo, enter, leave };
