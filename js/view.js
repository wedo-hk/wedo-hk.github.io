function updatePageLabels() {
  setInnerHTMLById('title', lab('100001'));
}

function on() {
  document.getElementById('overlay').style.display = 'block';
}

function off() {
  document.getElementById('overlay').style.display = 'none';
}

function setAttributeValueById(id, attr, value) {
  if (document.getElementById(id)) {
    document.getElementById(id).setAttribute(attr, value);
  }
}

function setInnerHTMLById(id, value) {
  if (document.getElementById(id)) {
    document.getElementById(id).innerHTML = value;
  }
}

function showAlertModal(title, body, footer) {
  document.getElementById('alertModalTitle').innerHTML = '';
  document.getElementById('alertModalBody').innerHTML = '';
  document.getElementById('alertModalFooter').innerHTML = '';

  document.getElementById('alertModalTitle').innerHTML = title;
  document.getElementById('alertModalBody').innerHTML = body;
  document.getElementById('alertModalFooter').innerHTML = footer;
  alertModal.show();
}

function showInputModal(title, body, footer) {
  document.getElementById('inputModalTitle').innerHTML = '';
  document.getElementById('inputModalBody').innerHTML = '';
  document.getElementById('inputModalFooter').innerHTML = '';

  document.getElementById('inputModalTitle').innerHTML = title;
  document.getElementById('inputModalBody').innerHTML = body;
  document.getElementById('inputModalFooter').innerHTML = footer;
  inputModal.show();
}

function showConfirmModal(title, body, footer) {
  inputModal.hide();
  document.getElementById('confirmModalTitle').innerHTML = '';
  document.getElementById('confirmModalBody').innerHTML = '';
  document.getElementById('confirmModalFooter').innerHTML = '';

  document.getElementById('confirmModalTitle').innerHTML = title;
  document.getElementById('confirmModalBody').innerHTML = body;
  document.getElementById('confirmModalFooter').innerHTML = footer;
  confirmModal.show();
}
function submitComMisForm(m_type) {
  inputModal.hide();
  gasComMis(m_type);
}

function createRegErrorView(err_msg) {
  var contentHTML = '';
  contentHTML += '<div class="text-center"><img class="img-fluid mt-5 mb-5" src="img/error.gif" class="d-block w-70" alt="">';
  contentHTML += '<h3><span class="badge rounded-pill text-bg-danger'+'">'+err_msg+'</span></h3></div>';
  showAlertModal('錯誤', contentHTML, '');
}

function getNavHtml() {
  var userinfo = getUserInfo();
  var html = '';
  html += '<nav class="navbar navbar-light" style="background-color: #FCF9F4;">';
  html += '  <div class="container-fluid mx-4 my-1">';
  html += '    <a class="navbar-brand" href="#"  onclick="createMainView()">';
  html += '      <img src="img/ico_consideration.svg" width="28" height="28" alt="">  ';
  html += '<span class="mx-2">'+app_name+'</span>';
  html += '    </a>';
  html += '      <button class="btn btn-light text-warning"><i class="fa fa-user-circle" style="font-size:28px;" onclick="return createProfileView();"></i></button>';
  html += '    </div>';
  
  html += '  </div>';
  html += '</nav>';
  return html;
}

