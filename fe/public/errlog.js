('use strict');
!(function(s) {
  var startDate = new Date().toISOString();
  function getBuildId(s) {
    return s.__NEXT_DATA__ && s.__NEXT_DATA__.buildId ? s.__NEXT_DATA__.buildId : '';
  }
  function postJson(url, body){
    var xhr = new XMLHttpRequest()
    xhr.open('POST', url);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(body))
  }

  s.onerror = function(e, o, r, n, t) {
    try {
	if ((e+"").indexOf("Script error")>-1){
		return;
	}
	
	
      var i = {
          msg: (
            'msg: ' +
            e +
            ', startDate: ' +
            startDate +
            ', fileUrl: ' +
            o +
            ', line: ' +
            r +
            ', col: ' +
            n +
            ', buildId: ' +
            getBuildId(s) +
            ', error: ' +
            t +
            ''
          ).replace(/'|"|\\/g, function(e) {
            return '\\' + e;
          })
        },
        a = (function(e, o) {
          e = e.replace(/[\[\]]/g, '\\$&');
          var r = new RegExp('[?&]' + e + '(=([^&#]*)|&|#|$)').exec(o);
          return r ? (r[2] ? decodeURIComponent(r[2].replace(/\+/g, ' ')) : '') : null;
        })('token', s.location.href),
        c = 2 <= s.location.pathname.split('/').length ? s.location.pathname.split('/')[1] : s.location.pathname,
        p = s.location.origin + (c ? '/' + c : '/') + '/error-log' + (a ? '/?token=' + a : '');

      postJson(p, i);
    } catch (e) {
      console.error('Error report failed => url: ' + p + ', request: ' + JSON.stringify(l));
    }
  };
})(this);

(function(win) {
  win.addEventListener('load', function() {
    if (win.location.host.indexOf('localhost') !== -1) return;
    function entryToJson(e) {
      if (!e) return;
      return {
        name: e.name,
        startTime: e.navigationStart || e.startTime,
        duration: e.duration,
        fetchStart: e.fetchStart,
        domainLookupStart: e.domainLookupStart,
        domainLookupEnd: e.domainLookupEnd,
        connectStart: e.connectStart,
        connectEnd: e.connectEnd,
        requestStart: e.requestStart,
        secureConnectionStart: e.secureConnectionStart,
        responseStart: e.responseStart,
        responseEnd: e.responseEnd,
        domLoading: e.domLoading,
        domInteractive: e.domInteractive,
        domContentLoadedEventStart: e.domContentLoadedEventStart,
        domContentLoadedEventEnd: e.domContentLoadedEventEnd,
        domComplete: e.domComplete,
        loadEventStart: e.loadEventStart,
        loadEventEnd: e.loadEventEnd,
        transferSize: e.transferSize,
        encodedBodySize: e.encodedBodySize,
        decodedBodySize: e.decodedBodySize
      };
    }
    function postJson(url, body){
      var xhr = new XMLHttpRequest()
      xhr.open('POST', url);
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhr.send(JSON.stringify(body))
    }

    function entriesToJson(entries) {
      entries = entries || [];
      var data = [];
      for (var i = 0; i < entries.length; i++) {
        if (entries[i]) {
          data.push(entryToJson(entries[i]));
        }
      }
      return data;
    }

    setTimeout(function() {
      try {
        var data = {},
          p,
          t;
        if ((p = win.performance)) {
          if ((t = p.timing)) {
            data['loadTimingData'] = {
              domContentLoaded: t.domContentLoadedEventEnd - t.navigationStart,
              load: t.loadEventEnd - t.navigationStart
            };
            data['timing'] = entryToJson(t);
          }

          if (typeof p.getEntriesByType === 'function') {
            var nav = entryToJson(performance.getEntriesByType('navigation')[0]);
            if (nav) data['navigationInfo'] = nav;
            data['paint'] = entriesToJson(performance.getEntriesByType('paint'));
          }
        }

        if (win.navigator) {
          var c = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
          if (c) {
            data['connectionInfo'] = {
              eConnType: c.effectiveType,
              downlink: c.downlink,
              downlinkMax: c.downlinkMax,
              roundTripTime: c.rtt,
              connType: c.type
            };
          }
        }

        postJson('/api/v1/error-log', data);
      } catch (e) {}
    }, 2500);
  });
})(this);