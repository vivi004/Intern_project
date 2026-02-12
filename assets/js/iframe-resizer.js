
(function () {
    function sendHeight() {
        if (window.parent && window.parent !== window) {
            // Get the full scroll height of the document body
            const height = document.body.scrollHeight;

            // Post message to parent with height
            window.parent.postMessage({
                type: 'resize-iframe',
                height: height
            }, '*');
        }
    }

    // Run on load
    window.addEventListener('load', sendHeight);

    // Run on resize
    window.addEventListener('resize', sendHeight);

    const observer = new MutationObserver(sendHeight);
    if (document.body) {
        observer.observe(document.body, { attributes: true, childList: true, subtree: true });
    }
})();
