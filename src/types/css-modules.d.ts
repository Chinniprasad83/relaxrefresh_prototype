// Allows importing CSS modules in TypeScript files
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

// Generic CSS import (non-module) fallback
declare module '*.css' {
  const content: { [key: string]: string };
  export default content;
}
