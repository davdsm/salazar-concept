"use client";

import { createContext } from "react";

export const AppContext = createContext({
  firstLoad: false,
  pageTransition: (
    _e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    _link: string
  ) => {},
});
