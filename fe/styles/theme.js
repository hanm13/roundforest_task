import { createMuiTheme } from '@material-ui/core';
let MainTheme = {
	"direction": "ltr",
	"props": {
		"MuiSelect": {
			"MenuProps": {
				"anchorOrigin": {
					"vertical": "bottom",
					"horizontal": "right"
				},
				"transformOrigin": {
					"vertical": "top",
					"horizontal": "right"
				},
				"getContentAnchorEl": null
			}
		}
	},
	"overrides": {
		"MuiDialog": {
			"paper": {
				"borderRadius": 20
			}
		},
		"MuiPaper": {
			"elevation8": {
				"boxShadow": "0 1px 10px 0px #e0e0e0"
			}
		},
		"MuiMenuItem": {
			"root": {
				"fontSize": 18,
				"minHeight": 15,
				"&:hover": {
					"backgroundColor": "#f3f2ff"
				},
				"&$selected": {
					"backgroundColor": "#f3f2ff !important"
				}
			}
		},
		"MuiInput": {
			"root": {
				"&$focused": {
					"&:after": {
						"borderBottom": "1px solid #684eed"
					}
				}
			},
			"underline": {
				"&:after": {
					"transition": "none"
				},
				"&:not(.Mui-disabled):before": {
					"borderBottom": "1px solid #697682 !important"
				}
			},
			"input": {
				"fontSize": 18
			}
		},
		"MuiSwitch": {
			"root": {
				"width": 48,
				"height": 28,
				"padding": 0,
				"margin": 8
			},
			"switchBase": {
				"padding": 1,
				"&$disabled $thumb": {
					"backgroundColor": "#d8d8d8"
				},
				"&$checked": {
					"transform": "translateX(20px)",
					"color": "#ffffff !important",
					"& + $track": {
						"opacity": 1,
						"border": "none"
					},
					"&$disabled + $track": {
						"backgroundColor": "rgba(189,189,189,0.48)"
					}
				},
				"&$focusVisible $thumb": {
					"color": "#ffffff",
					"border": "6px solid #ffffff"
				}
			},
			"thumb": {
				"width": 26,
				"height": 26
			},
			"track": {
				"borderRadius": 15,
				"opacity": 1,
				"border": "1px solid gray",
				"backgroundColor": "rgb(136, 136, 136)",
				"transition": "all 0.3s ease-in-out"
			},
			"checked": {},
			"focusVisible": {}
		},
		
		"MuiCheckbox": {
			"root": {
				"& svg": {
					"fill": "transparent"
				},
				"&$checked svg": {
					"fill": "#4f2525"
				},
				"& > .MuiIconButton-label": {
					"border": "1px solid #4f2525"
				},
				
			}
		},
		"MuiRadio": {
			"root": {
				"& .MuiSvgIcon-root": {
					"width": 24,
					"height": 24
				},
				"&.Mui-checked svg:nth-of-type(2)": {
					"transform": "scale(1.3)"
				}
			}
		},
		"MuiInputLabel": {
			"root": {
				"fontSize": 18,
				"color": "#37374e",
				"&$focused": {
					"color": "#37374e"
				}
			}
		},
		"MuiOutlinedInput": {
			"root": {
				"fontSize": 18,
				"&:not(.Mui-focused):hover fieldset": {
					"border": "1px solid rgba(0, 0, 0, 0.23) !important"
				},
				"&$focused fieldset": {
					"border": "1px solid #684eed !important"
				}
			},
			"input": {
				"padding": "16.5px 14px"
			}
		},
		"MuiPickersToolbar": {
			"toolbar": {
				"& .MuiPickersToolbarButton-toolbarBtn": {
					"width": "inherit",
					"borderRadius": "3px",
					"textDecoration": "none",
					"justifyContent": "flex-start",
					"& .MuiPickersToolbarText-toolbarTxt": {
						"padding": "5px",
						"&:hover": {
							"backgroundColor": "#00000029 !important",
							"borderRadius": "3px !important"
						}
					}
				}
			}
		}
	},
	"typography": {
		"fontFamily": "Roboto,sans-serif;",
		"htmlFontSize": 18,
		"fontWeight": 500,
		"useNextVariants": true
	},
	"desktopSize": "900px",
	"progressDesktopSize": "300px",
	"palette": {
		"primary": {
			"main": "#684eed"
		},
		"secondary": {
			"main": "#684eed"
		}
	},
	"useAccessibility": true
};
export const theme = createMuiTheme({
  ...MainTheme
});