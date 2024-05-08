function addMenuLink(title, file) {
  let isActive = window.location.pathname.split('/').pop() === file
  return $('#side-menu').append(`
    <li class="nav-item">
      <a href="./${file}" class="nav-link ${isActive ? 'active' : 'text-white'}">
        ${title}
      </a>
    </li>`) 
}


$(document).ready(function() {
  $('#side-title').text('Crypt 101')
  addMenuLink('Welcome', 'index.html')
  addMenuLink('Symmetric Key', 'symmetric_key.html')
})

