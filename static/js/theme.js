/**********************************************************
 ** URL UTILITIES 
 **********************************************************/
function findGetParameter(parameter) {
    var result = null, tmp = [];
    var items = location.search.substr(1).split("&");
    for (var index = 0; index < items.length; index++) {
        tmp = items[index].split("=");
        if (tmp[0] === parameter) result = decodeURIComponent(tmp[1]);
    }
    return result;
}

function updateGetParameter(key, value, url) {
    if (!url) url = window.location.href;
    var re = new RegExp("([?&])" + key + "=.*?(&|#|$)(.*)", "gi"),
        hash;

    if (re.test(url)) {
        if (typeof value !== 'undefined' && value !== null) {
            return url.replace(re, '$1' + key + "=" + value + '$2$3');
        } else {
            hash = url.split('#');
            url = hash[0].replace(re, '$1$3').replace(/(&|\?)$/, '');
            if (typeof hash[1] !== 'undefined' && hash[1] !== null) {
                url += '#' + hash[1];
            }
            return url;
        }
    } else {
        if (typeof value !== 'undefined' && value !== null) {
            var separator = url.indexOf('?') !== -1 ? '&' : '?';
            hash = url.split('#');
            url = hash[0] + separator + key + '=' + value;
            if (typeof hash[1] !== 'undefined' && hash[1] !== null) {
                url += '#' + hash[1];
            }
            return url;
        } else {
            return url;
        }
    }
}

function isUrlInside(url) {
	var relative = !(url.indexOf('http://') === 0 || url.indexOf('https://') === 0)
	var inside = url.indexOf('https://zorzr.github.io') === 0
	return relative || inside
}

function insertThemeInUrl() {
	var list = document.getElementsByTagName('a');
	var len = list !== null ? list.length : 0;
    for(i = 0; i < len; i++) {
		if (isUrlInside(list[i].href)) {
			list[i].href = updateGetParameter('theme', '1', list[i].href);
		}
    }
}

function removeThemeFromUrl() {
	var list = document.getElementsByTagName('a');
	var len = list !== null ? list.length : 0;
    for(i = 0; i < len; i++) {
		if (isUrlInside(list[i].href)) {
			list[i].href = updateGetParameter('theme', null, list[i].href);
		}
    }
}


/**********************************************************
 ** THEME FUNCTIONS
 **********************************************************/
function addLightClass(list) {
	var len = list !== null ? list.length : 0;
    for(i = 0; i < len; i++) {
		list[i].classList.add('light')
	}
}

function removeLightClass(list) {
	var len = list !== null ? list.length : 0;
    for(i = 0; i < len; i++) {
		list[i].classList.remove('light')
    }
}

function setLightTheme() {
	ids = ['main_content', 'avatar']
	ids.forEach(element => {
		item = document.getElementById(element)
		if (item !== null) {
			item.classList.add('light')
		}
	});

	tags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'pre', 'code', 'blockquote', 'table', 'th', 'td', 'hr']
	tags.forEach(element => {
		list = document.getElementsByTagName(element);
		addLightClass(list);
	});

	classes = ['icon']
	classes.forEach(element => {
		list = document.getElementsByClassName(element);
		addLightClass(list);
	});

	insertThemeInUrl();
	history.replaceState(null, '', updateGetParameter('theme', '1'));
}

function setDarkTheme() {
	ids = ['main_content', 'avatar']
	ids.forEach(element => {
		item = document.getElementById(element)
		if (item !== null) {
			item.classList.remove('light')
		}
	});

	tags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'pre', 'code', 'blockquote', 'table', 'th', 'td', 'hr']
	tags.forEach(element => {
		list = document.getElementsByTagName(element);
		removeLightClass(list);
	});

	classes = ['icon']
	classes.forEach(element => {
		list = document.getElementsByClassName(element);
		removeLightClass(list);
	});

	removeThemeFromUrl();
	history.replaceState(null, '', updateGetParameter('theme'));
}

function toggleTheme() {
	var toggle = document.getElementById('theme_toggle');
	if (toggle.checked) {
		setLightTheme();
	} else {
		setDarkTheme();
	}
}


/**********************************************************
 ** AUTOMATIC THEME ON PAGE LOAD
 **********************************************************/
window.onload = function() {
	var toggle = document.getElementById('theme_toggle');
	var theme = this.findGetParameter('theme');
	if (theme != null && theme === '1') {
		toggle.checked = true;
		this.setLightTheme();
	} else {
		toggle.checked = false;
	}
}
