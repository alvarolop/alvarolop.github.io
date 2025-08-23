function toggleOutput(element) {
    const outputDiv = element.nextElementSibling;
    const isVisible = outputDiv.classList.toggle('visible');
    element.innerHTML = isVisible ? '🚀 Hide Output' : '👉 Show Output';
}
