import type Lenis from "@studio-freight/lenis";

export type NavTarget = "home" | "about" | "services" | "products" | "works" | "contact";

type NavigationHandler = (target: NavTarget) => void;

let lenisInstance: Lenis | null = null;
let navigationHandler: NavigationHandler | null = null;

export function setLenisInstance(instance: Lenis | null) {
  lenisInstance = instance;
}

export function setNavigationHandler(handler: NavigationHandler | null) {
  navigationHandler = handler;
}

export function navigateTo(target: NavTarget) {
  navigationHandler?.(target);
}

export function smoothScrollTo(target: number) {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, {
      duration: 1.2,
      immediate: false,
    });
    return;
  }

  window.scrollTo({
    top: target,
    behavior: "smooth",
  });
}
