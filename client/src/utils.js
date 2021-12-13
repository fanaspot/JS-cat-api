export function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

export function hasClass(el, className) {
  if (el.classList) {
    return el.classList.contains(className);
  }
  return !!el.className.match(new RegExp("(\\s|^)" + className + "(\\s|$)"));
}

export function addClass(el, className) {
  if (!className) {
    return;
  }

  if (el.classList) {
    el.classList.add(className);
  } else if (!hasClass(el, className)) {
    el.className += " " + className;
  }
}

export function removeClass(el, className) {
  if (!className) {
    return;
  }

  if (el.classList) {
    el.classList.remove(className);
  } else if (hasClass(el, className)) {
    const reg = new RegExp("(\\s|^)" + className + "(\\s|$)");
    el.className = el.className.replace(reg, " ");
  }
}

export function createBtn(name, link, imageLink, className) {
  const nameLink = document.createElement("span");
  const image = document.createElement("img");
  const linkBlock = document.createElement("a");

  image.src = imageLink;
  linkBlock.href = link;
  nameLink.textContent = name;

  addClass(linkBlock, className);
  linkBlock.append(image, nameLink);

  return linkBlock;
}
