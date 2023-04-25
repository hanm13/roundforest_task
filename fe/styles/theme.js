import { createMuiTheme } from '@material-ui/core';
let MainTheme = {
	"direction": "ltr",
	"props": {},
	"overrides": {},
	"typography": {},
	"desktopSize": "900px",
	"progressDesktopSize": "300px",
	"palette": {},
	"useAccessibility": true
};
export const theme = createMuiTheme({
  ...MainTheme
});