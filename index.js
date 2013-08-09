// Execute script when document loads
window.onload = function() {
  var selected = null; // Stores reference to current selected element

  // This function handles the start of a drag event. It sets selected
  // equal to the dragged element.
  function handleDragStart(ev) {
    selected = ev.target;
    ev.dataTransfer.effectAllowed = 'move';
    selected.classList.add('drag');
    return true;
  }

  // This function executes when the user drags the selected list element
  // into the space of another element.
  function handleDragEnter(ev) {
    if (ev.preventDefault) {
      ev.preventDefault();
    }
    ev.target.classList.add('drop-area');
    return true;
  }

  // This function triggers while the user drags the selected element over others.
  function handleDragOver(ev) {
    if (ev.preventDefault) {
      ev.preventDefault();
    }
    ev.dataTransfer.dropEffect = 'move';
    return true;
  }

  // This function triggers when the selected element leaves the borders of
  // another list element.
  function handleDragLeave(ev) {
    if (ev.preventDefault) {
      ev.preventDefault();
    }
    ev.target.classList.remove('drop-area');
    return true;
  }

  // This function triggers when the user drops the selected element onto another.
  function handleDrop(ev) {
    if (ev.preventDefault) {
      ev.preventDefault();
    }
    if (ev.stopPropagation) {
      ev.stopPropagation();
    }
    if (ev.target !== selected) {
      // First remove the dragged element from its current position
      var insert_after = false;
      var list = document.getElementById('dnd-list');
      list.removeChild(selected);
      var els = document.querySelectorAll('.dnd-el');
      [].forEach.call(els, function(el) {
        // Then insert the selected element after the target element
        if (el === ev.target) {
          insert_after = true;
        }
        else if (insert_after) {
          list.insertBefore(selected, el);
          insert_after = false;
        }
      });
      // Appendthe  selected node to end of list if the target element
      // was the last element.
      if (insert_after) {
        list.appendChild(selected);
      }
    }
    ev.target.classList.remove('drop-area');
    return true;
  }

  // This function triggers at the end of a drag & drop event
  // regardless of whether it succeeded or not.
  function handleDragEnd(ev) {
    selected.classList.remove('drag');
    selected = null;
    ev.preventDefault();
    return true;
  }

  // Add drag&drop event listeners to all list elements
  var els = document.querySelectorAll('.dnd-el');
  [].forEach.call(els, function(el) {
    el.addEventListener('dragstart', handleDragStart, false);
    el.addEventListener('dragenter', handleDragEnter, false);
    el.addEventListener('dragover', handleDragOver, false);
    el.addEventListener('dragleave', handleDragLeave, false);
    el.addEventListener('drop', handleDrop, false);
    el.addEventListener('dragend', handleDragEnd, false);
  });
};
