function getPersonaDefs() {
  const personas = {}
  $('.persona-def').each(function() {
    const id = $(this).attr('id');
    const color = $(this).data('color');
    const name = $(this).data('name');
    const icon = $(this).data('icon');
    const side = $(this).data('side');
    personas[id] = { id, color, name, icon, side }
  });
  return personas
}

function styleChat(personas) {
  $('.chat-def').each(function() {
    const from = $(this).data('from');
    const persona = personas[from]

    $(this).removeClass('chat-def');
    $(this).removeClass('example-def');
    $(this).addClass('chat-cloud');
    $(this).wrap(`<div class="chat-row"><div class="chat-msg${persona.side === 'right' ? '-right' : ''}"></div></div>`)
    const chatRow = $(this).parent().parent()

    const personaElement = $(`<div class="persona-container">
      <div class="material-icons-outlined persona-icon text-bg-${persona.color}">${persona.icon}</div>
      <div class="persona-label">${persona.name}</div>
    </div>`)

    if(persona.side === 'left') {
      chatRow.prepend(personaElement)
    } else {
      chatRow.append(personaElement)
    }
  });
}

function styleArrow(personas) {
  $('.arrow-def').each(function() {
    const from = $(this).data('from');
    const to = $(this).data('to');
    const direction = $(this).data('direction') || 'right';
    const sender = personas[from]
    const receiver = personas[to]

    $(this).removeClass('arrow-def');
    $(this).removeClass('example-def');
    $(this).addClass('com-msg');
    $(this).wrap(`<div class="com-arrow"></div>`)

    const arrowContainer = $(this).parent()

    if(direction === 'left' || direction === 'both') {
      arrowContainer.prepend(`<div class="com-arrow-head"></div>`)
    } 
    if(direction === 'right' || direction === 'both') {
      arrowContainer.append(`<div class="com-arrow-head"></div>`)
    }

    arrowContainer.wrap(`<div class="com-row">`)
    const arrowRow = arrowContainer.parent()

    const senderElement = $(`<div class="persona-container">
        <div class="material-icons-outlined persona-icon text-bg-${sender.color}">${sender.icon}</div>
        <div class="persona-label">${sender.name}</div>
      </div>`)

    const receiverElement = $(`<div class="persona-container">
        <div class="material-icons-outlined persona-icon text-bg-${receiver.color}">${receiver.icon}</div>
        <div class="persona-label">${receiver.name}</div>
      </div>`)

    arrowRow.prepend(senderElement)
    arrowRow.append(receiverElement)
    
  });
}


function styleExample() {
  const personas = getPersonaDefs()
  styleChat(personas)
  styleArrow(personas)
}

$(document).ready(function() {
  styleExample()
})