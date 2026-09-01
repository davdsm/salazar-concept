"use client";

import { createContext } from "react";

export const AppContext = createContext({
  firstLoad: true,
  pageTransition: (
    _e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    _link: string
  ) => {},
});
