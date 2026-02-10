/**
 * IFrame Resizer Script
 * 
 * This script handles communication between the child pages and the parent page.
 * Child pages send their content height, and the parent adjusts the IFrame height.
 */

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

    // Run on DOM mutations (dynamic content changes)
    const observer = new MutationObserver(sendHeight);
    if (document.body) {
        observer.observe(document.body, { attributes: true, childList: true, subtree: true });
    }
})();