function getFooterHtml() {
  var userinfo = getUserInfo();
  var html = '';
  html += '<nav class="navbar navbar-expand-lg bg-body-tertiary">';
  html += '  <div class="container-fluid mx-4 my-1">';
  html += '    <div class="container navbar-brand col-12">';
  html += '    <div class="row">';
  html += '      <div class="col text-center"><button class="btn btn-light text-warning" type="button"><i class="fa fa-home" style="font-size:36px;" onclick="return createMainView();"></i></button></div>';
  html += '      <div class="col text-center"><button class="btn btn-light text-warning" type="button" onclick="return createRankingView();"><i class="fa fa-star" style="font-size:32px;"></i></button></div>';
  html += '      <div class="col text-center"><button class="btn btn-light text-warning" type="button" onclick="return createLogoutView();"><i class="fa fa-sign-out" style="font-size:32px;"></i></button></div>';
  html += '    </div>';
  html += '    </div>';

  html += '  </div>';
  html += '</nav>';
  return html;

}
function createLogoutView() {

  // var userinfo = getUserInfo();
  initViews();
  // if (userinfo.name == null){
  //   setHeaderTitle('h2', 'Invalid User');
  //   return;
  // }
  header.innerHTML = getNavHtml();
  footer.innerHTML = getFooterHtml();

  var div = createCustomElement('div', 'container col_11');
  content.appendChild(div);
  div.id = 'logoutPage';
  // div.innerHTML = '<div class="d-flex col flex-column align-items-center mt-5 mb-5"><div id="qrcode"></div></div>';

  var html = '<div class="container col-11 mt-5">';
  html += '<div class="d-flex col flex-column align-items-center">';
  html += '<button type="button" class="btn btn-danger col-12 col-lg-4" onclick="return logout();">登出</button>';
  html += '</div>';
  html += '</div>';
  div.innerHTML = html;
}

function createProfileView() {
  var userinfo = getUserInfo();
  var body = '';
  body += '<p>顯示名稱 Display Name: <strong>'+userinfo.name+'</strong></p>'
  body += '<p><a href="https://forms.gle/jK395Byn81KtFywa7">更改顯示名稱 Change Display Name</a></p>';
  

  showInputModal('個人檔案 Profile',body,'');
}

function createSavedView() {
  const i = Math.floor(Math.random() * (cheerUpMsg.length));
  // const rnum2 = Math.floor(Math.random() * 6) + 1;

  var body = '';
  body = '<div class="d-flex justify-content-center" style="height: 120px;">';
  body += '<div class="bg-light rounded-circle d-flex align-items-center justify-content-center" style="width: 120px; height: 120px;">';
  body += '  <img src="img/'+cheerUpMsg[i][0]+'" class="w-50 h-50 object-fit-contain" alt="Icon">';
  body += '</div>';
  body += '</div>';
  body += '<div class="text-center">';
  body += '<br>';
  body += cheerUpMsg[i][2];
  body += '</div>';

  showAlertModal(cheerUpMsg[i][1],body,'');
}

function createMissionView(i) {

  var ind = i-1;
  var m_type = 'm0'+i;

  var title = 'Mission '+i;
  title += '<a class="btn" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">';
  title += '<i class="fa fa-info-circle text-secondary mx-2" style="font-size:18px;"></i>';
  title += '</a>';

  var body = '';
  body += '<div class="collapse" id="collapseExample">';
  body += '  <div class="card card-body mb-3">';
  body += m_desc[ind];
  body += '  </div>';
  body += '</div>';

  body += '<div>';

  var userinfo = getUserInfo();
  var arr = userinfo.m[m_type];

  if (arr) {
    arr.forEach(n => {
      body += '<span class="badge bg-'+(userinfo.my_m && userinfo.my_m.name == n ? 'warning' : 'light')+' text-dark mx-1 my-1">'+n+'</span>';
    });
  }else{
    body += '成為第一個吧！ Be the first!';
  }
  body += '</div>';


  var footer = (userinfo.my_m && userinfo.my_m.comis.includes(m_type)) ? '' : '<div class="d-flex col flex-column align-items"><button type="button" class="btn btn-warning" onclick="return submitComMisForm(&#39;'+m_type+'&#39;);">我已完成！ I have completed!</button></div>';

  showInputModal(title,body,footer);


}

