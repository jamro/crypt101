
const parentMap = {}

function getActiveFile() {
  return window.location.pathname.split('/').pop() || 'index.html'
}

function addSection(title, id, parent = '#side-menu') {
  return $(parent).append(`
    <li class="mb-1" id="section-${id}">
      <button class="btn btn-toggle text-white d-inline-flex align-items-center rounded border-0" data-bs-toggle="collapse" data-bs-target="#${id}-collapse" aria-expanded="true">
        ${title}
      </button>
      <div class="collapse ms-2" id="${id}-collapse" style="font-size: 0.8em">
        <ul id="${id}" class="btn-toggle-nav list-unstyled fw-normal pb-1">

        </ul>
      </div>
    </li>`) 
}

function addMenuLink(title, file, parent = '#side-menu') {
  parentMap[file] = parent
  let isActive = getActiveFile() === file
  return $(parent).append(`
    <li class="nav-item">
      <a href="./${file}" class="nav-link ${isActive ? 'active' : 'text-white'}">
        ${title}
      </a>
    </li>`) 
}


$(document).ready(function() {
  $('#side-title').html('<span class="material-icons">security</span> Crypt 101')
  addMenuLink('Welcome', 'index.html')
  addMenuLink('Symmetric Key', 'symmetric_key.html')
  addSection('Asymmetric Key', 'asymmetric_key')
  addMenuLink('RSA Basics', 'asymmetric_key_basic.html', '#asymmetric_key')
  addMenuLink('RSA Text Encryption', 'asymmetric_key_text.html', '#asymmetric_key')


  const activeParent = $(parentMap[getActiveFile()] + '-collapse')
  if(activeParent) {
    activeParent.addClass('show')
  }
})