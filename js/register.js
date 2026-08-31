function gasAttend(code) {
  var content = code;
  on();
  inputModal.hide();
  var userinfo = getUserInfo();
  var url = GAS_URL+'?action=addAttend&content='+content+'&id='+userinfo.id;
  $.getJSON(url, function(data) {
    if (data !== null) {
      if (data.status=='0') {
        createAccessView(data.res);
      }else{
        createRegErrorView(data.error_msg);
      }
    }
    off();
  });
}

function gasRegForm_int() {
  on();
  var userinfo = getUserInfo();
  var url = GAS_URL+'?action=getRegForm_int&id='+userinfo.id;
  $.getJSON(url, function(data) {
    if (data !== null) {
      if (data.status=='0') {
        createRegView_int(data.res);
      }else{
        createRegErrorView(data.error_msg);
      }
    }
    off();
  });
}

function gasSubmitReg_int() {
  on();
  var userinfo = getUserInfo();
  var content = window.btoa(unescape(encodeURIComponent(JSON.stringify(regForm))));
  var url = GAS_URL+'?action=regVisit_int&content='+content+'&id='+userinfo.id;
  $.getJSON(url, function(data) {
    if (data !== null) {
      if (data.status=='0') {
        createRecordView();
        alert('已新增');
      }else{
        createRegErrorView(data.error_msg);
      }
    }
    off();
  });
}

function getSysRec() {
  on();
      var userinfo = getUserInfo();
      var url = GAS_URL+'?action=getSysRec&id='+userinfo.id;

      $.getJSON(url, function(data) {

        if (data !== null) {
          if (data.status=='0') {
            document.getElementById('sys_rec').innerHTML = genSysRecTable(data.res);
          }else{
            alert(data.error_msg);
            if (data.error_code == '104') {
              logout();
            }
          }
        }
        off();
      });
}

function getUserRec() {
  on();
      var userinfo = getUserInfo();
      var url = GAS_URL+'?action=getUserRec&id='+userinfo.id;

      $.getJSON(url, function(data) {

        if (data !== null) {
          if (data.status=='0') {
            document.getElementById('user_rec').innerHTML = genUserRecTable(data.res);
          }else{
            alert(data.error_msg);
            if (data.error_code == '104') {
              logout();
            }
          }
        }
        off();
      });
}

function getTodayAttend() {
  on();
      var userinfo = getUserInfo();
      var url = GAS_URL+'?action=getTodayAttend&id='+userinfo.id;

      $.getJSON(url, function(data) {

        if (data !== null) {
          if (data.status=='0') {
            document.getElementById('today_attend').innerHTML = genTodayAttendTable(data.res);
          }else{
            alert(data.error_msg);
            if (data.error_code == '104') {
              logout();
            }
          }
        }
        off();
      });
}

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
          createMainView()
          off();
        }else if (data.error_code=='106') {
          alert('您需要存取權限。<br>請求存取權限，或切換具有存取權限的帳戶。');
          logout();
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