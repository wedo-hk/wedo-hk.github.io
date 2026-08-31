// GAS

function gasGetLabels() {
  on();
  var url = GAS_URL+'?action=getLabels&lang='+lang;
  $.getJSON(url, function(data) {
    if (data !== null) {
      if (data.status=='0') {
        labels = data.res;
        updatePageLabels();
        createInputView1();
      }else{
        alert(data.error_msg);
        location.reload();
      }
    }
    off();
  });
}

function gasIsReg() {
  on();
  var content = window.btoa(unescape(encodeURIComponent(lifeno)));
  var url = GAS_URL+'?action=isRegistered&content='+content;
  $.getJSON(url, function(data) {
    if (data !== null) {
      if (data.status=='0') {
        if (data.res.isValid == '2') {
          vname = data.res.name;
          createQrView(data.res.code);
        } else if (data.res.isValid == '1') {
          createRegView(data.res);
        }
      }else{
        createErrorView(data.error_msg);
      }
      /*
      if (data.status=='0') {
        if (data.res.isValid == '2') {
          vname = data.res.name;
          createQrView(lifeno);
        } else if (data.res.isValid == '1') {
          createRegView(data.res);
        }
      }else{
        alert(lab('100010'));
      }
      */
    }
    off();
  });
}

function gasFullForm() {
  on();
  var url = GAS_URL+'?action=getRegFormWithoutId';
  $.getJSON(url, function(data) {
    if (data !== null) {
      if (data.status=='0') {
        createRegView(data.res);
      }else{
        alert(data.error_msg);
      }
    }
    off();
  });
}

function gasSubmitReg() {
  on();
  var content = window.btoa(unescape(encodeURIComponent(JSON.stringify(regForm))));
  var url = GAS_URL+'?action=regVisit&content='+content;
  $.getJSON(url, function(data) {
    if (data !== null) {
      if (data.status=='0') {
        if (data.res) {
          vname = regForm.fullname.value;
          createQrView(data.res);
        }
      }else{
        alert(lab('100010'));
      }
    }
    off();
  });
}

// document


$(document).ready(function() {
  gid = localStorage.getItem('gid');
  // login
  var access_token = '';
  // Parse query string to see if page request is coming from OAuth 2.0 server.
  var fragmentString = location.hash.substring(1);
  var params = {};
  var regex = /([^&=]+)=([^&]*)/g, m;
  while (m = regex.exec(fragmentString)) {
    params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
  }
  if (Object.keys(params).length > 0 && params['state'] && params['access_token']) {
    access_token = params['access_token'];
  }else{
    access_token = localStorage.getItem('access_token');
  }
  if (access_token !== null) {
    on();
    var url = GAS_URL+'?action=login&token='+access_token;
    $.getJSON(url, function(data) {
      if (data !== null) {
        if (data.status=='0') {
          window.history.pushState({}, document.title, "?");
          localStorage.setItem('userinfo', JSON.stringify(data.res));
          localStorage.setItem('access_token', access_token);
          console.log(JSON.stringify(data.res));
          createMainView()
          off();
        }else{
          alert('已過期，請重新登入');
          logout();
        }
      }
    });
  }else{
    off();
    createGLoginView();
  }
});