function createRankingView() {

  var userinfo = getUserInfo();
  initViews();
  if (userinfo.name == null){
    setHeaderTitle('h2', 'Invalid User');
    return;
  }
  header.innerHTML = getNavHtml();
  footer.innerHTML = getFooterHtml();

  var r_data = userinfo.r ? userinfo.r : null;

  var div = createCustomElement('div', 'container col_11');
  content.appendChild(div);
  div.id = 'RankingPage';
  var html = '<div class="container col-11 mt-5 pb-5"><ul class="list-group pb-5 mb-5">';
  html += '<li class="list-group-item d-flex justify-content-between align-items-center text-bg-warning">';
  html += '<strong>排行榜 Ranking</strong>';
  if (r_data) {
    html += '<span class="badge bg-secondary"><small>'+r_data.t+'</small></span>';
  }
  html += '</li>';

  if (r_data) {

    r_data.r.forEach(p => {

      html += '<li class="list-group-item d-flex justify-content-between align-items-center ">';
      html += '<div><span class="badge rounded-pill bg-warning">'+p[1]+'</span>';
      html += '<strong class="mx-3">'+p[0]+'</strong></div>';
      html += '</li>';
    });

  }else{
    html += '<li class="list-group-item d-flex justify-content-between align-items-center ">';
    html += '成為第一個吧！ Be the first!';
    html += '</li>';
  }

  html += '</ul>';
  html += '</div>';
  div.innerHTML = html;

}

function createMainView() {
  initViews();
  var userinfo = getUserInfo();
  initViews();
  if (userinfo.name == null){
    setHeaderTitle('h2', 'Invalid User');
    return;
  }
  header.innerHTML = getNavHtml();
  footer.innerHTML = getFooterHtml();

  var div = createCustomElement('div', 'container col_11');
  content.appendChild(div);
  div.id = 'mainPage';
  var html = '<div class="container col-11 mt-5"><ul class="list-group">';
  html += '<li class="list-group-item d-flex justify-content-between align-items-center text-bg-warning">';
  html += '<strong>參與人數 No. of Partcipants</strong><span class="badge rounded-pill bg-light text-dark"><strong>'+(userinfo.r && userinfo.r.r ? userinfo.r.r.length : '0')+'</strong></span>';
  html += '</li>';
  html += '</ul>';
  html += '<div class="container col-12 text-center mt-2 mb-5 px-1 py-2">';

  for (var i = 1; i <= 6; i++) {
    var m_type = 'm0'+i;
    html += '<button class="btn btn-light bg-white text-dark mx-2 my-3" onclick="return createMissionView('+i+');"><div class="my-2"><strong class="m-2">Mission '+i+' </strong>';
    html += '<i class="fa fa-check-circle text-'+(userinfo.my_m && userinfo.my_m.comis && userinfo.my_m.comis.includes(m_type) ? 'success' : 'light')+'" style="font-size:14px;"></i>';
    html += '<hr><h1 class="text-warning">'+(userinfo.m && userinfo.m[m_type] ? userinfo.m[m_type].length : 0)+'</h1></div></button>';
  }

  html += '<br><br><br>';

  html += '</div>';
  // html += '</li>';
  // html += '</ul>';
  html += '</div>';
  div.innerHTML = html;

}

function createGLoginView() {
  initViews();
  setHeaderTitle('h2', '  ');
  var div = createCustomElement('div', 'd-flex col flex-column align-items-center');
  div.id='signin';
  var div2 = createCustomElement('form', 'form-signin');
  var div3 = createCustomElement('div', 'text-center');
  var img = document.createElement('img');
  img.classList.add('my-5');
  img.src = 'img/ico_consideration.svg';
  img.width = '150';
  img.height = '150';
  div3.appendChild(img);
  div2.appendChild(div3);
  var h1 = createCustomElement('h2', 'h2 mb-5 font-weight-normal');
  h1.innerHTML = 'WE DO<br>@HK';
  div3.appendChild(h1);
  var btn_glogin = createCustomElement('btn', 'btn btn-warning btn-block text-center align-self-center mt-3 mb-3');
  btn_glogin.innerHTML = 'Sign in with Google';
  btn_glogin.onclick = function() { oauth2SignIn(); };
  div2.appendChild(btn_glogin);
  div.appendChild(div2);
  content.appendChild(div);
}

function initViews() {
  header.innerHTML = '';
  content.innerHTML = '';
  footer.innerHTML = '';
}

function setHeaderTitle(ele, text) {
  header.innerHTML = '';

  var title = createCustomElement(ele, 'title');
  title.innerHTML = text;
  header.appendChild(title);
}
