const FUTURE = "future";
let futureBuffer = "";

function triggerFuture() {
    const future = document.querySelector('#future');
    future.parentNode.appendChild(future);
    future.querySelector('h4').textContent = "Future";
}

function handleKeydown(e) {
    if (e.key.length == 1) {
        futureBuffer += e.key.toLowerCase();

        // keep only the last N characters
        if (futureBuffer.length > FUTURE.length)
            futureBuffer = futureBuffer.slice(-FUTURE.length);

        if (futureBuffer == FUTURE) {
            removeEventListener('keydown', handleKeydown);
            triggerFuture();
        }
    }
}

document.addEventListener('keydown', handleKeydown);